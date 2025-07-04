import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    return (
        <form onSubmit={async (e) => {
            e.preventDefault();
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
                