import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-6 ">
      <p className="text-sm">&copy; {new Date().getFullYear()} SHO.ES - Todos los derechos reservados</p>
    </footer>
  );
};

export default Footer;