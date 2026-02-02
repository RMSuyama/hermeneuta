import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Newspaper, Phone, Info, GraduationCap, Link as ExternalLink, Gavel, BookOpen, Calendar, Building2, Briefcase, Bus, Monitor, ScrollText, Trophy, Building, Briefcase as OfficeIcon, MapPin } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const links = [
    { id: 'news', path: '/', label: 'Notícias', icon: <Newspaper size={16} /> },
    { id: 'instituicoes', path: '/instituicoes', label: 'Instituições', icon: <Building size={16} /> },
    { id: 'vagas', path: '/vagas', label: 'Vagas', icon: <Briefcase size={16} /> },
    { id: 'horarios', path: '/horarios', label: 'Ônibus', icon: <Bus size={16} /> },
    { id: 'equipamentos', path: '/equipamentos', label: 'Escritório', icon: <OfficeIcon size={16} /> },
    { id: 'reservas', path: '/reservas', label: 'Reservas', icon: <MapPin size={16} /> },
    { id: 'academico', path: '/academico', label: 'Acadêmico', icon: <GraduationCap size={16} /> },
    { id: 'concursos', path: '/concursos', label: 'Concursos', icon: <Trophy size={16} /> },
    { id: 'eventos', path: '/eventos', label: 'Eventos', icon: <Calendar size={16} /> },
    { id: 'links', path: '/links', label: 'Links Úteis', icon: <ExternalLink size={16} /> },
    { id: 'leituras', path: '/leituras', label: 'Leituras', icon: <BookOpen size={16} /> },
    { id: 'contacts', path: '/contacts', label: 'Contatos', icon: <Phone size={16} /> },
    { id: 'about', path: '/about', label: 'Sobre', icon: <Info size={16} /> },
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
          background: var(--color-background);
          position: sticky;
          top: 0;
          z-index: 100;
          transition: all 0.3s ease;
        }

        .nav-links {
          display: flex;
          justify-content: center;
          gap: 0.8rem;
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
          color: var(--color-accent);
          border-bottom: 2px solid var(--color-accent);
          background: rgba(197, 160, 34, 0.1);
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
