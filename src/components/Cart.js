import react, { use, useEffect, useState } from 'react';
import axios from 'axios';

const CART_ID = 1; // Asumiendo que el carrito tiene un ID fijo para simplificar

const Cart= () => {
    const [cart, setCart] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/cart/${CART_ID}/`)
        .then(res => {
            setCart(res.data);
        })
        .catch(err => {
            console.error("Error fetching cart:", err);
        });
    }, []);

    if (!cart) {
        return <div>Cargando carrito...</div>;
    }
    const handleCheckout = () => {
        axios.post(`http://localhost:8000/api/checkout/${CART_ID}/`,{
          cart_id: CART_ID  
        })
        .then(res => {
          const checkoutUrl = res.data.checkout_url;
          window.location.href = checkoutUrl; // Redirigir al usuario a la URL de pago  
        })
        .catch(err => {
          console.error("Error al iniciar el checkout:", err);
          alert("Error al procesar el pago. Inténtalo de nuevo más tarde.");
        });
    };
            
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
            </li>
          ))}
        </ul>
      )}
      {cart.items.length > 0 && (
        <button onClick={handleCheckout}>proceder al pago</button>
      )}
    </div>
    );
};

export default Cart;