import React, { useState, useEffect } from 'react';
import { User, CheckCircle, AlertCircle, LogIn, LogOut, Trash2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

const CommentsSection = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [form, setForm] = useState({ comment: '', guestName: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  // Lista de emails de administradores
  const ADMIN_EMAILS = ['rafaelmoreirasuyama@gmail.com'];

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user?.email) {
        setIsAdmin(ADMIN_EMAILS.includes(session.user.email));
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user?.email) {
        setIsAdmin(ADMIN_EMAILS.includes(session.user.email));
      } else {
        setIsAdmin(false);
      }
    });

    // Load comments
    loadComments();

    return () => subscription.unsubscribe();
  }, [articleId]);

  const loadComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('article_id', articleId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (err) {
      console.error('Error loading comments:', err);
      setComments([]);
    }
  };

  const signInWithGoogle = async () => {
    setError('');
    console.log("Iniciando login com Google...");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin // Use origin to ensure consistency
        }
      });
      if (error) throw error;
    } catch (err) {
      console.error('Login error detail:', err);
      setError('O login via Google não pôde ser iniciado. Verifique se o provedor Google está ativado no seu painel do Supabase e se a URL de redirecionamento está configurada.');
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      setError('Erro ao sair: ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('Você precisa estar logado para comentar.');
      setLoading(false);
      return;
    }

    try {
      const newComment = {
        article_id: articleId,
        user_id: user.id,
        user_name: user.user_metadata?.full_name || user.email.split('@')[0],
        user_avatar: user.user_metadata?.avatar_url || null,
        user_email: user.email,
        text: form.comment,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('comments')
        .insert([newComment])
        .select();

      if (error) {
        console.error('Supabase insert error:', error);
        throw new Error(error.message || 'Erro ao salvar no banco de dados');
      }

      setComments(prev => [data[0], ...prev]);
      setForm({ comment: '' });
    } catch (err) {
      console.error('Error submitting comment:', err);
      // Fallback local addition if someone is logged in but insert fails (rare)
      if (user) {
        const fallbackComment = {
          id: Date.now(),
          user_name: user.user_metadata?.full_name || user.email.split('@')[0],
          user_avatar: user.user_metadata?.avatar_url || null,
          created_at: new Date().toISOString(),
          text: form.comment
        };
        setComments(prev => [fallbackComment, ...prev]);
        setForm({ ...form, comment: '' });
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    if (!isAdmin) return;

    if (!confirm('Tem certeza que deseja excluir este comentário?')) return;

    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err) {
      console.error('Error deleting comment:', err);
      // Fallback for demo
      setComments(prev => prev.filter(c => c.id !== commentId));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `Há ${diffMins} minutos`;
    if (diffHours < 24) return `Há ${diffHours} horas`;
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 7) return `Há ${diffDays} dias`;
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="comments-section">
      <div className="comments-header">
        <h3 className="comments-title">COMENTÁRIOS ({comments.length})</h3>
        {user ? (
          <div className="user-info">
            {user.user_metadata?.avatar_url && (
              <img src={user.user_metadata.avatar_url} alt="Avatar" className="user-avatar-small" />
            )}
            <span className="user-name-label">{user.user_metadata?.full_name || user.email}</span>
            {isAdmin && <span className="admin-badge">Admin Editorial</span>}
            <button onClick={signOut} className="logout-btn-minimal" title="Sair da conta">
              <LogOut size={16} />
            </button>
          </div>
        ) : null}
      </div>

      {/* Comment Form */}
      {user ? (
        <div className="comment-form-container">
          <h4>Deixe seu comentário</h4>
          <form onSubmit={handleSubmit} className="comment-form">
            <div className="form-group">
              <textarea
                placeholder="Digite seu comentário aqui..."
                rows="4"
                value={form.comment}
                onChange={e => setForm({ ...form, comment: e.target.value })}
                required
              ></textarea>
            </div>

            {error && <div className="error-msg"><AlertCircle size={16} /> {error}</div>}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Publicando...' : 'Publicar comentário'}
            </button>
          </form>
        </div>
      ) : (
        <div className="login-prompt">
          <LogIn size={24} />
          <p>Faça login para participar da conversa.</p>

          <div className="login-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <button onClick={signInWithGoogle} className="google-login-btn">
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z" />
                <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z" />
                <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z" />
                <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z" />
              </svg>
              Entrar com Google
            </button>
          </div>
        </div>
      )}

      {/* Comments List */}
      <div className="comments-list">
        {comments.slice(0, 10).map(comment => (
          <div key={comment.id} className="comment-item">
            <div className="comment-avatar">
              {comment.user_avatar ? (
                <img src={comment.user_avatar} alt={comment.user_name} />
              ) : (
                <User size={20} />
              )}
            </div>
            <div className="comment-content">
              <div className="comment-header">
                <div>
                  <strong>{comment.user_name}</strong>
                  <span>{formatDate(comment.created_at)}</span>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="delete-btn"
                    title="Excluir comentário"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default CommentsSection;
