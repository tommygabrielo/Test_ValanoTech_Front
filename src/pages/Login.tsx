import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { loginAdmin } from '../service/authService';
import { useNavigate } from 'react-router-dom';
import '../assets/Login.css';
import { motion } from 'framer-motion';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await loginAdmin(email, motDePasse);
            if (res.role === 'admin') {
                login('admin');
                navigate('/admin');
            } else {
                setError("Accès refusé : vous n'êtes pas admin");
            }
        } catch (err) {
            setError('Identifiants invalides');
        }
    };

    const fillTestAccount = () => {
        setEmail('admin@tom.com');
        setMotDePasse('admin123');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="login-container">
                <h2>Connexion Administrateur</h2>
                <div className="test-account-info">
                    <p>🔑 Compte existant :</p>
                    <p><strong>Email :</strong> admin@tom.com</p>
                    <p><strong>Mot de passe :</strong> admin123</p>
                    <button type="button" onClick={fillTestAccount} className="test-account-button">
                        Remplir automatiquement
                    </button>
                </div>
                {error && <p className="login-error">{error}</p>}
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={motDePasse}
                        onChange={e => setMotDePasse(e.target.value)}
                        required
                        className="login-input"
                    />
                    <button type="submit" className="login-button">Se connecter</button>

                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="back-button"
                    >
                        Retour
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default Login;
