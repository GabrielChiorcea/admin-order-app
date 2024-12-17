// src/components/Admin/Admin.js
import React from 'react';
import Products from './Products';
import Orders from './Orders';

import { useSelector } from 'react-redux';
import AddProduct from './AddProduct';

const Admin = () => {

  const stock = useSelector(state => state.cart.stockButton); // Selectează starea stock din store
  const product = useSelector(state => state.cart.productButton); // Selectează starea product din store
  const order = useSelector(state => state.cart.orderButton); // Selectează starea order din store

  return (
    <div>
      
      { (!stock && !product && order) && <Orders/>}
      {(stock && !product) && <Products/>}
      {(!stock && order && product) && <AddProduct/>}
    </div>
  );
};

export default Admin;