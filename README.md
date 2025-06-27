# 🛍️ E-commerce Frontend

Frontend del proyecto de tienda online desarrollado con **React**.

Este frontend se conecta a una API REST desarrollada en Django (ver [ecommerce-backend](https://github.com/Draktael/ecommerce-backend)) y permite:

- Ver productos
- Agregar productos al carrito
- Visualizar y modificar el carrito
- Preparar el flujo para realizar checkout con Stripe

---

## ⚙️ Tecnologías

- React
- Axios
- JavaScript (ES6+)
- HTML + CSS

---

## 🚀 Ejecutar el proyecto localmente

```bash
npm install
npm run dev

src/
├── components/
│   ├── ProductList.js   # Lista de productos y agregar al carrito
│   └── Cart.js          # Vista del carrito (modificar/eliminar)
├── App.js               # Componente principal
└── index.js             # Entrada de la app


📦 Estado del proyecto

✅ Catálogo de productos
✅ Carrito funcional
🔜 Checkout con Stripe
🔜 Autenticación
🔜 Panel de administración
