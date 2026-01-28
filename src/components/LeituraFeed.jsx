import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, User, ExternalLink, X, Share2 } from 'lucide-react';

const LeituraFeed = ({ leituras }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'Indicações de Leitura - Hermeneuta',
        url: url
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copiado para a área de transferência!');
    }
  };

  if (!leituras || leituras.length === 0) return <div className="leitura-feed">Nenhuma indicação de leitura.</div>;

  return (
    <div className="leitura-feed">
      <div className="section-header">
        <h2 className="section-title">Indicações & Doutrina</h2>
        <div className="header-actions">
          <p>Sugestões de leitura para aprofundamento jurídico e cultural.</p>
          <button onClick={handleShare} className="share-btn-header" title="Compartilhar esta página">
            <Share2 size={16} /> Compartilhar
          </button>
        </div>
      </div>

      <div className="books-grid">
        {leituras.map((book, idx) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx }}
            className="book-card"
          >
            <div className="book-cover-container" onClick={() => setSelectedBook(book)}>
              {book.cover ? (
                <img src={book.cover} alt={book.title} className="book-cover" />
              ) : (
                <div className="book-cover-placeholder">
                  <BookOpen size={48} />
                  <span>Sem Capa</span>
                </div>
              )}
              <div className="hover-overlay">
                <span>Ver Detalhes</span>
              </div>
            </div>

            <div className="book-info">
              <span className="book-category">{book.category || 'Geral'}</span>
              <h3 onClick={() => setSelectedBook(book)}>{book.title}</h3>
              <p className="book-author">por {book.author}</p>

              <div className="book-actions">
                <button className="details-btn" onClick={() => setSelectedBook(book)}>Sinopse</button>
                {book.link && book.link !== '#' && (
                  <a href={book.link} target="_blank" rel="noopener noreferrer" className="buy-btn">
                    <ExternalLink size={14} /> Link
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedBook && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBook(null)}
          >
            <motion.div
              className="book-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setSelectedBook(null)}><X size={24} /></button>

              <div className="modal-content">
                <div className="modal-cover">
                  {selectedBook.cover ? (
                    <img src={selectedBook.cover} alt={selectedBook.title} />
                  ) : (
                    <div className="placeholder-large"><BookOpen size={64} /></div>
                  )}
                </div>

                <div className="modal-details">
                  <span className="modal-category">{selectedBook.category || 'Leitura Recomendada'}</span>
                  <h2>{selectedBook.title}</h2>
                  <h4 className="modal-author"><User size={16} /> {selectedBook.author}</h4>

                  <div className="modal-scroll-area">
                    <p className="modal-synopsis">{selectedBook.synopsis || selectedBook.description}</p>
                  </div>

                  {selectedBook.link && selectedBook.link !== '#' && (
                    <a href={selectedBook.link} target="_blank" rel="noopener noreferrer" className="modal-link-btn">
                      Acessar / Comprar Livro
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .leitura-feed {
          padding: 2rem 0;
        }

        .section-header {
            margin-bottom: 3rem;
            text-align: center;
        }

        .section-title {
            font-size: 2rem;
            color: var(--color-primary);
            margin-bottom: 1rem;
        }

        .header-actions {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }

        .header-actions p {
             color: var(--color-text-muted);
        }

        .share-btn-header {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: transparent;
            border: 1px solid var(--color-primary);
            color: var(--color-primary);
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.75rem;
            font-weight: 600;
            transition: all 0.2s;
        }

        .share-btn-header:hover {
            background: var(--color-primary);
            color: white;
        }

        .books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 2.5rem;
        }

        .book-card {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.2s;
          display: flex;
          flex-direction: column;
        }

        .book-card:hover {
          transform: translateY(-5px);
        }

        .book-cover-container {
          position: relative;
          width: 100%;
          aspect-ratio: 2 / 3;
          background: #f0f0f0;
          cursor: pointer;
          border-radius: 8px; /* Rounded corners for the cover */
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .book-cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .book-cover-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #ccc;
          gap: 0.5rem;
        }

        .hover-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .hover-overlay span {
          color: white;
          font-weight: 600;
          border: 1px solid white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          background: rgba(0,0,0,0.3);
        }

        .book-cover-container:hover .hover-overlay {
          opacity: 1;
        }

        .book-info {
          padding: 1rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .book-category {
          font-size: 0.7rem;
          color: var(--color-secondary);
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 0.3rem;
        }

        .book-info h3 {
          font-size: 1rem;
          margin: 0 0 0.3rem 0;
          color: var(--color-primary);
          line-height: 1.3;
          cursor: pointer;
        }

        .book-info h3:hover {
          text-decoration: underline;
        }

        .book-author {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin-bottom: 1rem;
        }

        .book-actions {
          margin-top: auto;
          display: flex;
          gap: 0.5rem;
        }

        .details-btn, .buy-btn {
          font-size: 0.75rem;
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .details-btn {
          background: #f0f0f0;
          border: none;
          color: var(--color-text);
        }

        .buy-btn {
          background: var(--color-secondary);
          color: white;
          border: none;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.7);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .book-modal {
          background: white;
          width: 100%;
          max-width: 800px;
          border-radius: 8px;
          position: relative;
          overflow: hidden;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
        }

        .close-modal {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 10;
          color: var(--color-text-muted);
        }

        .modal-content {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
          padding: 2rem;
          overflow-y: auto;
        }

        .modal-cover {
            width: 100%;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.15);
        }

        .modal-cover img {
            width: 100%;
            height: auto;
            display: block;
        }

        .placeholder-large {
            background: #f0f0f0;
            width: 100%;
            height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ccc;
        }

        .modal-details {
            display: flex;
            flex-direction: column;
        }

        .modal-category {
            font-size: 0.8rem;
            color: var(--color-secondary);
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
        }

        .modal-details h2 {
            font-size: 2rem;
            margin: 0 0 0.5rem 0;
            line-height: 1.1;
            color: var(--color-primary);
        }

        .modal-author {
            font-size: 1.1rem;
            color: var(--color-text-muted);
            font-weight: 400;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 2rem;
        }

        .modal-synopsis {
            font-size: 1.05rem;
            line-height: 1.6;
            color: var(--color-text);
            margin-bottom: 2rem;
            white-space: pre-wrap;
            text-align: justify;
        }

        .modal-link-btn {
            display: inline-block;
            background: var(--color-primary);
            color: white;
            padding: 1rem 2rem;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 600;
            text-align: center;
            margin-top: auto;
        }

        @media (max-width: 768px) {
            .modal-content { grid-template-columns: 1fr; }
            .modal-cover { max-width: 200px; margin: 0 auto; }
            .modal-details { text-align: center; }
            .modal-author { justify-content: center; }
        }
      `}</style>
    </div>
  );
};

export default LeituraFeed;
