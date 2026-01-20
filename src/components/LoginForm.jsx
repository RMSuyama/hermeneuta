import React, { useState } from 'react';
import { Lock, Eye, EyeOff, User } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginForm = ({ onLogin, editors = [] }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Admin Master Access
    if (username === 'admin' && password === 'admin123') {
      onLogin('admin');
      return;
    }

    // Check against registered editors (from Supabase)
    const foundEditor = editors.find(ed => ed.username === username && ed.password === password);

    if (foundEditor) {
      onLogin(foundEditor.username === 'admin' ? 'admin' : 'editor');
    } else {
      setError('Usuário ou senha incorretos. Verifique os dados e tente novamente.');
      setPassword('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="login-card"
    >
      <div className="login-header">
        <Lock size={32} className="login-icon" />
        <h2>Acesso Restrito</h2>
        <p>Insira suas credenciais para acessar o painel.</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-wrapper">
          <div className="icon-input">
            <User size={18} className="field-icon" />
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              placeholder="Usuário (Login)"
              className="with-icon"
              autoFocus
            />
          </div>
        </div>

        <div className="input-wrapper">
          <div className="icon-input">
            <Lock size={18} className="field-icon" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Senha"
              className="with-icon"
            />
            <button
              type="button"
              className="toggle-visibility"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="login-btn">Entrar</button>
      </form>

      <style jsx>{`
        .login-card {
          max-width: 400px;
          margin: 100px auto;
          background: white;
          padding: 3rem;
          border: 1px solid var(--color-primary);
          box-shadow: 10px 10px 0 var(--color-primary);
          text-align: center;
        }

        .login-header h2 {
          font-size: 1.5rem;
          margin: 1rem 0 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .login-header p {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          margin-bottom: 2rem;
        }

        .login-icon {
          color: var(--color-primary);
        }

        .input-wrapper {
          position: relative;
          margin-bottom: 1rem;
        }
        
        .icon-input {
            position: relative;
            display: flex;
            align-items: center;
        }
        
        .field-icon {
            position: absolute;
            left: 1rem;
            color: var(--color-text-muted);
            pointer-events: none;
        }

        input {
          width: 100%;
          padding: 1rem;
          border: 1px solid var(--color-border);
          font-family: var(--font-sans);
          font-size: 1rem;
        }
        
        input.with-icon {
            padding-left: 3rem;
        }

        .toggle-visibility {
          position: absolute;
          right: 1rem;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
        }

        .error-msg {
          color: #cc0000;
          font-size: 0.8rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .login-btn {
          width: 100%;
          padding: 1rem;
          background: var(--color-primary);
          color: white;
          border: none;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .login-btn:hover {
          background: var(--color-secondary);
        }
      `}</style>
    </motion.div>
  );
};

export default LoginForm;
