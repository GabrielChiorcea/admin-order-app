import { use, useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [meals, setMeals] = useState([]);
  const [errorBase, setErrorBase] = useState(null);



  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        `${apiUrl}/food.json`
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          availability: responseData[key].availability,
        });
      }

      setMeals(loadedMeals);
    };

    fetchMeals().catch((error) => {
      setErrorBase(error.message); // Setează mesajul de eroare
    });
  }, []);



  if (errorBase) {
    return (
      <section className={classes.MealsError}>
        <h3>{errorBase}</h3> {/* Afișează mesajul de eroare */}
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      availability={meal.availability}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
