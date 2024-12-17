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
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch data from your database
    const fetchData = async () => {
      const response = await fetch('https://order-app-8c499-default-rtdb.firebaseio.com/orders.json');
      const data = await response.json();
      const loadedOrders = {};

      for (const key in data) {
        const orderItems = data[key].orderedItems;
        const user = data[key].user;

        if (!loadedOrders[user.name]) {
          loadedOrders[user.name] = {
            userName: user.name,
            city: user.city,
            street: user.street,
            items: [],
          };
        }

        orderItems.forEach((item) => {
          loadedOrders[user.name].items.push({
            food: item.name,
            total: item.price * item.amount,
            amount: item.amount,
          });
        });
      }

      setOrders(Object.values(loadedOrders));
    };

    fetchData();
  }, []);

  return (
    <div className={classes.productsContainer}>
      <Box sx={{ flexGrow: 1, padding: '2rem' }}>
        <Grid container spacing={3}>
          {orders.map((order, index) => {
            let firstTotal = 0;
            let secondTotal = 0;

            order.items.forEach(item => {
              if (firstTotal === 0) {
                firstTotal += item.total;
              } else {
                secondTotal += item.total;
              }
            });

            const grandTotal = firstTotal + secondTotal;

            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                      {order.userName}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {order.city}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {order.street}
                    </Typography>
                    {order.items.map((item, idx) => (
                      <div key={idx}
                      
                      style={{border:'2px, solid, #00A082', borderRadius:'14px', marginBottom:'5px', padding:'5px'}}> 


                      
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                          {item.food}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                          Amount: {item.amount}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                          Total: ${item.total.toFixed(2)}
                        </Typography>
                      </div>
                    ))}
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                      Grand Total: ${grandTotal.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained"            
                     style={{ marginRight: '8px', backgroundColor: '#FFC244' }}>
                      Accesp order
                    </Button>
                    
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}