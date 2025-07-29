// src/components/HomePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const HomePage = () => {
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
      alert("Producto agregado al carrito");
    } catch (err) {
      console.error("Error al agregar producto:", err);
      alert("No se pudo agregar el producto al carrito.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>🛍️ Catálogo de Productos</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;