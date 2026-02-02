import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import NewsFeed from './components/NewsFeed';
import ContactDirectory from './components/ContactDirectory';
import ConcursosFeed from './components/ConcursosFeed';
import LinksUteisFeed from './components/LinksUteisFeed';
import LeituraFeed from './components/LeituraFeed';
import EventosFeed from './components/EventosFeed';
import InstituicoesFeed from './components/InstituicoesFeed';
import VagasFeed from './components/VagasFeed';
import HorarioOnibusFeed from './components/HorarioOnibusFeed';
import EquipamentosFeed from './components/EquipamentosFeed';
import VozDoValeFeed from './components/VozDoValeFeed';
import ReservasFeed from './components/ReservasFeed';
import AdminPanel from './components/AdminPanel';
import StudyLounge from './components/StudyLounge';
import AcademicTools from './components/AcademicTools';
import LoginForm from './components/LoginForm';
import MaintenanceScreen from './components/MaintenanceScreen';
import LoadingScreen from './components/LoadingScreen';
import { useData } from './hooks/useData';
import { Settings, LogOut, Moon, Sun, BookOpen } from 'lucide-react';

import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(''); // 'admin' or 'editor'
  const [maintenanceBypass, setMaintenanceBypass] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  // Theme State
  const [theme, setTheme] = useState('light');

  const location = useLocation();
  const isFocusEligiblePage = location.pathname === '/' ||
    location.pathname.startsWith('/news/') ||
    location.pathname === '/academico';

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }, []);

  useEffect(() => {
    // Only apply the visual focus mode (body class) if focusMode is on AND we are on a reading-heavy page
    const shouldEffectBeActive = focusMode && isFocusEligiblePage;
    document.body.classList.toggle('focus-mode-active', shouldEffectBeActive);
    document.documentElement.classList.toggle('focus-mode-active', shouldEffectBeActive);
  }, [focusMode, isFocusEligiblePage]);

  const data = useData() || {};
  const {
    news = [],
    concursos = [],
    contacts = [],
    leituras = [],
    editors = [],
    eventos = [],
    instituicoes = [],
    equipamentos = [],
    vozDoVale = [],
    reservas = [],
    academico = [],
    loading = true,
    isMaintenanceMode = false
  } = data;



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

  if (loading) return <LoadingScreen />;

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
        <div className="container header-container">
          <div className="admin-controls">
            <button
              className="theme-toggle-btn"
              onClick={() => {
                const newTheme = theme === 'light' ? 'dark' : 'light';
                setTheme(newTheme);
                localStorage.setItem('theme', newTheme);
                document.body.classList.toggle('dark-mode', newTheme === 'dark');
              }}
              title={theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {isAuthenticated && (
              <button
                className="logout-btn"
                onClick={handleLogout}
                title="Sair do Modo Admin"
              >
                <LogOut size={16} />
              </button>
            )}


            <button
              className={`admin-toggle-btn focus-mode-toggle ${focusMode ? 'active' : ''}`}
              onClick={() => setFocusMode(!focusMode)}
              title={focusMode ? "Sair do Modo Foco" : "Modo Foco (Imersão)"}
            >
              <BookOpen size={18} />
            </button>

            <button
              className={`admin-toggle-btn ${showAdmin ? 'active' : ''}`}
              onClick={() => setShowAdmin(!showAdmin)}
              title="Painel de Edição"
            >
              <Settings size={18} />
            </button>
          </div>

          <p className="site-subtitle">Regional & Jurídico</p>
          <h1 className="site-title">Hermeneuta</h1>
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
            <Route path="/" element={<NewsFeed news={news} editors={editors} isAuthenticated={isAuthenticated} focusMode={focusMode} setFocusMode={setFocusMode} />} />
            <Route path="/news/:id" element={<NewsFeed news={news} editors={editors} isAuthenticated={isAuthenticated} focusMode={focusMode} setFocusMode={setFocusMode} />} />
            <Route path="/instituicoes" element={<InstituicoesFeed instituicoes={instituicoes} />} />
            <Route path="/instituicoes/:id" element={<InstituicoesFeed instituicoes={instituicoes} />} />
            <Route path="/vagas" element={<VagasFeed items={data.vagas} />} />
            <Route path="/horarios" element={<HorarioOnibusFeed />} />
            <Route path="/equipamentos" element={<EquipamentosFeed equipamentos={equipamentos} />} />
            <Route path="/reservas" element={<ReservasFeed reservas={reservas} />} />
            <Route path="/eventos" element={<EventosFeed eventos={eventos} isAuthenticated={isAuthenticated} />} />
            <Route path="/eventos/:id" element={<EventosFeed eventos={eventos} isAuthenticated={isAuthenticated} />} />
            <Route path="/concursos" element={<ConcursosFeed concursos={concursos} />} />
            <Route path="/links" element={<LinksUteisFeed />} />
            <Route path="/academico" element={<VozDoValeFeed items={academico} focusMode={focusMode} setFocusMode={setFocusMode} editors={editors} />} />
            <Route path="/academico/:id" element={<VozDoValeFeed items={academico} focusMode={focusMode} setFocusMode={setFocusMode} editors={editors} />} />
            <Route path="/leituras" element={<LeituraFeed leituras={leituras} />} />
            <Route path="/contacts" element={<ContactDirectory contacts={contacts} />} />
            <Route path="/about" element={
              <div className="about-container">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="about-content"
                >
                  <span className="about-subtitle">Excelência & Tradição</span>
                  <h2 className="about-header">Sobre o Hermeneuta</h2>
                  <div className="about-divider"></div>

                  <div className="about-text-wrapper">
                    <p className="lead-text">
                      O <strong>Hermeneuta</strong> nasceu da visão de unir a precisão técnica do Direito à alma pulsante do Vale do Ribeira.
                      Somos mais que um portal; somos uma <strong>equipe multidisciplinar</strong> dedicada à curadoria de conhecimento
                      para o profissional jurídico contemporâneo.
                    </p>

                    <div className="about-grid">
                      <div className="about-card">
                        <h3>Nossa Equipe</h3>
                        <p>Contamos com o apoio de juristas, pesquisadores e comunicadores locais que trabalham incansavelmente para trazer a doutrina e a jurisprudência mais relevante, filtrada pela realidade da nossa região.</p>
                      </div>
                      <div className="about-card">
                        <h3>Missão</h3>
                        <p>Democratizar o acesso à informação jurídica especializada e fortalecer os laços entre os profissionais que sustentam os pilares da justiça nas comarcas do Vale.</p>
                      </div>
                    </div>

                    <p className="closing-text">
                      Seja através da nossa curadoria de notícias, da produção acadêmica na "Voz do Vale" ou do nosso suporte logístico em "Reservas",
                      o Hermeneuta é o seu parceiro na busca pela excelência.
                    </p>
                  </div>
                </motion.div>
              </div>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </main>

      <StudyLounge />
      {focusMode && <AcademicTools />}

      <footer className="footer">
        <div className="container">
          <p>© 2026 Hermeneuta — Regional & Jurídico. Todos os direitos reservados.</p>
        </div>
      </footer>

    </div >
  );
};

export default App;
