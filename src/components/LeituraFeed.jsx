import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, User, Tag, ExternalLink } from 'lucide-react';

const LeituraFeed = ({ leituras }) => {
    if (!leituras || leituras.length === 0) return <div className="no-data">Nenhuma sugestão de leitura cadastrada.</div>;

    return (
        <div className="leitura-feed">
            <div className="section-header">
                <h2 className="section-title">Biblioteca Hermeneuta</h2>
                <p className="page-intro">
                    Curadoria de livros, artigos e manuais indispensáveis para o aprimoramento contínuo do profissional jurídico.
                </p>
            </div>

            <div className="leituras-grid">
                {leituras.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="leitura-card"
                    >
                        <div className="card-top">
                            <span className={`type-tag ${item.type.toLowerCase()}`}>{item.type}</span>
                            <span className="cat-tag">{item.category}</span>
                        </div>

                        <div className="card-main">
                            <BookOpen size={40} className="book-icon" />
                            <h3 className="leitura-title">{item.title}</h3>
                            <div className="leitura-author">
                                <User size={14} />
                                <span>{item.author}</span>
                            </div>
                            <p className="leitura-description">{item.description}</p>
                        </div>

                        <div className="card-footer">
                            <a href={item.link} className="leitura-link">
                                Ver Indicação
                                <ExternalLink size={16} />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
        .leitura-feed { margin-top: 2rem; }
        
        .section-header { text-align: center; margin-bottom: 3rem; max-width: 800px; margin: 0 auto 3rem; }
        .section-title { font-size: 2.5rem; margin-bottom: 1rem; }
        .page-intro { color: var(--color-text-muted); font-size: 1.1rem; }

        .leituras-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }

        .leitura-card { background: white; border: 1px solid var(--color-border); padding: 2rem; position: relative; transition: all 0.3s ease; display: flex; flex-direction: column; }
        .leitura-card:hover { transform: translateY(-5px); box-shadow: 10px 10px 0 var(--color-primary); }

        .card-top { display: flex; justify-content: space-between; margin-bottom: 1.5rem; }
        .type-tag { font-size: 0.6rem; font-weight: 800; padding: 0.2rem 0.5rem; background: var(--color-primary); color: white; letter-spacing: 1px; }
        .type-tag.artigo { background: var(--color-secondary); }
        .cat-tag { font-size: 0.65rem; font-weight: 700; color: var(--color-text-muted); border-bottom: 1px solid var(--color-border); }

        .card-main { flex-grow: 1; }
        .book-icon { color: var(--color-primary); opacity: 0.1; position: absolute; top: 2rem; right: 2rem; z-index: 0; }
        .leitura-title { font-size: 1.25rem; font-family: var(--font-serif); margin-bottom: 0.5rem; position: relative; z-index: 1; }
        .leitura-author { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--color-text-muted); font-weight: 600; margin-bottom: 1rem; }
        .leitura-description { font-size: 0.95rem; line-height: 1.5; color: var(--color-text); }

        .card-footer { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border); }
        .leitura-link { display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: var(--color-primary); transition: color 0.2s; }
        .leitura-link:hover { color: var(--color-secondary); }

        @media (max-width: 600px) {
          .leituras-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
};

export default LeituraFeed;
