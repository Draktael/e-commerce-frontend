import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    // En una aplicación real, este ID podría ser dinámico o provenir del estado global
    // o del contexto de la aplicación.
    // También podrías usar un hook de contexto o Redux para manejar el estado del carrito.
    const [products, setProducts] = useState([]);
    const [cartId, setCartId] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const productRes = await axios.get('http://localhost:8000/api/products/');
                setProducts(productRes.data); // Carga los productos disponibles
                const token = localStorage.getItem('accessToken');
                const res = await axios.get('http://localhost:8000/api/cart/authenticated/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCartId(res.data.id); //Guarda el ID del carrito autenticado
            } catch (err) {
                console.error('Error al obtener el carrito del usuario:', err);
            }
        };
        fetchCart();
    }, []);

    const handleAddToCart = async (productId) => {
        if (!cartId) {
            console.error('Carrito no encontrado. Asegúrate de que el usuario esté autenticado.');
            return;
        }

        try{
            const token = localStorage.getItem('accessToken');
            const res = await axios.post(`http://localhost:8000/api/cart/${cartId}/add/`, {
                product_id: productId,
                quantity: 1
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Producto agregado al carrito:', res.data);
        } catch (err) {
            console.error('Error al agregar producto al carrito:', err);
            alert('Error al agregar el producto al carrito. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div>
            <h2>Catalogo de Productos</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h3>{product.name} - ${product.price}</h3>
                        <button onClick={() => handleAddToCart(product.id)}>Agregar al carrito</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;