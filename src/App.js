import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import Admin from './components/AdminPanel/Admin';
import Login from './components/AdminPanel/Login'; // Importă componenta Login
import { useSelector } from 'react-redux';

const App = () => {
  const isAdmin = useSelector(state => state.cart.isAdmin); // Selectează starea isAdmin din store
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };



  return (
    <>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Routes>
          <Route path="/" element={<Meals />} />
          <Route path="/login" element={isAdmin ? <Navigate to="/admin"/> : <Login  />} />
          <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/login" />} />

        </Routes>
      </main>
    </>
  );
};

export default App;