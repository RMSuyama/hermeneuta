import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Users, X, Clock } from 'lucide-react';

const EventosFeed = ({ eventos }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);

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
                        onClick={() => setSelectedEvent(evento)}
                        style={{ cursor: 'pointer' }}
                    >
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
                            <p className="evento-desc-preview">{evento.description?.substring(0, 120)}...</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Event Detail Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        className="event-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedEvent(null)}
                    >
                        <motion.div
                            className="event-modal-content"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="modal-close" onClick={() => setSelectedEvent(null)}>
                                <X size={24} />
                            </button>

                            {selectedEvent.image && (
                                <div className="event-modal-image">
                                    <img src={selectedEvent.image} alt={selectedEvent.title} />
                                </div>
                            )}

                            <div className="event-modal-body">
                                <div className="event-modal-tag">{selectedEvent.type}</div>
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

                                <div className="event-modal-description">
                                    {selectedEvent.description?.split('\n').map((line, idx) => (
                                        line.trim() && <p key={idx}>{line}</p>
                                    ))}
                                </div>

                                {selectedEvent.link && (
                                    <a href={selectedEvent.link} target="_blank" rel="noopener noreferrer" className="event-link-btn">
                                        Mais Informações / Inscrição <ExternalLink size={16} />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                    gap: 1.5rem;
                    align-items: flex-start;
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

                /* Modal Styles */
                .event-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 2rem;
                    overflow-y: auto;
                }
                .event-modal-content {
                    background: white;
                    border-radius: 12px;
                    max-width: 800px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                }
                .modal-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: white;
                    border: none;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                    z-index: 10;
                    transition: transform 0.2s;
                }
                .modal-close:hover { transform: scale(1.1); }

                .event-modal-image {
                    width: 100%;
                    height: 300px;
                    overflow: hidden;
                    border-radius: 12px 12px 0 0;
                }
                .event-modal-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .event-modal-body {
                    padding: 2rem;
                }
                .event-modal-tag {
                    display: inline-block;
                    background: var(--color-secondary);
                    color: white;
                    padding: 0.4rem 1rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin-bottom: 1rem;
                }
                .event-modal-body h2 {
                    color: var(--color-primary);
                    font-size: 2rem;
                    margin-bottom: 1.5rem;
                }
                .event-modal-meta {
                    display: flex;
                    gap: 2rem;
                    margin-bottom: 2rem;
                    padding-bottom: 1.5rem;
                    border-bottom: 1px solid var(--color-border);
                }
                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--color-text-muted);
                    font-size: 0.95rem;
                }
                .event-modal-description {
                    line-height: 1.8;
                    color: var(--color-text);
                    margin-bottom: 2rem;
                }
                .event-modal-description p {
                    margin-bottom: 1rem;
                }
                .event-link-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: var(--color-primary);
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 6px;
                    text-decoration: none;
                    font-weight: 700;
                    transition: background 0.2s;
                }
                .event-link-btn:hover {
                    background: var(--color-secondary);
                }

                @media (max-width: 768px) {
                    .evento-card {
                        flex-direction: column;
                    }
                    .evento-image-thumb {
                        width: 100%;
                        height: 200px;
                    }
                    .event-modal-overlay {
                        padding: 1rem;
                    }
                    .event-modal-body {
                        padding: 1.5rem;
                    }
                    .event-modal-meta {
                        flex-direction: column;
                        gap: 0.75rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default EventosFeed;
