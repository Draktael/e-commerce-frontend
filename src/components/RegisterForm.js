import React from "react";
import { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    return (
        <form onSubmit={async (e) => {
            e.preventDefault();
            if(password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }
            if(!username || !password || !email) {
                alert('Todos los campos son obligatorios');
                return;
            }   
            if(password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres');
                return;
            }
            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Correo electrónico inválido');
                return;
            }
            if(!/^[a-zA-Z0-9]+$/.test(username)) {
                alert('El nombre de usuario solo puede contener letras y números');
                return;
            }
            try {
                const res = await axios.post('http://localhost:8000/api/register/',{
                    username,
                    password,
                    email
                });
                console.log("Registro exitoso:", res.data);
                setUsername('');
                setPassword('');
                setEmail('');
            } catch (err) {
                console.error("Error al registrar:", err.response?.data || err.message);
            }
        }}>
            <h3>Registrarse</h3>
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
            <input
                type="password"
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            /><br />
            <input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)
            }/><br />
            <button type="submit">Registrarse</button>
        </form>
    );
};
export default RegisterForm;
                