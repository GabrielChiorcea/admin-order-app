import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import HeaderAdminButton from './HeaderAdminButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import { useSelector } from 'react-redux';

const Header = (props) => {

  const isAdmin = useSelector(state => state.cart.isAdmin); // Selectează starea isAdmin din store

  return (
    <Fragment>  
      <header className={classes.header}>
        {!isAdmin ?  <h1>Meals</h1> : <h1>Admin Panel</h1>} {/* Afișează titlul corespunzător */}
        {!isAdmin ? <HeaderCartButton onClick={props.onShowCart} /> : <HeaderAdminButton />} {/* Afișează butonul corespunzător */}
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage}/>
      </div>
    </Fragment>
  );
};

export default Header;
