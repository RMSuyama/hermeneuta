import React from 'react';
import { Mail, Briefcase, Handshake } from 'lucide-react';

const AboutSection = () => {
    return (
        <div className="about-container">
            <div className="about-card">
                <h2>A Voz do Direito no Vale do Ribeira</h2>
                <p>
                    O <strong>Hermeneuta</strong> nasceu de uma lacuna real: a necessidade de uma plataforma que
                    entendesse a dinâmica única do Direito no interior paulista. Não somos apenas um agregador de notícias,
                    mas um ecossistema projetado para elevar a prática jurídica regional.
                </p>
                <div className="about-features-grid">
                    <div className="feature-small">
                        <h4>Informação de Ponta</h4>
                        <p>Notícias curadas com foco no Judiciário, Agronegócio e Direito Ambiental.</p>
                    </div>
                    <div className="feature-small">
                        <h4>Produtividade Nativa</h4>
                        <p>Ferramentas de imersão e gestão de tempo integradas ao seu fluxo de leitura.</p>
                    </div>
                    <div className="feature-small">
                        <h4>Conexão Institucional</h4>
                        <p>Acesso direto a tribunais, subseções da OAB e diretórios de contatos oficiais.</p>
                    </div>
                </div>
                <div className="contact-info">
                    <div className="contact-item">
                        <Mail size={20} className="icon" />
                        <span>contato@hermeneuta.com.br</span>
                    </div>
                </div>
            </div>

            <div className="about-card highlight">
                <h3><Handshake size={24} /> Conecte-se com a Comunidade</h3>
                <p>
                    Acreditamos que a força do advogado no interior vem da sua rede. Se você deseja contribuir com artigos,
                    divulgar eventos ou estabelecer parcerias institucionais, o Hermeneuta é o seu canal oficial.
                    Junte-se à maior rede jurídica do Vale do Ribeira.
                </p>
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
                    background: var(--color-background);
                    padding: 2.5rem;
                    border-radius: 12px;
                    box-shadow: var(--shadow-sm);
                    border: 1px solid var(--color-border);
                    transition: background-color 0.3s ease;
                }
                .about-card h2 {
                    color: var(--color-primary);
                    margin-bottom: 1rem;
                    font-size: 1.8rem;
                }
                .about-card p {
                    line-height: 1.8;
                    color: var(--color-text);
                    margin-bottom: 2rem;
                    font-size: 1.1rem;
                }
                .about-features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 2rem;
                    margin: 2rem 0;
                }
                .feature-small h4 {
                    font-size: 1rem;
                    margin-bottom: 0.5rem;
                    color: var(--color-secondary);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .feature-small p {
                    font-size: 0.9rem !important;
                    line-height: 1.5 !important;
                    margin-bottom: 0 !important;
                }
                .contact-info {
                    margin-top: 2rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid var(--color-border);
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
                    background: rgba(197, 160, 34, 0.05); /* Soft Gold background */
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
