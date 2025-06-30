import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import SuccessPage from './components/SucessPage';

function App() {
  return (
    <Router>
      <div>
        <h1>Tienda Online</h1>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
