import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gavel, Calendar, X, ExternalLink, FileText } from 'lucide-react';

const JurisprudenciaFeed = ({ jurisprudencias }) => {
    const [selectedJuri, setSelectedJuri] = useState(null);

    if (!jurisprudencias || jurisprudencias.length === 0) return <div className="no-data">Nenhuma jurisprudência cadastrada.</div>;

    return (
        <div className="jurisprudencia-feed">
            <div className="section-header">
                <h2 className="section-title">Jurisprudência em Foco</h2>
                <p className="page-intro">
                    Decisões selecionadas dos tribunais superiores e regionais com impacto direto na advocacia do Vale do Ribeira.
                </p>
            </div>

            <div className="juris-list">
                <div className="list-headers">
                    <span className="header-item">Tribunal</span>
                    <span className="header-item">Processo</span>
                    <span className="header-item flex-grow">Ementa / Resumo</span>
                    <span className="header-item">Data</span>
                    <span className="header-item">Ação</span>
                </div>

                {jurisprudencias.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="juris-row"
                        onClick={() => setSelectedJuri(item)}
                    >
                        <div className="col-tribunal">
                            <span className="tribunal-pill">{item.tribunal}</span>
                        </div>

                        <div className="col-processo">
                            <span className="proc-num">{item.processo}</span>
                            <span className="relator">{item.relator}</span>
                        </div>

                        <div className="col-ementa flex-grow">
                            <p>{item.ementa}</p>
                        </div>

                        <div className="col-date">
                            <Calendar size={14} className="icon" />
                            <span>{item.date}</span>
                        </div>

                        <div className="col-action">
                            <button className="view-btn">
                                <FileText size={16} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedJuri && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-overlay"
                        onClick={() => setSelectedJuri(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="juris-modal"
                            onClick={e => e.stopPropagation()}
                        >
                            <button className="close-modal" onClick={() => setSelectedJuri(null)}><X size={24} /></button>

                            <div className="modal-header">
                                <span className="tribunal-tag">{selectedJuri.tribunal}</span>
                                <h1>{selectedJuri.processo}</h1>
                                <p className="relator-name">Relator(a): {selectedJuri.relator}</p>
                            </div>

                            <div className="modal-body">
                                <h3>EMENTA</h3>
                                <p className="ementa-full">{selectedJuri.ementa}</p>
                            </div>

                            <div className="modal-footer">
                                <a href={selectedJuri.link} className="external-btn">
                                    Acessar Acórdão Integral
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
        .jurisprudencia-feed { margin-top: 2rem; }
        
        .section-header { text-align: center; margin-bottom: 3rem; max-width: 800px; margin: 0 auto 3rem; }
        .section-title { font-size: 2.5rem; margin-bottom: 1rem; }
        .page-intro { color: var(--color-text-muted); font-size: 1.1rem; }

        .juris-list { border-top: 2px solid var(--color-primary); background: white; }
        .list-headers { display: flex; padding: 1rem 1.5rem; background: var(--color-background); border-bottom: 1px solid var(--color-border); font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); }
        .header-item { width: 150px; }
        .flex-grow { flex-grow: 1; }

        .juris-row { display: flex; align-items: center; padding: 1.5rem; border-bottom: 1px solid var(--color-border); transition: background 0.2s; cursor: pointer; }
        .juris-row:hover { background: #fafafa; }

        .col-tribunal { width: 150px; }
        .tribunal-pill { font-size: 0.65rem; font-weight: 800; padding: 0.15rem 0.5rem; border: 1px solid var(--color-primary); color: var(--color-primary); border-radius: 2px; }

        .col-processo { width: 150px; }
        .proc-num { font-size: 0.8rem; font-weight: 700; display: block; }
        .relator { font-size: 0.65rem; color: var(--color-text-muted); }

        .col-ementa { flex-grow: 1; padding-right: 2rem; }
        .col-ementa p { font-size: 0.9rem; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        .col-date { width: 120px; display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; }
        .icon { color: var(--color-text-muted); }

        .col-action { width: 50px; text-align: right; }
        .view-btn { background: none; border: none; color: var(--color-text-muted); cursor: pointer; transition: color 0.2s; }
        .view-btn:hover { color: var(--color-secondary); }

        /* Modal */
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; padding: 2rem; z-index: 1000; }
        .juris-modal { background: #fdfaf5; width: 100%; max-width: 700px; padding: 3rem; position: relative; border: 1px solid var(--color-primary); box-shadow: 20px 20px 0 rgba(26, 35, 61, 0.2); }
        .close-modal { position: absolute; top: 1rem; right: 1rem; background: none; border: none; cursor: pointer; color: var(--color-text-muted); }
        .tribunal-tag { font-size: 0.7rem; font-weight: 800; color: var(--color-secondary); text-transform: uppercase; letter-spacing: 2px; }
        .modal-header h1 { font-size: 1.75rem; font-family: var(--font-serif); margin: 0.5rem 0; }
        .relator-name { font-size: 0.9rem; color: var(--color-text-muted); font-weight: 600; }
        .modal-body { margin: 2rem 0; padding-top: 2rem; border-top: 1px solid var(--color-border); }
        .modal-body h3 { font-size: 0.8rem; letter-spacing: 2px; color: var(--color-text-muted); margin-bottom: 1rem; }
        .ementa-full { font-size: 1.1rem; line-height: 1.6; font-family: var(--font-sans); }
        .external-btn { display: inline-flex; align-items: center; gap: 0.5rem; background: var(--color-primary); color: white; padding: 0.75rem 1.5rem; font-weight: 700; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; cursor: pointer; transition: background 0.2s; }
        .external-btn:hover { background: var(--color-secondary); }

        @media (max-width: 968px) {
          .list-headers { display: none; }
          .juris-row { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
          .col-tribunal, .col-processo, .col-ementa, .col-date, .col-action { width: 100%; padding: 0; }
          .col-action { text-align: left; }
        }
      `}</style>
        </div>
    );
};

export default JurisprudenciaFeed;
