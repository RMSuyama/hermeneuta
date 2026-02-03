import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, ArrowLeft, Share2, Edit, Search, BookOpen, Minimize2, X } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CommentsSection from './CommentsSection';
import SEO from './SEO';
import ImageWrapper from './ImageWrapper';

const NewsFeed = ({ news, editors, isAuthenticated, focusMode, setFocusMode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState('TODOS');
  const [searchTerm, setSearchTerm] = React.useState('');

  const categories = ['TODOS', 'RURAL', 'PREVIDENCIÁRIO', 'CONSUMIDOR', 'AMBIENTAL', 'FAMÍLIA', 'TRABALHISTA', 'ARTIGO', 'ADMINISTRATIVO'];

  if (!news || news.length === 0) return <div className="news-feed">Nenhuma notícia publicada.</div>;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Hermeneuta - Notícias Jurídicas',
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  // Article View (if ID is present)
  if (id) {
    const selectedArticle = news.find(n => n.id.toString() === id);

    if (!selectedArticle) {
      return (
        <div className="news-feed">
          <p>Notícia não encontrada.</p>
          <Link to="/" className="back-btn"><ArrowLeft size={16} /> Voltar para Notícias</Link>
        </div>
      );
    }

    const author = (editors || []).find(e => e.id === selectedArticle.authorId) ||
      (editors || []).find(e => e.name === selectedArticle.author) ||
      { name: selectedArticle.author || 'Redação', role: 'Colaborador', bio: '', avatar: '' };

    return (
      <div className={`article-page-view ${focusMode ? 'focus-mode-active' : ''}`}>
        <SEO type="NewsArticle" data={selectedArticle} />
        <Link to="/" className={`back-btn ${focusMode ? 'focus-visible' : ''}`}>
          <ArrowLeft size={16} /> Voltar para Notícias
        </Link>

        <motion.article
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="full-article-content"
        >
          <div className="article-header">
            <span className="category-tag">{selectedArticle.category}</span>
            <h1 className="article-title">{selectedArticle.title}</h1>
            <div className="article-meta-row">
              <span className="meta-item"><Calendar size={14} /> {selectedArticle.date}</span>
              <span className="meta-item"><User size={14} /> {author.name}</span>
              <div className="article-actions">
                <button onClick={handleShare} className="action-btn" title="Compartilhar">
                  <Share2 size={18} />
                </button>
                {isAuthenticated && (
                  <button className="action-btn edit" title="Editar (Admin)">
                    <Edit size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {selectedArticle.images && selectedArticle.images.length > 0 ? (
            <div className="article-gallery">
              {selectedArticle.images.map((img, idx) => (
                <div key={idx} className="gallery-item">
                  <img src={img.url} alt={img.caption || selectedArticle.title} />
                  {img.caption && <span className="img-caption">{img.caption}</span>}
                </div>
              ))}
            </div>
          ) : selectedArticle.image ? (
            <div className="article-image-container">
              <ImageWrapper src={selectedArticle.image} alt={selectedArticle.title} />
            </div>
          ) : null}

          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: selectedArticle.content }} // HTML Rendering for Rich Text
          />

          {selectedArticle.citation && (
            <div className="article-citation">
              <strong>Fonte:</strong>
              {selectedArticle.citation.split('\n').map((line, idx) => (
                line.trim() && <div key={idx} style={{ marginTop: idx > 0 ? '0.5rem' : 0 }}>{line}</div>
              ))}
            </div>
          )}

          <div className="author-profile">
            <div className="author-avatar">
              {author.avatar ? <img src={author.avatar} alt={author.name} /> : <User size={32} />}
            </div>
            <div className="author-info">
              <h4>{author.name}</h4>
              <span className="author-role">{author.role}</span>
              {author.bio && <p className="author-bio">"{author.bio}"</p>}
            </div>
          </div>

          <CommentsSection articleId={id} />
        </motion.article>

        <style jsx>{`
          .article-page-view {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem 0;
            animation: fadeIn 0.3s ease-in;
          }

          .author-profile {
            margin-top: 4rem;
            padding-top: 2rem;
            border-top: 1px solid var(--color-border);
            display: flex;
            gap: 1.5rem;
            align-items: flex-start;
            background: rgba(0,0,0,0.02);
            padding: 2rem;
            border-radius: 8px;
          }

          .author-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: #e0e0e0;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            flex-shrink: 0;
          }

          .author-avatar img { width: 100%; height: 100%; object-fit: cover; }

          .author-info h4 {
            font-size: 1.2rem;
            margin: 0;
            color: var(--color-primary);
          }

          .author-role {
            font-size: 0.8rem;
            text-transform: uppercase;
            color: var(--color-secondary);
            font-weight: 700;
            display: block;
            margin-bottom: 0.5rem;
          }

          .author-bio {
            font-style: italic;
            color: var(--color-text-muted);
            font-size: 0.95rem;
            line-height: 1.5;
          }

          .back-btn {
            background: none;
            border: none;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-family: var(--font-sans);
            font-weight: 700;
            color: var(--color-text-muted);
            cursor: pointer;
            margin-bottom: 2rem;
            text-transform: uppercase;
            font-size: 0.8rem;
            letter-spacing: 1px;
            transition: color 0.2s;
            text-decoration: none;
          }
          .back-btn:hover { color: var(--color-secondary); }

          .article-title {
            font-size: 2.5rem;
            line-height: 1.2;
            color: var(--color-primary);
            margin: 1rem 0;
            font-family: var(--font-serif);
          }

          .article-meta-row {
            display: flex;
            gap: 1.5rem;
            border-bottom: 1px solid var(--color-border);
            padding-bottom: 1.5rem;
            margin-bottom: 2rem;
            align-items: center;
          }

          .meta-item {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            color: var(--color-text-muted);
            font-size: 0.85rem;
            text-transform: uppercase;
            font-weight: 600;
          }
          
          .article-actions {
            margin-left: auto;
            display: flex;
            gap: 0.5rem;
          }
          
          .action-btn {
            background: none;
            border: 1px solid var(--color-border);
            border-radius: 4px;
            padding: 0.4rem;
            color: var(--color-text-muted);
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .action-btn:hover {
            color: var(--color-secondary);
            border-color: var(--color-secondary);
          }

          .article-image-container img {
            width: 100%;
            height: auto;
            max-height: 350px;
            object-fit: cover;
            border-radius: 4px;
            margin-bottom: 2rem;
          }

          .article-citation {
             font-family: var(--font-sans);
             font-style: italic;
             font-size: 0.85rem;
             color: var(--color-text-muted);
             border-top: 1px solid var(--color-border);
             padding: 1rem 0;
             margin: 2rem 0 3rem 0;
             text-align: left;
          }

          .article-body {
            font-family: var(--font-serif);
            font-size: 1.25rem;
            line-height: 1.8;
            color: var(--color-text);
          }
          
          .article-body p { margin-bottom: 2rem; }
          
          .article-gallery { display: grid; gap: 2rem; margin-bottom: 3rem; }
          .gallery-item img { width: 100%; height: auto; border-radius: 4px; }
          .img-caption { display: block; font-size: 0.85rem; color: var(--color-text-muted); font-style: italic; margin-top: 0.5rem; text-align: center; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem; }
          
          @media (max-width: 768px) {
            .article-title { font-size: 2rem; }
            .author-profile { flex-direction: column; align-items: center; text-align: center; }
          }

          /* Focus Mode Styles moved to body class in index.css likely, but keeping scoped for now */
          
          .focus-toggle {
              position: fixed;
              bottom: 2rem;
              right: 2rem;
              width: 60px;
              height: 60px;
              border-radius: 50%;
              background: var(--color-primary);
              color: white;
              border: none;
              box-shadow: 0 4px 20px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              z-index: 10001; /* Above almost everything */
              transition: all 0.3s;
          }
          .focus-toggle:hover { transform: scale(1.1); background: var(--color-accent); color: black; }
          .focus-toggle.active { background: var(--color-accent); color: black; }


        `}</style>
      </div>
    );
  }

  const filteredNews = news.filter(item => {
    const matchesFilter = filter === 'TODOS' || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.excerpt && item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const featured = filteredNews[0];
  const others = filteredNews.slice(1);

  return (
    <div className="news-feed">
      <div className="news-controls-row">
        <div className="news-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`news-tab-link ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="news-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Pesquisar notícias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="main-grid">
        <section className="featured-column">
          {featured ? (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="featured-article"
            >
              <Link to={`/news/${featured.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="category-tag">{featured.category}</div>
                <h2>{featured.title}</h2>
                {featured.image && <ImageWrapper src={featured.image} alt={featured.title} className="featured-img" />}
                <div className="excerpt" dangerouslySetInnerHTML={{ __html: featured.excerpt || (featured.content ? featured.content.substring(0, 300) + '...' : '') }} />
                <div className="article-meta">
                  {featured.date} • {featured.author || 'Redação'}
                </div>
                <button className="read-more">
                  Continuar Lendo <ArrowRight size={14} />
                </button>
              </Link>
            </motion.article>
          ) : (
            <div className="empty-state">
              <p>Nenhuma notícia encontrada nesta categoria.</p>
            </div>
          )}

          <div className="sub-grid">
            {others.map((newsItem, idx) => (
              <motion.article
                key={newsItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (idx + 1) }}
                className="sub-article"
              >
                <Link to={`/news/${newsItem.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="category-tag small">{newsItem.category}</div>
                  <h3>{newsItem.title}</h3>
                  <div className="excerpt small" dangerouslySetInnerHTML={{ __html: newsItem.excerpt || (newsItem.content ? newsItem.content.substring(0, 100) + '...' : '') }} />
                  <div className="article-meta small">
                    {newsItem.date}
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        <aside className="sidebar">
          <div className="sidebar-section">
            <h4 className="sidebar-title">Edição do Dia</h4>
            <div className="date-display">
              {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
          <div className="sidebar-section">
            <h4 className="sidebar-title">Destaques Legislativos</h4>
            <ul className="links-list">
              <li><a href="http://www.imprensaoficial.com.br/" target="_blank" rel="noopener noreferrer">Diário Oficial do Estado</a></li>
              <li><a href="https://esaj.tjsp.jus.br/cjsg/consultaCompleta.do" target="_blank" rel="noopener noreferrer">Jurisprudência TJSP</a></li>
              <li><a href="https://www.oabsp.org.br/servicos/fique-por-dentro" target="_blank" rel="noopener noreferrer">Portal OAB/SP</a></li>
            </ul>
          </div>
        </aside>
      </div>

      <style jsx>{`
        .news-controls-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 1.5rem 0 3rem 0;
          padding: 1.2rem 0;
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .news-tabs { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .news-tab-link {
          background: none;
          border: none;
          padding: 0;
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--color-text-muted);
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }
        .news-tab-link.active {
          color: var(--color-primary);
          border-bottom-color: var(--color-accent);
        }

        .news-search {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--color-background);
          border: 1px solid var(--color-border);
          padding: 0.5rem 1rem;
          width: 280px;
        }
        .news-search input {
          border: none;
          background: none;
          outline: none;
          font-size: 0.85rem;
          width: 100%;
          color: var(--color-text);
        }

        .news-feed { margin-top: 1rem; }
        .featured-article { cursor: pointer; transition: transform 0.2s; margin-bottom: 4rem; }
        .featured-article:hover { transform: translateY(-2px); }
        .sub-article { cursor: pointer; transition: transform 0.2s; }
        
        .read-more {
          background: none;
          border: none;
          color: var(--color-secondary);
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
          padding: 0;
        }

        .category-tag { font-family: var(--font-sans); font-size: 0.7rem; font-weight: 800; color: var(--color-secondary); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 0.8rem; }
        .featured-article h2 { font-size: 2.4rem; margin-bottom: 1.2rem; line-height: 1.1; font-family: var(--font-serif); }
        .featured-img { width: 100%; height: 320px; object-fit: cover; margin: 1.2rem 0; border-radius: 4px; }
        .excerpt { 
          font-size: 1.2rem; 
          line-height: 1.6;
          color: var(--color-text); 
          margin-bottom: 1.5rem;
          font-family: var(--font-serif);
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .small .excerpt {
          -webkit-line-clamp: 3;
          font-size: 0.95rem;
        }
        .article-meta { font-size: 0.85rem; color: var(--color-text-muted); border-top: 1px solid var(--color-border); padding-top: 1rem; font-weight: 600; text-transform: uppercase; }
        .sub-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 3rem; margin-top: 3rem; padding-top: 3rem; border-top: 4px double var(--color-border); }
        .sub-article h3 { font-size: 1.4rem; margin-bottom: 1rem; font-family: var(--font-serif); line-height: 1.2; }
        .sidebar-title { text-transform: uppercase; font-size: 0.9rem; letter-spacing: 1.5px; font-weight: 800; border-bottom: 2px solid var(--color-primary); padding-bottom: 0.5rem; margin-bottom: 1.5rem; }
        .date-display { font-family: var(--font-serif); font-style: italic; color: var(--color-text-muted); }
        .links-list li { margin-bottom: 0.8rem; }
        .links-list a { font-weight: 600; text-decoration: none; color: var(--color-text); }
        .links-list a:hover { color: var(--color-secondary); text-decoration: underline; }

        .empty-state { padding: 4rem 2rem; text-align: center; color: var(--color-text-muted); border: 2px dashed var(--color-border); }

        @media (max-width: 768px) {
          .news-controls-row { flex-direction: column; align-items: stretch; }
          .news-search { width: 100%; }
          .featured-article h2 { font-size: 2.2rem; }
        }
      `}</style>
    </div>
  );
};

export default NewsFeed;
