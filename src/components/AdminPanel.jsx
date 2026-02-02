import React, { useState } from 'react';
import ReactQuill from 'react-quill'; // Import ReactQuill
import { PlusCircle, Trash2, X, Newspaper, GraduationCap, Home, Gavel, BookOpen, Phone, User, Calendar, Settings, Building, Briefcase, MessageSquare, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const FullEditor = ({ value, onChange }) => {
  const modules = {
    toolbar: {
      container: [
        // Estilos rápidos (Quick Styles)
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],

        // Formatação de texto básica
        ['bold', 'italic', 'underline', 'strike'],

        // Sobrescrito e subscrito
        [{ 'script': 'sub' }, { 'script': 'super' }],

        // Estilos de bloco
        ['blockquote', 'code-block'],

        // Listas e indentação (similar à régua do Word)
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],

        // Direção do texto
        [{ 'direction': 'rtl' }],

        // Cores (texto e fundo)
        [{ 'color': [] }, { 'background': [] }],

        // Alinhamento
        [{ 'align': [] }],

        // Mídia
        ['link', 'image', 'video'],

        // Limpar formatação
        ['clean']
      ],
      handlers: {
        // Handlers customizados podem ser adicionados aqui
      }
    },
    clipboard: {
      // Aceita formatação do Word e outros editores
      matchVisual: true
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'script',
    'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'direction',
    'color', 'background',
    'align',
    'link', 'image', 'video'
  ];

  return (
    <div className="editor-wrapper">
      <div className="editor-tips">
        <strong>💡 Dicas rápidas:</strong>
        <span>Ctrl+B (negrito)</span>
        <span>Ctrl+I (itálico)</span>
        <span>Ctrl+U (sublinhado)</span>
        <span>Cole textos do Word diretamente!</span>
      </div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Digite ou cole seu conteúdo aqui... Aceita formatação do Word!"
      />
      <style jsx>{`
        .editor-wrapper { 
          margin-bottom: 3rem; 
          background: white; 
          color: black; 
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .editor-tips {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.75rem 1rem;
          border-radius: 8px 8px 0 0;
          font-size: 0.75rem;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          align-items: center;
        }
        .editor-tips strong {
          color: #ffd700;
        }
        .editor-tips span {
          background: rgba(255,255,255,0.2);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-family: monospace;
        }
        :global(.ql-container) { 
          min-height: 500px; 
          font-size: 16px;
          font-family: 'Georgia', serif;
          line-height: 1.6;
        }
        :global(.ql-editor) { 
          min-height: 500px;
          padding: 2rem;
        }
        :global(.ql-toolbar) {
          background: #f8f9fa;
          border: none !important;
          border-bottom: 2px solid #e0e0e0 !important;
          padding: 1rem;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        :global(.ql-toolbar button) {
          margin: 0 2px;
        }
        :global(.ql-toolbar button:hover) {
          color: #667eea !important;
        }
        :global(.ql-toolbar .ql-stroke) {
          stroke: #333;
        }
        :global(.ql-toolbar button:hover .ql-stroke) {
          stroke: #667eea;
        }
        :global(.ql-toolbar .ql-fill) {
          fill: #333;
        }
        :global(.ql-toolbar button:hover .ql-fill) {
          fill: #667eea;
        }
        :global(.ql-editor.ql-blank::before) {
          color: #aaa;
          font-style: italic;
        }
        /* Estilos para conteúdo colado do Word */
        :global(.ql-editor p) {
          margin-bottom: 1em;
        }
        :global(.ql-editor h1),
        :global(.ql-editor h2),
        :global(.ql-editor h3) {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

const AdminPanel = ({ data = {}, onClose, userRole }) => {
  // ... (existing state) ...
  console.log("AdminPanel Render - Got keys:", Object.keys(data));
  const [activeAdminTab, setActiveAdminTab] = useState('news');
  const { news = [], concursos = [], contacts = [], leituras = [], editors = [], eventos = [], instituicoes = [], equipamentos = [], addItem, deleteItem, updateItem, isMaintenanceMode, reservas = [] } = data;

  const [newsForm, setNewsForm] = useState({ title: '', category: 'JUDICIÁRIO', content: '', citation: '', author: '', authorId: '', image: '', images: [] });
  const [editingNews, setEditingNews] = useState(null);
  // ... (rest of state) ...
  const [eventForm, setEventForm] = useState({ title: '', date: '', location: '', description: '', type: 'PRESENCIAL', link: '', image: '' });
  // Updated editorForm to include username and password
  const [editorForm, setEditorForm] = useState({ name: '', role: '', bio: '', avatar: '', username: '', password: '' });
  const [editingEditor, setEditingEditor] = useState(null);
  const [concursoForm, setConcursoForm] = useState({ entidade: '', cargo: '', vagas: '', remuneracao: '', status: 'Inscrições Abertas', nivel: 'MUNICIPAL' });
  // Removed propertyForm state
  const [leituraForm, setLeituraForm] = useState({ title: '', author: '', type: 'LIVRO', category: 'GERAL', synopsis: '', cover: '', link: '#' });
  const [contactForm, setContactForm] = useState({ comarca: '', setor: '', telefone: '' });

  // New States for Institutions and Equipments
  const [instituicaoForm, setInstituicaoForm] = useState({ name: '', type: 'OAB', city: '', image: '', description: '', history: '', link: '' });
  const [equipamentoForm, setEquipamentoForm] = useState({ title: '', category: 'ACESSÓRIOS', description: '', price: '', link: '', image: '' });
  const [vagaForm, setVagaForm] = useState({ title: '', company: '', type: 'CLT', location: '', link: '', description: '' });
  const [academicoForm, setAcademicoForm] = useState({ title: '', author: '', type: 'ARTIGO CIENTÍFICO', institution: '', year: new Date().getFullYear().toString(), resume: '', content: '', image: '', link: '', isFeatured: false });
  const [reservaForm, setReservaForm] = useState({ title: '', category: 'HOTEL', location: '', description: '', image: '', link: '' });

  const [editingEvento, setEditingEvento] = useState(null);
  const [editingLeitura, setEditingLeitura] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [editingConcurso, setEditingConcurso] = useState(null);
  const [editingInstituicao, setEditingInstituicao] = useState(null);
  const [editingEquipamento, setEditingEquipamento] = useState(null);
  const [editingVaga, setEditingVaga] = useState(null);
  const [editingAcademico, setEditingAcademico] = useState(null);
  const [editingReserva, setEditingReserva] = useState(null);

  // Filter States for News Management
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('TODAS');
  const [filterAuthor, setFilterAuthor] = useState('TODOS');

  const newsCategories = ['JUDICIÁRIO', 'TRABALHISTA', 'PREVIDENCIÁRIO', 'RURAL', 'CONSUMIDOR', 'CIVIL', 'FAMÍLIA', 'AMBIENTAL', 'FUNDIÁRIO', 'ADMINISTRATIVO', 'SERVIDOR PÚBLICO', 'PENAL', 'ARTIGO'];

  // Quill Modules for Toolbar
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'align',
    'link', 'image'
  ];

  const handleAdd = async (key, formData, resetForm) => {
    if (isMaintenanceMode) return;
    try {
      if (editingNews && key === 'news') {
        await updateItem('news', editingNews.id, formData);
        setEditingNews(null);
      } else if (editingEvento && key === 'eventos') {
        await updateItem('eventos', editingEvento.id, formData);
        setEditingEvento(null);
      } else if (editingEditor && key === 'editors') {
        await updateItem('editors', editingEditor.id, formData);
        setEditingEditor(null);
      } else if (editingLeitura && key === 'leituras') {
        await updateItem('leituras', editingLeitura.id, formData);
        setEditingLeitura(null);
      } else if (editingContact && key === 'contacts') {
        await updateItem('contacts', editingContact.id, formData);
        setEditingContact(null);
      } else if (editingConcurso && key === 'concursos') {
        await updateItem('concursos', editingConcurso.id, formData);
        setEditingConcurso(null);
      } else if (editingInstituicao && key === 'instituicoes') {
        await updateItem('instituicoes', editingInstituicao.id, formData);
        setEditingInstituicao(null);
      } else if (editingEquipamento && key === 'equipamentos') {
        await updateItem('equipamentos', editingEquipamento.id, formData);
        setEditingEquipamento(null);
      } else if (editingVaga && key === 'vagas') {
        await updateItem('vagas', editingVaga.id, formData);
        setEditingVaga(null);
      } else if (editingAcademico && key === 'academico') {
        await updateItem('academico', editingAcademico.id, formData);
        setEditingAcademico(null);
        setAcademicoForm({ title: '', author: '', type: 'ARTIGO CIENTÍFICO', institution: '', year: new Date().getFullYear().toString(), resume: '', content: '', image: '', link: '', isFeatured: false });
      } else if (editingReserva && key === 'reservas') {
        await updateItem('reservas', editingReserva.id, formData);
        setEditingReserva(null);
        setReservaForm({ title: '', category: 'HOTEL', location: '', description: '', image: '', link: '' });
      } else {
        await addItem(key, formData);
      }
      resetForm();
    } catch (err) {
      console.error(`Error saving ${key}:`, err);
      alert("Erro ao salvar. Verifique o console.");
    }
  };

  const handleEdit = (key, item) => {
    if (key === 'news') {
      setEditingNews(item);
      // Properly handle images array - convert old single image to array format if needed
      const initialImages = item.images && item.images.length > 0
        ? item.images
        : (item.image ? [{ url: item.image, caption: '' }] : []);

      setNewsForm({
        ...item,
        authorId: item.author_id || item.authorId || '',
        images: initialImages
      });
    } else if (key === 'eventos') {
      setEditingEvento(item);
      setEventForm(item);
    } else if (key === 'leituras') {
      setEditingLeitura(item);
      setLeituraForm(item);
    } else if (key === 'contacts') {
      setEditingContact(item);
      setContactForm(item);
    } else if (key === 'concursos') {
      setEditingConcurso(item);
      setConcursoForm(item);
    } else if (key === 'instituicoes') {
      setEditingInstituicao(item);
      setInstituicaoForm(item);
    } else if (key === 'equipamentos') {
      setEditingEquipamento(item);
      setEquipamentoForm(item);
    } else if (key === 'vagas') {
      setEditingVaga(item);
      setVagaForm(item);
    } else if (key === 'academico') {
      setEditingAcademico(item);
      setAcademicoForm(item);
    } else if (key === 'reservas') {
      setEditingReserva(item);
      setReservaForm(item);
    }
  };

  const handleEditEditor = (editor) => {
    setEditingEditor(editor);
    setEditorForm({ ...editor, password: '' });
  };

  const handleCancelEdit = () => {
    setEditingNews(null);
    setNewsForm({ title: '', category: 'JUDICIÁRIO', content: '', citation: '', author: '', authorId: '', image: '', images: [] });
  };

  const handleCancelEditEditor = () => {
    setEditingEditor(null);
    setEditorForm({ name: '', role: '', bio: '', avatar: '', username: '', password: '' });
  };

  const handleCancelEditUniversal = (key) => {
    if (key === 'eventos') { setEditingEvento(null); setEventForm({ title: '', date: '', location: '', description: '', type: 'PRESENCIAL', link: '', image: '' }); }
    if (key === 'leituras') { setEditingLeitura(null); setLeituraForm({ title: '', author: '', type: 'LIVRO', category: 'GERAL', synopsis: '', cover: '', link: '#' }); }
    if (key === 'contacts') { setEditingContact(null); setContactForm({ comarca: '', setor: '', telefone: '' }); }
    if (key === 'concursos') { setEditingConcurso(null); setConcursoForm({ entidade: '', cargo: '', vagas: '', remuneracao: '', status: 'Inscrições Abertas', nivel: 'MUNICIPAL' }); }
    if (key === 'instituicoes') { setEditingInstituicao(null); setInstituicaoForm({ name: '', type: 'OAB', city: '', image: '', description: '', history: '', link: '' }); }
    if (key === 'equipamentos') { setEditingEquipamento(null); setEquipamentoForm({ title: '', category: 'ACESSÓRIOS', description: '', price: '', link: '', image: '' }); }
    if (key === 'vagas') { setEditingVaga(null); setVagaForm({ title: '', company: '', type: 'CLT', location: '', link: '', description: '' }); }
    if (key === 'academico') { setEditingAcademico(null); setAcademicoForm({ title: '', author: '', type: 'ARTIGO CIENTÍFICO', institution: '', year: new Date().getFullYear().toString(), resume: '', content: '', image: '', link: '', isFeatured: false }); }
    if (key === 'reservas') { setEditingReserva(null); setReservaForm({ title: '', category: 'HOTEL', location: '', description: '', image: '', link: '' }); }
  };

  const handleAuthorUpdate = (itemId, newAuthorId) => {
    const selectedEditor = editors?.find(ed => ed.id == newAuthorId);
    if (selectedEditor) {
      updateItem('news', itemId, { author_id: newAuthorId, author: selectedEditor?.name || 'Desconhecido' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="admin-container"
    >
      {isMaintenanceMode && (
        <div style={{
          backgroundColor: '#ff4d4f',
          color: 'white',
          padding: '0.75rem',
          textAlign: 'center',
          fontWeight: 'bold',
          borderRadius: '8px',
          marginBottom: '1rem',
          boxShadow: '0 4px 12px rgba(255, 77, 79, 0.3)'
        }}>
          ⚠️ MODO MANUTENÇÃO ATIVO: As alterações estão bloqueadas para proteção dos dados.
        </div>
      )}
      <div className="admin-header">
        <div className="admin-title">
          <h2>Painel de Gestão ({userRole === 'admin' ? 'Administrador' : 'Redator'})</h2>
          <nav className="admin-nav-tabs">
            <button className={activeAdminTab === 'news' ? 'active' : ''} onClick={() => setActiveAdminTab('news')}><Newspaper size={16} /> Notícias</button>
            {userRole === 'admin' && (
              <>
                <button className={activeAdminTab === 'eventos' ? 'active' : ''} onClick={() => setActiveAdminTab('eventos')}><Calendar size={16} /> Eventos</button>
                <button className={activeAdminTab === 'editors' ? 'active' : ''} onClick={() => setActiveAdminTab('editors')}><User size={16} /> Redação</button>
                <button className={activeAdminTab === 'instituicoes' ? 'active' : ''} onClick={() => setActiveAdminTab('instituicoes')}><Building size={16} /> Instituições</button>
                <button className={activeAdminTab === 'equipamentos' ? 'active' : ''} onClick={() => setActiveAdminTab('equipamentos')}><Briefcase size={16} /> Escritório</button>
                <button className={activeAdminTab === 'concursos' ? 'active' : ''} onClick={() => setActiveAdminTab('concursos')}><GraduationCap size={16} /> Concursos</button>
                <button className={activeAdminTab === 'vagas' ? 'active' : ''} onClick={() => setActiveAdminTab('vagas')}><Briefcase size={16} /> Vagas</button>
                <button className={activeAdminTab === 'academico' ? 'active' : ''} onClick={() => setActiveAdminTab('academico')}><BookOpen size={16} /> Acadêmico</button>
                <button className={activeAdminTab === 'leituras' ? 'active' : ''} onClick={() => setActiveAdminTab('leituras')}><BookOpen size={16} /> Indicações</button>
                <button className={activeAdminTab === 'contacts' ? 'active' : ''} onClick={() => setActiveAdminTab('contacts')}><Phone size={16} /> Contatos</button>
                <button className={activeAdminTab === 'comments' ? 'active' : ''} onClick={() => setActiveAdminTab('comments')}><MessageSquare size={16} /> Comentários</button>
                <button className={activeAdminTab === 'reservas' ? 'active' : ''} onClick={() => setActiveAdminTab('reservas')}><MapPin size={16} /> Reservas</button>
              </>
            )}
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
            <form onSubmit={(e) => {
              e.preventDefault();
              // Compatibility: Set the first image as the main 'image' for backward compatibility
              const mainImage = newsForm.images?.length > 0 ? newsForm.images[0].url : '';
              const payload = { ...newsForm, image: mainImage, images: newsForm.images };

              handleAdd('news', payload, () => setNewsForm({ title: '', category: 'JUDICIÁRIO', content: '', citation: '', author: '', authorId: '', image: '', images: [] }));
            }} className="news-form">
              <h3>{editingNews ? 'Editar Notícia' : 'Publicar Notícia'}</h3>
              {editingNews && (
                <div style={{ background: '#fff3cd', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                  ✏️ Editando: <strong>{editingNews.title}</strong>
                  <button type="button" onClick={handleCancelEdit} style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Cancelar</button>
                </div>
              )}
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

              {/* IMAGES SECTION */}
              <div className="form-group" style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '4px', border: '1px solid #eee' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  Galeria de Imagens (Máx 5)
                  {(!newsForm.images || newsForm.images.length < 5) && (
                    <button type="button" onClick={() => {
                      const newImages = [...(newsForm.images || []), { url: '', caption: '' }];
                      setNewsForm({ ...newsForm, images: newImages });
                    }} style={{ background: '#27ae60', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                  )}
                </label>

                {(!newsForm.images || newsForm.images.length === 0) && <p style={{ fontSize: '0.8rem', color: '#999', fontStyle: 'italic' }}>Nenhuma imagem adicionada.</p>}

                {(newsForm.images || []).map((img, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <input
                        type="text"
                        placeholder="URL da Imagem..."
                        value={img.url}
                        onChange={(e) => {
                          const newImages = [...newsForm.images];
                          newImages[idx].url = e.target.value;
                          setNewsForm({ ...newsForm, images: newImages });
                        }}
                        style={{ marginBottom: '0.2rem' }}
                      />
                      <input
                        type="text"
                        placeholder="Legenda da foto..."
                        value={img.caption}
                        onChange={(e) => {
                          const newImages = [...newsForm.images];
                          newImages[idx].caption = e.target.value;
                          setNewsForm({ ...newsForm, images: newImages });
                        }}
                        style={{ fontSize: '0.8rem', padding: '0.4rem' }}
                      />
                    </div>
                    <button type="button" onClick={() => {
                      const newImages = newsForm.images.filter((_, i) => i !== idx);
                      setNewsForm({ ...newsForm, images: newImages });
                    }} style={{ background: '#c0392b', color: 'white', border: 'none', padding: '0.5rem', cursor: 'pointer', height: '100%', borderRadius: '4px' }} title="Remover"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>

              <div className="form-group"><label>Fonte/Referência (Opcional)</label><textarea rows="3" value={newsForm.citation} onChange={e => setNewsForm({ ...newsForm, citation: e.target.value })} placeholder="Ex: Lei nº 1234/2024, Art. 5º"></textarea></div>
              <div className="form-group">
                <label>Conteúdo</label>
                <FullEditor
                  value={newsForm.content}
                  onChange={(value) => setNewsForm({ ...newsForm, content: value })}
                />
              </div>
              <button type="submit" className="submit-btn"><PlusCircle size={18} /> {editingNews ? 'Salvar Alterações' : 'Publicar'}</button>
            </form>
          )}

          {activeAdminTab === 'editors' && userRole === 'admin' && (
            <form onSubmit={(e) => { e.preventDefault(); handleAdd('editors', editorForm, () => setEditorForm({ name: '', role: '', bio: '', avatar: '', username: '', password: '' })); }} className="news-form">
              <h3>{editingEditor ? 'Editar Redator/Colunista' : 'Novo Redator / Colunista'}</h3>
              {editingEditor && (
                <div style={{ background: '#fff3cd', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                  ✏️ Editando: <strong>{editingEditor.name}</strong>
                  <button type="button" onClick={handleCancelEditEditor} style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Cancelar</button>
                </div>
              )}

              <div className="form-row" style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ color: '#2c3e50' }}>Login de Acesso</label>
                  <input type="text" value={editorForm.username} onChange={e => setEditorForm({ ...editorForm, username: e.target.value })} placeholder="Ex: joao.silva" required={!editingEditor} style={{ borderColor: '#3498db' }} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ color: '#2c3e50' }}>Senha de Acesso {editingEditor && '(deixe vazio para manter)'}</label>
                  <input type="text" value={editorForm.password} onChange={e => setEditorForm({ ...editorForm, password: e.target.value })} placeholder={editingEditor ? "Nova senha (opcional)" : "******"} required={!editingEditor} style={{ borderColor: '#3498db' }} />
                </div>
              </div>

              <div className="form-group"><label>Nome Completo</label><input type="text" value={editorForm.name} onChange={e => setEditorForm({ ...editorForm, name: e.target.value })} required /></div>
              <div className="form-group"><label>Cargo / Profissão</label><input type="text" value={editorForm.role} onChange={e => setEditorForm({ ...editorForm, role: e.target.value })} placeholder="Ex: Advogado, Redator Chefe" required /></div>
              <div className="form-group"><label>URL da Foto (Avatar)</label><input type="text" value={editorForm.avatar} onChange={e => setEditorForm({ ...editorForm, avatar: e.target.value })} placeholder="https://..." /></div>
              <div className="form-group"><label>Minibio (Sobre o Autor)</label><textarea rows="4" value={editorForm.bio} onChange={e => setEditorForm({ ...editorForm, bio: e.target.value })} placeholder="Apaixonado por escrever..." required></textarea></div>
              <button type="submit" className="submit-btn"><PlusCircle size={18} /> {editingEditor ? 'Salvar Alterações' : 'Adicionar Redator'}</button>
            </form>
          )}

          {activeAdminTab === 'eventos' && (
            <div className="admin-section">
              <h3>{editingEvento ? 'Editar Evento' : 'Adicionar Evento'}</h3>
              {editingEvento && (
                <div style={{ background: '#fff3cd', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                  ✏️ Editando: <strong>{editingEvento.title}</strong>
                  <button type="button" onClick={() => handleCancelEditUniversal('eventos')} style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Cancelar</button>
                </div>
              )}
              <form onSubmit={async (e) => { e.preventDefault(); await handleAdd('eventos', eventForm, () => setEventForm({ title: '', date: '', location: '', description: '', type: 'PRESENCIAL', link: '', image: '' })); }}>
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
                <div className="form-group">
                  <input type="text" placeholder="URL da Imagem (opcional)" value={eventForm.image} onChange={e => setEventForm({ ...eventForm, image: e.target.value })} />
                </div>
                <textarea placeholder="Descrição" value={eventForm.description} onChange={e => setEventForm({ ...eventForm, description: e.target.value })} required className="full-width"></textarea>
                <button type="submit" className="submit-btn"><PlusCircle size={18} /> {editingEvento ? 'Salvar Alterações' : 'Publicar Evento'}</button>
              </form>
            </div>
          )}

          {activeAdminTab === 'leituras' && (
            <form onSubmit={(e) => { e.preventDefault(); handleAdd('leituras', leituraForm, () => setLeituraForm({ title: '', author: '', type: 'LIVRO', category: 'GERAL', synopsis: '', cover: '', link: '#' })); }} className="news-form">
              <h3>{editingLeitura ? 'Editar Indicação' : 'Nova Indicação de Leitura'}</h3>
              {editingLeitura && (
                <div style={{ background: '#fff3cd', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                  ✏️ Editando: <strong>{editingLeitura.title}</strong>
                  <button type="button" onClick={() => handleCancelEditUniversal('leituras')} style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Cancelar</button>
                </div>
              )}
              <div className="form-group"><label>Título da Obra</label><input type="text" value={leituraForm.title} onChange={e => setLeituraForm({ ...leituraForm, title: e.target.value })} required /></div>
              <div className="form-row">
                <div className="form-group"><label>Autor</label><input type="text" value={leituraForm.author} onChange={e => setLeituraForm({ ...leituraForm, author: e.target.value })} required /></div>
                <div className="form-group"><label>Categoria</label><input type="text" value={leituraForm.category} onChange={e => setLeituraForm({ ...leituraForm, category: e.target.value })} placeholder="Ex: Filo do Direito" /></div>
              </div>
              <div className="form-group"><label>URL da Capa</label><input type="text" value={leituraForm.cover} onChange={e => setLeituraForm({ ...leituraForm, cover: e.target.value })} placeholder="http://..." /></div>
              <div className="form-group"><label>Sinopse</label><textarea rows="6" value={leituraForm.synopsis} onChange={e => setLeituraForm({ ...leituraForm, synopsis: e.target.value })} required></textarea></div>
              <button type="submit" className="submit-btn"><PlusCircle size={18} /> {editingLeitura ? 'Salvar Alterações' : 'Adicionar Indicação'}</button>
            </form>
          )}

          {activeAdminTab === 'contacts' && (
            <form onSubmit={(e) => { e.preventDefault(); handleAdd('contacts', contactForm, () => setContactForm({ comarca: '', setor: '', telefone: '' })); }} className="news-form">
              <h3>{editingContact ? 'Editar Contato' : 'Novo Contato Útil'}</h3>
              {editingContact && (
                <div style={{ background: '#fff3cd', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                  ✏️ Editando: <strong>{editingContact.setor}</strong>
                  <button type="button" onClick={() => handleCancelEditUniversal('contacts')} style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Cancelar</button>
                </div>
              )}
              <div className="form-group"><label>Comarca</label><input type="text" value={contactForm.comarca} onChange={e => setContactForm({ ...contactForm, comarca: e.target.value })} required /></div>
              <div className="form-group"><label>Setor / Órgão</label><input type="text" value={contactForm.setor} onChange={e => setContactForm({ ...contactForm, setor: e.target.value })} required /></div>
              <div className="form-group"><label>Telefone</label><input type="text" value={contactForm.telefone} onChange={e => setContactForm({ ...contactForm, telefone: e.target.value })} required /></div>
              <button type="submit" className="submit-btn"><PlusCircle size={18} /> {editingContact ? 'Salvar Alterações' : 'Salvar Contato'}</button>
            </form>
          )}

          {activeAdminTab === 'concursos' && (
            <form onSubmit={(e) => { e.preventDefault(); handleAdd('concursos', concursoForm, () => setConcursoForm({ entidade: '', cargo: '', vagas: '', remuneracao: '', status: 'Inscrições Abertas', nivel: 'MUNICIPAL' })); }} className="news-form">
              <h3>{editingConcurso ? 'Editar Concurso' : 'Novo Concurso'}</h3>
              {editingConcurso && (
                <div style={{ background: '#fff3cd', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                  ✏️ Editando: <strong>{editingConcurso.cargo}</strong>
                  <button type="button" onClick={() => handleCancelEditUniversal('concursos')} style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Cancelar</button>
                </div>
              )}
              <div className="form-group"><label>Entidade</label><input type="text" value={concursoForm.entidade} onChange={e => setConcursoForm({ ...concursoForm, entidade: e.target.value })} required /></div>
              <div className="form-group"><label>Cargo</label><input type="text" value={concursoForm.cargo} onChange={e => setConcursoForm({ ...concursoForm, cargo: e.target.value })} required /></div>
              <div className="form-row">
                <div className="form-group"><label>Nível</label><select value={concursoForm.nivel} onChange={e => setConcursoForm({ ...concursoForm, nivel: e.target.value })}><option value="MUNICIPAL">MUNICIPAL</option><option value="ESTADUAL">ESTADUAL</option><option value="FEDERAL">FEDERAL</option></select></div>
                <div className="form-group"><label>Remuneração</label><input type="text" value={concursoForm.remuneracao} onChange={e => setConcursoForm({ ...concursoForm, remuneracao: e.target.value })} /></div>
              </div>
              <button type="submit" className="submit-btn"><PlusCircle size={18} /> {editingConcurso ? 'Salvar Alterações' : 'Adicionar'}</button>
            </form>
          )}

          {activeAdminTab === 'instituicoes' && userRole === 'admin' && (
            <form onSubmit={(e) => { e.preventDefault(); handleAdd('instituicoes', instituicaoForm, () => setInstituicaoForm({ name: '', type: 'OAB', city: '', image: '', description: '', history: '', link: '' })); }} className="news-form">
              <h3>{editingInstituicao ? 'Editar Instituição' : 'Nova Instituição / OAB'}</h3>
              {editingInstituicao && (
                <div style={{ background: '#fff3cd', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                  ✏️ Editando: <strong>{editingInstituicao.name}</strong>
                  <button type="button" onClick={() => handleCancelEditUniversal('instituicoes')} style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Cancelar</button>
                </div>
              )}
              <div className="form-group"><label>Nome / Subseção</label><input type="text" value={instituicaoForm.name} onChange={e => setInstituicaoForm({ ...instituicaoForm, name: e.target.value })} placeholder="Ex: OAB - 175ª Subseção" required /></div>
              <div className="form-row">
                <div className="form-group"><label>Cidade</label><input type="text" value={instituicaoForm.city} onChange={e => setInstituicaoForm({ ...instituicaoForm, city: e.target.value })} required /></div>
                <div className="form-group"><label>Tipo</label><select value={instituicaoForm.type} onChange={e => setInstituicaoForm({ ...instituicaoForm, type: e.target.value })}><option value="OAB">OAB</option><option value="FACULDADE">FACULDADE</option></select></div>
              </div>
              <div className="form-group"><label>URL da Imagem (Capa)</label><input type="text" value={instituicaoForm.image} onChange={e => setInstituicaoForm({ ...instituicaoForm, image: e.target.value })} placeholder="https://..." /></div>
              <div className="form-group"><label>Descrição Curta</label><textarea rows="2" value={instituicaoForm.description} onChange={e => setInstituicaoForm({ ...instituicaoForm, description: e.target.value })} placeholder="Resumo para o card..."></textarea></div>
              <div className="form-group">
                <label>Histórico Completo (Rich Text)</label>
                <FullEditor
                  value={instituicaoForm.history}
                  onChange={(value) => setInstituicaoForm({ ...instituicaoForm, history: value })}
                />
              </div>
              <button type="submit" className="submit-btn"><PlusCircle size={18} /> {editingInstituicao ? 'Salvar Alterações' : 'Adicionar Instituição'}</button>
            </form>
          )}

          {activeAdminTab === 'equipamentos' && userRole === 'admin' && (
            <form onSubmit={(e) => { e.preventDefault(); handleAdd('equipamentos', equipamentoForm, () => setEquipamentoForm({ title: '', category: 'ACESSÓRIOS', description: '', price: '', link: '', image: '' })); }} className="news-form">
              <h3>{editingEquipamento ? 'Editar Item de Escritório' : 'Novo Item / Equipamento'}</h3>
              {editingEquipamento && (
                <div style={{ background: '#fff3cd', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                  ✏️ Editando: <strong>{editingEquipamento.title}</strong>
                  <button type="button" onClick={() => handleCancelEditUniversal('equipamentos')} style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Cancelar</button>
                </div>
              )}
              <div className="form-group"><label>Título do Item</label><input type="text" value={equipamentoForm.title} onChange={e => setEquipamentoForm({ ...equipamentoForm, title: e.target.value })} required /></div>
              <div className="form-row">
                <div className="form-group"><label>Categoria</label><select value={equipamentoForm.category} onChange={e => setEquipamentoForm({ ...equipamentoForm, category: e.target.value })}><option value="CADEIRAS">CADEIRAS</option><option value="ELETRÔNICOS">ELETRÔNICOS</option><option value="LIVROS">LIVROS</option><option value="ACESSÓRIOS">ACESSÓRIOS</option><option value="SOFTWARE">SOFTWARE</option></select></div>
                <div className="form-group"><label>Preço Estimado</label><input type="text" value={equipamentoForm.price} onChange={e => setEquipamentoForm({ ...equipamentoForm, price: e.target.value })} placeholder="R$ 0,00" /></div>
              </div>
              <div className="form-group"><label>URL da Imagem</label><input type="text" value={equipamentoForm.image} onChange={e => setEquipamentoForm({ ...equipamentoForm, image: e.target.value })} placeholder="https://..." /></div>
              <div className="form-group"><label>Link (Onde encontrar/comprar)</label><input type="text" value={equipamentoForm.link} onChange={e => setEquipamentoForm({ ...equipamentoForm, link: e.target.value })} placeholder="https://..." /></div>
              <div className="form-group"><label>Descrição / Por que indicamos?</label><textarea rows="3" value={equipamentoForm.description} onChange={e => setEquipamentoForm({ ...equipamentoForm, description: e.target.value })} required></textarea></div>
              <button type="submit" className="submit-btn"><PlusCircle size={18} /> {editingEquipamento ? 'Salvar Alterações' : 'Adicionar Item'}</button>
            </form>
          )}

          {activeAdminTab === 'vagas' && userRole === 'admin' && (
            <form onSubmit={(e) => { e.preventDefault(); handleAdd('vagas', vagaForm, () => setVagaForm({ title: '', company: '', type: 'CLT', location: '', link: '', description: '' })); }} className="news-form">
              <h3>{editingVaga ? 'Editar Vaga Jurídica' : 'Nova Vaga Jurídica'}</h3>
              {editingVaga && (
                <div style={{ background: '#fff3cd', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                  ✏️ Editando: <strong>{editingVaga.title}</strong>
                  <button type="button" onClick={() => handleCancelEditUniversal('vagas')} style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Cancelar</button>
                </div>
              )}
              <div className="form-group"><label>Título da Vaga / Cargo</label><input type="text" value={vagaForm.title} onChange={e => setVagaForm({ ...vagaForm, title: e.target.value })} required /></div>
              <div className="form-row">
                <div className="form-group"><label>Empresa / Escritório</label><input type="text" value={vagaForm.company} onChange={e => setVagaForm({ ...vagaForm, company: e.target.value })} required /></div>
                <div className="form-group"><label>Tipo de Contrato</label><select value={vagaForm.type} onChange={e => setVagaForm({ ...vagaForm, type: e.target.value })}><option value="CLT">CLT</option><option value="PJ">PJ</option><option value="ESTÁGIO">ESTÁGIO</option><option value="ASSOCIADO">ASSOCIADO</option><option value="CORRESPONDENTE">CORRESPONDENTE</option></select></div>
              </div>
              <div className="form-group"><label>Localização (Cidade/Remoto)</label><input type="text" value={vagaForm.location} onChange={e => setVagaForm({ ...vagaForm, location: e.target.value })} required /></div>
              <div className="form-group"><label>Link Original (Opcional)</label><input type="text" value={vagaForm.link} onChange={e => setVagaForm({ ...vagaForm, link: e.target.value })} placeholder="https://..." /></div>
              <div className="form-group"><label>Descrição / Requisitos</label><textarea rows="4" value={vagaForm.description} onChange={e => setVagaForm({ ...vagaForm, description: e.target.value })} required></textarea></div>
              <button type="submit" className="submit-btn"><PlusCircle size={18} /> {editingVaga ? 'Salvar Alterações' : 'Postar Vaga'}</button>
            </form>
          )}

          {activeAdminTab === 'academico' && userRole === 'admin' && (
            <form onSubmit={(e) => { e.preventDefault(); handleAdd('academico', academicoForm, () => setAcademicoForm({ title: '', author: '', type: 'ARTIGO CIENTÍFICO', institution: '', year: new Date().getFullYear().toString(), resume: '', content: '', image: '', link: '', isFeatured: false })); }} className="news-form">
              <h3>{editingAcademico ? 'Editar Produção Acadêmica' : 'Nova Produção Acadêmica'}</h3>
              {editingAcademico && (
                <div style={{ background: '#fff3cd', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                  ✏️ Editando: <strong>{editingAcademico.title}</strong>
                  <button type="button" onClick={() => handleCancelEditUniversal('academico')} style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Cancelar</button>
                </div>
              )}
              <div className="form-group"><label>Título</label><input type="text" value={academicoForm.title} onChange={e => setAcademicoForm({ ...academicoForm, title: e.target.value })} required /></div>
              <div className="form-row">
                <div className="form-group"><label>Autor</label><input type="text" value={academicoForm.author} onChange={e => setAcademicoForm({ ...academicoForm, author: e.target.value })} required /></div>
                <div className="form-group"><label>Tipo</label><select value={academicoForm.type} onChange={e => setAcademicoForm({ ...academicoForm, type: e.target.value })}><option value="ARTIGO CIENTÍFICO">ARTIGO CIENTÍFICO</option><option value="TCC/TESE">TCC/TESE</option><option value="RESENHA">RESENHA</option><option value="LIVRO">LIVRO</option></select></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>Instituição</label><input type="text" value={academicoForm.institution} onChange={e => setAcademicoForm({ ...academicoForm, institution: e.target.value })} /></div>
                <div className="form-group"><label>Ano</label><input type="text" value={academicoForm.year} onChange={e => setAcademicoForm({ ...academicoForm, year: e.target.value })} /></div>
              </div>
              <div className="form-group"><label>URL da Imagem (Capa/Destaque)</label><input type="text" value={academicoForm.image} onChange={e => setAcademicoForm({ ...academicoForm, image: e.target.value })} placeholder="https://..." /></div>
              <div className="form-group"><label>Resumo / Descrição Curta</label><textarea rows="3" value={academicoForm.resume} onChange={e => setAcademicoForm({ ...academicoForm, resume: e.target.value })} required></textarea></div>
              <div className="form-group">
                <label>Conteúdo Completo (HTML para Modal)</label>
                <FullEditor
                  value={academicoForm.content}
                  onChange={(val) => setAcademicoForm({ ...academicoForm, content: val })}
                />
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" checked={academicoForm.isFeatured} onChange={e => setAcademicoForm({ ...academicoForm, isFeatured: e.target.checked })} id="isFeatured" style={{ width: 'auto' }} />
                <label htmlFor="isFeatured" style={{ margin: 0 }}>Colocar em Destaque (Destaque do Editor)</label>
              </div>
              <button type="submit" className="submit-btn"><PlusCircle size={18} /> {editingAcademico ? 'Salvar Alterações' : 'Publicar'}</button>
            </form>
          )}

          {activeAdminTab === 'reservas' && userRole === 'admin' && (
            <form onSubmit={(e) => { e.preventDefault(); handleAdd('reservas', reservaForm, () => setReservaForm({ title: '', category: 'HOTEL', location: '', description: '', image: '', link: '' })); }} className="news-form">
              <h3>{editingReserva ? 'Editar Reserva / Recomendação' : 'Nova Recomendação (Hotéis/Roteiros)'}</h3>
              {editingReserva && (
                <div style={{ background: '#fff3cd', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                  ✏️ Editando: <strong>{editingReserva.title}</strong>
                  <button type="button" onClick={() => handleCancelEditUniversal('reservas')} style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Cancelar</button>
                </div>
              )}
              <div className="form-group"><label>Título / Nome</label><input type="text" value={reservaForm.title} onChange={e => setReservaForm({ ...reservaForm, title: e.target.value })} placeholder="Ex: Hotel Grand Vale, Roteiro Caverna do Diabo" required /></div>
              <div className="form-row">
                <div className="form-group"><label>Categoria</label><select value={reservaForm.category} onChange={e => setReservaForm({ ...reservaForm, category: e.target.value })}><option value="HOTEL">HOSPEDAGEM (HOTEL)</option><option value="RESTAURANTE">GASTRONOMIA (RESTAURANTE)</option><option value="TURISMO">TURISMO REGIONAL</option><option value="CAFÉ/BISTRÔ">CAFÉ / BISTRÔ</option></select></div>
                <div className="form-group"><label>Localização (Cidade/Bairro)</label><input type="text" value={reservaForm.location} onChange={e => setReservaForm({ ...reservaForm, location: e.target.value })} required /></div>
              </div>
              <div className="form-group"><label>URL da Imagem</label><input type="text" value={reservaForm.image} onChange={e => setReservaForm({ ...reservaForm, image: e.target.value })} placeholder="https://..." /></div>
              <div className="form-group"><label>Link (Site/Reserva)</label><input type="text" value={reservaForm.link} onChange={e => setReservaForm({ ...reservaForm, link: e.target.value })} placeholder="https://..." /></div>
              <div className="form-group"><label>Descrição / Detalhes</label><textarea rows="4" value={reservaForm.description} onChange={e => setReservaForm({ ...reservaForm, description: e.target.value })} required></textarea></div>
              <button type="submit" className="submit-btn"><PlusCircle size={18} /> {editingReserva ? 'Salvar Alterações' : 'Adicionar Recomendação'}</button>
            </form>
          )}

          {activeAdminTab === 'system' && userRole === 'admin' && (
            <div className="admin-section">
              <h3>Configurações do Sistema</h3>
              <div className="system-card" style={{ padding: '2rem', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
                {/* ... System config content ... */}
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

        </section>

        <section className="manage-list">
          <div className="manage-header">
            <h3>Gerenciar {activeAdminTab === 'news' ? 'Notícias' : activeAdminTab}</h3>
            <span className="item-count">{(data[activeAdminTab] || []).length} {activeAdminTab === 'news' ? 'notícias' : 'itens'}</span>
          </div>

          {/* FILTROS MODERNOS - Apenas para notícias */}
          {activeAdminTab === 'news' && (
            <div className="filters-section">
              <div className="filter-group">
                <label>🔍 Buscar</label>
                <input
                  type="text"
                  placeholder="Digite o título da notícia..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
              <div className="filter-group">
                <label>📂 Categoria</label>
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="filter-select">
                  <option value="TODAS">Todas as categorias</option>
                  {newsCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>✍️ Autor</label>
                <select value={filterAuthor} onChange={(e) => setFilterAuthor(e.target.value)} className="filter-select">
                  <option value="TODOS">Todos os autores</option>
                  {editors?.map(ed => <option key={ed.id} value={ed.id}>{ed.name}</option>)}
                </select>
              </div>
              {(searchQuery || filterCategory !== 'TODAS' || filterAuthor !== 'TODOS') && (
                <button className="clear-filters" onClick={() => { setSearchQuery(''); setFilterCategory('TODAS'); setFilterAuthor('TODOS'); }}>
                  ✖ Limpar filtros
                </button>
              )}
            </div>
          )}

          <div className="items-list-admin">
            {(data[activeAdminTab] || [])
              .filter(item => {
                // Apply filters only for news
                if (activeAdminTab !== 'news') return true;

                const matchesSearch = !searchQuery ||
                  (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase()));

                const matchesCategory = filterCategory === 'TODAS' || item.category === filterCategory;

                const matchesAuthor = filterAuthor === 'TODOS' ||
                  String(item.author_id) === String(filterAuthor) ||
                  String(item.authorId) === String(filterAuthor);

                return matchesSearch && matchesCategory && matchesAuthor;
              })
              .sort((a, b) => {
                // Sort by created_at if available, otherwise by id
                const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
                const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
                return dateB - dateA; // Newest first
              })
              .map(item => (
                <div key={item?.id || Math.random()} className="admin-item-card">
                  {/* Image Thumbnail with overlay */}
                  {(item.image || item.cover || item.avatar) && (
                    <div className="item-thumb-modern">
                      <img src={item.image || item.cover || item.avatar} alt="thumb" onError={(e) => e.target.style.display = 'none'} />
                      <div className="thumb-overlay"></div>
                    </div>
                  )}

                  <div className="item-content">
                    <div className="item-meta">
                      <span className="category-badge">{item?.category || item?.role || item?.tribunal || item?.type || item?.comarca || item?.user_name}</span>
                      {activeAdminTab === 'news' && item?.created_at && (
                        <span className="date-badge">
                          📅 {new Date(item.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                        </span>
                      )}
                    </div>

                    <h4 className="item-title">{item?.title || item?.name || item?.processo || item?.cargo || item?.setor || item?.username || (item?.content && item.content.length > 50 ? item.content.substring(0, 50) + '...' : item?.content)}</h4>

                    {/* Author Editing for Admins */}
                    {userRole === 'admin' && activeAdminTab === 'news' && (
                      <div className="author-edit-inline">
                        <label>Autor:</label>
                        <select
                          value={item.author_id || item.authorId || ''}
                          onChange={(e) => handleAuthorUpdate(item.id, e.target.value)}
                          className="author-select-modern"
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
                      <span className="author-display">✍️ {item.author}</span>
                    )}

                    {/* Show Username for editors in list */}
                    {activeAdminTab === 'editors' && item.username && (
                      <span className="username-display">👤 Login: {item.username}</span>
                    )}
                  </div>

                  <div className="item-actions">
                    {/* Edit buttons for all content types (admin only) */}
                    {activeAdminTab === 'editors' && userRole === 'admin' && (
                      <button onClick={() => handleEditEditor(item)} className="edit-btn-modern" title="Editar">
                        ✏️ Editar
                      </button>
                    )}
                    {activeAdminTab === 'eventos' && userRole === 'admin' && (
                      <button onClick={() => handleEdit('eventos', item)} className="edit-btn-modern" title="Editar">
                        ✏️ Editar
                      </button>
                    )}
                    {activeAdminTab === 'leituras' && userRole === 'admin' && (
                      <button onClick={() => handleEdit('leituras', item)} className="edit-btn-modern" title="Editar">
                        ✏️ Editar
                      </button>
                    )}
                    {activeAdminTab === 'contacts' && userRole === 'admin' && (
                      <button onClick={() => handleEdit('contacts', item)} className="edit-btn-modern" title="Editar">
                        ✏️ Editar
                      </button>
                    )}
                    {activeAdminTab === 'concursos' && userRole === 'admin' && (
                      <button onClick={() => handleEdit('concursos', item)} className="edit-btn-modern" title="Editar">
                        ✏️ Editar
                      </button>
                    )}
                    {activeAdminTab === 'instituicoes' && userRole === 'admin' && (
                      <button onClick={() => handleEdit('instituicoes', item)} className="edit-btn-modern" title="Editar">
                        ✏️ Editar
                      </button>
                    )}
                    {activeAdminTab === 'equipamentos' && userRole === 'admin' && (
                      <button onClick={() => handleEdit('equipamentos', item)} className="edit-btn-modern" title="Editar">
                        ✏️ Editar
                      </button>
                    )}
                    {activeAdminTab === 'vagas' && userRole === 'admin' && (
                      <button onClick={() => handleEdit('vagas', item)} className="edit-btn-modern" title="Editar">
                        ✏️ Editar
                      </button>
                    )}
                    {activeAdminTab === 'academico' && userRole === 'admin' && (
                      <button onClick={() => handleEdit('academico', item)} className="edit-btn-modern" title="Editar">
                        ✏️ Editar
                      </button>
                    )}
                    {activeAdminTab === 'reservas' && userRole === 'admin' && (
                      <button onClick={() => handleEdit('reservas', item)} className="edit-btn-modern" title="Editar">
                        ✏️ Editar
                      </button>
                    )}
                    {/* Edit button for news (admin or own article) */}
                    {activeAdminTab === 'news' && (userRole === 'admin' || item.author_id === data.currentUserId) && (
                      <button onClick={() => handleEdit('news', item)} className="edit-btn-modern" title="Editar">
                        ✏️ Editar
                      </button>
                    )}
                    {userRole === 'admin' && (
                      <button onClick={() => deleteItem(activeAdminTab, item.id)} className="del-btn-modern" title="Excluir">
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div >

      <style jsx>{`
        /* CONTAINER E HEADER MODERNOS */
        .admin-container { 
          background: linear-gradient(135deg, #f5f7fa 0%, #fafbfc 100%); 
          padding: 3rem; 
          border-radius: 24px;
          box-shadow: 0 20px 80px rgba(0,0,0,0.1);
          min-height: 90vh;
        }
        
        .admin-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: flex-start; 
          background: white;
          padding: 2rem;
          border-radius: 16px;
          margin-bottom: 2rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        
        .admin-title h2 {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .admin-nav-tabs { 
          display: flex; 
          gap: 0.75rem; 
          margin-top: 1rem; 
          flex-wrap: wrap; 
        }
        
        .admin-nav-tabs button { 
          background: white; 
          border: 2px solid #e0e0e0; 
          padding: 0.75rem 1.25rem; 
          font-family: var(--font-sans); 
          font-size: 0.85rem; 
          font-weight: 700; 
          cursor: pointer; 
          display: flex; 
          align-items: center; 
          gap: 0.5rem;
          border-radius: 12px;
          transition: all 0.3s ease;
          color: #333;
        }
        
        .admin-nav-tabs button:hover { 
          border-color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        }
        
        .admin-nav-tabs button.active { 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white; 
          border-color: transparent;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
        
        .close-btn {
          background: #ff4757;
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .close-btn:hover {
          transform: rotate(90deg);
          box-shadow: 0 4px 12px rgba(255, 71, 87, 0.4);
        }
        
        /* GRID MODERNO */
        .admin-grid { 
          display: grid; 
          grid-template-columns: 1.2fr 1fr; 
          gap: 2rem; 
        }
        
        /* SEÇÃO DE PUBLICAÇÃO - CONVIDATIVA */
        .publish-form {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          min-height: 600px;
        }
        
        .news-form h3 { 
          font-size: 1.5rem; 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 2rem;
          font-weight: 800;
        }
        
        .form-group { 
          margin-bottom: 1.5rem; 
        }
        
        .form-row { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 1.5rem; 
        }
        
        label { 
          display: block; 
          font-size: 0.8rem; 
          font-weight: 700; 
          color: #555;
          margin-bottom: 0.5rem; 
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        input, select, textarea { 
          width: 100%; 
          padding: 1rem; 
          border: 2px solid #e0e0e0; 
          font-family: var(--font-sans);
          border-radius: 12px;
          transition: all 0.3s;
          font-size: 0.95rem;
        }
        
        input:focus, select:focus, textarea:focus {
          border-color: #667eea;
          outline: none;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }
        
        .submit-btn { 
          width: 100%; 
          padding: 1.25rem; 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white; 
          border: none; 
          font-weight: 800; 
          text-transform: uppercase; 
          cursor: pointer; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          gap: 0.75rem;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
        
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(102, 126, 234, 0.5);
        }
        
        /* GERENCIAR NOTÍCIAS - MODERNA */
        .manage-list {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }
        
        .manage-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid #f0f0f0;
        }
        
        .manage-header h3 {
          font-size: 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
          margin: 0;
        }
        
        .item-count {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 700;
        }
        
        /* FILTROS MODERNOS */
        .filters-section {
          background: linear-gradient(135deg, #f5f7fa 0%, #fafbfc 100%);
          padding: 1.5rem;
          border-radius: 16px;
          margin-bottom: 2rem;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr auto;
          gap: 1rem;
          align-items: end;
        }
        
        .filter-group {
          display: flex;
          flex-direction: column;
        }
        
        .filter-group label {
          font-size: 0.75rem;
          margin-bottom: 0.5rem;
          color: #666;
        }
        
        .search-input, .filter-select {
          padding: 0.75rem 1rem;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 0.9rem;
          transition: all 0.3s;
        }
        
        .search-input:focus, .filter-select:focus {
          border-color: #667eea;
          outline: none;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }
        
        .clear-filters {
          background: #ff4757;
          color: white;
          border: none;
          padding: 0.75rem 1.25rem;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 700;
          font-size: 0.85rem;
          transition: all 0.3s;
          white-space: nowrap;
        }
        
        .clear-filters:hover {
          background: #ff3838;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 71, 87, 0.3);
        }
        
        /* LISTA DE ITENS - CARDS MODERNOS */
        .items-list-admin { 
          max-height: 600px; 
          overflow-y: auto; 
          padding-right: 10px;
        }
        
        .items-list-admin::-webkit-scrollbar {
          width: 8px;
        }
        
        .items-list-admin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .items-list-admin::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
        }
        
        .admin-item-card {
          background: white;
          border: 2px solid #f0f0f0;
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 1.5rem;
          align-items: start;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        
        .admin-item-card:hover {
          border-color: #667eea;
          box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15);
          transform: translateY(-2px);
        }
        
        .admin-item-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .admin-item-card:hover::before {
          opacity: 1;
        }
        
        .item-thumb-modern {
          width: 100px;
          height: 100px;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .item-thumb-modern img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        
        .admin-item-card:hover .item-thumb-modern img {
          transform: scale(1.1);
        }
        
        .thumb-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .admin-item-card:hover .thumb-overlay {
          opacity: 1;
        }
        
        .item-content {
          flex: 1;
        }
        
        .item-meta {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }
        
        .category-badge {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        
        .date-badge {
          background: #f5f7fa;
          color: #666;
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
        }
        
        .item-title {
          font-size: 1.1rem;
          font-family: var(--font-serif);
          margin: 0 0 0.75rem 0;
          color: #222;
          font-weight: 700;
          line-height: 1.4;
        }
        
        .author-edit-inline {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }
        
        .author-edit-inline label {
          margin: 0;
          font-size: 0.75rem;
          color: #666;
        }
        
        .author-select-modern {
          padding: 0.4rem 0.75rem;
          font-size: 0.8rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-weight: 600;
          min-width: 150px;
        }
        
        .author-display, .username-display {
          font-size: 0.85rem;
          color: #666;
          display: block;
          margin-top: 0.5rem;
          font-weight: 600;
        }
        
        .item-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: stretch;
        }
        
        .edit-btn-modern {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.25rem;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 700;
          font-size: 0.85rem;
          transition: all 0.3s;
          white-space: nowrap;
        }
        
        .edit-btn-modern:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
        
        .del-btn-modern {
          background: #ff4757;
          color: white;
          border: none;
          padding: 0.75rem;
          border-radius: 10px;
          cursor: pointer;
          font-size: 1.2rem;
          transition: all 0.3s;
        }
        
        .del-btn-modern:hover {
          background: #ff3838;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 71, 87, 0.4);
        }
        
        /* OLD STYLES (for compatibility) */
        .admin-item-row { display: none; }
        .item-thumb { display: none; }
        .item-info { display: none; }
        .edit-btn { display: none; }
        .del-btn { display: none; }
        .author-edit { display: none; }
        .author-select { display: none; }
        
        @media (max-width: 1200px) { 
          .admin-grid { grid-template-columns: 1fr; }
          .filters-section { grid-template-columns: 1fr; }
        }
        
        @media (max-width: 768px) {
          .admin-container { padding: 1.5rem; }
          .admin-item-card { grid-template-columns: 1fr; }
          .item-thumb-modern { width: 100%; height: 200px; }
        }
      `}</style>
    </motion.div >
  );
};

export default AdminPanel;
