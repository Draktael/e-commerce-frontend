// src/components/HomePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";


const HomePage = ({ fetchCartCount }) => {
  const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Obtener productos
        const res = await axios.get("http://localhost:8000/api/products/");
        setProducts(res.data);

        // 2. Obtener carrito (autenticado o anónimo)
        const token = localStorage.getItem("accessToken");
        if (token) {
          const cartRes = await axios.get("http://localhost:8000/api/cart/authenticated/", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setCartId(cartRes.data.id);
        } else {
          let anonId = localStorage.getItem("anonymousCartId");
          let url = "http://localhost:8000/api/cart/anonymous/";
          if (anonId) url += `?cart_id=${anonId}`;

          const cartRes = await axios.get(url);
          setCartId(cartRes.data.id);
          localStorage.setItem("anonymousCartId", cartRes.data.id);
        }
      } catch (err) {
        console.error("Error al cargar productos o carrito:", err);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!cartId) return alert("Carrito no disponible");

    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `http://localhost:8000/api/cart/${cartId}/add/`,
        { product_id: productId, quantity: 1 },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );
      if (fetchCartCount) fetchCartCount();
      alert("Producto agregado al carrito");
    } catch (err) {
      console.error("Error al agregar producto:", err);
      alert("No se pudo agregar el producto al carrito.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
         Catálogo de Productos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col"
          >
            <div className="h-40 bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
              <span className="text-gray-400">Imagen</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {product.name}
            </h3>
            <p className="text-gray-600 font-medium mb-4">
              ${product.price.toLocaleString("es-CL")}
            </p>
            <button className="mt-auto bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors" onClick={() => handleAddToCart(product.id)}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;