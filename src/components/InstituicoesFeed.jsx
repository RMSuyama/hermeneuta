import React from 'react';
import { Building2, MapPin, ExternalLink, GraduationCap, Gavel, ArrowLeft, Phone, Globe } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

const InstituicoesFeed = ({ instituicoes }) => {
  const { id } = useParams();

  // DETAIL VIEW (LANDING PAGE)
  if (id) {
    const institution = instituicoes?.find(i => i.id.toString() === id);

    if (!institution) return <div className="p-4 text-center">Instituição não encontrada. <Link to="/instituicoes">Voltar</Link></div>;

    return (
      <div className="institution-landing">
        <div className="hero-section" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${institution.cover})` }}>
          <div className="hero-content">
            <span className="inst-type-badge">{institution.type}</span>
            <h1 className="hero-title">{institution.name}</h1>
            <p className="hero-city"><MapPin size={18} /> {institution.city}</p>
          </div>
        </div>

        <div className="content-container">
          <Link to="/instituicoes" className="back-link"><ArrowLeft size={16} /> Voltar para Diretório</Link>

          <div className="main-info-grid">
            <div className="info-column-left">
              <section className="history-section">
                <h2><span className="section-icon"><Building2 size={28} /></span> Nossa História</h2>
                <div className="description-box">
                  <p className="intro-text">{institution.description}</p>
                  <p className="history-text">{institution.history}</p>
                </div>
              </section>

              <section className="presidents-section">
                <h3><span className="section-icon"><Gavel size={24} /></span> Liderança & Legado</h3>
                <div className="presidents-list">
                  {institution.presidents?.map((pres, index) => (
                    <div key={index} className="president-card">
                      <div className="pres-avatar-placeholder">{pres.name.charAt(0)}</div>
                      <div className="pres-info">
                        <strong>{pres.name}</strong>
                        <span>{pres.period}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="services-section">
                <h3><span className="section-icon"><GraduationCap size={24} /></span> Atuação & Serviços</h3>
                <ul className="services-list-grid">
                  {institution.services?.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="info-column-right">
              <div className="contact-card">
                <h3>Contato Oficial</h3>
                <div className="contact-item">
                  <MapPin size={20} className="icon" />
                  <div>
                    <strong>Endereço</strong>
                    <p>{institution.address}</p>
                  </div>
                </div>
                {institution.phone && (
                  <div className="contact-item">
                    <Phone size={20} className="icon" />
                    <div>
                      <strong>Telefone</strong>
                      <p>{institution.phone}</p>
                    </div>
                  </div>
                )}
                {institution.link && institution.link !== '#' && (
                  <div className="contact-item">
                    <Globe size={20} className="icon" />
                    <div>
                      <strong>Website</strong>
                      <a href={institution.link} target="_blank" rel="noopener noreferrer">Acessar Página</a>
                    </div>
                  </div>
                )}
                <button className="contact-action-btn">Fale Conosco</button>
              </div>
            </aside>
          </div>
        </div>

        <style jsx>{`
          .institution-landing { animation: fadeIn 0.5s ease; padding-bottom: 4rem; }
          .hero-section {
            height: 400px;
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
            margin-bottom: 3rem;
            position: relative;
          }
          .hero-section::after {
            content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 100px;
            background: linear-gradient(to top, white, transparent);
          }

          .hero-content { max-width: 800px; padding: 0 2rem; position: relative; z-index: 2; }
          .hero-title { font-family: var(--font-serif); font-size: 3.5rem; margin: 1rem 0; line-height: 1.1; letter-spacing: -1px; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
          .inst-type-badge { background: var(--color-accent); color: #000; padding: 0.4rem 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; border-radius: 2px; }
          .hero-city { font-size: 1.2rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; opacity: 0.9; font-weight: 300; }

          .content-container { max-width: 1000px; margin: 0 auto; padding: 0 2rem; position: relative; z-index: 3; }
          .back-link { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--color-text-muted); text-decoration: none; margin-bottom: 2rem; font-weight: 600; transition: color 0.2s; background: rgba(255,255,255,0.8); padding: 0.5rem 1rem; border-radius: 20px; backdrop-filter: blur(5px); }
          .back-link:hover { color: var(--color-primary); background: white; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }

          .main-info-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 4rem; }
          
          section { margin-bottom: 3rem; }
          .section-icon { color: var(--color-accent); margin-right: 0.5rem; display: inline-flex; vertical-align: middle; }
          
          .info-column-left h2 { font-family: var(--font-serif); font-size: 2.2rem; color: var(--color-primary); margin-bottom: 1.5rem; border-bottom: 2px solid var(--color-border); padding-bottom: 0.5rem; }
          .info-column-left h3 { font-family: var(--font-serif); font-size: 1.6rem; color: var(--color-primary); margin: 0 0 1.5rem; }

          .intro-text { font-size: 1.2rem; font-weight: 600; color: var(--color-secondary); margin-bottom: 1rem; line-height: 1.6; }
          .history-text { font-size: 1.05rem; line-height: 1.8; color: var(--color-text); text-align: justify; }

          .presidents-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
          .president-card { display: flex; align-items: center; gap: 0.8rem; background: #fff; padding: 0.8rem; border: 1px solid var(--color-border); border-radius: 4px; transition: transform 0.2s; }
          .president-card:hover { transform: translateY(-2px); border-color: var(--color-accent); }
          .pres-avatar-placeholder { width: 40px; height: 40px; background: var(--color-secondary); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; border-radius: 50%; font-size: 1.2rem; font-family: var(--font-serif); }
          .pres-info strong { display: block; font-size: 0.9rem; color: var(--color-primary); line-height: 1.1; margin-bottom: 0.2rem; }
          .pres-info span { font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 600; }

          .services-list-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; list-style: none; padding: 0; }
          .services-list-grid li { background: #faf9f6; padding: 0.8rem; border-radius: 4px; font-size: 0.95rem; color: var(--color-secondary); border-left: 3px solid var(--color-accent); font-weight: 500; }

          .contact-card { background: white; padding: 2rem; border-radius: 8px; border: 1px solid var(--color-border); box-shadow: 0 4px 20px rgba(0,0,0,0.05); position: sticky; top: 100px; }
          .contact-card h3 { font-family: var(--font-serif); font-size: 1.4rem; margin-bottom: 1.5rem; color: var(--color-primary); text-transform: uppercase; letter-spacing: 1px; }
          
          .contact-item { display: flex; gap: 1rem; margin-bottom: 1.5rem; align-items: flex-start; }
          .contact-item .icon { color: var(--color-accent); margin-top: 0.2rem; flex-shrink: 0; }
          
          /* Mobile adjustments */
          @media (max-width: 900px) {
            .hero-title { font-size: 2.5rem; }
            .hero-section { height: 300px; }
            .main-info-grid { grid-template-columns: 1fr; gap: 3rem; }
            .contact-card { position: static; }
            .services-list-grid { grid-template-columns: 1fr; }
          }
        `}</style>
      </div>
    );
  }

  // LIST VIEW
  const oabs = instituicoes?.filter(i => i.type && i.type.includes('OAB')) || [];
  const faculdades = instituicoes?.filter(i => i.type && !i.type.includes('OAB')) || [];

  return (
    <div className="instituicoes-wrapper">
      <div className="section-header">
        <h2 className="section-title">Instituições e OABs</h2>
        <div className="section-line"></div>
        <p className="section-subtitle">Diretório Regional das Subseções e Ensino Jurídico</p>
      </div>

      <div className="instituicoes-grid">
        <div className="column-oab">
          <h3 className="column-title">Subseções OAB</h3>
          <div className="cards-list">
            {oabs.map((oab) => (
              <Link to={`/instituicoes/${oab.id}`} key={oab.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="inst-card">
                  <div className="icon-box"><Gavel size={24} /></div>
                  <div className="card-content">
                    <h4>{oab.name}</h4>
                    <div className="info-row">
                      <MapPin size={14} />
                      <span>{oab.address}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="column-edu">
          <h3 className="column-title">Ensino Jurídico</h3>
          <div className="cards-list">
            {faculdades.map((fac) => (
              <Link to={`/instituicoes/${fac.id}`} key={fac.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="inst-card featured">
                  <div className="icon-box edu"><GraduationCap size={24} /></div>
                  <div className="card-content">
                    <h4>{fac.name}</h4>
                    <p className="desc">{fac.description}</p>
                    <div className="info-row">
                      <MapPin size={14} />
                      <span>{fac.address}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Reuse existing styles plus links */
        .section-header { text-align: center; margin-bottom: 3rem; padding-top: 2rem; }
        .section-title { font-family: var(--font-serif); font-size: 2.5rem; color: var(--color-primary); margin-bottom: 0.5rem; }
        .section-line { width: 60px; height: 3px; background: var(--color-accent); margin: 0 auto 1rem; }
        .section-subtitle { font-family: var(--font-sans); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem; }

        .instituicoes-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .column-title { font-family: var(--font-serif); font-size: 1.8rem; border-bottom: 2px solid var(--color-border); padding-bottom: 0.5rem; margin-bottom: 1.5rem; color: var(--color-secondary); }
        
        .cards-list { display: flex; flex-direction: column; gap: 1.5rem; }

        .inst-card {
          display: flex; gap: 1.5rem; padding: 1.5rem; border: 1px solid var(--color-border); background: #fff; transition: all 0.3s ease; align-items: flex-start; cursor: pointer;
        }
        .inst-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-color: var(--color-accent); }
        .inst-card.featured { background: #faf9f6; border-left: 4px solid var(--color-accent); }

        .icon-box { background: var(--color-primary); color: #fff; padding: 0.8rem; border-radius: 4px; display: flex; align-items: center; justify-content: center; }
        .icon-box.edu { background: var(--color-secondary); }

        .card-content h4 { font-family: var(--font-serif); font-size: 1.2rem; margin-bottom: 0.5rem; color: var(--color-text); }
        .info-row { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 0.3rem; }
        .desc { font-size: 0.95rem; margin-bottom: 1rem; line-height: 1.5; color: var(--color-text); }

        @media (max-width: 768px) { .instituicoes-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
};

export default InstituicoesFeed;
