import React from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>¡Pago exitoso!</h1>
      <p>Gracias por tu compra. Tu pedido ha sido procesado con éxito.</p>
      <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
        Volver a la tienda
      </Link>
    </div>
  );
}

export default SuccessPage;