import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Briefcase, GraduationCap, Share2 } from 'lucide-react';

const ConcursosFeed = ({ concursos = [] }) => {
  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'Concursos - Hermeneuta',
        url: url
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copiado para a área de transferência!');
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'MUNICIPAL': return 'var(--color-secondary)';
      case 'ESTADUAL': return 'var(--color-primary)';
      case 'FEDERAL': return '#003366';
      default: return 'var(--color-text-muted)';
    }
  };

  if (!concursos || concursos.length === 0) {
    return (
      <div className="concursos-feed">
        <div className="section-header">
          <h2 className="section-title">Oportunidades & Concursos</h2>
          <p className="page-intro">Nenhum concurso encontrado no momento. Verifique novamente mais tarde.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="concursos-feed">
      <div className="section-header">
        <h2 className="section-title">Oportunidades & Concursos</h2>
        <p className="page-intro">
          Acompanhe as principais aberturas de concursos públicos para a área jurídica e administrativa no Vale do Ribeira, SP e Federal em formato de lista simplificada.
        </p>
        <button onClick={handleShare} className="share-btn-header" title="Compartilhar esta página">
          <Share2 size={18} /> Compartilhar Página
        </button>
      </div>

      <div className="concursos-list">
        <div className="list-headers">
          <span className="header-item">Nível</span>
          <span className="header-item flex-grow">Entidade & Cargo</span>
          <span className="header-item">Vagas</span>
          <span className="header-item">Salário</span>
          <span className="header-item">Status</span>
          <span className="header-item">Ação</span>
        </div>

        {concursos.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="concurso-row"
          >
            <div className="col-level">
              <span className="level-pill" style={{ borderColor: getLevelColor(item.nivel), color: getLevelColor(item.nivel) }}>
                {item.nivel}
              </span>
            </div>

            <div className="col-info flex-grow">
              <span className="entidade">{item.entidade}</span>
              <h3 className="cargo">{item.cargo}</h3>
            </div>

            <div className="col-vagas">
              <Briefcase size={14} className="icon" />
              <span>{item.vagas}</span>
            </div>

            <div className="col-salario">
              <GraduationCap size={14} className="icon" />
              <span>{item.remuneracao}</span>
            </div>

            <div className="col-status">
              <span className={`status-text ${item.status?.toLowerCase().includes('aberta') ? 'open' : ''}`}>
                {item.status}
              </span>
            </div>

            <div className="col-action">
              <a href={item.link} className="row-link">
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .concursos-feed { margin-top: 2rem; }
        
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
          max-width: 800px;
          margin: 0 auto 3rem;
        }

        .section-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .page-intro {
          color: var(--color-text-muted);
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
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

        .concursos-list {
          border-top: 2px solid var(--color-primary);
          background: white;
        }

        .list-headers {
          display: flex;
          padding: 1rem 1.5rem;
          background: var(--color-background);
          border-bottom: 1px solid var(--color-border);
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--color-text-muted);
        }

        .header-item { width: 120px; }
        .flex-grow { flex-grow: 1; }

        .concurso-row {
          display: flex;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--color-border);
          transition: background 0.2s;
        }

        .concurso-row:hover {
          background: #fafafa;
        }

        .col-level { width: 120px; }
        .level-pill {
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.15rem 0.5rem;
          border: 1px solid;
          border-radius: 2px;
        }

        .col-info { flex-grow: 1; }
        .entidade {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-text-muted);
          display: block;
        }
        .cargo {
          font-size: 1.1rem;
          font-family: var(--font-serif);
          margin-top: 0.25rem;
        }

        .col-vagas, .col-salario {
          width: 150px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .icon { color: var(--color-text-muted); }

        .col-status { width: 150px; }
        .status-text {
          font-size: 0.8rem;
          font-weight: 600;
        }
        .status-text.open {
          color: #1e7e34;
        }

        .col-action { width: 50px; text-align: right; }
        .row-link {
          color: var(--color-text-muted);
          transition: color 0.2s;
        }
        .row-link:hover {
          color: var(--color-secondary);
        }

        @media (max-width: 968px) {
          .list-headers { display: none; }
          .concurso-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .col-level, .col-vagas, .col-salario, .col-status, .col-action {
            width: 100%;
          }
          .col-action { text-align: left; margin-top: 0.5rem; }
        }
      `}</style>
    </div>
  );
};

export default ConcursosFeed;
