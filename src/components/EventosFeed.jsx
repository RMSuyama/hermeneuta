import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Users, X, Clock, Share2, Edit, ArrowLeft } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

const EventosFeed = ({ eventos, isAuthenticated }) => {
    const { id } = useParams();

    if (!eventos || eventos.length === 0) return <div className="eventos-feed">Nenhum evento programado no momento.</div>;

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link do evento copiado!');
    };

    // Detail View (Replaced Modal)
    if (id) {
        const selectedEvent = eventos.find(e => e.id.toString() === id);

        if (!selectedEvent) return <div className="eventos-feed"><p>Evento não encontrado.</p><Link to="/eventos" className="back-btn"><ArrowLeft size={16} /> Voltar</Link></div>;

        return (
            <div className="eventos-feed">
                <Link to="/eventos" className="back-btn">
                    <ArrowLeft size={16} /> Voltar para Eventos
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="event-detail-view"
                >
                    {selectedEvent.image && (
                        <div className="event-detail-image">
                            <img src={selectedEvent.image} alt={selectedEvent.title} />
                        </div>
                    )}

                    <div className="event-detail-body">
                        <div className="event-top-row">
                            <div className="event-modal-tag">{selectedEvent.type}</div>
                            <div className="event-actions">
                                <button onClick={handleShare} className="action-btn" title="Compartilhar">
                                    <Share2 size={18} />
                                </button>
                                {isAuthenticated && (
                                    <button className="action-btn edit" title="Editar Evento">
                                        <Edit size={18} />
                                    </button>
                                )}
                            </div>
                        </div>

                        <h2>{selectedEvent.title}</h2>

                        <div className="event-modal-meta">
                            <div className="meta-item">
                                <Calendar size={18} />
                                <span>{selectedEvent.date}</span>
                            </div>
                            <div className="meta-item">
                                <MapPin size={18} />
                                <span>{selectedEvent.location}</span>
                            </div>
                        </div>

                        <div
                            className="event-modal-description"
                            dangerouslySetInnerHTML={{ __html: selectedEvent.description }}
                        />

                        {selectedEvent.link && (
                            <a href={selectedEvent.link} target="_blank" rel="noopener noreferrer" className="event-link-btn">
                                Mais Informações / Inscrição <ExternalLink size={16} />
                            </a>
                        )}
                    </div>
                </motion.div>

                <style jsx>{`
                    .eventos-feed { max-width: 900px; margin: 0 auto; padding: 2rem 1rem; }
                    .back-btn { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--color-text-muted); text-decoration: none; font-weight: 700; text-transform: uppercase; font-size: 0.8rem; margin-bottom: 2rem; }
                    .back-btn:hover { color: var(--color-secondary); }
                    
                    .event-detail-view { background: white; border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; }
                    .event-detail-image { width: 100%; height: 400px; object-fit: cover; }
                    .event-detail-image img { width: 100%; height: 100%; object-fit: cover; }
                    .event-detail-body { padding: 2rem; }
                    
                    .event-top-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
                    .event-modal-tag { background: var(--color-secondary); color: white; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
                    
                    .event-actions { display: flex; gap: 0.5rem; }
                    .action-btn { background: none; border: 1px solid var(--color-border); border-radius: 4px; padding: 0.4rem; cursor: pointer; color: var(--color-text-muted); display: flex; align-items: center; justify-content: center; }
                    .action-btn:hover { color: var(--color-secondary); border-color: var(--color-secondary); }
                    .action-btn.edit { color: var(--color-primary); }

                    .event-detail-body h2 { font-size: 2.5rem; margin-bottom: 1.5rem; color: var(--color-primary); }
                    
                    .event-modal-meta { display: flex; gap: 2rem; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--color-border); }
                    .meta-item { display: flex; align-items: center; gap: 0.5rem; color: var(--color-text-muted); font-size: 0.95rem; }
                    
                    .event-modal-description { line-height: 1.8; color: var(--color-text); margin-bottom: 2rem; }
                    .event-modal-description p { margin-bottom: 1rem; }
                    .event-modal-description ul { padding-left: 1.5rem; margin-bottom: 1rem; }

                    .event-link-btn { display: inline-flex; align-items: center; gap: 0.5rem; background: var(--color-primary); color: white; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: 700; transition: background 0.2s; }
                    .event-link-btn:hover { background: var(--color-secondary); }

                     @media (max-width: 768px) {
                        .event-detail-image { height: 250px; }
                        .event-modal-meta { flex-direction: column; gap: 0.75rem; }
                        .event-detail-body h2 { font-size: 1.8rem; }
                    }
                 `}</style>
            </div>
        );
    }

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
                        <Link to={`/eventos/${evento.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: '1.5rem', width: '100%', alignItems: 'flex-start' }}>
                            {evento.image && (
                                <div className="evento-image-thumb">
                                    <img src={evento.image} alt={evento.title} />
                                </div>
                            )}

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
                                <div className="evento-desc-preview" dangerouslySetInnerHTML={{ __html: evento.description?.substring(0, 120) + '...' }} />
                            </div>
                        </Link>
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
                    display: flex; /* For alignment */
                    transition: transform 0.2s, box-shadow 0.2s;
                    position: relative;
                }
                .evento-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                }

                .evento-image-thumb {
                    width: 120px;
                    height: 120px;
                    border-radius: 8px;
                    overflow: hidden;
                    flex-shrink: 0;
                }
                .evento-image-thumb img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
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
                    flex-shrink: 0;
                }
                .evento-date .day { font-size: 1.8rem; font-weight: 800; line-height: 1; }
                .evento-date .month { text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; }

                .evento-content { flex: 1; }
                .evento-tag {
                    display: inline-block;
                    background: var(--color-secondary);
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin-bottom: 0.75rem;
                }
                .evento-content h3 {
                    color: var(--color-primary);
                    margin-bottom: 0.75rem;
                    font-size: 1.3rem;
                }
                .evento-meta {
                    display: flex;
                    gap: 1.5rem;
                    margin-bottom: 0.75rem;
                    color: var(--color-text-muted);
                    font-size: 0.85rem;
                }
                .evento-meta span { display: flex; align-items: center; gap: 0.4rem; }
                .evento-desc-preview {
                    color: var(--color-text);
                    line-height: 1.6;
                    font-size: 0.9rem;
                }

                @media (max-width: 768px) {
                    .evento-card a {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    .evento-image-thumb {
                        width: 100%;
                        height: 200px;
                    }
                    .evento-date {
                        width: 100%;
                        flex-direction: row;
                        gap: 1rem;
                        padding: 0.5rem;
                    }
                    .evento-date .day { font-size: 1.5rem; }
                }
            `}</style>
        </div>
    );
};

export default EventosFeed;
