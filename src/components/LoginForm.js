import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        onLogin(username, password); //Se delega al App.js
    };

    return  (
        <form onSubmit={handleSubmit}>
            <h3>Iniciar Sesión</h3>
            <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                /><br />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                /><br />
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
};

export default LoginForm;