import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Users } from 'lucide-react';

const EventosFeed = ({ eventos }) => {
    if (!eventos || eventos.length === 0) return <div className="eventos-feed">Nenhum evento programado no momento.</div>;

    return (
        <div className="eventos-feed">
            <header className="feed-header">
                <h2>Eventos Regionais</h2>
                <p>Confira a agenda jurídica e social do Vale do Ribeira.</p>
            </header>

            <div className="eventos-list">
                {eventos.map((evento, idx) => (
                    <motion.div
                        key={evento.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="evento-card"
                    >
                        <div className="evento-date">
                            <span className="day">{evento.date.split(' ')[0]}</span>
                            <span className="month">{evento.date.split(' ')[1]}</span>
                        </div>

                        <div className="evento-content">
                            <div className="evento-tag">{evento.type}</div>
                            <h3>{evento.title}</h3>
                            <div className="evento-meta">
                                <span><MapPin size={16} /> {evento.location}</span>
                            </div>
                            <p className="evento-desc">{evento.description}</p>

                            {evento.link && (
                                <button className="inscrever-btn">
                                    Mais Informações <ExternalLink size={14} />
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
                .eventos-feed {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 2rem 1rem;
                }
                .feed-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }
                .feed-header h2 {
                    color: var(--color-primary);
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                }
                .feed-header p { color: var(--color-text-muted); }

                .eventos-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .evento-card {
                    background: white;
                    border: 1px solid var(--color-border);
                    border-radius: 12px;
                    padding: 1.5rem;
                    display: flex;
                    gap: 2rem;
                    align-items: flex-start;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .evento-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                }

                .evento-date {
                    background: var(--color-primary);
                    color: white;
                    border-radius: 8px;
                    padding: 1rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-width: 80px;
                    text-align: center;
                }
                .evento-date .day { font-size: 1.8rem; font-weight: 800; line-height: 1; }
                .evento-date .month { text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; }

                .evento-content { flex: 1; }
                
                .evento-tag {
                    display: inline-block;
                    background: #f0f0f0;
                    color: var(--color-text-muted);
                    font-size: 0.7rem;
                    font-weight: 700;
                    padding: 0.2rem 0.6rem;
                    border-radius: 4px;
                    text-transform: uppercase;
                    margin-bottom: 0.5rem;
                }

                .evento-content h3 {
                    margin: 0 0 0.5rem 0;
                    color: var(--color-primary);
                    font-size: 1.3rem;
                }

                .evento-meta {
                    display: flex;
                    gap: 1rem;
                    color: var(--color-secondary);
                    font-size: 0.9rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }
                .evento-meta span { display: flex; align-items: center; gap: 0.4rem; }

                .evento-desc {
                    color: var(--color-text);
                    line-height: 1.5;
                    font-size: 0.95rem;
                    margin-bottom: 1rem;
                }

                .inscrever-btn {
                    background: none;
                    border: 2px solid var(--color-primary);
                    color: var(--color-primary);
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.85rem;
                    transition: all 0.2s;
                }
                .inscrever-btn:hover {
                    background: var(--color-primary);
                    color: white;
                }

                @media (max-width: 768px) {
                    .evento-card { flex-direction: column; gap: 1rem; }
                    .evento-date { width: 100%; flex-direction: row; gap: 0.5rem; padding: 0.5rem; min-height: auto; }
                    .evento-date .day { font-size: 1.2rem; }
                }
            `}</style>
        </div>
    );
};

export default EventosFeed;
