import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Obtener productos
        const productRes = await axios.get('http://localhost:8000/api/products/');
        setProducts(productRes.data);

        const token = localStorage.getItem('accessToken');

        if (token) {
          // 2. Si el usuario está autenticado
          const res = await axios.get('http://localhost:8000/api/cart/authenticated/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCart(res.data);
        } else {
          // 3. Si no está autenticado: carrito anónimo
          const existingId = localStorage.getItem('anonymousCartId');

          let url = 'http://localhost:8000/api/cart/anonymous/';
          if (existingId) {
            url += `?cart_id=${existingId}`;
          }

          const res = await axios.get(url);
          setCart(res.data);
          localStorage.setItem('anonymousCartId', res.data.id);
        }
      } catch (err) {
        console.error('Error cargando productos o carrito:', err);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!cart || !cart.id) {
      alert('Error: carrito no disponible');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.post(
        `http://localhost:8000/api/cart/${cart.id}/add/`,
        {
          product_id: productId,
          quantity: 1,
        },
        token
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : {}
      );
      console.log('Producto agregado:', res.data);
    } catch (err) {
      console.error('Error al agregar producto al carrito:', err);
      alert('No se pudo agregar el producto.');
    }
  };

  return (
    <div>
      <h2>🛍️ Catálogo</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>
              {product.name} - ${product.price}
            </h3>
            <button onClick={() => handleAddToCart(product.id)}>Agregar al carrito</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
