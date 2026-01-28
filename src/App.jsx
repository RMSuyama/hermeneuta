import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import NewsFeed from './components/NewsFeed';
import ContactDirectory from './components/ContactDirectory';
import ConcursosFeed from './components/ConcursosFeed';
import LinksUteisFeed from './components/LinksUteisFeed';
import LeituraFeed from './components/LeituraFeed';
import EventosFeed from './components/EventosFeed';
import AdminPanel from './components/AdminPanel';
import LoginForm from './components/LoginForm';
import MaintenanceScreen from './components/MaintenanceScreen';
import { useData } from './hooks/useData';
import { Settings, LogOut } from 'lucide-react';

import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(''); // 'admin' or 'editor'
  const [maintenanceBypass, setMaintenanceBypass] = useState(false);
  const data = useData() || {};
  const {
    news = [],
    concursos = [],
    contacts = [],
    properties = [],
    leituras = [],
    editors = [],
    eventos = [],
    loading = true,
    isMaintenanceMode = false
  } = data;

  const location = useLocation();

  console.log("App Render - Auth:", isAuthenticated, "Role:", userRole, "Loading:", loading);

  const handleLogin = (role = 'editor') => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setShowAdmin(false);
  };

  if (loading) return <div className="loading">Carregando Hermeneuta...</div>;

  // Maintenance Bypass Check (Admin can enter even in maintenance)
  if (isMaintenanceMode && !maintenanceBypass && !isAuthenticated) {
    return <MaintenanceScreen onAdminLogin={(pass) => {
      if (pass === 'admin123') { // Temporary simple check
        setMaintenanceBypass(true);
      } else {
        alert("Senha incorreta");
      }
    }} />;
  }

  return (
    <div className="app-wrapper">
      <header className="header-top">
        <div className="container">
          <p className="site-subtitle">Regional & Jurídico</p>
          <div className="title-wrapper">
            <h1 className="site-title">Hermeneuta</h1>

            <div className="admin-controls">
              {isAuthenticated && (
                <button
                  className="logout-btn"
                  onClick={handleLogout}
                  title="Sair do Modo Admin"
                >
                  <LogOut size={18} />
                </button>
              )}
              <button
                className={`admin-toggle-btn ${showAdmin ? 'active' : ''}`}
                onClick={() => setShowAdmin(!showAdmin)}
                title="Painel de Edição"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>
          <div className="header-rule"></div>
        </div>
      </header>

      {!showAdmin && <Navigation />}

      <main className="container">
        {showAdmin ? (
          !isAuthenticated ? (
            <LoginForm onLogin={handleLogin} editors={editors} />
          ) : (
            <AdminPanel
              data={data}
              userRole={userRole}
              onClose={() => {
                console.log("Closing AdminPanel");
                setShowAdmin(false);
              }}
            />
          )
        ) : (
          <Routes>
            <Route path="/" element={<NewsFeed news={news} editors={editors} isAuthenticated={isAuthenticated} />} />
            <Route path="/news/:id" element={<NewsFeed news={news} editors={editors} isAuthenticated={isAuthenticated} />} />
            <Route path="/eventos" element={<EventosFeed eventos={eventos} isAuthenticated={isAuthenticated} />} />
            <Route path="/eventos/:id" element={<EventosFeed eventos={eventos} isAuthenticated={isAuthenticated} />} />
            <Route path="/concursos" element={<ConcursosFeed concursos={concursos} />} />
            <Route path="/links" element={<LinksUteisFeed />} />
            <Route path="/leituras" element={<LeituraFeed leituras={leituras} />} />
            <Route path="/contacts" element={<ContactDirectory contacts={contacts} />} />
            <Route path="/about" element={
              <div className="about-section">
                <h2>Sobre o Hermeneuta</h2>
                <p>O Hermeneuta é o portal definitivo para o profissional do Direito no Vale do Ribeira. Unindo informação de qualidade, atualizações legislativas, oportunidades de carreira e um guia prático de contatos.</p>
              </div>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Hermeneuta - Projetado para a Excelência Jurídica</p>
        </div>
      </footer>

      <style jsx>{`
        .app-wrapper {
          min-height: 100vh;
          padding-bottom: 4rem;
        }

        .title-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .admin-controls {
          position: absolute;
          right: 0;
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .admin-toggle-btn, .logout-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text-muted);
          transition: all 0.2s;
        }

        .admin-toggle-btn:hover, .logout-btn:hover {
          color: var(--color-secondary);
        }

        .admin-toggle-btn.active {
          color: var(--color-primary);
          transform: rotate(45deg);
        }

        .header-rule {
          height: 1px;
          background: var(--color-primary);
          width: 50px;
          margin: 1rem auto 0;
        }

        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-family: var(--font-serif);
          font-size: 1.5rem;
        }

        .about-section {
          max-width: 800px;
          margin: 4rem auto;
          text-align: center;
        }

        .about-section h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .footer {
          margin-top: 5rem;
          padding: 2rem 0;
          border-top: 1px solid var(--color-border);
          text-align: center;
          color: var(--color-text-muted);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      `}</style>
    </div>
  );
}

export default App;
