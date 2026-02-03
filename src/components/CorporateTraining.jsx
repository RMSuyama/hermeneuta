import React from 'react';
import { Users, Briefcase, BarChart, CheckCircle, Mail } from 'lucide-react';

const CorporateTraining = () => {
    return (
        <div className="corporate-training fade-in">
            {/* Hero Section */}
            <section className="training-hero">
                <div className="hero-content">
                    <span className="hero-subtitle">Soluções Corporativas</span>
                    <h1 className="hero-title">Treinamento Jurídico <br /> Para Empresas</h1>
                    <div className="hero-line"></div>
                    <p className="hero-desc">
                        Capacite sua equipe com o conhecimento jurídico essencial para mitigar riscos,
                        otimizar processos e garantir conformidade.
                    </p>
                    <button className="cta-btn" onClick={() => document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' })}>
                        Solicitar Proposta
                    </button>
                </div>
            </section>

            {/* Methodology / Features Grid */}
            <section className="features-section">
                <div className="features-grid">
                    <div className="feature-card">
                        <Users size={40} className="feature-icon" />
                        <h3>In Company</h3>
                        <p>Treinamentos realizados na sede da sua empresa ou online, adaptados à sua cultura e rotina.</p>
                    </div>
                    <div className="feature-card">
                        <Briefcase size={40} className="feature-icon" />
                        <h3>Conteúdo Personalizado</h3>
                        <p>Programas desenhados especificamente para as necessidades do seu setor e da sua região.</p>
                    </div>
                    <div className="feature-card">
                        <BarChart size={40} className="feature-icon" />
                        <h3>Resultados Mensuráveis</h3>
                        <p>Foco na aplicação prática do conhecimento para gerar valor real e segurança jurídica.</p>
                    </div>
                </div>
            </section>

            {/* Topics Section */}
            <section className="topics-section">
                <h2 className="topics-title">Áreas de Atuação</h2>
                <div className="topics-list">
                    <div className="topic-item">
                        <CheckCircle size={20} className="topic-check" />
                        <span>Compliance e Ética Corporativa</span>
                    </div>
                    <div className="topic-item">
                        <CheckCircle size={20} className="topic-check" />
                        <span>LGPD e Proteção de Dados</span>
                    </div>
                    <div className="topic-item">
                        <CheckCircle size={20} className="topic-check" />
                        <span>Direito do Consumidor para Equipes de Vendas</span>
                    </div>
                    <div className="topic-item">
                        <CheckCircle size={20} className="topic-check" />
                        <span>Relações Trabalhistas e Gestão de Pessoas</span>
                    </div>
                    <div className="topic-item">
                        <CheckCircle size={20} className="topic-check" />
                        <span>Contratos e Negociação</span>
                    </div>
                    <div className="topic-item">
                        <CheckCircle size={20} className="topic-check" />
                        <span>Direito Ambiental Prático</span>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section id="contact-section" className="contact-cta-section">
                <div className="contact-card-train">
                    <Mail size={32} className="contact-icon" />
                    <h2>Pronto para elevar o nível da sua equipe?</h2>
                    <p>Entre em contato conosco para desenharmos juntos a melhor solução para sua empresa.</p>
                    <a href="mailto:contato@hermeneuta.com.br" className="email-link">contato@hermeneuta.com.br</a>
                    <p className="phone-text">ou ligue para (13) 99999-9999</p>
                </div>
            </section>

            <style jsx>{`
                .corporate-training {
                    padding-bottom: 4rem;
                }

                /* Hero Styles */
                .training-hero {
                    background-color: var(--color-background);
                    padding: 5rem 1rem 4rem;
                    text-align: center;
                    border-bottom: 1px solid var(--color-border);
                }

                .hero-subtitle {
                    display: block;
                    font-family: var(--font-sans);
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    color: var(--color-secondary);
                    font-weight: 700;
                    margin-bottom: 1rem;
                    font-size: 0.9rem;
                }

                .hero-title {
                    font-family: var(--font-serif);
                    font-size: 3.5rem;
                    color: var(--color-primary);
                    margin-bottom: 1.5rem;
                    line-height: 1.1;
                }

                .hero-line {
                    width: 100px;
                    height: 4px;
                    background: var(--color-accent);
                    margin: 0 auto 2rem;
                }

                .hero-desc {
                    max-width: 700px;
                    margin: 0 auto 3rem;
                    font-size: 1.25rem;
                    color: var(--color-text-muted);
                    font-family: var(--font-serif);
                }

                .cta-btn {
                    background: var(--color-primary);
                    color: white;
                    border: none;
                    padding: 1rem 2.5rem;
                    font-size: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border-radius: 4px;
                }

                .cta-btn:hover {
                    background: var(--color-secondary);
                    color: #121212;
                    transform: translateY(-2px);
                }

                /* Features Styles */
                .features-section {
                    padding: 5rem 1rem;
                    background: rgba(0,0,0,0.02);
                }

                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 2.5rem;
                    max-width: 1100px;
                    margin: 0 auto;
                }

                .feature-card {
                    background: white;
                    padding: 2.5rem;
                    border: 1px solid var(--color-border);
                    text-align: center;
                    transition: transform 0.3s ease;
                }

                .feature-card:hover {
                    transform: translateY(-5px);
                    border-color: var(--color-accent);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                }

                .feature-icon {
                    color: var(--color-secondary);
                    margin-bottom: 1.5rem;
                }

                .feature-card h3 {
                    font-family: var(--font-serif);
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                    color: var(--color-primary);
                }

                .feature-card p {
                    color: var(--color-text-muted);
                    line-height: 1.6;
                }

                /* Topics Styles */
                .topics-section {
                    padding: 5rem 1rem;
                    max-width: 900px;
                    margin: 0 auto;
                    text-align: center;
                }

                .topics-title {
                    font-family: var(--font-serif);
                    font-size: 2.5rem;
                    margin-bottom: 3rem;
                    color: var(--color-primary);
                }

                .topics-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1.5rem;
                    text-align: left;
                }

                .topic-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    background: white;
                    padding: 1rem 1.5rem;
                    border: 1px solid var(--color-border);
                    border-radius: 6px;
                }

                .topic-check {
                    color: var(--color-accent);
                    flex-shrink: 0;
                }

                .topic-item span {
                    font-weight: 500;
                    color: var(--color-text);
                }

                /* Contact CTA Styles */
                .contact-cta-section {
                    padding: 4rem 1rem;
                    max-width: 800px;
                    margin: 0 auto;
                }

                .contact-card-train {
                    background: var(--color-primary);
                    color: white;
                    padding: 4rem 2rem;
                    text-align: center;
                    border-radius: 8px;
                    position: relative;
                    overflow: hidden;
                }

                .contact-icon {
                    color: var(--color-accent);
                    margin-bottom: 1.5rem;
                }

                .contact-card-train h2 {
                    font-family: var(--font-serif);
                    font-size: 2rem;
                    margin-bottom: 1rem;
                    color: white;
                }

                .contact-card-train p {
                    color: rgba(255,255,255,0.8);
                    margin-bottom: 2rem;
                    max-width: 500px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .email-link {
                    display: inline-block;
                    background: var(--color-accent);
                    color: var(--color-primary);
                    padding: 1rem 2rem;
                    font-weight: 700;
                    text-decoration: none;
                    border-radius: 4px;
                    transition: all 0.2s;
                    margin-bottom: 1rem;
                }

                .email-link:hover {
                    background: white;
                    transform: scale(1.05);
                }

                .phone-text {
                    font-size: 0.9rem;
                    opacity: 0.7;
                    margin-bottom: 0 !important;
                }

                @media (max-width: 768px) {
                    .hero-title { font-size: 2.5rem; }
                    .features-grid { grid-template-columns: 1fr; }
                    .topics-list { grid-template-columns: 1fr; }
                }

                 /* Dark Mode Overrides */
                @media (prefers-color-scheme: dark) {
                    .features-section { background: rgba(255,255,255,0.02); }
                    .topic-item { background: #1e1e1e; border-color: #333; }
                }
            `}</style>
        </div>
    );
};

export default CorporateTraining;
