import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, Edit, Save, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AcademicTools = () => {
    // Pomodoro State
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [isWorkSession, setIsWorkSession] = useState(true);

    // Scratchpad State
    const [notes, setNotes] = useState(() => {
        return localStorage.getItem('academic_notes') || '';
    });
    const [isNotesOpen, setIsNotesOpen] = useState(false);

    // Pomodoro Logic
    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(interval);
            // Switch sessions
            const newIsWork = !isWorkSession;
            setIsWorkSession(newIsWork);
            setTimeLeft(newIsWork ? 25 * 60 : 5 * 60);
            setIsActive(false);

            // Simple audio feedback (using browser notification sound logic or just local alert)
            try {
                const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
                audio.volume = 0.3;
                audio.play();
            } catch (e) {
                console.log("Audio notify failed:", e);
            }
            alert(newIsWork ? "Hora de focar!" : "Hora de descansar!");
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, isWorkSession]);

    // Scratchpad Logic
    useEffect(() => {
        localStorage.setItem('academic_notes', notes);
    }, [notes]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(isWorkSession ? 25 * 60 : 5 * 60);
    };

    return (
        <div className="academic-tools-container">
            {/* Pomodoro Timer Bar */}
            <motion.div
                className="pomodoro-bar"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <div className="timer-info">
                    <Timer size={16} className={isActive ? 'spinning' : ''} />
                    <span className="timer-type">{isWorkSession ? 'FOCO' : 'PAUSA'}</span>
                    <span className="timer-countdown">{formatTime(timeLeft)}</span>
                </div>
                <div className="timer-controls">
                    <button onClick={toggleTimer} className="timer-btn">
                        {isActive ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                    <button onClick={resetTimer} className="timer-btn">
                        <RotateCcw size={14} />
                    </button>
                    <button
                        onClick={() => setIsNotesOpen(!isNotesOpen)}
                        className={`timer-btn ${notes.length > 0 ? 'has-notes' : ''}`}
                    >
                        <Edit size={14} />
                    </button>
                </div>
            </motion.div>

            {/* Floating Notes Pad */}
            <AnimatePresence>
                {isNotesOpen && (
                    <motion.div
                        className="notes-pad"
                        initial={{ scale: 0.9, opacity: 0, x: 20 }}
                        animate={{ scale: 1, opacity: 1, x: 0 }}
                        exit={{ scale: 0.9, opacity: 0, x: 20 }}
                    >
                        <div className="notes-header">
                            <span>Bloco de Notas Acadêmico</span>
                            <button onClick={() => setIsNotesOpen(false)}><X size={14} /></button>
                        </div>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Rascunhe suas idéias ou citações aqui..."
                        />
                        <div className="notes-footer">
                            <small>Salvo automaticamente no navegador</small>
                            <button onClick={() => setNotes('')} title="Limpar Tudo"><Trash2 size={12} /></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .academic-tools-container {
                    position: fixed;
                    bottom: 1.5rem;
                    right: 6.5rem; /* Standard desktop spacing */
                    z-index: 10002;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 0.75rem;
                    scale: 0.9; /* Compact global scale */
                }

                @media (max-width: 768px) {
                    .academic-tools-container {
                        right: auto;
                        left: 1rem;
                        bottom: 1.5rem;
                        scale: 0.8; /* Even more compact on mobile */
                    }
                }

                .pomodoro-bar {
                    background: #1e293b;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 30px;
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .timer-info {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .timer-type {
                    font-size: 0.65rem;
                    font-weight: 800;
                    letter-spacing: 1px;
                    color: #FACC15;
                }

                .timer-countdown {
                    font-family: monospace;
                    font-size: 1.1rem;
                    font-weight: 700;
                }

                .timer-controls {
                    display: flex;
                    gap: 0.5rem;
                }

                .timer-btn {
                    background: rgba(255,255,255,0.1);
                    border: none;
                    color: white;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .timer-btn:hover { background: #FACC15; color: #080A0F; }
                .timer-btn.has-notes { color: #FACC15; border: 1px solid #FACC15; }

                .notes-pad {
                    width: 280px;
                    height: 350px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    border: 1px solid #e2e8f0;
                }

                @media (max-width: 480px) {
                    .notes-pad {
                        width: 90vw;
                        height: 60vh;
                        position: fixed;
                        top: 20vh;
                        left: 5vw;
                        right: 5vw;
                    }
                }

                .notes-header {
                    padding: 0.75rem 1rem;
                    background: #f8fafc;
                    border-bottom: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #475569;
                }

                .notes-header button {
                    background: none;
                    border: none;
                    color: #94a3b8;
                    cursor: pointer;
                }

                .notes-pad textarea {
                    flex: 1;
                    padding: 1rem;
                    border: none;
                    outline: none;
                    font-family: var(--font-serif);
                    font-size: 1rem;
                    line-height: 1.5;
                    resize: none;
                    background: #fffcf5; /* Slightly paper-yellow */
                }

                .notes-footer {
                    padding: 0.5rem 1rem;
                    background: #f8fafc;
                    border-top: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #94a3b8;
                    font-size: 0.6rem;
                }
                
                .notes-footer button {
                    background: none;
                    border: none;
                    color: #ef4444;
                    cursor: pointer;
                    opacity: 0.6;
                }

                @keyframes spinning {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .spinning { animation: spinning 4s linear infinite; }

                body.dark-mode .notes-pad { background: #0f172a; border-color: #1e293b; }
                body.dark-mode .notes-header, body.dark-mode .notes-footer { background: #1e293b; color: #94a3b8; }
                body.dark-mode .notes-pad textarea { background: #0f172a; color: #f1f5f9; }
            `}</style>
        </div>
    );
};

export default AcademicTools;
