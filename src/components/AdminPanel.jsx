import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill'; // Import ReactQuill
import { PlusCircle, Trash2, X, Newspaper, GraduationCap, Home, Gavel, BookOpen, Phone, User, Calendar, Settings, Building, Briefcase, MessageSquare, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

// Registro de Atributos Customizados para a Régua (Text Indent e Margin Left)
const Quill = ReactQuill.Quill;
if (Quill) {
  const Parchment = Quill.import('parchment');
  const IndentFirstAttributor = new Parchment.Attributor.Style('textIndent', 'text-indent', {
    scope: Parchment.Scope.BLOCK
  });
  const IndentLeftAttributor = new Parchment.Attributor.Style('marginLeft', 'margin-left', {
    scope: Parchment.Scope.BLOCK
  });
  const IndentRightAttributor = new Parchment.Attributor.Style('marginRight', 'margin-right', {
    scope: Parchment.Scope.BLOCK
  });
  Quill.register(IndentFirstAttributor, true);
  Quill.register(IndentLeftAttributor, true);
  Quill.register(IndentRightAttributor, true);
}

const FullEditor = ({ value, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [indentFirst, setIndentFirst] = useState(30);
  const [indentLeft, setIndentLeft] = useState(0);
  const [indentRight, setIndentRight] = useState(0);
  const quillRef = useRef(null);
  const rulerRef = useRef(null);
  const lastRange = useRef(null);
  const [isDragging, setIsDragging] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isExpanded]);

  // Sincronizar Régua com a Seleção Atual
  useEffect(() => {
    if (!quillRef.current) return;
    const quill = quillRef.current.getEditor();

    const updateRulerFromSelection = () => {
      const range = quill.getSelection();
      if (!range) return;

      lastRange.current = range;
      const [line] = quill.getLine(range.index);
      if (line && line.domNode) {
        const style = window.getComputedStyle(line.domNode);
        const tIndent = parseInt(style.textIndent) || 0;
        const mLeft = parseInt(style.marginLeft) || 0;
        const mRight = parseInt(style.marginRight) || 0;
        setIndentFirst(tIndent + mLeft); // First line absolute pos
        setIndentLeft(mLeft);
        setIndentRight(mRight);
      }
    };

    quill.on('selection-change', updateRulerFromSelection);
    return () => quill.off('selection-change', updateRulerFromSelection);
  }, []);

  const updateFormat = (vFirst, vLeft, vRight) => {
    if (!quillRef.current) return;
    const quill = quillRef.current.getEditor();
    const range = lastRange.current || quill.getSelection();
    if (!range) return;

    quill.formatLine(range.index, range.length, 'marginLeft', `${vLeft}px`);
    quill.formatLine(range.index, range.length, 'marginRight', `${vRight}px`);
    quill.formatLine(range.index, range.length, 'textIndent', `${vFirst - vLeft}px`);
  };

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
      ],
    }
  };


  const applyStyle = (tag) => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      if (range) {
        if (tag === 'P') {
          quill.formatLine(range.index, range.length, 'header', false);
          quill.formatLine(range.index, range.length, 'blockquote', false);
        } else if (tag === 'BLOCKQUOTE') {
          quill.formatLine(range.index, range.length, 'blockquote', true);
        } else {
          quill.formatLine(range.index, range.length, 'header', parseInt(tag.replace('H', '')));
        }
      }
    }
  };

  return (
    <div className={`editor-container-outer ${isExpanded ? 'is-expanded' : ''}`}>
      <div className="quick-styles-bar">
        <div className="style-btns">
          <span>ESTILOS:</span>
          <button onClick={() => applyStyle('H1')}>T1</button>
          <button onClick={() => applyStyle('H2')}>T2</button>
          <button onClick={() => applyStyle('H3')}>T3</button>
          <button onClick={() => applyStyle('P')}>TEXTO</button>
          <button onClick={() => applyStyle('BLOCKQUOTE')}>CITAÇÃO</button>
        </div>
        <button
          className="expand-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? "Sair do modo ampliado" : "Expandir editor"}
        >
          {isExpanded ? 'CONCLUIR EDIÇÃO' : 'AMPLIAR ÁREA DE ESCRITA'}
        </button>
      </div>

      <div className="editor-paper-bg">
        <div className="editor-tips-compact">
          <span>Ajuste o parágrafo atual via régua</span> | <span>ESC para sair</span>
        </div>

        <div className="quill-wrapper" style={{ position: 'relative' }}>
          {/* Régua integrada ao wrapper para alinhamento perfeito */}
          <div className="ruler-container" ref={rulerRef}>
            <div className="ruler-content-area">
              <div className="ruler-marks">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="ruler-mark-group" style={{ width: '50px' }}>
                    <div className="ruler-mark major">
                      <span>{i * 50}</span>
                    </div>
                    <div className="ruler-mark minor" />
                  </div>
                ))}
              </div>

              <motion.div
                className="ruler-handle first-line"
                drag="x"
                dragConstraints={{ left: 0, right: 708 }}
                dragElastic={0}
                dragMomentum={false}
                onDragStart={() => setIsDragging('first')}
                onDragEnd={() => setIsDragging(null)}
                onDrag={(e, info) => {
                  if (!rulerRef.current) return;
                  const areaRect = rulerRef.current.getBoundingClientRect();
                  const relativeX = Math.max(0, Math.min(info.point.x - areaRect.left - 96, 708)); // Adjust for wrapper padding
                  setIndentFirst(relativeX);
                  updateFormat(relativeX, indentLeft, indentRight);
                }}
                style={{ x: indentFirst }}
                title="Recuo da primeira linha"
              >
                <div className="handle-triangle down black" />
              </motion.div>

              <motion.div
                className="ruler-handle left-indent"
                drag="x"
                dragConstraints={{ left: 0, right: 708 }}
                dragElastic={0}
                dragMomentum={false}
                onDragStart={() => setIsDragging('left')}
                onDragEnd={() => setIsDragging(null)}
                onDrag={(e, info) => {
                  if (!rulerRef.current) return;
                  const areaRect = rulerRef.current.getBoundingClientRect();
                  const relativeX = Math.max(0, Math.min(info.point.x - areaRect.left - 96, 708)); // Adjust for wrapper padding
                  const diff = relativeX - indentLeft;
                  setIndentLeft(relativeX);
                  setIndentFirst(prev => prev + diff);
                  updateFormat(indentFirst + diff, relativeX, indentRight);
                }}
                style={{ x: indentLeft }}
                title="Recuo à esquerda"
              >
                <div className="handle-triangle up red" />
              </motion.div>

              <motion.div
                className="ruler-handle right-indent"
                drag="x"
                dragConstraints={{ left: 0, right: 708 }}
                dragElastic={0}
                dragMomentum={false}
                onDragStart={() => setIsDragging('right')}
                onDragEnd={() => setIsDragging(null)}
                onDrag={(e, info) => {
                  if (!rulerRef.current) return;
                  const areaRect = rulerRef.current.getBoundingClientRect();
                  const relativeX = Math.max(0, Math.min(info.point.x - areaRect.left - 96, 708)); // Adjust for wrapper padding
                  const rightMarginVal = 708 - relativeX;
                  setIndentRight(rightMarginVal);
                  updateFormat(indentFirst, indentLeft, rightMarginVal);
                }}
                style={{ x: 708 - indentRight }}
                title="Recuo à direita"
              >
                <div className="handle-triangle up blue" />
              </motion.div>
            </div>
          </div>

          {isDragging && (
            <div
              className="drag-guide-line"
              style={{ left: `calc(96px + ${isDragging === 'first' ? indentFirst : (isDragging === 'left' ? indentLeft : 708 - indentRight)}px)` }}
            />
          )}

          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            placeholder="Escreva seu conteúdo aqui..."
          />
        </div>
      </div>

      <style jsx>{`
        .editor-container-outer {
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .editor-container-outer.is-expanded {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10000;
          border-radius: 0;
          background: #f1f5f9;
        }

        .quick-styles-bar {
          background: #0f172a;
          padding: 8px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
        }

        .style-btns { display: flex; gap: 8px; align-items: center; }
        .style-btns span { font-size: 0.65rem; font-weight: 900; opacity: 0.6; margin-right: 8px; }

        .quick-styles-bar button {
          background: #1e293b;
          color: white;
          border: 1px solid #334155;
          padding: 4px 10px;
          cursor: pointer;
          font-weight: 700;
          font-size: 0.7rem;
          border-radius: 4px;
        }

        .quick-styles-bar button:hover { background: #ffd700; color: black; border-color: #ffd700; }
        
        .expand-toggle {
          background: #ffd700 !important;
          color: black !important;
          font-size: 0.7rem !important;
          padding: 6px 15px !important;
          border: none !important;
        }

        .ruler-container {
          background: #fff;
          height: 35px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: center;
          position: relative;
        }

        .ruler-content-area {
          width: 708px; /* 900px - 192px (padding) */
          position: relative;
          height: 100%;
        }

        .ruler-marks {
          display: flex;
          height: 100%;
          border-left: 1px solid #cbd5e1;
        }

        .ruler-mark-group {
          display: flex;
          height: 100%;
          border-right: 1px solid #e2e8f0;
        }

        .ruler-mark {
          position: relative;
          height: 100%;
        }

        .ruler-mark.major { height: 12px; border-left: 1px solid #64748b; align-self: flex-end; }
        .ruler-mark.minor { height: 6px; border-left: 1px solid #cbd5e1; align-self: flex-end; width: 25px; }

        .ruler-mark span {
          position: absolute;
          top: -18px;
          left: -10px;
          font-size: 9px;
          color: #64748b;
          font-weight: 800;
          width: 20px;
          text-align: center;
        }

        .ruler-handle {
          position: absolute;
          width: 12px;
          height: 12px;
          cursor: ew-resize;
          z-index: 100;
          display: flex;
          justify-content: center;
        }

        .handle-triangle {
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
        }

        .handle-triangle.down { border-top: 10px solid #000; margin-top: -2px; }
        .handle-triangle.up { border-bottom: 10px solid #cc0000; margin-bottom: -2px; align-self: flex-end; }
        
        .handle-triangle.down.black { border-top-color: #000; }
        .handle-triangle.up.red { border-bottom-color: #cc0000; }
        .handle-triangle.up.blue { border-bottom-color: #0000ff; }

        .ruler-handle.first-line { top: 4px; left: -6px; }
        .ruler-handle.left-indent { bottom: 4px; left: -6px; }
        .ruler-handle.right-indent { bottom: 4px; left: -6px; }

        .drag-guide-line {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 0;
          border-left: 1px dashed #cc0000;
          z-index: 50;
          pointer-events: none;
        }

        .editor-paper-bg {
          padding: 60px 20px;
          min-height: calc(100vh - 80px);
          overflow-y: scroll;
          position: relative;
          background: #f1f5f9;
        }

        .is-expanded .editor-paper-bg {
          height: calc(100vh - 80px);
        }

        .editor-tips-compact {
          max-width: 900px;
          margin: 0 auto 15px;
          font-size: 0.75rem;
          color: #64748b;
          text-align: center;
          background: rgba(255,255,255,0.7);
          padding: 5px;
          border-radius: 20px;
        }

        .quill-wrapper {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          border-radius: 4px;
        }

        :global(.ql-toolbar) {
          border: none !important;
          border-bottom: 1px solid #f1f5f9 !important;
          padding: 20px !important;
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 20;
        }

        :global(.ql-container) {
          border: none !important;
          font-size: 1.25rem !important;
        }

        :global(.ql-editor) {
          min-height: 800px;
          padding: 4rem 6rem !important;
          font-family: 'Times New Roman', Times, serif;
          line-height: 1.8;
          color: #1a1a1a;
        }

        :global(.ql-editor p) {
          margin-bottom: 1.5rem;
          text-align: justify;
        }

        :global(.ql-editor blockquote) {
          border-left: 4px solid #ffd700;
          padding-left: 2rem;
          font-style: italic;
          color: #475569;
          margin: 2rem 0;
        }

        :global(body.dark-mode) .editor-container-outer.is-expanded { background: #020617; }
        :global(body.dark-mode) .quill-wrapper { box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
        :global(body.dark-mode) .ql-editor { background: #fff; color: #111; }
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
      console.error(`Error saving ${key}: `, err);
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
                className={activeAdminTab === 'settings' ? 'active' : ''}
                onClick={() => setActiveAdminTab('settings')}
                style={{ marginLeft: 'auto', backgroundColor: '#f0f0f0' }}
              >
                <Settings size={16} /> Sistema
              </button>
            )}
          </nav>
        </div>
        <button onClick={onClose} className="close-btn"><X size={24} /></button>
      </div>



      <div className="admin-content-layout">
        {/* SEÇÃO DE EDIÇÃO/PUBLICAÇÃO - FULL WIDTH */}
        <section className="publish-form">
          <div className="news-form">
            {/* FORMULÁRIO DE NOTÍCIAS */}
            {activeAdminTab === 'news' && (
              <>
                <h3>{editingNews ? "EDITAR NOTÍCIA" : "CRIAR NOVA NOTÍCIA"}</h3>
                {editingNews && (
                  <div className="edit-badge">✏️ Editando: <strong>{editingNews.title}</strong> <button onClick={handleCancelEdit}>Cancelar</button></div>
                )}
                <div className="form-group">
                  <label>Título da Notícia</label>
                  <input type="text" placeholder="Ex: Novo Precedente do STF..." value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Categoria</label>
                    <select value={newsForm.category} onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}>{newsCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}</select>
                  </div>
                  <div className="form-group">
                    <label>Autor / Redator</label>
                    <select value={newsForm.authorId} onChange={e => { const editor = editors?.find(ed => ed.id == e.target.value); setNewsForm({ ...newsForm, authorId: e.target.value, author: editor ? editor.name : '' }); }}>
                      <option value="">Selecione...</option>
                      {editors?.map(editor => <option key={editor.id} value={editor.id}>{editor.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-group gallery-container">
                  <label>Galeria de Imagens (Máx 5)</label>
                  <div className="gallery-inputs">
                    {(newsForm.images || []).map((img, idx) => (
                      <div key={idx} className="gallery-item-input">
                        <input type="text" placeholder="URL da Foto" value={img.url} onChange={(e) => { const imgs = [...newsForm.images]; imgs[idx].url = e.target.value; setNewsForm({ ...newsForm, images: imgs }); }} />
                        <input type="text" placeholder="Legenda" value={img.caption} onChange={(e) => { const imgs = [...newsForm.images]; imgs[idx].caption = e.target.value; setNewsForm({ ...newsForm, images: imgs }); }} />
                        <button onClick={() => { const imgs = newsForm.images.filter((_, i) => i !== idx); setNewsForm({ ...newsForm, images: imgs }); }}>✕</button>
                      </div>
                    ))}
                    {(newsForm.images?.length || 0) < 5 && (
                      <button className="add-img-btn" onClick={() => setNewsForm({ ...newsForm, images: [...(newsForm.images || []), { url: '', caption: '' }] })}>+ Adicionar Foto</button>
                    )}
                  </div>
                </div>

                <div className="form-group"><label>Citação / Subtítulo / Fonte</label><input type="text" value={newsForm.citation} onChange={(e) => setNewsForm({ ...newsForm, citation: e.target.value })} placeholder="Ex: Lenh - 1234/2024, Art. 5" /></div>
                <div className="form-group">
                  <label>CONTEÚDO</label>
                  <FullEditor value={newsForm.content} onChange={(val) => setNewsForm({ ...newsForm, content: val })} />
                </div>
                <button className="submit-btn" onClick={() => { const mainImg = newsForm.images?.length > 0 ? newsForm.images[0].url : ''; handleAdd('news', { ...newsForm, image: mainImg }, () => setNewsForm({ title: '', category: 'JUDICIÁRIO', content: '', citation: '', author: '', authorId: '', image: '', images: [] })); }}>
                  <PlusCircle size={20} /> {editingNews ? "SALVAR ALTERAÇÕES" : "PUBLICAR NOTÍCIA"}
                </button>
              </>
            )}

            {/* FORMULÁRIO DE REDATORES */}
            {activeAdminTab === 'editors' && userRole === 'admin' && (
              <>
                <h3>{editingEditor ? 'EDITAR REDATOR' : 'NOVO REDATOR / COLUNISTA'}</h3>
                {editingEditor && (
                  <div className="edit-badge">✏️ Editando: <strong>{editingEditor.name}</strong> <button onClick={handleCancelEditEditor}>Cancelar</button></div>
                )}
                <div className="form-row">
                  <div className="form-group"><label>Login</label><input type="text" value={editorForm.username} onChange={e => setEditorForm({ ...editorForm, username: e.target.value })} required /></div>
                  <div className="form-group"><label>Senha {editingEditor && '(vazio p/ manter)'}</label><input type="text" value={editorForm.password} onChange={e => setEditorForm({ ...editorForm, password: e.target.value })} placeholder={editingEditor ? "Nova senha..." : "******"} required={!editingEditor} /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Nome Completo</label><input type="text" value={editorForm.name} onChange={e => setEditorForm({ ...editorForm, name: e.target.value })} required /></div>
                  <div className="form-group"><label>Cargo / Profissão</label><input type="text" value={editorForm.role} onChange={e => setEditorForm({ ...editorForm, role: e.target.value })} placeholder="Ex: Advogado" required /></div>
                </div>
                <div className="form-group"><label>URL da Foto (Avatar)</label><input type="text" value={editorForm.avatar} onChange={e => setEditorForm({ ...editorForm, avatar: e.target.value })} placeholder="https://..." /></div>
                <div className="form-group"><label>Minibio (Sobre o Autor)</label><textarea rows="4" value={editorForm.bio} onChange={e => setEditorForm({ ...editorForm, bio: e.target.value })} required></textarea></div>
                <button className="submit-btn" onClick={() => handleAdd('editors', editorForm, () => setEditorForm({ name: '', role: '', bio: '', avatar: '', username: '', password: '' }))}>
                  <PlusCircle size={20} /> {editingEditor ? 'SALVAR ALTERAÇÕES' : 'ADICIONAR REDATOR'}
                </button>
              </>
            )}

            {/* FORMULÁRIO DE EVENTOS */}
            {activeAdminTab === 'eventos' && (
              <>
                <h3>{editingEvento ? 'EDITAR EVENTO' : 'ADICIONAR EVENTO'}</h3>
                {editingEvento && (
                  <div className="edit-badge">✏️ Editando: <strong>{editingEvento.title}</strong> <button onClick={() => handleCancelEditUniversal('eventos')}>Cancelar</button></div>
                )}
                <div className="form-group"><label>Título</label><input type="text" value={eventForm.title} onChange={e => setEventForm({ ...eventForm, title: e.target.value })} required /></div>
                <div className="form-row">
                  <div className="form-group"><label>Data</label><input type="text" value={eventForm.date} onChange={e => setEventForm({ ...eventForm, date: e.target.value })} required /></div>
                  <div className="form-group"><label>Local</label><input type="text" value={eventForm.location} onChange={e => setEventForm({ ...eventForm, location: e.target.value })} required /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Tipo</label><select value={eventForm.type} onChange={e => setEventForm({ ...eventForm, type: e.target.value })}><option value="PRESENCIAL">Presencial</option><option value="ONLINE">Online</option><option value="HÍBRIDO">Híbrido</option><option value="SOCIAL">Social</option><option value="WORKSHOP">Workshop</option></select></div>
                  <div className="form-group"><label>LinK de Inscrição</label><input type="text" value={eventForm.link} onChange={e => setEventForm({ ...eventForm, link: e.target.value })} /></div>
                </div>
                <div className="form-group"><label>URL da Imagem</label><input type="text" value={eventForm.image} onChange={e => setEventForm({ ...eventForm, image: e.target.value })} /></div>
                <div className="form-group"><label>Descrição</label><textarea value={eventForm.description} onChange={e => setEventForm({ ...eventForm, description: e.target.value })} required></textarea></div>
                <button className="submit-btn" onClick={() => handleAdd('eventos', eventForm, () => setEventForm({ title: '', date: '', location: '', description: '', type: 'PRESENCIAL', link: '', image: '' }))}>
                  <PlusCircle size={20} /> {editingEvento ? 'SALVAR ALTERAÇÕES' : 'PUBLICAR EVENTO'}
                </button>
              </>
            )}

            {/* FORMULÁRIO DE LEITURAS */}
            {activeAdminTab === 'leituras' && (
              <>
                <h3>{editingLeitura ? 'EDITAR INDICAÇÃO' : 'NOVA INDICAÇÃO DE LEITURA'}</h3>
                {editingLeitura && (
                  <div className="edit-badge">✏️ Editando: <strong>{editingLeitura.title}</strong> <button onClick={() => handleCancelEditUniversal('leituras')}>Cancelar</button></div>
                )}
                <div className="form-group"><label>Título da Obra</label><input type="text" value={leituraForm.title} onChange={e => setLeituraForm({ ...leituraForm, title: e.target.value })} required /></div>
                <div className="form-row">
                  <div className="form-group"><label>Autor</label><input type="text" value={leituraForm.author} onChange={e => setLeituraForm({ ...leituraForm, author: e.target.value })} required /></div>
                  <div className="form-group"><label>Categoria</label><input type="text" value={leituraForm.category} onChange={e => setLeituraForm({ ...leituraForm, category: e.target.value })} placeholder="Ex: Filo do Direito" /></div>
                </div>
                <div className="form-group"><label>URL da Capa</label><input type="text" value={leituraForm.cover} onChange={e => setLeituraForm({ ...leituraForm, cover: e.target.value })} placeholder="http://..." /></div>
                <div className="form-group"><label>Sinopse</label><textarea rows="6" value={leituraForm.synopsis} onChange={e => setLeituraForm({ ...leituraForm, synopsis: e.target.value })} required></textarea></div>
                <button className="submit-btn" onClick={() => handleAdd('leituras', leituraForm, () => setLeituraForm({ title: '', author: '', type: 'LIVRO', category: 'GERAL', synopsis: '', cover: '', link: '#' }))}>
                  <PlusCircle size={20} /> {editingLeitura ? 'SALVAR ALTERAÇÕES' : 'ADICIONAR INDICAÇÃO'}
                </button>
              </>
            )}

            {/* FORMULÁRIO DE CONTATOS */}
            {activeAdminTab === 'contacts' && (
              <>
                <h3>{editingContact ? 'EDITAR CONTATO' : 'NOVO CONTATO ÚTIL'}</h3>
                {editingContact && (
                  <div className="edit-badge">✏️ Editando: <strong>{editingContact.setor}</strong> <button onClick={() => handleCancelEditUniversal('contacts')}>Cancelar</button></div>
                )}
                <div className="form-group"><label>Comarca</label><input type="text" value={contactForm.comarca} onChange={e => setContactForm({ ...contactForm, comarca: e.target.value })} required /></div>
                <div className="form-group"><label>Setor / Órgão</label><input type="text" value={contactForm.setor} onChange={e => setContactForm({ ...contactForm, setor: e.target.value })} required /></div>
                <div className="form-group"><label>Telefone</label><input type="text" value={contactForm.telefone} onChange={e => setContactForm({ ...contactForm, telefone: e.target.value })} required /></div>
                <button className="submit-btn" onClick={() => handleAdd('contacts', contactForm, () => setContactForm({ comarca: '', setor: '', telefone: '' }))}>
                  <PlusCircle size={20} /> {editingContact ? 'SALVAR ALTERAÇÕES' : 'SALVAR CONTATO'}
                </button>
              </>
            )}

            {/* FORMULÁRIO DE CONCURSOS */}
            {activeAdminTab === 'concursos' && (
              <>
                <h3>{editingConcurso ? 'EDITAR CONCURSO' : 'NOVO CONCURSO'}</h3>
                {editingConcurso && (
                  <div className="edit-badge">✏️ Editando: <strong>{editingConcurso.cargo}</strong> <button onClick={() => handleCancelEditUniversal('concursos')}>Cancelar</button></div>
                )}
                <div className="form-group"><label>Entidade</label><input type="text" value={concursoForm.entidade} onChange={e => setConcursoForm({ ...concursoForm, entidade: e.target.value })} required /></div>
                <div className="form-group"><label>Cargo</label><input type="text" value={concursoForm.cargo} onChange={e => setConcursoForm({ ...concursoForm, cargo: e.target.value })} required /></div>
                <div className="form-row">
                  <div className="form-group"><label>Nível</label><select value={concursoForm.nivel} onChange={e => setConcursoForm({ ...concursoForm, nivel: e.target.value })}><option value="MUNICIPAL">MUNICIPAL</option><option value="ESTADUAL">ESTADUAL</option><option value="FEDERAL">FEDERAL</option></select></div>
                  <div className="form-group"><label>Remuneração</label><input type="text" value={concursoForm.remuneracao} onChange={e => setConcursoForm({ ...concursoForm, remuneracao: e.target.value })} /></div>
                </div>
                <button className="submit-btn" onClick={() => handleAdd('concursos', concursoForm, () => setConcursoForm({ entidade: '', cargo: '', vagas: '', remuneracao: '', status: 'Inscrições Abertas', nivel: 'MUNICIPAL' }))}>
                  <PlusCircle size={20} /> {editingConcurso ? 'SALVAR ALTERAÇÕES' : 'ADICIONAR CONCURSO'}
                </button>
              </>
            )}

            {/* FORMULÁRIO DE INSTITUIÇÕES */}
            {activeAdminTab === 'instituicoes' && userRole === 'admin' && (
              <>
                <h3>{editingInstituicao ? 'EDITAR INSTITUIÇÃO' : 'NOVA INSTITUIÇÃO / OAB'}</h3>
                {editingInstituicao && (
                  <div className="edit-badge">✏️ Editando: <strong>{editingInstituicao.name}</strong> <button onClick={() => handleCancelEditUniversal('instituicoes')}>Cancelar</button></div>
                )}
                <div className="form-group"><label>Nome / Subseção</label><input type="text" value={instituicaoForm.name} onChange={e => setInstituicaoForm({ ...instituicaoForm, name: e.target.value })} placeholder="Ex: OAB - 175ª Subseção" required /></div>
                <div className="form-row">
                  <div className="form-group"><label>Cidade</label><input type="text" value={instituicaoForm.city} onChange={e => setInstituicaoForm({ ...instituicaoForm, city: e.target.value })} required /></div>
                  <div className="form-group"><label>Tipo</label><select value={instituicaoForm.type} onChange={e => setInstituicaoForm({ ...instituicaoForm, type: e.target.value })}><option value="OAB">OAB</option><option value="FACULDADE">FACULDADE</option></select></div>
                </div>
                <div className="form-group"><label>URL da Imagem</label><input type="text" value={instituicaoForm.image} onChange={e => setInstituicaoForm({ ...instituicaoForm, image: e.target.value })} placeholder="https://..." /></div>
                <div className="form-group"><label>Histórico / Sobre</label>
                  <FullEditor value={instituicaoForm.history} onChange={(val) => setInstituicaoForm({ ...instituicaoForm, history: val })} />
                </div>
                <button className="submit-btn" onClick={() => handleAdd('instituicoes', instituicaoForm, () => setInstituicaoForm({ name: '', type: 'OAB', city: '', image: '', description: '', history: '', link: '' }))}>
                  <PlusCircle size={20} /> {editingInstituicao ? 'SALVAR ALTERAÇÕES' : 'ADICIONAR INSTITUIÇÃO'}
                </button>
              </>
            )}

            {/* FORMULÁRIO DE EQUIPAMENTOS */}
            {activeAdminTab === 'equipamentos' && userRole === 'admin' && (
              <>
                <h3>{editingEquipamento ? 'EDITAR ITEM' : 'NOVO ITEM / EQUIPAMENTO'}</h3>
                {editingEquipamento && (
                  <div className="edit-badge">✏️ Editando: <strong>{editingEquipamento.title}</strong> <button onClick={() => handleCancelEditUniversal('equipamentos')}>Cancelar</button></div>
                )}
                <div className="form-group"><label>Título</label><input type="text" value={equipamentoForm.title} onChange={e => setEquipamentoForm({ ...equipamentoForm, title: e.target.value })} required /></div>
                <div className="form-row">
                  <div className="form-group"><label>Categoria</label><select value={equipamentoForm.category} onChange={e => setEquipamentoForm({ ...equipamentoForm, category: e.target.value })}><option value="CADEIRAS">CADEIRAS</option><option value="ELETRÔNICOS">ELETRÔNICOS</option><option value="LIVROS">LIVROS</option><option value="ACESSÓRIOS">ACESSÓRIOS</option></select></div>
                  <div className="form-group"><label>Preço</label><input type="text" value={equipamentoForm.price} onChange={e => setEquipamentoForm({ ...equipamentoForm, price: e.target.value })} /></div>
                </div>
                <div className="form-group"><label>Link de Compra</label><input type="text" value={equipamentoForm.link} onChange={e => setEquipamentoForm({ ...equipamentoForm, link: e.target.value })} /></div>
                <div className="form-group"><label>Descrição</label><textarea value={equipamentoForm.description} onChange={e => setEquipamentoForm({ ...equipamentoForm, description: e.target.value })} required></textarea></div>
                <button className="submit-btn" onClick={() => handleAdd('equipamentos', equipamentoForm, () => setEquipamentoForm({ title: '', category: 'ACESSÓRIOS', description: '', price: '', link: '', image: '' }))}>
                  <PlusCircle size={20} /> {editingEquipamento ? 'SALVAR ALTERAÇÕES' : 'ADICIONAR ITEM'}
                </button>
              </>
            )}

            {/* FORMULÁRIO DE VAGAS */}
            {activeAdminTab === 'vagas' && userRole === 'admin' && (
              <>
                <h3>{editingVaga ? 'EDITAR VAGA' : 'NOVA VAGA JURÍDICA'}</h3>
                {editingVaga && (
                  <div className="edit-badge">✏️ Editando: <strong>{editingVaga.title}</strong> <button onClick={() => handleCancelEditUniversal('vagas')}>Cancelar</button></div>
                )}
                <div className="form-group"><label>Cargo</label><input type="text" value={vagaForm.title} onChange={e => setVagaForm({ ...vagaForm, title: e.target.value })} required /></div>
                <div className="form-row">
                  <div className="form-group"><label>Escritório / Empresa</label><input type="text" value={vagaForm.company} onChange={e => setVagaForm({ ...vagaForm, company: e.target.value })} required /></div>
                  <div className="form-group"><label>Tipo</label><select value={vagaForm.type} onChange={e => setVagaForm({ ...vagaForm, type: e.target.value })}><option value="CLT">CLT</option><option value="PJ">PJ</option><option value="ESTÁGIO">ESTÁGIO</option><option value="ASSOCIADO">ASSOCIADO</option></select></div>
                </div>
                <div className="form-group"><label>Localização</label><input type="text" value={vagaForm.location} onChange={e => setVagaForm({ ...vagaForm, location: e.target.value })} required /></div>
                <div className="form-group"><label>Link Original</label><input type="text" value={vagaForm.link} onChange={e => setVagaForm({ ...vagaForm, link: e.target.value })} /></div>
                <div className="form-group"><label>Descrição / Requisitos</label><textarea value={vagaForm.description} onChange={e => setVagaForm({ ...vagaForm, description: e.target.value })} required></textarea></div>
                <button className="submit-btn" onClick={() => handleAdd('vagas', vagaForm, () => setVagaForm({ title: '', company: '', type: 'CLT', location: '', link: '', description: '' }))}>
                  <PlusCircle size={20} /> {editingVaga ? 'SALVAR ALTERAÇÕES' : 'POSTAR VAGA'}
                </button>
              </>
            )}

            {/* FORMULÁRIO ACADÊMICO */}
            {activeAdminTab === 'academico' && userRole === 'admin' && (
              <>
                <h3>{editingAcademico ? 'EDITAR ARTIGO' : 'NOVA PRODUÇÃO ACADÊMICA'}</h3>
                {editingAcademico && (
                  <div className="edit-badge">✏️ Editando: <strong>{editingAcademico.title}</strong> <button onClick={() => handleCancelEditUniversal('academico')}>Cancelar</button></div>
                )}
                <div className="form-group"><label>Título</label><input type="text" value={academicoForm.title} onChange={e => setAcademicoForm({ ...academicoForm, title: e.target.value })} required /></div>
                <div className="form-row">
                  <div className="form-group"><label>Autor</label><input type="text" value={academicoForm.author} onChange={e => setAcademicoForm({ ...academicoForm, author: e.target.value })} required /></div>
                  <div className="form-group"><label>Tipo</label><select value={academicoForm.type} onChange={e => setAcademicoForm({ ...academicoForm, type: e.target.value })}><option value="ARTIGO CIENTÍFICO">ARTIGO CIENTÍFICO</option><option value="TCC/TESE">TCC/TESE</option><option value="RESENHA">RESENHA</option></select></div>
                </div>
                <div className="form-group"><label>Resumo</label><textarea value={academicoForm.resume} onChange={e => setAcademicoForm({ ...academicoForm, resume: e.target.value })} required></textarea></div>
                <div className="form-group"><label>Conteúdo Completo</label>
                  <FullEditor value={academicoForm.content} onChange={(val) => setAcademicoForm({ ...academicoForm, content: val })} />
                </div>
                <button className="submit-btn" onClick={() => handleAdd('academico', academicoForm, () => setAcademicoForm({ title: '', author: '', type: 'ARTIGO CIENTÍFICO', institution: '', year: new Date().getFullYear().toString(), resume: '', content: '', image: '', link: '', isFeatured: false }))}>
                  <PlusCircle size={20} /> {editingAcademico ? 'SALVAR ALTERAÇÕES' : 'PUBLICAR ARTIGO'}
                </button>
              </>
            )}

            {/* FORMULÁRIO DE RESERVAS */}
            {activeAdminTab === 'reservas' && userRole === 'admin' && (
              <>
                <h3>{editingReserva ? 'EDITAR RECOMENDAÇÃO' : 'NOVA RECOMENDAÇÃO'}</h3>
                {editingReserva && (
                  <div className="edit-badge">✏️ Editando: <strong>{editingReserva.title}</strong> <button onClick={() => handleCancelEditUniversal('reservas')}>Cancelar</button></div>
                )}
                <div className="form-group"><label>Título</label><input type="text" value={reservaForm.title} onChange={e => setReservaForm({ ...reservaForm, title: e.target.value })} required /></div>
                <div className="form-row">
                  <div className="form-group"><label>Categoria</label><select value={reservaForm.category} onChange={e => setReservaForm({ ...reservaForm, category: e.target.value })}><option value="HOTEL">HOSPEDAGEM</option><option value="RESTAURANTE">GASTRONOMIA</option><option value="TURISMO">TURISMO</option></select></div>
                  <div className="form-group"><label>Localização</label><input type="text" value={reservaForm.location} onChange={e => setReservaForm({ ...reservaForm, location: e.target.value })} required /></div>
                </div>
                <div className="form-group"><label>URL da Imagem</label><input type="text" value={reservaForm.image} onChange={e => setReservaForm({ ...reservaForm, image: e.target.value })} /></div>
                <div className="form-group"><label>Descrição</label><textarea value={reservaForm.description} onChange={e => setReservaForm({ ...reservaForm, description: e.target.value })} required></textarea></div>
                <button className="submit-btn" onClick={() => handleAdd('reservas', reservaForm, () => setReservaForm({ title: '', category: 'HOTEL', location: '', description: '', image: '', link: '' }))}>
                  <PlusCircle size={20} /> {editingReserva ? 'SALVAR ALTERAÇÕES' : 'ADICIONAR RECOMENDAÇÃO'}
                </button>
              </>
            )}

            {/* CONFIGURAÇÕES DO SISTEMA */}
            {activeAdminTab === 'settings' && userRole === 'admin' && (
              <div className="settings-container">
                <h3>CONFIGURAÇÕES DO SISTEMA</h3>
                <div className="settings-card">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Modo de Manutenção</h4>
                      <p>Quando ativado, o site exibirá uma tela de manutenção para os usuários.</p>
                    </div>
                    <button
                      className={`toggle - btn ${data.isMaintenanceMode ? 'active' : ''} `}
                      onClick={async () => await data.updateConfig('maintenance_mode', !data.isMaintenanceMode)}
                    >
                      {data.isMaintenanceMode ? 'DESATIVAR' : 'ATIVAR'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeAdminTab === 'comments' && (
              <div className="tab-info-card">
                <h3>GERENCIAR COMENTÁRIOS</h3>
                <p>Abaixo você pode ver a lista completa de comentários e realizar moderação.</p>
              </div>
            )}
          </div>
        </section>

        {/* LISTA DE GERENCIAMENTO */}
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
                if (activeAdminTab !== 'news') return true;
                const matchesSearch = !searchQuery || (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase()));
                const matchesCategory = filterCategory === 'TODAS' || item.category === filterCategory;
                const matchesAuthor = filterAuthor === 'TODOS' || String(item.author_id) === String(filterAuthor) || String(item.authorId) === String(filterAuthor);
                return matchesSearch && matchesCategory && matchesAuthor;
              })
              .sort((a, b) => {
                const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
                const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
                return dateB - dateA;
              })
              .map(item => (
                <div key={item?.id || Math.random()} className="admin-item-card">
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
                  </div>

                  <div className="item-actions">
                    {/* Botoes de acao */}
                    <button onClick={() => {
                      if (activeAdminTab === 'news') handleEdit('news', item);
                      else if (activeAdminTab === 'editors') handleEditEditor(item);
                      else handleEdit(activeAdminTab, item);
                    }} className="edit-btn-modern">✏️ Editar</button>

                    {userRole === 'admin' && (
                      <button onClick={() => deleteItem(activeAdminTab, item.id)} className="del-btn-modern">🗑️</button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>


      <style jsx>{`
  /* CONTAINER E HEADER MODERNOS */
  .admin-container {
  background: #f8fafc;
  padding: 3rem;
  border-radius: 24px;
  min-height: 95vh;
}

body.dark-mode.admin-container {
  background: #0f172a;
}
        
        .admin-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: white;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}
        
        .admin-title h2 {
  background: linear-gradient(135deg, #1a1a1a 0 %, #2d2d2d 100 %);
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
  font-family: var(--font - sans);
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
  border-color: #1a1a1a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
        
        .admin-nav-tabs button.active {
  background: linear-gradient(135deg, #1a1a1a 0 %, #2d2d2d 100 %);
  color: white;
  border-color: transparent;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}
        
        .close-btn {
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 50 %;
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

        /* LAYOUT MODERNO */
        .admin-content-layout {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

        /* SEÇÃO DE PUBLICAÇÃO - CONVIDATIVA */
        .publish-form {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  min-height: 600px;
}

body.dark-mode.publish-form,
  body.dark-mode.manage-list,
  body.dark-mode.admin-header {
  background: #1e293b;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  border: 1px solid #334155;
}
        
        .news-form h3 {
  font-size: 1.5rem;
  background: linear-gradient(135deg, #1a1a1a 0 %, #2d2d2d 100 %);
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
  width: 100 %;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  font-family: var(--font - sans);
  border-radius: 12px;
  transition: all 0.3s;
  font-size: 0.95rem;
}

input: focus, select: focus, textarea:focus {
  border-color: #ffd700;
  outline: none;
  box-shadow: 0 0 0 4px rgba(255, 215, 0, 0.2);
}

body.dark-mode input,
  body.dark-mode select,
    body.dark-mode textarea {
  background: #0f172a;
  border-color: #334155;
  color: white;
}

body.dark-mode label {
  color: #94a3b8;
}
        
        .submit-btn {
  width: 100 %;
  padding: 1.25rem;
  background: linear-gradient(135deg, #1a1a1a 0 %, #2d2d2d 100 %);
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
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}
        
        .submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
}

        /* GERENCIAR NOTÍCIAS - MODERNA */
        .manage-list {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
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
  background: linear-gradient(135deg, #1a1a1a 0 %, #2d2d2d 100 %);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  margin: 0;
}
        
        .item-count {
  background: linear-gradient(135deg, #1a1a1a 0 %, #2d2d2d 100 %);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
}

        /* FILTROS MODERNOS */
        .filters-section {
  background: linear-gradient(135deg, #f5f7fa 0 %, #fafbfc 100 %);
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
        
        .search-input: focus, .filter-select:focus {
  border-color: #1a1a1a;
  outline: none;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1);
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
  max - height: 600px;
  overflow - y: auto;
  padding-right: 10px;
}
        
        .items-list-admin:: -webkit-scrollbar {
  width: 8px;
}
        
        .items-list-admin:: -webkit-scrollbar - track {
  background: #f1f1f1;
  border-radius: 10px;
}
        
        .items-list-admin:: -webkit-scrollbar - thumb {
  background: linear-gradient(135deg, #1a1a1a 0 %, #2d2d2d 100 %);
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

body.dark-mode.admin-item-card {
  background: #1e293b;
  border-color: #334155;
}

body.dark-mode.item-title {
  color: white;
}
        
        .admin-item-card:hover {
  border-color: #1a1a1a;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}
        
        .admin-item-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100 %;
  background: linear-gradient(135deg, #1a1a1a 0 %, #2d2d2d 100 %);
  opacity: 0;
  transition: opacity 0.3s;
}
        
        .admin-item-card: hover::before {
  opacity: 1;
}
        
        .item-thumb-modern {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background: linear-gradient(135deg, #1a1a1a 0 %, #2d2d2d 100 %);
}
        
        .item-thumb-modern img {
  width: 100 %;
  height: 100 %;
  object-fit: cover;
  transition: transform 0.3s;
}
        
        .admin-item-card: hover.item-thumb-modern img {
  transform: scale(1.1);
}
        
        .thumb-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0 %, rgba(118, 75, 162, 0.3) 100 %);
  opacity: 0;
  transition: opacity 0.3s;
}
        
        .admin-item-card: hover.thumb-overlay {
  opacity: 1;
}
        
        .item - content {
  flex: 1;
}
        
        .item - meta {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}
        
        .category-badge {
  background: linear-gradient(135deg, #1a1a1a 0 %, #2d2d2d 100 %);
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
  font-family: var(--font - serif);
  margin: 0 0 0.75rem 0;
  color: #222;
  font-weight: 700;
  line - height: 1.4;
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
  min - width: 150px;
}
        
        .author - display, .username - display {
  font-size: 0.85rem;
  color: #666;
  display: block;
  margin-top: 0.5rem;
  font-weight: 600;
}
        
        .item - actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: stretch;
}
        
        .edit-btn-modern {
  background: linear-gradient(135deg, #1a1a1a 0 %, #2d2d2d 100 %);
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
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
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

        /* NOVOS COMPONENTES PREMIUM */
        .edit-badge {
  background: #fff3cd;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-left: 4px solid #ffc107;
  color: #856404;
}

        .edit-badge button {
  background: #856404;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: bold;
}

        .gallery-container {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  margin-bottom: 2rem;
}

        .gallery-inputs {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

        .gallery-item-input {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 0.75rem;
  align-items: center;
  background: white;
  padding: 0.75rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

        .gallery-item-input input {
  padding: 0.6rem;
  font-size: 0.85rem;
}

        .gallery-item-input button {
  background: #ff4757;
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50 %;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

        .add-img-btn {
  background: #27ae60;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.85rem;
  transition: all 0.3s;
}

        .settings-container h3 {
  margin-bottom: 2rem;
  font-weight: 800;
}

        .settings-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
}

        .setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

        .setting-info h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #1a1a1a;
}

        .setting-info p {
  margin: 0;
  font-size: 0.9rem;
  color: #64748b;
}

        .toggle-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  border: none;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s;
  min - width: 120px;
  background: #e2e8f0;
  color: #64748b;
}

        .toggle-btn.active {
  background: #cc0000;
  color: white;
  box-shadow: 0 4px 15px rgba(204, 0, 0, 0.3);
}

        .tab-info-card {
  background: linear-gradient(135deg, #1a1a1a 0 %, #2d2d2d 100 %);
  color: white;
  padding: 2.5rem;
  border-radius: 20px;
  text - align: center;
}

        .tab-info-card h3 {
  color: #ffd700;
  margin-bottom: 1rem;
}

        /* OLD STYLES (for compatibility) */
        .admin-item-row { display: none; }
        .item-thumb { display: none; }
        .item-info { display: none; }
        .edit-btn { display: none; }
        .del-btn { display: none; }
        .author-edit { display: none; }
        .author-select { display: none; }

@media(max-width: 1200px) { 
          .admin - grid { grid-template-columns: 1fr; }
          .filters-section { grid-template-columns: 1fr; }
}

@media(max-width: 768px) {
          .admin-container { padding: 1.5rem; }
          .admin-item-card { grid-template-columns: 1fr; }
          .item-thumb-modern { width: 100 %; height: 200px; }
}
`}</style>
    </motion.div >
  );
};

export default AdminPanel;

