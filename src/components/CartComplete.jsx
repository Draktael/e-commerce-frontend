import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
    const [cart, setCart] = useState(null);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                let anonCartId = localStorage.getItem("anonymousCartId");
                let url = "http://localhost:8000/api/cart/anonymous/";
                if (anonCartId) url += `?cart_id=${anonCartId}`;
                const res = await axios.get(url);
                setCart(res.data);
                localStorage.setItem("anonymousCartId", res.data.id);
                return;
            }
            const res = await axios.get("http://localhost:8000/api/cart/authenticated/", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCart(res.data);
        } catch (err) {
            console.error("Error fetching cart:", err);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const updateQuantity = async (product, newQuantity) => {
        if (newQuantity < 1) {
            if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
            try {
                await axios.delete(`http://localhost:8000/api/cart/${cart.id}/remove/`, {
                    data: { product_id: product.id },
                });
                fetchCart();
            } catch (err) {
                console.error("Error al eliminar:", err);
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
            console.error("Error updating:", err);
        }
    };

    const handleCheckout = () => {
        axios
            .post(`http://localhost:8000/api/checkout/${cart.id}/`, {
                cart_id: cart.id,
            })
            .then((res) => (window.location.href = res.data.checkout_url))
            .catch((err) => alert("Error al procesar el pago"));
    };

    if (!cart) return <div className="text-center py-10">Cargando carrito...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">🛒 Tu Carrito</h2>

            {cart.items.length === 0 ? (
                <p className="text-gray-500">El carrito está vacío.</p>
            ) : (
                <div className="space-y-4">
                    {cart.items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between bg-white shadow-md rounded-lg p-4"
                        >
                            <div>
                                <h3 className="font-semibold">{item.product.name}</h3>
                                <p className="text-sm text-gray-500">
                                    Cantidad: {item.quantity}
                                </p>
                                <p className="text-sm text-gray-700 font-medium">
                                    Subtotal: ${item.total_price}
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => updateQuantity(item.product, item.quantity - 1)}
                                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                                >
                                    -
                                </button>
                                <span className="font-bold">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.product, item.quantity + 1)}
                                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Resumen */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
                        <div className="flex justify-between font-semibold text-lg">
                            <span>Total:</span>
                            <span>${cart.total_price}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                        >
                            Proceder al pago
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;