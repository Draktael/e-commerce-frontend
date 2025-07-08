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

    const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/cart/${CART_ID}/`);
      setCart(res.data);
    } catch (err) {
      console.error("Error al obtener el carrito:", err);
    }
  };
    
    const updateQuantity = async (product, newQuantity) => {
  if (newQuantity < 1) {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este producto del carrito?");
    if (!confirmDelete) {
      return; // Si el usuario cancela, no hacemos nada
    }
    newQuantity = 0; // Si el usuario confirma, establecemos la cantidad a 0
  }
  if (newQuantity === 0) {
    // Si la cantidad es 0, eliminamos el producto del carrito
    try {
      await axios.delete(`http://localhost:8000/api/cart/${CART_ID}/remove/`, {
        data: { product_id: product.id },
      });
      fetchCart();
    } catch (err) {
      console.error("Error al eliminar el producto del carrito:", err);
    }
    return;}

  try {
    await axios.put(`http://localhost:8000/api/cart/${CART_ID}/update/`, {
      product_id: product.id,
      quantity: newQuantity,
    });
    fetchCart();
  } catch (err) {
    console.error("Error updating cart:", err);
    alert("Error al actualizar el carrito. Inténtalo de nuevo más tarde.");
  }
};


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
              <button onClick={() => updateQuantity(item.product, item.quantity - 1)}>-</button>
              <button onClick={() => updateQuantity(item.product, item.quantity + 1)}>+</button>
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