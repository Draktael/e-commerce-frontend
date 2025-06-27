import React, { use, useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const CART_ID = 1; // Asumiendo que el carrito tiene un ID fijo para simplificar
    // En una aplicación real, este ID podría ser dinámico o provenir del estado global
    // o del contexto de la aplicación.
    // También podrías usar un hook de contexto o Redux para manejar el estado del carrito.
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/products/')
        .then(res => {
            setProducts(res.data);
        })
        .catch(err => {
            console.error("Error fetching products:", err);
        });
    }, []);

    const handleAddToCart = (productId) => {

        axios.post(`http://localhost:8000/api/cart/${CART_ID}/add/`, {
            product_id: productId,
            quantity: 1
        })
        .then(res => {
            console.log("Producto agregado al carrito:", res.data);
        })
        .catch(err => {
            console.error("Error al agregar producto al carrito:", err);
        });
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