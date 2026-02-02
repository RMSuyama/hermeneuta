import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Music, Timer, Edit3, X, Play, Pause,
    RotateCcw, Volume2, VolumeX, ExternalLink, Minimize2, Maximize2, Coffee, Zap
} from 'lucide-react';

const FocusHub = ({ focusMode, setFocusMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('focus'); // focus, timer, audio, notes

    // --- Timer State ---
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [isWorkSession, setIsWorkSession] = useState(true);

    // --- Audio State ---
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(20);
    const [selectedAudio, setSelectedAudio] = useState('lofi');
    const playerRef = useRef(null);

    // Multiple 24/7 Audio Streams for Concentration
    const audioStreams = {
        lofi: { id: 'jfKfPfyJRdk', name: 'Lofi Beats', description: 'Chill beats para concentração' },
        classical: { id: '4XW0H2aid9A', name: 'Música Clássica', description: 'Piano clássico relaxante 24/7' },
        whiteNoise: { id: 'nMfPqeZjc2E', name: 'Ruído Branco', description: 'White noise para foco profundo' },
        brownNoise: { id: 'RqzGzwTY-6w', name: 'Ruído Marrom', description: 'Brown noise para estudo' },
        jazz: { id: 'Dx5qFachd3A', name: 'Jazz Suave', description: 'Smooth jazz instrumental' },
        nature: { id: 'eKFTSSKCzWA', name: 'Sons da Natureza', description: 'Chuva e trovões suaves' },
        ambient: { id: '5qap5aO4i9A', name: 'Ambient Space', description: 'Música ambiente espacial' }
    };

    const videoId = audioStreams[selectedAudio].id;

    // --- Notes State ---
    const [notes, setNotes] = useState(() => localStorage.getItem('academic_notes') || '');

    useEffect(() => {
        // YouTube API init if not present
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            tag.id = "yt-api-hub";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        window.onYouTubeIframeAPIReady = () => {
            initPlayer();
        };

        if (window.YT && window.YT.Player) {
            initPlayer();
        }
    }, []);

    const initPlayer = () => {
        if (playerRef.current) return;
        playerRef.current = new window.YT.Player('hub-youtube-player-element', {
            height: '0',
            width: '0',
            videoId: videoId,
            playerVars: { 'autoplay': 0, 'controls': 0, 'enablejsapi': 1, 'origin': window.location.origin },
            events: {
                'onReady': (event) => event.target.setVolume(volume),
                'onStateChange': (event) => {
                    if (event.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
                    else if (event.data === window.YT.PlayerState.PAUSED) setIsPlaying(false);
                }
            }
        });
    };

    useEffect(() => {
        let interval = null;
        if (isTimerActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0) {
            setIsTimerActive(false);
            const newMode = !isWorkSession;
            setIsWorkSession(newMode);
            setTimeLeft(newMode ? 25 * 60 : 5 * 60);
            try {
                new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play();
            } catch (e) { }
        }
        return () => clearInterval(interval);
    }, [isTimerActive, timeLeft, isWorkSession]);

    useEffect(() => { localStorage.setItem('academic_notes', notes); }, [notes]);

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    return (
        <div className="focus-hub-root">
            <div id="hub-youtube-player-element" style={{ position: 'absolute', visibility: 'hidden' }}></div>

            <AnimatePresence>
                {!isOpen ? (
                    <motion.button
                        className={`hub-pill-trigger ${isPlaying || isTimerActive ? 'active' : ''}`}
                        onClick={() => setIsOpen(true)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Zap size={18} />
                        <span>Estudo & Foco</span>
                        {(isPlaying || isTimerActive) && <div className="live-indicator" />}
                    </motion.button>
                ) : (
                    <motion.div
                        className="hub-glass-card"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    >
                        <div className="hub-top-bar">
                            <div className="hub-brand">
                                <Zap size={14} className="icon-gold" />
                                <span>CENTRAL DE FOCO</span>
                            </div>
                            <button className="hub-close" onClick={() => setIsOpen(false)}><X size={18} /></button>
                        </div>

                        <div className="hub-main">
                            <div className="hub-sidebar">
                                <button className={activeTab === 'focus' ? 'active' : ''} onClick={() => setActiveTab('focus')} title="Modo Foco"><BookOpen size={20} /></button>
                                <button className={activeTab === 'timer' ? 'active' : ''} onClick={() => setActiveTab('timer')} title="Pomodoro"><Timer size={20} /></button>
                                <button className={activeTab === 'audio' ? 'active' : ''} onClick={() => setActiveTab('audio')} title="Música Lofi"><Music size={20} /></button>
                                <button className={activeTab === 'notes' ? 'active' : ''} onClick={() => setActiveTab('notes')} title="Bloco de Notas"><Edit3 size={20} /></button>
                            </div>

                            <div className="hub-viewport">
                                {activeTab === 'focus' && (
                                    <div className="pane-view">
                                        <h3>Modo Imersão</h3>
                                        <p>Foque 100% no texto. Removemos distrações para você.</p>
                                        <div className={`focus-toggle-card ${focusMode ? 'on' : ''}`} onClick={() => setFocusMode(!focusMode)}>
                                            <div className="toggle-info">
                                                <span className="status-label">{focusMode ? 'ATIVADO' : 'DESATIVADO'}</span>
                                            </div>
                                            <div className="toggle-switch"></div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'timer' && (
                                    <div className="pane-view centered">
                                        <div className="timer-ring">
                                            <span className="session-type">{isWorkSession ? 'WORK' : 'BREAK'}</span>
                                            <span className="timer-val">{formatTime(timeLeft)}</span>
                                        </div>
                                        <div className="timer-actions">
                                            <button className="primary-btn" onClick={() => setIsTimerActive(!isTimerActive)}>
                                                {isTimerActive ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
                                            </button>
                                            <button className="secondary-btn" onClick={() => { setTimeLeft(isWorkSession ? 25 * 60 : 5 * 60); setIsTimerActive(false); }}>
                                                <RotateCcw size={18} />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'audio' && (
                                    <div className="pane-view">
                                        <h3>Study Lounge</h3>
                                        <p>Escolha o som ideal para sua concentração</p>

                                        <div className="audio-selector">
                                            <label>Tipo de Áudio</label>
                                            <select
                                                value={selectedAudio}
                                                onChange={(e) => {
                                                    const newStream = e.target.value;
                                                    const wasPlaying = isPlaying;
                                                    if (wasPlaying && playerRef.current) {
                                                        playerRef.current.pauseVideo();
                                                    }
                                                    setSelectedAudio(newStream);
                                                    // Reload player with new video
                                                    setTimeout(() => {
                                                        if (playerRef.current && wasPlaying) {
                                                            playerRef.current.loadVideoById(audioStreams[newStream].id);
                                                            playerRef.current.playVideo();
                                                        } else if (playerRef.current) {
                                                            playerRef.current.loadVideoById(audioStreams[newStream].id);
                                                        }
                                                    }, 100);
                                                }}
                                                className="audio-dropdown"
                                            >
                                                {Object.entries(audioStreams).map(([key, stream]) => (
                                                    <option key={key} value={key}>{stream.name}</option>
                                                ))}
                                            </select>
                                            <p className="stream-description">{audioStreams[selectedAudio].description}</p>
                                        </div>

                                        <div className="audio-player-ui">
                                            <button className="big-play-btn" onClick={() => isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo()}>
                                                {isPlaying ? <Pause size={32} /> : <Play size={32} fill="currentColor" />}
                                            </button>
                                            <div className="volume-widget">
                                                <Volume2 size={16} />
                                                <input
                                                    type="range" min="0" max="100" value={volume}
                                                    onChange={(e) => {
                                                        const v = e.target.value;
                                                        setVolume(v);
                                                        if (playerRef.current) playerRef.current.setVolume(v);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'notes' && (
                                    <div className="pane-view full">
                                        <textarea
                                            placeholder="Suas anotações aqui..."
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                        />
                                        <div className="auto-save-hint">Salvo automaticamente</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .focus-hub-root {
                    position: fixed;
                    bottom: 1.5rem;
                    right: 1.5rem;
                    z-index: 10005;
                }

                .hub-pill-trigger {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem 1.25rem;
                    background: #1A1A1A;
                    color: #C5A022;
                    border: 1px solid #C5A022;
                    border-radius: 50px;
                    cursor: pointer;
                    font-family: var(--font-sans);
                    font-weight: 700;
                    font-size: 0.9rem;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    position: relative;
                }

                .hub-pill-trigger.active {
                    background: #C5A022;
                    color: #1A1A1A;
                    border-color: #1A1A1A;
                }

                .live-indicator {
                    width: 8px;
                    height: 8px;
                    background: #22c55e;
                    border-radius: 50%;
                    margin-left: 2px;
                    animation: blink 1s infinite;
                }

                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

                .hub-glass-card {
                    width: 380px;
                    height: 380px;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-radius: 24px;
                    box-shadow: 0 25px 80px rgba(0,0,0,0.25);
                    border: 1px solid rgba(0,0,0,0.08);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                body.dark-mode .hub-glass-card {
                    background: rgba(15, 23, 42, 0.95);
                    border-color: rgba(255,255,255,0.1);
                    color: #f8fafc;
                }

                .hub-top-bar {
                    padding: 1rem 1.25rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                }

                .hub-brand {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-weight: 800;
                    font-size: 0.7rem;
                    letter-spacing: 1.5px;
                    color: #64748b;
                }

                .icon-gold { color: #C5A022; }

                .hub-close {
                    background: none; border: none; color: #94a3b8; cursor: pointer; transition: color 0.2s;
                }
                .hub-close:hover { color: #ef4444; }

                .hub-main {
                    flex: 1;
                    display: flex;
                }

                .hub-sidebar {
                    width: 60px;
                    background: rgba(0,0,0,0.02);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 1rem 0;
                    gap: 1rem;
                    border-right: 1px solid rgba(0,0,0,0.05);
                }

                .hub-sidebar button {
                    width: 40px; height: 40px; border-radius: 12px; border: none; background: none;
                    color: #94a3b8; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center;
                }

                .hub-sidebar button:hover { background: rgba(0,0,0,0.05); color: #C5A022; }
                .hub-sidebar button.active { background: #1A1A1A; color: #C5A022; }

                body.dark-mode .hub-sidebar button.active { background: #F8FAFC; color: #080A0F; }

                .hub-viewport {
                    flex: 1; padding: 1.5rem; display: flex; flex-direction: column;
                }

                .pane-view h3 { font-size: 1.2rem; margin-bottom: 0.5rem; font-family: var(--font-serif); }
                .pane-view p { font-size: 0.85rem; color: #64748b; line-height: 1.4; margin-bottom: 1.5rem; }

                .focus-toggle-card {
                    background: #f1f5f9; padding: 1.25rem; border-radius: 16px; display: flex;
                    justify-content: space-between; align-items: center; cursor: pointer; transition: all 0.3s;
                }
                body.dark-mode .focus-toggle-card { background: #1e293b; }

                .focus-toggle-card.on { background: #1A1A1A; color: #C5A022; }
                body.dark-mode .focus-toggle-card.on { background: #F8FAFC; color: #080A0F; }

                .status-label { font-weight: 800; font-size: 0.8rem; }
                .toggle-switch { width: 44px; height: 24px; background: #cbd5e1; border-radius: 20px; position: relative; }
                .toggle-switch::after { content: ''; position: absolute; left: 2px; top: 2px; width: 20px; height: 20px; background: #fff; border-radius: 50%; transition: all 0.3s; }
                .focus-toggle-card.on .toggle-switch { background: #C5A022; }
                .focus-toggle-card.on .toggle-switch::after { transform: translateX(20px); }

                .pane-view.centered { align-items: center; justify-content: center; text-align: center; height: 100%; display: flex; flex-direction: column; }
                .timer-ring { border: 4px solid #e2e8f0; width: 140px; height: 140px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 1.5rem; border-top-color: #C5A022; }
                .session-type { font-size: 0.6rem; font-weight: 800; color: #94a3b8; }
                .timer-val { font-size: 2.5rem; font-weight: 900; font-family: monospace; letter-spacing: -1px; }

                .timer-actions { display: flex; align-items: center; gap: 1.5rem; }
                .primary-btn { width: 50px; height: 50px; border-radius: 50%; background: #1A1A1A; color: #fff; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; }
                .secondary-btn { background: none; border: none; color: #94a3b8; cursor: pointer; }

                .audio-player-ui { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
                .big-play-btn { width: 80px; height: 80px; border-radius: 50%; background: #f1f5f9; color: #1A1A1A; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; }
                body.dark-mode .big-play-btn { background: #1e293b; color: #fff; }
                .volume-widget { display: flex; align-items: center; gap: 1rem; width: 100%; }
                .volume-widget input { flex: 1; }

                .audio-selector { 
                    margin-bottom: 1.5rem; 
                    width: 100%; 
                }
                .audio-selector label { 
                    display: block; 
                    font-size: 0.75rem; 
                    font-weight: 700; 
                    color: #64748b; 
                    margin-bottom: 0.5rem; 
                    text-transform: uppercase; 
                    letter-spacing: 0.5px; 
                }
                .audio-dropdown { 
                    width: 100%; 
                    padding: 0.75rem 1rem; 
                    border-radius: 12px; 
                    border: 1px solid #e2e8f0; 
                    background: #f8fafc; 
                    font-family: var(--font-sans); 
                    font-size: 0.9rem; 
                    font-weight: 600; 
                    color: #1e293b; 
                    cursor: pointer; 
                    transition: all 0.2s; 
                    outline: none;
                }
                .audio-dropdown:hover { 
                    border-color: #C5A022; 
                    background: #fff; 
                }
                .audio-dropdown:focus { 
                    border-color: #C5A022; 
                    box-shadow: 0 0 0 3px rgba(197, 160, 34, 0.1); 
                }
                body.dark-mode .audio-dropdown { 
                    background: #1e293b; 
                    border-color: #334155; 
                    color: #f8fafc; 
                }
                body.dark-mode .audio-dropdown:hover { 
                    background: #0f172a; 
                    border-color: #C5A022; 
                }
                .stream-description { 
                    font-size: 0.8rem !important; 
                    color: #94a3b8 !important; 
                    margin-top: 0.5rem !important; 
                    margin-bottom: 0 !important; 
                    font-style: italic; 
                }

                .pane-view.full { height: 100%; }
                .pane-view textarea { flex: 1; width: 100%; background: none; border: none; outline: none; resize: none; font-family: var(--font-serif); font-size: 1rem; line-height: 1.5; color: inherit; }
                .auto-save-hint { font-size: 0.6rem; color: #94a3b8; text-transform: uppercase; font-weight: 700; }

                @media (max-width: 768px) {
                    .hub-glass-card { width: 90vw; height: 450px; bottom: 5rem; position: fixed; right: 5vw; }
                    .focus-hub-root { right: 1rem; bottom: 1rem; }
                }
            `}</style>
        </div>
    );
};

export default FocusHub;
