import React, { useEffect, useState } from 'react';
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import Cart from './components/Cart';
import SuccessPage from './components/SucessPage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import axios from 'axios';
import HomePage from './components/HomePage';
import './index.css';
import './output.css';

function App() {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  //carga usuario si hay token

  const loadUser = async token => {
    try {
      const res = await axios.get('http://localhost:8000/api/me/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

    console.log("Usuario cargado:", res.data);
    setUser(res.data);
  } catch (err) {
    console.error("Error al cargar usuario:", err.response?.data || err.message);
  }
};
 
 const handleLogin = async (username,password) => {

  if (!username || !password) {
    setLoginError("Usuario y contraseña son requeridos");
    return;
  } 
  try {
    const res = await axios.post('http://localhost:8000/api/token/', {
      username,
      password,
    });

    const token = res.data.access;
    localStorage.setItem('accessToken', token);
    loadUser(token);
    navigate('/'); // Redirige a la página de inicio después del login exitoso
    console.log("Login exitoso:", res.data);
  } catch (err) {
    console.error("Login fallido:", err.response?.data || err.message);
    setLoginError("Error al iniciar sesión. Verifica tus credenciales.");
  }
};

  useEffect(() => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    loadUser(token);
  }
}, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null); //limpia el estado del usuario
    navigate('/'); //redirecciona a la página de login
  };

  return(
    <div>
      <h1>Tienda Online</h1>
      <h1 className="text-blue-500 text-3xl font-bold">¡Hola Tailwind 3.4!</h1>
      <nav>
        <Link to="/">Inicio</Link> | <Link to="/cart">Carrito</Link>
          {user ? (
            <>
              <span> | Bienvenido, {user.username}</span>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </>
          ) : (
            <Link to="/login"> | Iniciar sesión</Link> 
          )}
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route 
          path="/login" 
          element={<LoginForm onLogin={handleLogin} error={loginError} />} 
          />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
  )
}

export default App;
