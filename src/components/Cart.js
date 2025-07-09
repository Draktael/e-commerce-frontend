import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get('http://localhost:8000/api/cart/authenticated/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCart(res.data);
    } catch (err) {
      console.error('Error fetching user cart:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (product, newQuantity) => {
    if (newQuantity < 1) {
      const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este producto del carrito?");
      if (!confirmDelete) return;
      newQuantity = 0;
    }

    if (newQuantity === 0) {
      try {
        await axios.delete(`http://localhost:8000/api/cart/${cart.id}/remove/`, {
          data: { product_id: product.id },
        });
        fetchCart();
      } catch (err) {
        console.error("Error al eliminar el producto del carrito:", err);
      }
      return;
    }

    try {
      await axios.put(`http://localhost:8000/api/cart/${cart.id}/update/`, {
        product_id: product.id,
        quantity: newQuantity,
      });
      fetchCart();
    } catch (err) {
      console.error("Error updating cart:", err);
      alert("Error al actualizar el carrito. Inténtalo de nuevo más tarde.");
    }
  };

  const handleCheckout = () => {
    axios.post(`http://localhost:8000/api/checkout/${cart.id}/`, {
      cart_id: cart.id
    })
    .then(res => {
      window.location.href = res.data.checkout_url;
    })
    .catch(err => {
      console.error("Error al iniciar el checkout:", err);
      alert("Error al procesar el pago. Inténtalo de nuevo más tarde.");
    });
  };

  if (!cart) return <div>Cargando carrito...</div>;

  return (
    <div>
      <h2>🛒 Tu Carrito</h2>
      {cart.items.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {cart.items.map(item => (
            <li key={item.id}>
              {item.product.name} x {item.quantity}
              <button onClick={() => updateQuantity(item.product, item.quantity - 1)}>-</button>
              <button onClick={() => updateQuantity(item.product, item.quantity + 1)}>+</button>
            </li>
          ))}
        </ul>
      )}
      {cart.items.length > 0 && (
        <button onClick={handleCheckout}>Proceder al pago</button>
      )}
    </div>
  );
};

export default Cart;
