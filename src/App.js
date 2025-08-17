import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './components/Cart';
import SuccessPage from './components/SucessPage';
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import './output.css';

function App() {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleLogin = async (username, password) => {

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
      setLoginError(null); // Resetea el error al intentar iniciar sesión
      setCartCount(0); // Resetea el conteo del carrito al iniciar sesión
      fetchCartCount(); // Actualiza el conteo del carrito después de iniciar sesión
      navigate('/'); // Redirige a la página de inicio después del login exitoso
      console.log("Login exitoso:", res.data);
    } catch (err) {
      console.error("Login fallido:", err.response?.data || err.message);
      setLoginError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      let res;

      if (token) {
        res = await axios.get('http://localhost:8000/api/cart/authenticated/', {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        const anonCartId = localStorage.getItem('anonymousCartId');
        let url = 'http://localhost:8000/api/cart/anonymous/';
        if (anonCartId) {
          url += `?cart_id=${anonCartId}`;
        }
        res = await axios.get(url);
      }

      const items = res.data.items || [];
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    } catch (err) {
      console.error('Error obteniendo el conteo del carrito:', err);
    }
  };


  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      loadUser(token);
    }
    fetchCartCount();
    setLoginError(null); // Resetea el error de login al cargar la aplicación
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null); //limpia el estado del usuario
    fetchCartCount(); // Resetea el conteo del carrito al cerrar sesión
    setLoginError(null); // Resetea el error de login al cerrar sesión
    navigate('/');
  };

  return (
    <div>
      <nav className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
        <Link to="/" className="text-4xl font-bold text-black-600">sho.es</Link>
        <div className="relative flex items-center gap-4">
          <Link to="/cart" className="text-black text-3xl hover:text-gray-800">
            <FiShoppingCart />
          </Link>
          {cartCount > 0 && (
            <span className="text-sm text-black bg-yellow-500 px-[7px] rounded-full absolute bottom-6 right-[100px]">
              {cartCount}
            </span>
          )}
          {user ? (
            <>
              <span className="text-gray-700">Bienvenido, {user.username}</span>
              <button
                onClick={handleLogout}
                className="text-red-500 font-medium hover:underline"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-black hover:text-gray-800 font-medium"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage fetchCartCount={fetchCartCount} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} error={loginError} />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer position='top-center' autoClose={3000}/>
      <Footer />
    </div>
  )
}

export default App;
