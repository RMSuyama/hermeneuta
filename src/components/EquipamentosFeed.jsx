import React from 'react';
import { Monitor, ShoppingBag, ExternalLink } from 'lucide-react';

const EquipamentosFeed = ({ equipamentos }) => {
  if (!equipamentos || equipamentos.length === 0) return <div>Nenhuma indicação de equipamento.</div>;

  return (
    <div className="equipamentos-feed">
      <div className="section-header">
        <h2 className="section-title">Indicações para Escritório</h2>
        <div className="section-line"></div>
        <p className="section-subtitle">Tecnologia, Mobiliário e Acessórios Selecionados</p>
      </div>

      <div className="equip-grid">
        {equipamentos.map((item) => (
          <div key={item.id} className="equip-card">
            <div className="equip-image">
              <img src={item.image} alt={item.title} />
              <div className="category-badge">{item.category}</div>
            </div>
            <div className="equip-content">
              <h3>{item.title}</h3>
              <p className="description">{item.description}</p>
              <div className="equip-footer">
                <span className="price">{item.price}</span>
                {item.link && item.link !== '#' && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="buy-btn">
                    Comprar <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .equipamentos-feed { padding: 2rem 0; }
        .section-header { text-align: center; margin-bottom: 3rem; }
        .section-title { font-family: var(--font-serif); font-size: 2.5rem; color: var(--color-primary); margin-bottom: 0.5rem; }
        .section-line { width: 60px; height: 3px; background: var(--color-accent); margin: 0 auto 1rem; }
        .section-subtitle { font-family: var(--font-sans); color: var(--color-text-muted); text-transform: uppercase; font-size: 0.9rem; }

        .equip-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }

        .equip-card {
          background: var(--color-background);
          border: 1px solid var(--color-border);
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.2s;
        }

        .equip-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-accent);
        }

        .equip-image {
          height: 200px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.02);
          position: relative;
          overflow: hidden;
        }

        .equip-image img { width: 100%; height: 100%; object-fit: cover; }

        .category-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0,0,0,0.7);
          color: white;
          font-size: 0.7rem;
          padding: 0.3rem 0.6rem;
          border-radius: 4px;
          text-transform: uppercase;
          font-weight: 700;
        }

        .equip-content { padding: 1.5rem; }

        .equip-content h3 {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          color: var(--color-primary);
          margin: 0 0 0.5rem 0;
          line-height: 1.3;
        }

        .description {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin-bottom: 1.5rem;
          height: 3em; /* limit lines roughly */
          overflow: hidden;
        }

        .equip-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--color-border);
          padding-top: 1rem;
        }

        .price {
          font-weight: 700;
          color: var(--color-secondary);
          font-size: 1.1rem;
        }

        .buy-btn {
          background: var(--color-primary);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: background 0.2s;
        }
        .buy-btn:hover { background: var(--color-secondary); }
      `}</style>
    </div>
  );
};

export default EquipamentosFeed;
