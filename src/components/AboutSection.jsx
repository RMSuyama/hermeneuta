import React from 'react';
import { Mail, Briefcase, Handshake } from 'lucide-react';

const AboutSection = () => {
    return (
        <div className="about-container">
            <div className="about-card">
                <h2>Sobre o Hermeneuta</h2>
                <p>
                    O <strong>Hermeneuta</strong> é o ponto de encontro da comunidade jurídica do Vale do Ribeira.
                    Nossa missão é democratizar o acesso à informação legal, conectar profissionais e fomentar o debate
                    sobre os temas que impactam nossa região e nossa profissão.
                </p>
                <div className="contact-info">
                    <div className="contact-item">
                        <Mail size={20} className="icon" />
                        <span>hermeneuta@gmail.com</span>
                    </div>
                </div>
            </div>

            <div className="about-card highlight">
                <h3><Handshake size={24} /> Seja um Parceiro</h3>
                <p>
                    Quer divulgar seu evento, curso ou compartilhar um artigo de sua autoria?
                    Estamos sempre em busca de novas vozes e parcerias que agreguem valor à nossa comunidade.
                    Entre em contato para oportunidades de colunismo e patrocínio.
                </p>
            </div>

            <style jsx>{`
                .about-container {
                    max-width: 800px;
                    margin: 2rem auto;
                    padding: 0 1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }
                .about-card {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    border: 1px solid var(--color-border);
                }
                .about-card h2 {
                    color: var(--color-primary);
                    margin-bottom: 1rem;
                    font-size: 1.8rem;
                }
                .about-card p {
                    line-height: 1.6;
                    color: var(--color-text);
                    margin-bottom: 1.5rem;
                }
                .contact-info {
                    margin-top: 2rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid #eee;
                }
                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    color: var(--color-secondary);
                    font-weight: 600;
                    font-size: 1.1rem;
                }
                .highlight {
                    background: #fdfaf5; /* Warm accent background */
                    border-left: 5px solid var(--color-secondary);
                }
                .highlight h3 {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    color: var(--color-secondary);
                    margin-bottom: 1rem;
                }
            `}</style>
        </div>
    );
};

export default AboutSection;
