import React from 'react';
import { Newspaper, Phone, Info, GraduationCap, Home, Gavel, BookOpen } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const links = [
    { id: 'news', label: 'Notícias', icon: <Newspaper size={18} /> },
    { id: 'concursos', label: 'Concursos', icon: <GraduationCap size={18} /> },

    { id: 'realestate', label: 'Imóveis', icon: <Home size={18} /> },
    { id: 'leituras', label: 'Leituras', icon: <BookOpen size={18} /> },
    { id: 'contacts', label: 'Contatos', icon: <Phone size={18} /> },
    { id: 'about', label: 'Sobre', icon: <Info size={18} /> },
  ];

  return (
    <nav className="nav-bar">
      <div className="container">
        <div className="nav-links">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`nav-link-btn ${activeTab === link.id ? 'active' : ''}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          ))}
        </div>
      </div>
      <style jsx>{`
        .nav-bar {
          border-bottom: 1px solid var(--color-border);
          padding: 1rem 0;
          background: #fdfaf5;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .nav-link-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.75rem;
          color: var(--color-text-muted);
          transition: all 0.3s ease;
          border-bottom: 2px solid transparent;
        }

        .nav-link-btn:hover {
          color: var(--color-secondary);
        }

        .nav-link-btn.active {
          color: var(--color-primary);
          border-bottom: 2px solid var(--color-secondary);
          background: rgba(26, 35, 61, 0.05);
        }

        @media (max-width: 900px) {
          .nav-links { gap: 0.25rem; }
          .nav-link-btn span { display: none; }
          .nav-link-btn { padding: 0.75rem; }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
