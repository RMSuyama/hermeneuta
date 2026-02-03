import React from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Building, ExternalLink, Globe } from 'lucide-react';

const VagasFeed = ({ items = [] }) => {
    const displayVagas = items || [];

    const handleShare = (vaga) => {
        const text = `Vaga: ${vaga.title} em ${vaga.company} (${vaga.location}). Confira no Hermeneuta!`;
        if (navigator.share) {
            navigator.share({
                title: 'Vaga de Emprego - Hermeneuta',
                text: text,
                url: window.location.href
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(`${text} ${window.location.href}`);
            alert('Detalhes da vaga copiados para a área de transferência!');
        }
    };

    return (
        <div className="vagas-feed fade-in">
            <div className="section-header">
                <h2 className="section-title">Vagas & Oportunidades</h2>
                <div className="section-line"></div>
                <p className="section-subtitle">Conectando talentos jurídicos no Vale do Ribeira</p>
            </div>

            {/* Remote Jobs Highlight */}
            <div className="remote-jobs-highlight">
                <div className="remote-card">
                    <div className="remote-icon">
                        <Globe size={32} />
                    </div>
                    <div className="remote-content">
                        <h3>Vagas Remotas (Home Office)</h3>
                        <p>
                            Expandimos nossa curadoria para oportunidades remotas em todo o Brasil.
                            Confira vagas atualizadas diariamente no LinkedIn para profissionais jurídicos.
                        </p>
                        <a
                            href="https://www.linkedin.com/jobs/search/?keywords=advogado%20remoto&location=Brasil&f_WT=2"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="linkedin-btn"
                        >
                            Ver Vagas no LinkedIn <ExternalLink size={14} style={{ marginLeft: '5px' }} />
                        </a>
                    </div>
                </div>
            </div>

            <h3 className="local-title">Oportunidades Locais & Regionais</h3>

            {displayVagas.length === 0 ? (
                <div className="empty-state">
                    <p>Nenhuma vaga local cadastrada no momento.</p>
                    <small>Fique atento às atualizações ou confira as vagas remotas acima.</small>
                </div>
            ) : (
                <div className="vagas-list">
                    {displayVagas.map((vaga) => (
                        <div key={vaga.id} className="vaga-card">
                            <div className="vaga-main">
                                <div className="vaga-header">
                                    <h3>{vaga.title}</h3>
                                    <span className="vaga-type">{vaga.type}</span>
                                </div>

                                <div className="vaga-company">
                                    <Building size={16} /> <span>{vaga.company}</span>
                                </div>

                                <div className="vaga-details">
                                    <div className="detail-item">
                                        <MapPin size={14} /> {vaga.location}
                                    </div>
                                    <div className="detail-item">
                                        <DollarSign size={14} /> {vaga.salary}
                                    </div>
                                    <div className="detail-item">
                                        <Clock size={14} /> {vaga.postedAt}
                                    </div>
                                </div>

                                <p className="vaga-desc">{vaga.description}</p>
                            </div>

                            <div className="vaga-actions">
                                {vaga.link ? (
                                    <a href={vaga.link} target="_blank" rel="noopener noreferrer" className="apply-btn" style={{ textAlign: 'center', textDecoration: 'none', display: 'inline-block' }}>
                                        Candidatar-se
                                    </a>
                                ) : (
                                    <button className="apply-btn">Candidatar-se</button>
                                )}
                                <button className="share-btn-card" onClick={() => handleShare(vaga)}>Compartilhar</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style jsx>{`
        .vagas-feed { padding: 2rem 0; max-width: 800px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 3rem; }
        .section-title { font-family: var(--font-serif); font-size: 2.5rem; color: var(--color-primary); margin-bottom: 0.5rem; }
        .section-line { width: 60px; height: 3px; background: var(--color-accent); margin: 0 auto 1rem; }
        .section-subtitle { font-family: var(--font-sans); color: var(--color-text-muted); text-transform: uppercase; font-size: 0.9rem; }

        /* Remote Card Styles */
        .remote-jobs-highlight { margin-bottom: 4rem; }
        .remote-card {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: white;
            padding: 2rem;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 2rem;
            border: 1px solid var(--color-accent);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        
        .remote-icon {
            background: rgba(197, 160, 34, 0.2);
            padding: 1rem;
            border-radius: 50%;
            color: var(--color-accent);
            flex-shrink: 0;
        }

        .remote-content h3 {
            font-family: var(--font-serif);
            font-size: 1.5rem;
            color: var(--color-accent);
            margin-bottom: 0.5rem;
        }

        .remote-content p {
            color: #ccc;
            margin-bottom: 1.5rem;
            line-height: 1.5;
            font-size: 0.95rem;
        }

        .linkedin-btn {
            display: inline-flex;
            align-items: center;
            background: var(--color-accent);
            color: #121212;
            padding: 0.8rem 1.5rem;
            text-decoration: none;
            font-weight: 700;
            border-radius: 4px;
            font-size: 0.9rem;
            transition: all 0.2s;
        }

        .linkedin-btn:hover {
            background: white;
            transform: translateY(-2px);
        }

        .local-title {
            font-family: var(--font-serif);
            font-size: 1.8rem;
            color: var(--color-primary);
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--color-border);
        }

        .empty-state {
            text-align: center;
            color: var(--color-text-muted);
            padding: 3rem;
            background: rgba(0,0,0,0.02);
            border-radius: 8px;
        }

        .vagas-list { display: flex; flex-direction: column; gap: 2rem; }

        .vaga-card {
          background: white;
          border: 1px solid var(--color-border);
          padding: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2rem;
          transition: all 0.2s;
        }

        .vaga-card:hover {
          border-color: var(--color-accent);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .vaga-main { flex: 1; }

        .vaga-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        .vaga-header h3 { font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-primary); margin: 0; }
        
        .vaga-type { 
          font-size: 0.7rem; 
          text-transform: uppercase; 
          background: #f0f0f0; 
          padding: 0.2rem 0.6rem; 
          border-radius: 4px; 
          font-weight: 600; 
          color: var(--color-text-muted);
        }

        .vaga-company { display: flex; align-items: center; gap: 0.5rem; font-weight: 600; color: var(--color-secondary); margin-bottom: 1rem; }

        .vaga-details { display: flex; gap: 1.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
        .detail-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.9rem; color: var(--color-text-muted); }

        .vaga-desc { line-height: 1.6; color: var(--color-text); }

        .vaga-actions { display: flex; flex-direction: column; gap: 0.5rem; min-width: 140px; }
        
        .apply-btn {
          background: var(--color-primary);
          color: white;
          border: none;
          padding: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          text-transform: uppercase;
          font-size: 0.8rem;
        }
        .apply-btn:hover { background: var(--color-secondary); }

        .share-btn-card {
           background: transparent;
           border: 1px solid var(--color-border);
           padding: 0.6rem;
           cursor: pointer;
           font-size: 0.8rem;
           color: var(--color-text-muted);
        }
        .share-btn-card:hover { border-color: var(--color-secondary); color: var(--color-secondary); }

        @media (max-width: 768px) {
          .vaga-card { flex-direction: column; }
          .vaga-actions { width: 100%; flex-direction: row; }
          .apply-btn, .share-btn-card { flex: 1; text-align: center; }
          .remote-card { flex-direction: column; text-align: center; padding: 1.5rem; }
          .remote-content p { margin: 0 auto 1.5rem; }
        }
      `}</style>
        </div>
    );
};

export default VagasFeed;
