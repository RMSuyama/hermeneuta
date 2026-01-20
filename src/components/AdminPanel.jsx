import React, { useState } from 'react';
import { PlusCircle, Trash2, X, Newspaper, GraduationCap, Home, Gavel, BookOpen, Phone, User, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminPanel = ({ data, onClose, userRole }) => {
  const [activeAdminTab, setActiveAdminTab] = useState('news');
  const { news = [], concursos = [], contacts = [], leituras = [], editors = [], eventos = [], addItem, deleteItem, updateItem } = data;

  const [newsForm, setNewsForm] = useState({ title: '', category: 'JUDICIÁRIO', content: '', citation: '', author: '', authorId: '', image: '' });
  const [eventForm, setEventForm] = useState({ title: '', date: '', location: '', description: '', type: 'PRESENCIAL', link: '' });
  // Updated editorForm to include username and password
  const [editorForm, setEditorForm] = useState({ name: '', role: '', bio: '', avatar: '', username: '', password: '' });
  const [concursoForm, setConcursoForm] = useState({ entidade: '', cargo: '', vagas: '', remuneracao: '', status: 'Inscrições Abertas', nivel: 'MUNICIPAL' });
  // Removed propertyForm state
  const [leituraForm, setLeituraForm] = useState({ title: '', author: '', type: 'LIVRO', category: 'GERAL', synopsis: '', cover: '', link: '#' });
  const [contactForm, setContactForm] = useState({ comarca: '', setor: '', telefone: '' });

  const newsCategories = ['JUDICIÁRIO', 'TRABALHISTA', 'PREVIDENCIÁRIO', 'RURAL', 'CONSUMIDOR', 'CIVIL', 'FAMÍLIA', 'AMBIENTAL', 'FUNDIÁRIO', 'ADMINISTRATIVO', 'SERVIDOR PÚBLICO', 'PENAL', 'ARTIGO'];

  const handleAdd = async (key, form, resetForm) => {
    await addItem(key, form);
    resetForm();
  };

  const handleAuthorUpdate = (itemId, newAuthorId) => {
    const selectedEditor = editors?.find(ed => ed.id == newAuthorId);
    if (selectedEditor) {
      updateItem('news', itemId, { author_id: newAuthorId, author: selectedEditor.name });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="admin-container"
    >
      <div className="admin-header">
        <div className="admin-title">
          <h2>Painel de Gestão ({userRole === 'admin' ? 'Administrador' : 'Redator'})</h2>
          <nav className="admin-nav-tabs">
            <button className={activeAdminTab === 'news' ? 'active' : ''} onClick={() => setActiveAdminTab('news')}><Newspaper size={16} /> Notícias</button>
            <button className={activeAdminTab === 'eventos' ? 'active' : ''} onClick={() => setActiveAdminTab('eventos')}><Calendar size={16} /> Eventos</button>
            {userRole === 'admin' && (
              <button className={activeAdminTab === 'editors' ? 'active' : ''} onClick={() => setActiveAdminTab('editors')}><User size={16} /> Redação</button>
            )}
            <button className={activeAdminTab === 'concursos' ? 'active' : ''} onClick={() => setActiveAdminTab('concursos')}><GraduationCap size={16} /> Concursos</button>
            {/* Removed Imóveis button */}
            <button className={activeAdminTab === 'leituras' ? 'active' : ''} onClick={() => setActiveAdminTab('leituras')}><BookOpen size={16} /> Leituras</button>
            <button className={activeAdminTab === 'contacts' ? 'active' : ''} onClick={() => setActiveAdminTab('contacts')}><Phone size={16} /> Contatos</button>
            {userRole === 'admin' && (
              <button
                className={activeAdminTab === 'system' ? 'active' : ''}
                onClick={() => setActiveAdminTab('system')}
                style={{ marginLeft: 'auto', backgroundColor: '#f0f0f0' }}
              >
                <Settings size={16} /> Sistema
              </button>
            )}
          </nav>
        </div>
        <button onClick={onClose} className="close-btn"><X size={24} /></button>
      </div>

      <div className="admin-grid">
        <section className="publish-form">
          {activeAdminTab === 'news' && (
            <form onSubmit={(e) => { e.preventDefault(); handleAdd('news', newsForm, () => setNewsForm({ title: '', category: 'JUDICIÁRIO', content: '', citation: '', author: '', authorId: '', image: '' })); }} className="news-form">
              <h3>Publicar Notícia</h3>
              <div className="form-group"><label>Título</label><input type="text" value={newsForm.title} onChange={e => setNewsForm({ ...newsForm, title: e.target.value })} required /></div>
              <div className="form-row">
                <div className="form-group"><label>Categoria</label><select value={newsForm.category} onChange={e => setNewsForm({ ...newsForm, category: e.target.value })}>{newsCategories.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div className="form-group">
                  <label>Autor</label>
                  <select
                    value={newsForm.authorId}
                    onChange={e => {
                      const selectedEditor = editors?.find(ed => ed.id == e.target.value);
                      setNewsForm({ ...newsForm, authorId: e.target.value, author: selectedEditor ? selectedEditor.name : '' });
                    }}
                  >
                    <option value="">Selecione...</option>
                    {editors?.map(editor => (
                      <option key={editor.id} value={editor.id}>{editor.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group"><label>URL da Imagem</label><input type="text" value={newsForm.image} onChange={e => setNewsForm({ ...newsForm, image: e.target.value })} placeholder="https://..." /></div>
              <div className="form-group"><label>Citação (Opcional)</label><textarea rows="3" value={newsForm.citation} onChange={e => setNewsForm({ ...newsForm, citation: e.target.value })} placeholder="Frase de destaque..."></textarea></div>
              <div className="form-group"><label>Conteúdo</label><textarea rows="10" value={newsForm.content} onChange={e => setNewsForm({ ...newsForm, content: e.target.value })} required></textarea></div>
              <button type="submit" className="submit-btn"><PlusCircle size={18} /> Publicar</button>
            </form>
          )}

          {activeAdminTab === 'editors' && userRole === 'admin' && (
            <form onSubmit={(e) => { e.preventDefault(); handleAdd('editors', editorForm, () => setEditorForm({ name: '', role: '', bio: '', avatar: '', username: '', password: '' })); }} className="news-form">
              <h3>Novo Redator / Colunista</h3>

              <div className="form-row" style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ color: '#2c3e50' }}>Login de Acesso</label>
                  <input type="text" value={editorForm.username} onChange={e => setEditorForm({ ...editorForm, username: e.target.value })} placeholder="Ex: joao.silva" required style={{ borderColor: '#3498db' }} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ color: '#2c3e50' }}>Senha de Acesso</label>
                  <input type="text" value={editorForm.password} onChange={e => setEditorForm({ ...editorForm, password: e.target.value })} placeholder="******" required style={{ borderColor: '#3498db' }} />
                </div>
              </div>

              <div className="form-group"><label>Nome Completo</label><input type="text" value={editorForm.name} onChange={e => setEditorForm({ ...editorForm, name: e.target.value })} required /></div>
              <div className="form-group"><label>Cargo / Profissão</label><input type="text" value={editorForm.role} onChange={e => setEditorForm({ ...editorForm, role: e.target.value })} placeholder="Ex: Advogado, Redator Chefe" required /></div>
              <div className="form-group"><label>URL da Foto (Avatar)</label><input type="text" value={editorForm.avatar} onChange={e => setEditorForm({ ...editorForm, avatar: e.target.value })} placeholder="https://..." /></div>
              <div className="form-group"><label>Minibio (Sobre o Autor)</label><textarea rows="4" value={editorForm.bio} onChange={e => setEditorForm({ ...editorForm, bio: e.target.value })} placeholder="Apaixonado por escrever..." required></textarea></div>
              <button type="submit" className="submit-btn"><PlusCircle size={18} /> Adicionar Redator</button>
            </form>
          )}


          {activeAdminTab === 'eventos' && (
            <div className="admin-section">
              <h3>Adicionar Evento</h3>
              <form onSubmit={async (e) => { e.preventDefault(); await addItem('eventos', eventForm); setEventForm({ title: '', date: '', location: '', description: '', type: 'PRESENCIAL', link: '' }); }}>
                <div className="form-group">
                  <input type="text" placeholder="Título do Evento" value={eventForm.title} onChange={e => setEventForm({ ...eventForm, title: e.target.value })} required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Data (ex: 25 Mar 2026)" value={eventForm.date} onChange={e => setEventForm({ ...eventForm, date: e.target.value })} required />
                  <input type="text" placeholder="Local" value={eventForm.location} onChange={e => setEventForm({ ...eventForm, location: e.target.value })} required />
                </div>
                <div className="form-group">
                  <select value={eventForm.type} onChange={e => setEventForm({ ...eventForm, type: e.target.value })}>
                    <option value="PRESENCIAL">Presencial</option>
                    <option value="ONLINE">Online</option>
                    <option value="HÍBRIDO">Híbrido</option>
                    <option value="SOCIAL">Social</option>
                    <option value="WORKSHOP">Workshop</option>
                  </select>
                  <input type="text" placeholder="Link (Inscrição/Mais info)" value={eventForm.link} onChange={e => setEventForm({ ...eventForm, link: e.target.value })} />
                </div>
                <textarea placeholder="Descrição" value={eventForm.description} onChange={e => setEventForm({ ...eventForm, description: e.target.value })} required className="full-width"></textarea>
                <button type="submit" className="add-btn">Publicar Evento</button>
              </form>

              <div className="admin-list">
                {eventos?.map(item => (
                  <div key={item.id} className="admin-item">
                    <span>{item.title} ({item.date})</span>
                    {userRole === 'admin' && (
                      <button onClick={() => deleteItem('eventos', item.id)} className="delete-btn">Excluir</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeAdminTab === 'leituras' && (
            <form onSubmit={(e) => { e.preventDefault(); handleAdd('leituras', leituraForm, () => setLeituraForm({ title: '', author: '', type: 'LIVRO', category: 'GERAL', synopsis: '', cover: '', link: '#' })); }} className="news-form">
              <h3>Nova Indicação de Leitura</h3>
              <div className="form-group"><label>Título da Obra</label><input type="text" value={leituraForm.title} onChange={e => setLeituraForm({ ...leituraForm, title: e.target.value })} required /></div>
              <div className="form-row">
                <div className="form-group"><label>Autor</label><input type="text" value={leituraForm.author} onChange={e => setLeituraForm({ ...leituraForm, author: e.target.value })} required /></div>
                <div className="form-group"><label>Categoria</label><input type="text" value={leituraForm.category} onChange={e => setLeituraForm({ ...leituraForm, category: e.target.value })} placeholder="Ex: Filo do Direito" /></div>
              </div>
              <div className="form-group"><label>URL da Capa</label><input type="text" value={leituraForm.cover} onChange={e => setLeituraForm({ ...leituraForm, cover: e.target.value })} placeholder="http://..." /></div>
              <div className="form-group"><label>Sinopse</label><textarea rows="6" value={leituraForm.synopsis} onChange={e => setLeituraForm({ ...leituraForm, synopsis: e.target.value })} required></textarea></div>
              <button type="submit" className="submit-btn"><PlusCircle size={18} /> Adicionar Indicação</button>
            </form>
          )}

          {activeAdminTab === 'contacts' && (
            <form onSubmit={(e) => { e.preventDefault(); handleAdd('contacts', contactForm, () => setContactForm({ comarca: '', setor: '', telefone: '' })); }} className="news-form">
              <h3>Novo Contato Útil</h3>
              <div className="form-group"><label>Comarca</label><input type="text" value={contactForm.comarca} onChange={e => setContactForm({ ...contactForm, comarca: e.target.value })} required /></div>
              <div className="form-group"><label>Setor / Órgão</label><input type="text" value={contactForm.setor} onChange={e => setContactForm({ ...contactForm, setor: e.target.value })} required /></div>
              <div className="form-group"><label>Telefone</label><input type="text" value={contactForm.telefone} onChange={e => setContactForm({ ...contactForm, telefone: e.target.value })} required /></div>
              <button type="submit" className="submit-btn"><PlusCircle size={18} /> Salvar Contato</button>
            </form>
          )}

          {activeAdminTab === 'concursos' && (
            <form onSubmit={(e) => { e.preventDefault(); handleAdd('concursos', concursoForm, () => setConcursoForm({ entidade: '', cargo: '', vagas: '', remuneracao: '', status: 'Inscrições Abertas', nivel: 'MUNICIPAL' })); }} className="news-form">
              <h3>Novo Concurso</h3>
              <div className="form-group"><label>Entidade</label><input type="text" value={concursoForm.entidade} onChange={e => setConcursoForm({ ...concursoForm, entidade: e.target.value })} required /></div>
              <div className="form-group"><label>Cargo</label><input type="text" value={concursoForm.cargo} onChange={e => setConcursoForm({ ...concursoForm, cargo: e.target.value })} required /></div>
              <div className="form-row">
                <div className="form-group"><label>Nível</label><select value={concursoForm.nivel} onChange={e => setConcursoForm({ ...concursoForm, nivel: e.target.value })}><option value="MUNICIPAL">MUNICIPAL</option><option value="ESTADUAL">ESTADUAL</option><option value="FEDERAL">FEDERAL</option></select></div>
                <div className="form-group"><label>Remuneração</label><input type="text" value={concursoForm.remuneracao} onChange={e => setConcursoForm({ ...concursoForm, remuneracao: e.target.value })} /></div>
              </div>
              <button type="submit" className="submit-btn"><PlusCircle size={18} /> Adicionar</button>
            </form>
          )}

          {activeAdminTab === 'system' && userRole === 'admin' && (
            <div className="admin-section">
              <h3>Configurações do Sistema</h3>
              <div className="system-card" style={{ padding: '2rem', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4>Modo Manutenção</h4>
                    <p style={{ fontSize: '0.8rem', color: '#666' }}>Quando ativado, os visitantes verão uma tela de manutenção.</p>
                  </div>
                  <button
                    onClick={async () => {
                      const newStatus = !data.isMaintenanceMode;
                      await data.updateConfig('maintenance_mode', newStatus);
                    }}
                    style={{
                      padding: '0.6rem 1.2rem',
                      backgroundColor: data.isMaintenanceMode ? '#cc0000' : '#27ae60',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    {data.isMaintenanceMode ? 'DESATIVAR' : 'ATIVAR'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Removed properties form section */}
        </section>

        <section className="manage-list">
          <h3>Gerenciar {activeAdminTab === 'news' ? 'Notícias' : activeAdminTab}</h3>
          <div className="items-list-admin">
            {data[activeAdminTab]?.map(item => (
              <div key={item.id} className="admin-item-row">
                {/* Image Verification Thumbnail */}
                {(item.image || item.cover || item.avatar) && (
                  <div className="item-thumb">
                    <img src={item.image || item.cover || item.avatar} alt="thumb" onError={(e) => e.target.style.border = '2px solid red'} />
                  </div>
                )}

                <div className="item-info">
                  <span>{item.category || item.role || item.tribunal || item.type || item.comarca}</span>
                  <h4>{item.title || item.name || item.processo || item.cargo || item.setor || item.username}</h4>

                  {/* Author Editing for Admins */}
                  {userRole === 'admin' && activeAdminTab === 'news' && (
                    <div className="author-edit">
                      <label>Autor:</label>
                      <select
                        value={item.author_id || item.authorId || ''}
                        onChange={(e) => handleAuthorUpdate(item.id, e.target.value)}
                        className="author-select"
                      >
                        <option value="">Selecione...</option>
                        {editors?.map(editor => (
                          <option key={editor.id} value={editor.id}>{editor.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  {/* Show Author Name for non-admins or if needed */}
                  {(userRole !== 'admin' || activeAdminTab !== 'news') && item.author && (
                    <span className="author-display">Por: {item.author}</span>
                  )}
                  {/* Show Username for editors in list */}
                  {activeAdminTab === 'editors' && item.username && (
                    <span style={{ fontSize: '0.7em', color: '#555' }}>Login: {item.username}</span>
                  )}
                </div>

                {userRole === 'admin' && (
                  <button onClick={() => deleteItem(activeAdminTab, item.id)} className="del-btn" title="Excluir">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        .admin-container { background: white; padding: 2rem; border: 1px solid var(--color-primary); box-shadow: 12px 12px 0 var(--color-primary); }
        .admin-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid var(--color-primary); padding-bottom: 1rem; margin-bottom: 2rem; }
        .admin-nav-tabs { display: flex; gap: 0.5rem; margin-top: 1rem; flex-wrap: wrap; }
        .admin-nav-tabs button { background: none; border: 1px solid var(--color-border); padding: 0.4rem 0.8rem; font-family: var(--font-sans); font-size: 0.75rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; }
        .admin-nav-tabs button.active { background: var(--color-primary); color: white; border-color: var(--color-primary); }
        .admin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .news-form h3 { font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1.5rem; }
        .form-group { margin-bottom: 1rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        label { display: block; font-size: 0.7rem; font-weight: 800; color: var(--color-text-muted); margin-bottom: 0.3rem; text-transform: uppercase; }
        input, select, textarea { width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); font-family: var(--font-sans); }
        .submit-btn { width: 100%; padding: 1rem; background: var(--color-primary); color: white; border: none; font-weight: 800; text-transform: uppercase; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
        .items-list-admin { max-height: 400px; overflow-y: auto; padding-right: 10px; }
        .admin-item-row { display: flex; gap: 1rem; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid var(--color-border); }
        .item-thumb { width: 50px; height: 50px; flex-shrink: 0; background: #eee; }
        .item-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .item-info { flex: 1; }
        .item-info span { font-size: 0.6rem; font-weight: 800; color: var(--color-secondary); display: block; }
        .item-info h4 { font-size: 0.9rem; margin: 0.1rem 0; font-family: var(--font-serif); }
        .author-edit { margin-top: 0.5rem; display: flex; align-items: center; gap: 0.5rem; }
        .author-edit label { margin: 0; }
        .author-select { padding: 0.2rem; font-size: 0.7rem; width: auto; }
        .del-btn { background: none; border: none; color: #cc0000; cursor: pointer; opacity: 0.6; padding: 0.5rem; }
        .del-btn:hover { opacity: 1; background: rgba(204, 0, 0, 0.1); border-radius: 4px; }
        @media (max-width: 900px) { .admin-grid { grid-template-columns: 1fr; } }
      `}</style>
    </motion.div>
  );
};

export default AdminPanel;
