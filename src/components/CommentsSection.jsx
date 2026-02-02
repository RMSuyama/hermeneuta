import React, { useState } from 'react';
import { User, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

const CommentsSection = ({ articleId }) => {
    const [comments, setComments] = useState([
        { id: 1, name: 'João da Silva', date: 'Há 2 horas', text: 'Muito esclarecedor! Parabéns pelo texto.' },
        { id: 2, name: 'Maria Oliveira', date: 'Há 5 horas', text: 'Gostaria de saber mais sobre como isso se aplica a pequenos produtores.' },
        { id: 3, name: 'Carlos Santos', date: 'Ontem', text: 'Excelente abordagem sobre os direitos trabalhistas.' }
    ]);

    const [form, setForm] = useState({ name: '', email: '', comment: '', saveDate: false });
    const [isRobot, setIsRobot] = useState(true); // Fake ReCaptcha state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [cooldown, setCooldown] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (isRobot) {
            setError('Por favor, confirme que você não é um robô.');
            return;
        }

        if (cooldown) {
            setError('Aguarde alguns instantes antes de comentar novamente.');
            return;
        }

        if (!form.name || !form.email || !form.comment) {
            setError('Preencha todos os campos obrigatórios.');
            return;
        }

        setLoading(true);

        // Simulate Network Request
        setTimeout(() => {
            const newComment = {
                id: Date.now(),
                name: form.name,
                date: 'Agora mesmo',
                text: form.comment
            };

            setComments(prev => [newComment, ...prev]);
            setForm({ name: '', email: '', comment: '', saveDate: form.saveDate });
            setIsRobot(true); // Reset Captcha
            setLoading(false);
            setCooldown(true);

            // 1 minute cooldown
            setTimeout(() => setCooldown(false), 60000);
        }, 1500);
    };

    return (
        <div className="comments-section">
            <h3 className="comments-title">Comentários ({comments.length})</h3>

            {/* FEED DE COMENTÁRIOS (Limitado a 5 recentes) */}
            <div className="comments-list">
                {comments.slice(0, 5).map(comment => (
                    <div key={comment.id} className="comment-item">
                        <div className="comment-avatar">
                            <User size={20} />
                        </div>
                        <div className="comment-content">
                            <div className="comment-header">
                                <strong>{comment.name}</strong>
                                <span>{comment.date}</span>
                            </div>
                            <p>{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="comment-form-container">
                <h4>Deixe seu comentário</h4>
                <p className="form-note">O seu endereço de e-mail não será publicado. Campos obrigatórios são marcados com *</p>

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

                    <div className="form-row">
                        <div className="form-group">
                            <label>*Nome</label>
                            <input
                                type="text"
                                placeholder="Seu nome completo"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>*Email</label>
                            <input
                                type="email"
                                placeholder="Email para contato"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="saveData"
                            checked={form.saveDate}
                            onChange={e => setForm({ ...form, saveDate: e.target.checked })}
                        />
                        <label htmlFor="saveData">Salvar meus dados neste navegador para a próxima vez que eu comentar.</label>
                    </div>

                    {/* MOCK RECAPTCHA */}
                    <div className="mock-recaptcha" onClick={() => setIsRobot(!isRobot)}>
                        <div className="recaptcha-box">
                            <div className={`checkbox ${!isRobot ? 'checked' : ''}`}>
                                {!isRobot && <CheckCircle size={20} color="#0f9d58" />}
                            </div>
                            <span className="recaptcha-label">Não sou um robô</span>
                        </div>
                        <div className="recaptcha-logo">
                            <RefreshCw size={14} />
                            <span>reCAPTCHA</span>
                            <small>Privacidade - Termos</small>
                        </div>
                    </div>

                    {error && <div className="error-msg"><AlertCircle size={16} /> {error}</div>}

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Publicando...' : 'Publicar comentário'}
                    </button>
                </form>
            </div>

            <style jsx>{`
        .comments-section {
          margin-top: 4rem;
          border-top: 1px solid var(--color-border);
          padding-top: 2rem;
        }
        .comments-title {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: var(--color-primary);
          margin-bottom: 2rem;
        }

        .comments-list {
          margin-bottom: 3rem;
        }
        .comment-item {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          animation: fadeIn 0.3s ease;
        }
        .comment-avatar {
          width: 40px;
          height: 40px;
          background: #eee;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          flex-shrink: 0;
        }
        .comment-content {
          background: #f9f9f9;
          padding: 1rem;
          border-radius: 8px;
          flex: 1;
        }
        .comment-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }
        .comment-header strong { color: var(--color-primary); }
        .comment-header span { color: var(--color-text-muted); font-size: 0.8rem; }
        .comment-content p { color: var(--color-text); font-size: 0.95rem; line-height: 1.5; margin: 0; }

        .comment-form-container {
          background: #fff;
        }
        .comment-form-container h4 { font-size: 1.2rem; color: var(--color-text); margin-bottom: 0.5rem; }
        .form-note { font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 1.5rem; }

        .form-group { margin-bottom: 1rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        
        input, textarea {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          transition: border 0.2s;
        }
        input:focus, textarea:focus { border-color: var(--color-secondary); outline: none; }
        label { display: block; font-size: 0.8rem; font-weight: 600; color: var(--color-text); margin-bottom: 0.3rem; }

        .form-check { display: flex; gap: 0.5rem; align-items: center; margin-bottom: 1.5rem; }
        .form-check input { width: auto; }
        .form-check label { margin: 0; font-weight: 400; color: var(--color-text-muted); }

        /* MOCK RECAPTCHA Styles */
        .mock-recaptcha {
          width: 250px;
          height: 74px;
          background: #f9f9f9;
          border: 1px solid #d3d3d3;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 12px;
          margin-bottom: 1.5rem;
          cursor: pointer;
          user-select: none;
          box-shadow: 0 1px 1px rgba(0,0,0,0.08);
        }
        .mock-recaptcha:hover { background: #f1f1f1; }
        
        .recaptcha-box { display: flex; align-items: center; gap: 12px; }
        .checkbox {
          width: 28px;
          height: 28px;
          background: #fff;
          border: 2px solid #c1c1c1;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .checkbox:hover { border-color: #b2b2b2; }
        .recaptcha-label { font-family: Roboto, Arial, sans-serif; font-size: 14px; font-weight: 500; color: #000; }
        
        .recaptcha-logo { display: flex; flex-direction: column; align-items: center; color: #555; text-align: center; }
        .recaptcha-logo span { font-size: 10px; margin-top: 2px; }
        .recaptcha-logo small { font-size: 8px; color: #999; }

        .submit-btn {
          background: #1a73e8; /* Google Blue-ish */
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .submit-btn:hover { background: #1557b0; }
        .submit-btn:disabled { background: #ccc; cursor: not-allowed; }

        .error-msg { color: #d93025; font-size: 0.9rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }

        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>
        </div>
    );
};

export default CommentsSection;
