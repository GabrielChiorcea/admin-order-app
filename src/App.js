import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import Admin from './components/AdminPanel/Admin';
import Login from './components/AdminPanel/Login'; // Importă componenta Login
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from './store/cart-slice';

const App = () => {
  const isAdmin = useSelector(state => state.cart.isAdmin); // Selectează starea isAdmin din store
  const [cartIsShown, setCartIsShown] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {  
    const fetchMeals = async () => {
      const response = await fetch(
        'https://order-app-8c499-default-rtdb.firebaseio.com/food.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const responseData = await response.json();


      for (const key in responseData) {
        dispatch(cartActions.addMeal({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          availability: responseData[key].availability,
        }))
      }

    }
    fetchMeals().catch((error) => {
      console.log(error.message);
    });
  }, []);

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