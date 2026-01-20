import React, { useState } from 'react';
import { Settings, Lock } from 'lucide-react';

const MaintenanceScreen = ({ onAdminLogin }) => {
    const [showLogin, setShowLogin] = useState(false);
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdminLogin(password);
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f8f4e1',
            color: '#2c3e50',
            fontFamily: '"Playfair Display", serif',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <div style={{ marginBottom: '2rem' }}>
                <Settings size={64} color="#C5A022" />
            </div>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#1A1A1A' }}>Estamos em Manutenção</h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem', fontFamily: '"Inter", sans-serif', color: '#666' }}>
                O Portal Hermeneuta está passando por atualizações para melhor atendê-lo.
                Prometemos voltar logo com novidades jurídicas e informações essenciais.
            </p>

            {!showLogin ? (
                <button
                    onClick={() => setShowLogin(true)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#aaa',
                        fontSize: '0.8rem',
                        marginTop: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <Lock size={14} /> Acesso Administrativo
                </button>
            ) : (
                <form onSubmit={handleSubmit} style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem' }}>
                    <input
                        type="password"
                        placeholder="Senha Admin"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                        autoFocus
                    />
                    <button type="submit" style={{ padding: '0.5rem 1rem', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Entrar
                    </button>
                </form>
            )}
        </div>
    );
};

export default MaintenanceScreen;
