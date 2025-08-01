import React from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin, error }) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const redirectToRegister = () => {
        navigate('/register');
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Iniciar Sesión
                </h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Ingresa tu usuario"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="link"
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                    >
                        Iniciar Sesión
                    </button>
                    <button
                        type="button"
                        className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-300 transition-colors duration-200 mt-4"
                        onClick={redirectToRegister}
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
