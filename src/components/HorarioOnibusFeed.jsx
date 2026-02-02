import React, { useState } from 'react';
import { Bus, Clock, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const HorarioOnibusFeed = () => {
    const [expandedLine, setExpandedLine] = useState(null);

    const lines = [
        {
            id: 1,
            route: 'Registro <-> Jacupiranga',
            company: 'ValleSul',
            price: 'R$ 6,50',
            schedules: {
                weekdays: ['06:00', '07:30', '09:00', '11:00', '13:00', '15:30', '17:15', '18:45', '20:30', '22:15'],
                saturday: ['07:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
                sunday: ['08:00', '10:00', '14:00', '18:00']
            }
        },
        {
            id: 2,
            route: 'Registro <-> Iguape',
            company: 'ValleSul',
            price: 'R$ 12,00',
            schedules: {
                weekdays: ['05:40', '08:00', '10:30', '12:30', '14:30', '16:40', '18:30', '20:30', '23:00'],
                saturday: ['06:00', '09:00', '13:00', '16:00', '19:00', '22:00'],
                sunday: ['08:00', '12:00', '16:00', '20:00']
            }
        },
        {
            id: 3,
            route: 'Registro <-> Miracatu',
            company: 'Intersul',
            price: 'R$ 15,00',
            schedules: {
                weekdays: ['06:30', '09:30', '13:30', '17:30', '19:30'],
                saturday: ['07:30', '11:30', '15:30', '19:30'],
                sunday: ['09:00', '14:00', '18:00']
            }
        }
    ];

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Horários de Ônibus - Hermeneuta',
                url: window.location.href
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link dos horários copiado!');
        }
    };

    const toggleLine = (id) => {
        setExpandedLine(expandedLine === id ? null : id);
    };

    return (
        <div className="bus-feed">
            <div className="section-header">
                <h2 className="section-title">Horários de Ônibus</h2>
                <div className="section-line"></div>
                <p className="section-subtitle">Transporte Intermunicipal Vale do Ribeira</p>
                <button onClick={handleShare} className="share-btn-text">Compartilhar Tabela</button>
            </div>

            <div className="lines-list">
                {lines.map((line) => (
                    <div key={line.id} className={`bus-card ${expandedLine === line.id ? 'expanded' : ''}`}>
                        <div className="bus-card-header" onClick={() => toggleLine(line.id)}>
                            <div className="route-info">
                                <div className="icon-box">
                                    <Bus size={24} />
                                </div>
                                <div>
                                    <h3>{line.route}</h3>
                                    <span className="company-name">{line.company} • {line.price}</span>
                                </div>
                            </div>
                            <button className="toggle-btn">
                                {expandedLine === line.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                            </button>
                        </div>

                        {expandedLine === line.id && (
                            <div className="bus-schedules">
                                <div className="schedule-group">
                                    <h4>Segunda a Sexta</h4>
                                    <div className="times-grid">
                                        {line.schedules.weekdays.map((time, i) => <span key={i} className="time-badge">{time}</span>)}
                                    </div>
                                </div>
                                {line.schedules.saturday && (
                                    <div className="schedule-group">
                                        <h4>Sábados</h4>
                                        <div className="times-grid">
                                            {line.schedules.saturday.map((time, i) => <span key={i} className="time-badge">{time}</span>)}
                                        </div>
                                    </div>
                                )}
                                {line.schedules.sunday && (
                                    <div className="schedule-group">
                                        <h4>Domingos e Feriados</h4>
                                        <div className="times-grid">
                                            {line.schedules.sunday.map((time, i) => <span key={i} className="time-badge">{time}</span>)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <style jsx>{`
        .bus-feed { padding: 2rem 0; max-width: 800px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 3rem; }
        .section-title { font-family: var(--font-serif); font-size: 2.5rem; color: var(--color-primary); margin-bottom: 0.5rem; }
        .section-line { width: 60px; height: 3px; background: var(--color-accent); margin: 0 auto 1rem; }
        .section-subtitle { font-family: var(--font-sans); color: var(--color-text-muted); text-transform: uppercase; font-size: 0.9rem; margin-bottom: 1rem; }
        
        .share-btn-text { background: none; border: none; color: var(--color-secondary); text-decoration: underline; cursor: pointer; font-size: 0.9rem; }

        .lines-list { display: flex; flex-direction: column; gap: 1.5rem; }

        .bus-card {
          background: white;
          border: 1px solid var(--color-border);
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .bus-card.expanded {
          border-color: var(--color-primary);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .bus-card-header {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          background: #fff;
        }

        .route-info { display: flex; gap: 1rem; align-items: center; }
        
        .icon-box {
          background: var(--color-primary);
          color: white;
          padding: 0.8rem;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }

        .route-info h3 { font-family: var(--font-serif); font-size: 1.3rem; margin: 0 0 0.3rem 0; color: var(--color-primary); }
        .company-name { font-size: 0.9rem; color: var(--color-text-muted); font-weight: 600; text-transform: uppercase; }

        .toggle-btn { background: none; border: none; color: var(--color-text-muted); }

        .bus-schedules {
          background: #faf9f6;
          padding: 1.5rem;
          border-top: 1px solid var(--color-border);
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .schedule-group { margin-bottom: 1.5rem; }
        .schedule-group:last-child { margin-bottom: 0; }

        .schedule-group h4 {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          text-transform: uppercase;
          color: var(--color-secondary);
          margin-bottom: 0.8rem;
          font-weight: 700;
        }

        .times-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .time-badge {
          background: white;
          border: 1px solid var(--color-border);
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          font-family: monospace;
          font-size: 1rem;
          color: var(--color-text);
        }
      `}</style>
        </div>
    );
};

export default HorarioOnibusFeed;
