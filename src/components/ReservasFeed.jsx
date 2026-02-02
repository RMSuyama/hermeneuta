import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, ExternalLink, Hotel, Utensils, Calendar, Map as MapIcon, Search, Tag } from 'lucide-react';

const ReservasFeed = ({ reservas = [] }) => {
  const [filter, setFilter] = useState('TODOS');
  const [selectedCity, setSelectedCity] = useState('TODAS');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'TODOS', label: 'Tudo', icon: <Tag size={14} /> },
    { id: 'HOTEL', label: 'Hospedagem', icon: <Hotel size={14} /> },
    { id: 'RESTAURANTE', label: 'Gastronomia', icon: <Utensils size={14} /> },
    { id: 'TURISMO', label: 'Turismo', icon: <MapIcon size={14} /> },
    { id: 'CAFÉ/BISTRÔ', label: 'Café/Bistrô', icon: <Utensils size={14} /> },
  ];

  // Extract unique cities (handling the "City, SP" format)
  const cities = ['TODAS', ...new Set(reservas.map(item => item.location.split(',')[0].trim()))];

  const filteredItems = (reservas || []).filter(item => {
    const itemCity = item.location.split(',')[0].trim();
    const matchesCategory = filter === 'TODOS' || item.category === filter;
    const matchesCity = selectedCity === 'TODAS' || itemCity.toUpperCase() === selectedCity.toUpperCase();
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesCity && matchesSearch;
  });

  return (
    <div className="reservas-container">
      <header className="reservas-header">
        <div className="header-content">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title"
          >
            Guia de Experiências & Reservas
          </motion.h1>
          <p className="section-subtitle">Descubra o melhor do Vale do Ribeira: Onde ficar, comer e visitar.</p>
        </div>

        <div className="filters-bar">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Buscar por nome, descrição ou cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <span className="filter-label">Filtrar por Cidade:</span>
            <div className="city-filters">
              {cities.map(city => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`city-btn ${selectedCity === city ? 'active' : ''}`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Filtrar por Categoria:</span>
            <div className="category-filters">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="reservas-grid">
        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="reserva-card"
              >
                <div className="card-image">
                  {item.image ? (
                    <img src={item.image} alt={item.title} />
                  ) : (
                    <div className="image-placeholder">
                      <MapPin size={48} />
                    </div>
                  )}
                  <span className="category-badge">{item.category}</span>
                </div>

                <div className="card-content">
                  <div className="location-info">
                    <MapPin size={12} />
                    <span>{item.location}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                  <div className="card-footer">
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="book-btn">
                        Ver Mais <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="no-results">
              <p>Nenhuma recomendação encontrada para os filtros selecionados.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .reservas-container {
          padding-bottom: 4rem;
        }

        .reservas-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .section-title {
          font-family: var(--font-serif);
          font-size: 3rem;
          margin-bottom: 0.5rem;
          color: var(--color-primary);
        }

        .section-subtitle {
          color: var(--color-text-muted);
          font-style: italic;
          margin-bottom: 2rem;
        }

        .filters-bar {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          background: white;
          padding: 2rem;
          border: 1px solid var(--color-border);
          box-shadow: 8px 8px 0 var(--color-border);
          width: 100%;
          max-width: 900px;
          margin: 0 auto 3rem;
        }

        .filter-group {
          width: 100%;
          text-align: center;
        }

        .filter-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin-bottom: 0.75rem;
          letter-spacing: 1px;
        }

        .search-box {
          position: relative;
          width: 100%;
          max-width: 600px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem;
          border: 1px solid var(--color-border);
          background: #fdfdfd;
        }

        .city-filters, .category-filters {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .city-btn, .filter-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1rem;
          background: none;
          border: 1px solid var(--color-border);
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }

        .city-btn:hover, .filter-btn:hover {
          background: rgba(0,0,0,0.05);
          border-color: var(--color-primary);
        }

        .city-btn.active, .filter-btn.active {
          background: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }

        .reservas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2.5rem;
        }

        .reserva-card {
          background: white;
          border: 1px solid var(--color-border);
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .reserva-card:hover {
          transform: translateY(-5px);
        }

        .card-image {
          position: relative;
          height: 220px;
          background: #f0f0f0;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-placeholder {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ccc;
        }

        .category-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--color-primary);
          color: white;
          padding: 0.35rem 0.75rem;
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .card-content {
          padding: 1.5rem;
        }

        .location-info {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--color-secondary);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .card-content h3 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .card-content p {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .book-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--color-primary);
          color: white;
          padding: 0.75rem 1.25rem;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.2s;
        }

        .book-btn:hover {
          background: var(--color-secondary);
        }

        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem;
          background: #f9f9f9;
          border: 1px dashed #ccc;
        }

        @media (max-width: 768px) {
          .section-title { font-size: 2.2rem; }
          .reservas-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default ReservasFeed;
