import React, { useState } from 'react';
import { PlusCircle, Trash2, X, Newspaper, GraduationCap, Home, Gavel, BookOpen, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminPanel = ({ data, onClose }) => {
  const [activeAdminTab, setActiveAdminTab] = useState('news');
  const { news, concursos, contacts, properties, jurisprudencias, leituras, addItem, deleteItem } = data;

  const [newsForm, setNewsForm] = useState({ title: '', category: 'JUDICIÁRIO', excerpt: '', author: '', image: '' });
  const [concursoForm, setConcursoForm] = useState({ entidade: '', cargo: '', vagas: '', remuneracao: '', status: 'Inscrições Abertas', nivel: 'MUNICIPAL' });
  const [propertyForm, setPropertyForm] = useState({ title: '', type: 'VENDA', price: '', location: '', description: '', image: '' });
  const [juriForm, setJuriForm] = useState({ tribunal: 'TJSP', processo: '', relator: '', ementa: '', link: '#' });
  const [leituraForm, setLeituraForm] = useState({ title: '', author: '', type: 'LIVRO', category: 'GERAL', description: '', link: '#' });
  const [contactForm, setContactForm] = useState({ comarca: '', setor: '', telefone: '' });

  const newsCategories = ['JUDICIÁRIO', 'TRABALHISTA', 'PREVIDENCIÁRIO', 'RURAL', 'CONSUMIDOR', 'CIVIL', 'FAMÍLIA', 'AMBIENTAL', 'FUNDIÁRIO', 'ADMINISTRATIVO', 'SERVIDOR PÚBLICO', 'PENAL', 'ARTIGO'];

  const handleAdd = (key, form, resetForm) => {
    addItem(key, form);
    resetForm();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="admin-container"
    >
      <div className="admin-header">
        <div className="admin-title">
          <h2>Painel de Gestão (Hermeneuta)</h2>
          <nav className="admin-nav-tabs">
            <button className={activeAdminTab === 'news' ? 'active' : ''} onClick={() => setActiveAdminTab('news')}><Newspaper size={16} /> Notícias</button>
            <button className={activeAdminTab === 'concursos' ? 'active' : ''} onClick={() => setActiveAdminTab('concursos')}><GraduationCap size={16} /> Concursos</button>
            <button className={activeAdminTab === 'jurisprudencias' ? 'active' : ''} onClick={() => setActiveAdminTab('jurisprudencias')}><Gavel size={16} /> Jurisprudência</button>
            <button className={activeAdminTab === 'properties' ? 'active' : ''} onClick={() => setActiveAdminTab('properties')}><Home size={16} /> Imóveis</button>
            <button className={activeAdminTab === 'leituras' ? 'active' : ''} onClick={() => setActiveAdminTab('leituras')}><BookOpen size={16} /> Leituras</button>
            <button className={activeAdminTab === 'contacts' ? 'active' : ''} onClick={() => setActiveAdminTab('contacts')}><Phone size={16} /> Contatos</button>
          </nav>
        </div>
        <button onClick={onClose} className="close-btn"><X size={24} /></button>
      </div>

      <div className="admin-grid">
        <section className="publish-form">
          {activeAdminTab === 'news' && (
            <form onSubmit={(e) => { e.preventDefault(); handleAdd('news', newsForm, () => setNewsForm({ title: '', category: 'JUDICIÁRIO', excerpt: '', author: '', image: '' })); }} className="news-form">
              <h3>Publicar Notícia</h3>
              <div className="form-group"><label>Título</label><input type="text" value={newsForm.title} onChange={e => setNewsForm({ ...newsForm, title: e.target.value })} required /></div>
              <div className="form-row">
                <div className="form-group"><label>Categoria</label><select value={newsForm.category} onChange={e => setNewsForm({ ...newsForm, category: e.target.value })}>{newsCategories.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div className="form-group"><label>Autor</label><input type="text" value={newsForm.author} onChange={e => setNewsForm({ ...newsForm, author: e.target.value })} /></div>
              </div>
              <div className="form-group"><label>Conteúdo</label><textarea rows="4" value={newsForm.excerpt} onChange={e => setNewsForm({ ...newsForm, excerpt: e.target.value })} required></textarea></div>
              <button type="submit" className="submit-btn"><PlusCircle size={18} /> Publicar</button>
            </form>
          )}

          {activeAdminTab === 'jurisprudencias' && (
            <form onSubmit={(e) => { e.preventDefault(); handleAdd('jurisprudencias', juriForm, () => setJuriForm({ tribunal: 'TJSP', processo: '', relator: '', ementa: '', link: '#' })); }} className="news-form">
              <h3>Nova Jurisprudência</h3>
              <div className="form-row">
                <div className="form-group"><label>Tribunal</label><input type="text" value={juriForm.tribunal} onChange={e => setJuriForm({ ...juriForm, tribunal: e.target.value })} required /></div>
                <div className="form-group"><label>Processo</label><input type="text" value={juriForm.processo} onChange={e => setJuriForm({ ...juriForm, processo: e.target.value })} required /></div>
              </div>
              <div className="form-group"><label>Relator</label><input type="text" value={juriForm.relator} onChange={e => setJuriForm({ ...juriForm, relator: e.target.value })} /></div>
              <div className="form-group"><label>Ementa / Resumo</label><textarea rows="4" value={juriForm.ementa} onChange={e => setJuriForm({ ...juriForm, ementa: e.target.value })} required></textarea></div>
              <button type="submit" className="submit-btn"><PlusCircle size={18} /> Adicionar Decisão</button>
            </form>
          )}

          {activeAdminTab === 'leituras' && (
            <form onSubmit={(e) => { e.preventDefault(); handleAdd('leituras', leituraForm, () => setLeituraForm({ title: '', author: '', type: 'LIVRO', category: 'GERAL', description: '', link: '#' })); }} className="news-form">
              <h3>Nova Indicação de Leitura</h3>
              <div className="form-group"><label>Título da Obra</label><input type="text" value={leituraForm.title} onChange={e => setLeituraForm({ ...leituraForm, title: e.target.value })} required /></div>
              <div className="form-row">
                <div className="form-group"><label>Autor</label><input type="text" value={leituraForm.author} onChange={e => setLeituraForm({ ...leituraForm, author: e.target.value })} required /></div>
                <div className="form-group"><label>Tipo</label><select value={leituraForm.type} onChange={e => setLeituraForm({ ...leituraForm, type: e.target.value })}><option value="LIVRO">LIVRO</option><option value="ARTIGO">ARTIGO</option></select></div>
              </div>
              <div className="form-group"><label>Resumo / Por que ler?</label><textarea rows="3" value={leituraForm.description} onChange={e => setLeituraForm({ ...leituraForm, description: e.target.value })} required></textarea></div>
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

          {/* ... forms for concursos and properties follow same pattern ... */}
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

          {activeAdminTab === 'properties' && (
            <form onSubmit={(e) => { e.preventDefault(); handleAdd('properties', propertyForm, () => setPropertyForm({ title: '', type: 'VENDA', price: '', location: '', description: '', image: '' })); }} className="news-form">
              <h3>Novo Imóvel</h3>
              <div className="form-group"><label>Título</label><input type="text" value={propertyForm.title} onChange={e => setPropertyForm({ ...propertyForm, title: e.target.value })} required /></div>
              <div className="form-row">
                <div className="form-group"><label>Preço</label><input type="text" value={propertyForm.price} onChange={e => setPropertyForm({ ...propertyForm, price: e.target.value })} required /></div>
                <div className="form-group"><label>Localização</label><input type="text" value={propertyForm.location} onChange={e => setPropertyForm({ ...propertyForm, location: e.target.value })} required /></div>
              </div>
              <button type="submit" className="submit-btn"><PlusCircle size={18} /> Cadastrar</button>
            </form>
          )}
        </section>

        <section className="manage-list">
          <h3>Gerenciar {activeAdminTab}</h3>
          <div className="items-list-admin">
            {data[activeAdminTab]?.map(item => (
              <div key={item.id} className="admin-item-row">
                <div className="item-info">
                  <span>{item.category || item.tribunal || item.type || item.comarca}</span>
                  <h4>{item.title || item.processo || item.cargo || item.setor}</h4>
                </div>
                <button onClick={() => deleteItem(activeAdminTab, item.id)} className="del-btn"><Trash2 size={16} /></button>
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
        .items-list-admin { max-height: 400px; overflow-y: auto; }
        .admin-item-row { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid var(--color-border); }
        .item-info span { font-size: 0.6rem; font-weight: 800; color: var(--color-secondary); }
        .item-info h4 { font-size: 0.9rem; margin: 0.1rem 0; font-family: var(--font-serif); }
        .del-btn { background: none; border: none; color: #cc0000; cursor: pointer; opacity: 0.6; }
        @media (max-width: 900px) { .admin-grid { grid-template-columns: 1fr; } }
      `}</style>
    </motion.div>
  );
};

export default AdminPanel;
