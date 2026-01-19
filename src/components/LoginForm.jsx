import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginForm = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === 'admin123') {
            onLogin();
        } else {
            setError('Senha incorreta. Tente novamente.');
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
                <p>Insira a senha de administrador para editar o portal.</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
                <div className="input-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Senha de acesso"
                        autoFocus
                    />
                    <button
                        type="button"
                        className="toggle-visibility"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {error && <p className="error-msg">{error}</p>}

                <button type="submit" className="login-btn">Entrar no Painel</button>
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

        input {
          width: 100%;
          padding: 1rem;
          border: 1px solid var(--color-border);
          font-family: var(--font-sans);
          font-size: 1rem;
        }

        .toggle-visibility {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text-muted);
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
