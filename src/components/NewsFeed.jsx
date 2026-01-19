import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, ArrowRight } from 'lucide-react';

const NewsFeed = ({ news }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  if (!news || news.length === 0) return <div className="news-feed">Nenhuma notícia publicada.</div>;

  const featured = news[0];
  const others = news.slice(1);

  return (
    <div className="news-feed">
      <div className="main-grid">
        <section className="featured-column">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="featured-article"
            onClick={() => setSelectedArticle(featured)}
          >
            <div className="category-tag">{featured.category}</div>
            <h2>{featured.title}</h2>
            {featured.image && <img src={featured.image} alt={featured.title} className="featured-img" />}
            <p className="excerpt">{featured.excerpt}</p>
            <div className="article-meta">
              <span>{featured.date}</span> • <span>Por {featured.author}</span>
            </div>
            <button className="read-more">Ler na integra <ArrowRight size={14} /></button>
          </motion.article>

          <div className="sub-grid">
            {others.map((newsItem, idx) => (
              <motion.article
                key={newsItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (idx + 1) }}
                className="sub-article"
                onClick={() => setSelectedArticle(newsItem)}
              >
                <div className="category-tag small">{newsItem.category}</div>
                <h3>{newsItem.title}</h3>
                <p className="excerpt small">{newsItem.excerpt}</p>
                <div className="article-meta small">
                  {newsItem.date}
                </div>
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
              <li><a href="#">Diário Oficial do Estado</a></li>
              <li><a href="#">Jurisprudência TJSP</a></li>
              <li><a href="#">Portal do Cooperado OAB</a></li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Full Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="article-modal-overlay"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="article-modal-content"
              onClick={e => e.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setSelectedArticle(null)}><X size={24} /></button>

              <div className="modal-header">
                <div className="category-tag">{selectedArticle.category}</div>
                <h1>{selectedArticle.title}</h1>
                <div className="modal-meta">
                  <div className="meta-item"><Calendar size={16} /> {selectedArticle.date}</div>
                  <div className="meta-item"><User size={16} /> Por {selectedArticle.author || 'Redação Hermeneuta'}</div>
                </div>
              </div>

              {selectedArticle.image && <img src={selectedArticle.image} alt={selectedArticle.title} className="modal-img" />}

              <div className="modal-body">
                <p className="lead-text">{selectedArticle.excerpt}</p>
                <div className="full-text">
                  <p>Este é o conteúdo integral da matéria. No sistema Hermeneuta, as notícias são apresentadas com foco na clareza e precisão jurídica para os profissionais do Vale do Ribeira.</p>
                  <p>As atualizações legislativas e decisões judiciais recentes são fundamentais para a prática advocatícia regional, especialmente em áreas como o Direito Rural e Ambiental, pilares da nossa economia local.</p>
                  <p>Fique atento às próximas edições para mais detalhes sobre os desdobramentos deste tema.</p>
                </div>
              </div>

              <div className="modal-footer">
                <div className="footer-rule"></div>
                <p>&copy; Hermeneuta - Todos os direitos reservados</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
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

        /* Modal Styles */
        .article-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 2rem;
          z-index: 1000;
          overflow-y: auto;
        }

        .article-modal-content {
          background: #fdfaf5;
          width: 100%;
          max-width: 800px;
          padding: 4rem;
          position: relative;
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
          border: 1px solid var(--color-primary);
        }

        .close-modal {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text-muted);
        }

        .modal-header h1 {
          font-size: 3rem;
          margin: 1.5rem 0;
          line-height: 1.1;
        }

        .modal-meta {
          display: flex;
          gap: 2rem;
          padding: 1rem 0;
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          margin-bottom: 2rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--color-text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }

        .modal-img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          margin-bottom: 2rem;
          filter: grayscale(0.2);
        }

        .modal-body {
          font-size: 1.25rem;
          line-height: 1.6;
          color: var(--color-text);
        }

        .lead-text {
          font-weight: 700;
          margin-bottom: 2rem;
          color: var(--color-primary);
        }

        .full-text p {
          margin-bottom: 1.5rem;
        }

        .modal-footer {
          margin-top: 4rem;
          text-align: center;
        }

        .footer-rule {
          height: 1px;
          background: var(--color-border);
          margin-bottom: 1rem;
        }

        .modal-footer p {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .article-modal-content { padding: 2rem; }
          .modal-header h1 { font-size: 2rem; }
          .modal-meta { flex-direction: column; gap: 0.5rem; }
        }

        /* Existing News Styles */
        .category-tag { font-family: var(--font-sans); font-size: 0.7rem; font-weight: 800; color: var(--color-secondary); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 0.5rem; }
        .featured-article h2 { font-size: 2.5rem; margin-bottom: 1rem; }
        .featured-img { width: 100%; height: 400px; object-fit: cover; margin: 1.5rem 0; filter: grayscale(0.2); }
        .excerpt { font-size: 1.1rem; color: var(--color-text); margin-bottom: 1rem; }
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
