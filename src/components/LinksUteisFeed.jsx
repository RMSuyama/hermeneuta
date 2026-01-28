import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Book, Gavel, Scale, AlertCircle, Calculator, Database, Briefcase, FileText, Share2 } from 'lucide-react';

const linksData = [
  // ... existing data ...
  {
    category: "Produtividade, Gestão e Tecnologia Jurídica",
    icon: <ExternalLink size={20} />,
    items: [
      { name: "Legal One (Thomson Reuters)", url: "https://www.thomsonreuters.com.br" },
      { name: "CPJ-3C", url: "https://www.cpj3c.com.br" },
      { name: "Astrea", url: "https://www.astrea.net.br" },
      { name: "Projuris", url: "https://www.projuris.com.br" }
    ]
  }
];

const LinksUteisFeed = () => {
  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'Links Úteis - Hermeneuta',
        url: url
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <div className="links-feed">
      <header className="links-header">
        <h2>Links Úteis & Fontes Oficiais</h2>
        <p>Acesso rápido às principais ferramentas, tribunais e portais jurídicos.</p>
        <button onClick={handleShare} className="share-btn-header" title="Compartilhar esta página">
          <Share2 size={18} /> Compartilhar Página
        </button>
      </header>

      <div className="links-grid">

        {linksData.map((category, idx) => (
          <motion.div
            key={idx}
            className="link-category-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx }}
          >
            <div className="category-header">
              <span className="cat-icon">{category.icon}</span>
              <h3>{category.category}</h3>
            </div>
            <ul className="links-list">
              {category.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .links-feed {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .links-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .links-header h2 {
          color: var(--color-primary);
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .links-header p {
          color: var(--color-text-muted);
          margin-bottom: 1rem;
        }

        .share-btn-header {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: transparent;
            border: 1px solid var(--color-primary);
            color: var(--color-primary);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.8rem;
            font-weight: 600;
            transition: all 0.2s;
        }
        
        .share-btn-header:hover {
            background: var(--color-primary);
            color: white;
        }

        .links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .link-category-card {
          background: white;
          border-top: 4px solid var(--color-secondary);
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          transition: transform 0.2s;
        }
        
        .link-category-card:hover {
          transform: translateY(-5px);
        }

        .category-header {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--color-border);
        }

        .cat-icon {
          color: var(--color-primary);
        }

        .category-header h3 {
          font-size: 1rem;
          color: var(--color-primary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0;
        }

        .links-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .links-list li {
          margin-bottom: 0.8rem;
        }

        .links-list a {
          display: block;
          color: var(--color-text);
          text-decoration: none;
          font-size: 0.95rem;
          padding: 0.4rem;
          border-radius: 4px;
          transition: all 0.2s;
          border-left: 2px solid transparent;
        }

        .links-list a:hover {
          color: var(--color-primary);
          background: #f8f9fa;
          border-left-color: var(--color-secondary);
          padding-left: 0.8rem;
        }

        @media (max-width: 768px) {
          .links-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default LinksUteisFeed;
