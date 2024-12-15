import React from 'react';
import {cartActions} from '../../store/cart-slice';
import { Button } from "@mui/material"
import { useDispatch } from 'react-redux';
import { useState} from 'react';

const HeaderAdminButton = () => {

    const [stock, setStock] = useState(false);
    const [product, setProduct] = useState(false);
    const [orders, setOrders] = useState(true);

    const dispatch = useDispatch();

    const stockHandler = () => {
        setStock(true);
        setProduct(false);
        setOrders(false);
        dispatch(cartActions.setStockButton(true));
        dispatch(cartActions.setProductButton(false));

        
    }

    const productHandler = () => {
        setProduct(true);
        setStock(false);
        setOrders(false);
        dispatch(cartActions.setProductButton(true));
        dispatch(cartActions.setStockButton(false));
    }

    const ordersHandler = () => {   
        setOrders(true);
        setProduct(false);
        setStock(false);
        dispatch(cartActions.setOrderButton(true));
        dispatch(cartActions.setProductButton(false));
        dispatch(cartActions.setStockButton(false));
    }

    


    return (
        <>

        <Button variant="contained" onClick={ordersHandler} 
        
        sx={{backgroundColor: orders ? '#00A082' : '#015e4d'}}
        
        >
            Orders
        </Button>

        <Button variant="contained" onClick={stockHandler} 
        
        sx={{backgroundColor: stock ? '#00A082' : '#015e4d'}}
        
        >
            Stoks
        </Button>

        <Button variant="contained" onClick={productHandler} 
        
        sx={{backgroundColor: product ? '#00A082' : '#015e4d'}}
        
        >
            Add product
        </Button>
        </>
    )
}

export default HeaderAdminButton