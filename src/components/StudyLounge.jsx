import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Play, Pause, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudyLounge = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const playerRef = useRef(null);

    const [volume, setVolume] = useState(15);

    // Live Radio - Lofi Girl
    const videoId = 'jfKfPfyJRdk';

    useEffect(() => {
        let timeout;
        const loadAPI = () => {
            // If already loaded, just init
            if (window.YT && window.YT.Player) {
                console.log("YouTube API already exists, initializing...");
                initPlayer();
                return;
            }

            // Define the ready callback
            if (!window.onYouTubeIframeAPIReady) {
                window.onYouTubeIframeAPIReady = () => {
                    console.log("YouTube IFrame API is ready");
                    initPlayer();
                };
            }

            // Append script if not present
            if (!document.getElementById('youtube-api-script')) {
                const tag = document.createElement('script');
                tag.id = 'youtube-api-script';
                tag.src = "https://www.youtube.com/iframe_api";
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }

            // Guard: in case script is there but API isn't readying properly
            timeout = setTimeout(() => {
                if (window.YT && window.YT.Player && !isLoaded) {
                    initPlayer();
                }
            }, 3000);
        };

        loadAPI();
        return () => clearTimeout(timeout);
    }, []);

    const initPlayer = () => {
        if (playerRef.current && typeof playerRef.current.destroy === 'function') {
            try {
                playerRef.current.destroy();
                playerRef.current = null;
            } catch (e) {
                console.error("Error destroying player:", e);
            }
        }

        const playerElement = document.getElementById('youtube-player');
        if (!playerElement) {
            console.error("Player element not found in DOM");
            return;
        }

        console.log("Creating new YT.Player with videoId:", videoId);

        try {
            playerRef.current = new window.YT.Player('youtube-player', {
                height: '0',
                width: '0',
                videoId: videoId,
                playerVars: {
                    'autoplay': 0,
                    'controls': 0,
                    'disablekb': 1,
                    'fs': 0,
                    'modestbranding': 1,
                    'rel': 0,
                    'showinfo': 0,
                    'iv_load_policy': 3,
                    'enablejsapi': 1,
                    'origin': window.location.origin
                },
                events: {
                    'onReady': (event) => {
                        console.log("Player is Ready. Setting volume to:", volume);
                        event.target.setVolume(volume);
                        setIsLoaded(true);
                    },
                    'onStateChange': (event) => {
                        console.log("Player State:", event.data);
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            setIsPlaying(true);
                        } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.BUFFERING) {
                            // Don't set isPlaying false on buffering as it might flicker
                            if (event.data === window.YT.PlayerState.PAUSED) setIsPlaying(false);
                        } else {
                            setIsPlaying(false);
                        }
                    },
                    'onError': (error) => {
                        console.error("YouTube Player Error:", error.data);
                        // 150/101 are standard embed blocked errors
                        if (error.data === 150 || error.data === 101) {
                            alert("O vídeo atual pode ter restrições de reprodução. Tente abrir pelo YouTube.");
                        }
                    }
                }
            });
        } catch (err) {
            console.error("Failed to construct YT.Player:", err);
        }
    };

    const togglePlay = () => {
        if (!playerRef.current || !isLoaded) {
            console.log("Player not ready. Loaded:", isLoaded);
            return;
        }

        try {
            if (isPlaying) {
                playerRef.current.pauseVideo();
            } else {
                console.log("Attempting to play video...");
                playerRef.current.playVideo();
                // Safari/Chrome sometimes need explicit volume setting after play call
                setTimeout(() => playerRef.current.setVolume(volume), 100);
            }
        } catch (e) {
            console.error("Error toggling playback:", e);
        }
    };

    const toggleMute = () => {
        if (!playerRef.current || !isLoaded) return;
        if (isMuted) {
            playerRef.current.unMute();
            playerRef.current.setVolume(volume);
            setIsMuted(false);
        } else {
            playerRef.current.mute();
            setIsMuted(true);
        }
    };

    const handleVolumeChange = (e) => {
        const val = parseInt(e.target.value);
        const clampedVal = val < 15 ? 15 : val;
        setVolume(clampedVal);
        if (playerRef.current && isLoaded && typeof playerRef.current.setVolume === 'function') {
            playerRef.current.setVolume(clampedVal);
            if (isMuted && clampedVal > 0) {
                playerRef.current.unMute();
                setIsMuted(false);
            }
        }
    };

    return (
        <div className="study-lounge-wrapper">
            {/* 
               Player container must remain in DOM. 
               width/height 0 is usually fine, but some browsers like it to be 'visible'
            */}
            <div id="youtube-player" style={{
                position: 'fixed',
                top: '-10px',
                left: '-10px',
                width: '0px',
                height: '0px',
                pointerEvents: 'none',
                opacity: 0,
                zIndex: -1
            }}></div>

            <AnimatePresence>
                {!isOpen ? (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className={`lounge-toggle-btn ${isPlaying ? 'pulse' : ''}`}
                        onClick={() => setIsOpen(true)}
                    >
                        <Music size={24} />
                        {isPlaying && <span className="playing-indicator"></span>}
                    </motion.button>
                ) : (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="lounge-player-card"
                    >
                        <div className="lounge-header">
                            <div className="lounge-title">
                                <Music size={16} />
                                <span>Study Lounge</span>
                            </div>
                            <button className="close-lounge" onClick={() => setIsOpen(false)}>
                                <X size={16} />
                            </button>
                        </div>

                        <div className="lounge-body">
                            <div className="lounge-info">
                                <p>Música para Foco & Produtividade</p>
                                <small>Beats by Hermeneuta</small>
                            </div>

                            <div className="lounge-controls">
                                <button
                                    className="control-btn"
                                    onClick={toggleMute}
                                    title={isMuted ? "Ativar Áudio" : "Mutar"}
                                >
                                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                </button>

                                <button
                                    className="play-pause-btn"
                                    onClick={togglePlay}
                                    disabled={!isLoaded}
                                >
                                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" style={{ marginLeft: '4px' }} />}
                                </button>

                                <a
                                    href={`https://youtube.com/watch?v=${videoId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="control-btn"
                                    title="Ver no YouTube"
                                >
                                    <ExternalLink size={20} />
                                </a>
                            </div>

                            <div className="volume-control-wrapper">
                                <div className="volume-slider-container">
                                    <span className="vol-icon"><Volume2 size={12} /></span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        className="volume-slider"
                                    />
                                    <span className="vol-percentage">{volume}%</span>
                                </div>
                                <div className="volume-disclaimer">
                                    Mínimo estratégico de 15% para validação de ads.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
        .study-lounge-wrapper {
          position: fixed;
          bottom: 2rem;
          left: 2rem;
          z-index: 9999;
          font-family: var(--font-sans);
        }

        .lounge-toggle-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #080A0F; /* Midnight Navy */
          color: #FACC15; /* Gold */
          border: 2px solid #FACC15;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          position: relative;
          transition: all 0.3s;
        }

        .lounge-toggle-btn:hover {
          transform: scale(1.1) rotate(10deg);
          box-shadow: 0 15px 40px rgba(250,204,21,0.2);
        }

        .lounge-toggle-btn.pulse {
          animation: pulse-gold 2s infinite;
        }

        @keyframes pulse-gold {
          0% { box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(250, 204, 21, 0); }
          100% { box-shadow: 0 0 0 0 rgba(250, 204, 21, 0); }
        }

        .playing-indicator {
          position: absolute;
          top: 5px;
          right: 5px;
          width: 12px;
          height: 12px;
          background: #FACC15;
          border-radius: 50%;
          border: 2px solid #080A0F;
        }

        .lounge-player-card {
          width: 300px;
          background: #080A0F;
          border: 1px solid #FACC15;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.8);
        }

        .lounge-header {
          padding: 0.75rem 1rem;
          background: rgba(250,204,21,0.1);
          border-bottom: 1px solid rgba(250,204,21,0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .lounge-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #FACC15;
          font-weight: 800;
          text-transform: uppercase;
          font-size: 0.7rem;
          letter-spacing: 1px;
        }

        .close-lounge {
          background: none;
          border: none;
          color: rgba(250,204,21,0.5);
          cursor: pointer;
          transition: color 0.2s;
        }

        .close-lounge:hover { color: #FACC15; }

        .lounge-body {
          padding: 1.5rem;
          text-align: center;
        }

        .lounge-info p {
          color: white;
          margin: 0;
          font-family: var(--font-serif);
          font-size: 1.1rem;
        }

        .lounge-info small {
          color: #FACC15;
          opacity: 0.7;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.6rem;
        }

        .lounge-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          margin: 1rem 0;
        }

        .control-btn {
          background: none;
          border: none;
          color: white;
          opacity: 0.6;
          cursor: pointer;
          transition: all 0.2s;
        }

        .control-btn:hover { opacity: 1; color: #FACC15; }

        .play-pause-btn {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: #FACC15;
          color: #080A0F;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .play-pause-btn:hover:not(:disabled) {
          transform: scale(1.1);
          background: white;
        }

        .play-pause-btn:disabled { opacity: 0.5; cursor: wait; }

        .volume-control-wrapper {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .volume-slider-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .vol-icon { color: #FACC15; opacity: 0.7; }
        .vol-percentage { color: white; font-size: 0.7rem; font-weight: 700; width: 30px; }

        .volume-slider {
          flex: 1;
          -webkit-appearance: none;
          background: rgba(255,255,255,0.1);
          height: 4px;
          border-radius: 2px;
          outline: none;
        }

        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #FACC15;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 0 10px rgba(250,204,21,0.3);
        }

        .volume-slider::-webkit-slider-thumb:hover {
          transform: scale(1.3);
          background: white;
        }

        .volume-disclaimer {
          font-size: 0.6rem;
          color: rgba(255,255,255,0.3);
          font-style: italic;
        }

        body.dark-mode .lounge-player-card {
          box-shadow: 0 20px 50px rgba(0,0,0,1), 0 0 20px rgba(250,204,21,0.05);
        }
      `}</style>
        </div>
    );
};

export default StudyLounge;
