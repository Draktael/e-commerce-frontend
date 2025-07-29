// src/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        textAlign: "center",
        background: "#fff",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease",
        cursor: "pointer"
      }}
    >
      <img
        src={product.image || "https://via.placeholder.com/200"}
        alt={product.name}
        style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
      />
      <h3>{product.name}</h3>
      <p style={{ color: "#555" }}>${product.price}</p>
      <button
        style={{
          background: "#4CAF50",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "10px"
        }}
        onClick={() => onAddToCart(product.id)}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;