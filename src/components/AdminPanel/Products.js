import React, { useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import classes from './Products.module.css';
import { useSelector } from 'react-redux';
import  Modal  from '../UI/Modal';

function RenderRow({ index, style, data, updateFoodItemAvailability }) {
  const item = data[index];

  return (

    
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={item.name} />
        {item.availability ? (
          <Button
            onClick={() => updateFoodItemAvailability(item.id, item.availability)}
            variant="contained"
            style={{ marginRight: '8px', backgroundColor: 'red' }}
          >
            set empty stock
          </Button>
        ) : (
          <Button
            onClick={() => updateFoodItemAvailability(item.id, item.availability)}
            variant="contained"
            style={{ marginRight: '8px', backgroundColor: 'green' }}
          >
            set back in stock
          </Button>
        )}
        <Button variant="contained" color="primary">
          set busy
        </Button>
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const meals = useSelector((state) => state.cart.meals);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availabilityState, setAvailabilityState] = useState(
    meals.reduce((acc, meal) => {
      acc[meal.id] = meal.availability;
      return acc;
    }, {})
  );

  const updateFoodItemAvailability = async (id, currentAvailability) => {
    const newAvailability = !currentAvailability;
    setAvailabilityState((prevState) => ({
      ...prevState,
      [id]: newAvailability,
    }));

    try {
      const response = await fetch(`${apiUrl}/food/${id}/availability.json`, {
        method: 'PUT',
        body: JSON.stringify(newAvailability),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      } else {
        setSuccessMessage('Product successfully updated ');
        setIsModalOpen(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
     { (isModalOpen) && 
    <div className={classes.overlayConainer}>      
      <Modal > 
        <div className={classes.modalContent}>
          {successMessage}       
            <Button 
            style={{ backgroundColor: '#FFC244' }}
            variant="contained"  
            onClick={() => setIsModalOpen(false)}> 
                colose
            </Button>
          </div>
       </Modal>
      </div>}
    
    <div className={classes.productsContainer}>

      <Box
        sx={{ 
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          textAlignLast: 'center',
          width: '80%',
          backgroundColor: '#FFC244',
          borderRadius: '14px',
          padding: '1rem',
          boxShadow: '0 1px 18px 10px rgba(0, 0, 0, 0.25)' }}
      >
        <FixedSizeList
          height={400}
          width='90%'
          itemSize={46}
          itemCount={meals.length}
          itemData={meals.map(meal => ({
            ...meal,
            availability: availabilityState[meal.id]
          }))}
          overscanCount={5}
          style={{ backgroundColor: 'white', borderRadius: '14px' }} 
        >
          {({ index, style, data }) => (
            <RenderRow
              index={index}
              style={style}
              data={data}
              updateFoodItemAvailability={updateFoodItemAvailability}
            />
          )}
        </FixedSizeList>
      </Box>
    </div>
    
    </>
  );
}


