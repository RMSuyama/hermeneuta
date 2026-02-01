import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, ArrowLeft, Share2, Edit } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const NewsFeed = ({ news, editors, isAuthenticated }) => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  if (!news || news.length === 0) return <div className="news-feed">Nenhuma notícia publicada.</div>;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copiado para a área de transferência!');
  };

  // Article View (if ID is present)
  if (id) {
    const selectedArticle = news.find(n => n.id.toString() === id);

    if (!selectedArticle) {
      return (
        <div className="news-feed">
          <p>Notícia não encontrada.</p>
          <Link href="/" className="back-btn"><ArrowLeft size={16} /> Voltar para Notícias</Link>
        </div>
      );
    }

    const author = (editors || []).find(e => e.id === selectedArticle.authorId) ||
      (editors || []).find(e => e.name === selectedArticle.author) ||
      { name: selectedArticle.author || 'Redação', role: 'Colaborador', bio: '', avatar: '' };

    return (
      <div className="article-page-view">
        <Link href="/" className="back-btn">
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

          {selectedArticle.image && (
            <div className="article-image-container">
              <img src={selectedArticle.image} alt={selectedArticle.title} />
            </div>
          )}

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
        </motion.article>

        <style jsx>{`
          .article-page-view {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem 0;
            animation: fadeIn 0.3s ease-in;
          }

          /* ... (existing styles) ... */

          .author-profile {
            margin-top: 4rem;
            padding-top: 2rem;
            border-top: 1px solid var(--color-border);
            display: flex;
            gap: 1.5rem;
            align-items: flex-start;
            background: #f9f9f9;
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
          .action-btn.edit {
             color: var(--color-primary);
          }

          .article-image-container img {
            width: 100%;
            height: auto;
            max-height: 350px;
            object-fit: cover;
            border-radius: 4px;
            margin-bottom: 3rem;
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

          .article-citation strong {
            font-weight: 700;
            color: var(--color-primary);
            font-style: normal;
          }

          .article-body {
            font-family: var(--font-serif);
            font-size: 1.2rem;
            line-height: 1.8;
            color: #1a1a1a;
            text-align: justify;
          }
          
          /* Rich Text Content Styles */
          .article-body p { margin-bottom: 1.5rem; }
          .article-body h2 { font-size: 1.8rem; margin: 2rem 0 1rem; }
          .article-body h3 { font-size: 1.5rem; margin: 1.5rem 0 1rem; }
          .article-body ul, .article-body ol { margin-bottom: 1.5rem; padding-left: 2rem; }
          .article-body li { margin-bottom: 0.5rem; }
          .article-body a { color: var(--color-secondary); text-decoration: underline; }
          .article-body strong { font-weight: 700; }
          .article-body em { font-style: italic; }
          .article-body blockquote { border-left: 4px solid var(--color-secondary); padding-left: 1rem; font-style: italic; margin-bottom: 1.5rem; }

          @media (max-width: 768px) {
            .article-title { font-size: 2rem; }
            .author-profile { flex-direction: column; align-items: center; text-align: center; }
          }
        `}</style>
      </div>
    );
  }

  const featured = news[0];
  const others = news.slice(1);

  // List View (Feed)
  return (
    <div className="news-feed">
      <div className="main-grid">
        <section className="featured-column">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="featured-article"
          >
            <Link href={`/news/${featured.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="category-tag">{featured.category}</div>
              <h2>{featured.title}</h2>
              {featured.image && <img src={featured.image} alt={featured.title} className="featured-img" />}
              <div className="excerpt" dangerouslySetInnerHTML={{ __html: featured.excerpt || (featured.content ? featured.content.substring(0, 180) + '...' : '') }} />
              <div className="article-meta">
                <span>{featured.date}</span> • <span>Por {featured.author}</span>
              </div>
              <button className="read-more">Ler na integra <ArrowRight size={14} /></button>
            </Link>
          </motion.article>

          <div className="sub-grid">
            {others.map((newsItem, idx) => (
              <motion.article
                key={newsItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (idx + 1) }}
                className="sub-article"
              >
                <Link href={`/news/${newsItem.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
        /* Existing News Styles (Re-used) */
        .news-feed { margin-top: 1rem; }
        .featured-article { cursor: pointer; transition: transform 0.2s; }
        .featured-article:hover { transform: translateY(-2px); }
        .sub-article { cursor: pointer; transition: transform 0.2s; }
        .sub-article:hover { transform: translateY(-2px); }
        
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
          margin-top: 1rem;
          cursor: pointer;
        }

        .category-tag { font-family: var(--font-sans); font-size: 0.7rem; font-weight: 800; color: var(--color-secondary); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 0.5rem; }
        .featured-article h2 { font-size: 2.5rem; margin-bottom: 1rem; }
        .featured-img { width: 100%; height: 250px; object-fit: cover; margin: 1.5rem 0; filter: grayscale(0.2); }
        .excerpt { 
          font-size: 1.1rem; 
          color: var(--color-text); 
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .small .excerpt {
          -webkit-line-clamp: 3;
        }
        .article-meta { font-size: 0.85rem; color: var(--color-text-muted); border-top: 1px solid var(--color-border); padding-top: 0.5rem; }
        .sub-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 2rem; margin-top: 3rem; padding-top: 2rem; border-top: 4px double var(--color-border); }
        .sub-article h3 { font-size: 1.25rem; margin-bottom: 0.75rem; }
        .sidebar-title { text-transform: uppercase; font-size: 0.9rem; letter-spacing: 1px; border-bottom: 2px solid var(--color-primary); padding-bottom: 0.5rem; margin-bottom: 1rem; }
        .date-display { font-family: var(--font-serif); font-style: italic; color: var(--color-text-muted); }
        .links-list li { margin-bottom: 0.5rem; }
        .links-list a:hover { color: var(--color-secondary); text-decoration: underline; }
      `}</style>
    </div>
  );
};

export default NewsFeed;
