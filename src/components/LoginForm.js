import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin, error }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // Redirige a la página de registro
    const redirectToRegister = () => {
        navigate('/register'); 
    };
    // Maneja el envío del formulario
    // Se encarga de llamar a la función onLogin que viene del App.js
    // y pasarle los valores de username y password
    // También maneja el evento de prevenir el comportamiento por defecto del formulario
    // para que no se recargue la página al enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        onLogin(username, password); //Se delega al App.js
    };

    return  (
        <form onSubmit={handleSubmit}>
            <h3>Iniciar Sesión</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
            <button type='button' onClick={redirectToRegister}>Registrar</button>
        </form>
    );
};

export default LoginForm;