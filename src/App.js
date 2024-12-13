import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import Admin from './components/AdminPanel/Admin';
import Login from './components/AdminPanel/Login'; // Importă componenta Login

const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Starea pentru autentificare

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Routes>
          <Route path="/" element={<Meals />} />
          <Route path="/login" element={<Login onLogin={loginHandler} />} />
          <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </>
  );
};

export default App;