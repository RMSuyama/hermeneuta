import React from 'react';
import { NavLink } from 'react-router-dom';
import { Newspaper, Phone, Info, GraduationCap, Link, Gavel, BookOpen, Calendar } from 'lucide-react';

const Navigation = () => {
  const links = [
    { id: 'news', path: '/', label: 'Notícias', icon: <Newspaper size={18} /> },
    { id: 'concursos', path: '/concursos', label: 'Concursos', icon: <GraduationCap size={18} /> },
    { id: 'eventos', path: '/eventos', label: 'Eventos', icon: <Calendar size={18} /> },
    { id: 'links', path: '/links', label: 'Links Úteis', icon: <Link size={18} /> },
    { id: 'leituras', path: '/leituras', label: 'Leituras', icon: <BookOpen size={18} /> },
    { id: 'contacts', path: '/contacts', label: 'Contatos', icon: <Phone size={18} /> },
    { id: 'about', path: '/about', label: 'Sobre', icon: <Info size={18} /> },
  ];

  return (
    <nav className="nav-bar">
      <div className="container">
        <div className="nav-links">
          {links.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) => `nav-link-btn ${isActive ? 'active' : ''}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
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
          text-decoration: none; /* Ensure no underline from Link */
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
