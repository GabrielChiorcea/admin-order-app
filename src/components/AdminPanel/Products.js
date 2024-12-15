import React, { useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import classes from './Products.module.css';

function renderRow(props) {
  const { index, style, data } = props;
  const item = data[index];

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={item.name} />
        <Button variant="contained" color="primary" style={{ marginRight: '8px' }}>
          empty stoc
        </Button>
        <Button variant="contained" color="secondary">
          set busy
        </Button>
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from your database
    const fetchData = async () => {
      const response = await fetch('https://order-app-8c499-default-rtdb.firebaseio.com/products.json');
      const data = await response.json();
      const loadedProducts = [];

      for (const key in data) {
        loadedProducts.push({
          id: key,
          name: data[key].name
        });
      }

      setProducts(loadedProducts);
    };

    fetchData();
  }, []);

  return (
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
          itemCount={products.length}
          itemData={products} // Pass the products data to the list
          overscanCount={5}
          style={{ backgroundColor: 'white', borderRadius: '14px' }} 
        >
          {({ index, style, data }) => renderRow({ index, style, data })}
        </FixedSizeList>
      </Box>
    </div>
  );
}


