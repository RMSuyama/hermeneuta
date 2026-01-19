import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Tag, ArrowRight } from 'lucide-react';

const RealEstateFeed = ({ properties }) => {
    if (!properties || properties.length === 0) return <div className="no-properties">Nenhum imóvel cadastrado.</div>;

    return (
        <div className="real-estate-feed">
            <div className="section-header">
                <h2 className="section-title">Oportunidades Imobiliárias</h2>
                <p className="page-intro">
                    Encontre sítios, chácaras, terrenos e imóveis urbanos no Vale do Ribeira. Oportunidades exclusivas para investimento e moradia.
                </p>
            </div>

            <div className="properties-grid">
                {properties.map((property, idx) => (
                    <motion.div
                        key={property.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="property-card"
                    >
                        <div className="property-image-wrapper">
                            <img src={property.image} alt={property.title} className="property-img" />
                            <div className="property-type-badge">{property.type}</div>
                        </div>

                        <div className="property-content">
                            <div className="property-main-info">
                                <h3 className="property-title">{property.title}</h3>
                                <div className="property-price">{property.price}</div>
                            </div>

                            <div className="property-location">
                                <MapPin size={14} />
                                <span>{property.location}</span>
                            </div>

                            <p className="property-description">{property.description}</p>

                            <button className="contact-btn">
                                Ver Detalhes
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
        .real-estate-feed { margin-top: 2rem; }
        
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
          max-width: 800px;
          margin: 0 auto 3rem;
        }

        .section-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .page-intro {
          color: var(--color-text-muted);
          font-size: 1.1rem;
        }

        .properties-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2.5rem;
        }

        .property-card {
          background: white;
          border: 1px solid var(--color-border);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
        }

        .property-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }

        .property-image-wrapper {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .property-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .property-card:hover .property-img {
          transform: scale(1.05);
        }

        .property-type-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--color-primary);
          color: white;
          padding: 0.25rem 0.75rem;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 1px;
          box-shadow: 4px 4px 0 var(--color-secondary);
        }

        .property-content {
          padding: 1.5rem;
        }

        .property-main-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          gap: 1rem;
        }

        .property-title {
          font-size: 1.25rem;
          font-family: var(--font-serif);
          line-height: 1.2;
        }

        .property-price {
          font-weight: 800;
          color: var(--color-secondary);
          font-size: 1.1rem;
          white-space: nowrap;
        }

        .property-location {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin-bottom: 1rem;
        }

        .property-description {
          font-size: 0.9rem;
          color: var(--color-text);
          line-height: 1.5;
          margin-bottom: 1.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .contact-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: none;
          border: 1px solid var(--color-primary);
          padding: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .contact-btn:hover {
          background: var(--color-primary);
          color: white;
        }

        .no-properties {
          text-align: center;
          padding: 5rem;
          font-family: var(--font-serif);
          color: var(--color-text-muted);
        }
      `}</style>
        </div>
    );
};

export default RealEstateFeed;
