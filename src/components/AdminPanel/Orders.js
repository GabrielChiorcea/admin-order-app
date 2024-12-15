import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import classes from './Products.module.css';

export default function Orders() {
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
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setProducts(loadedProducts);
    };

    fetchData();
  }, []);

  return (
    <div className={classes.productsContainer}>
      <Box sx={{ flexGrow: 1, padding: '2rem' }}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    {product.name}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {product.description}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                    {/* ${product.price.toFixed(2)} */}
                    {product.price}
                  </Typography>
                  <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="primary" style={{ marginRight: '8px' }}>
                    empty stoc
                  </Button>
                  <Button variant="contained" color="secondary">
                    set busy
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}