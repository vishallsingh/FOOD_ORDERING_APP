import Card from '../UI/Card';
import MealItem from './MealItem';
import classes from './AvailableMeals.module.css';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Veg Pulao',
    description: 'Finest rice and veggies',
    price: 110,
  },
  {
    id: 'm2',
    name: 'kadhai Paneer',
    description: 'Special Indian cottage cheese!',
    price: 165,
  },
  {
    id: 'm3',
    name: 'Dal Makhani',
    description: 'Lentil recipe from North Indian cuisine',
    price: 129,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 109,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
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
// import { useEffect, useState } from 'react';
// import Card from '../UI/Card';
// import classes from './AvailableMeals.module.css';
// import MealItem from './MealItem';



// function AvailableMeals() {
//     const [meals,setMeals]= useState([]);
//     const [isLoading,setIsLoading]=useState(true);
//     const [httpError,setHttpError]=useState();

    
//     useEffect(()=>{

//         async function fetchMealHandler(){
//             const response = await fetch('https://react-http-movie-5bf52-default-rtdb.firebaseio.com/meals.json');
//             const data = await response.json();
//             if(!response.ok){
//                 throw new Error('Failed to fetch meals Data');
//             }
//             const loadedMeals=[];
//             for(const key in data){
//                 loadedMeals.push({
//                     id:key,
//                     name:data[key].name,
//                     description:data[key].description,
//                     price:data[key].price
//                 });
//             }
//             setIsLoading(false);
//             setMeals(loadedMeals);
//         }

//         fetchMealHandler().catch(error=>{
//             setIsLoading(false);
//             setHttpError(error.message);
//         })
//     },[]);

//     if(isLoading){
//         return(
//             <p className={classes.mealsLoading}>Loading...</p>
//         );
//     }
//     if(httpError){
//         return(
//             <p className={classes.mealsError}>{httpError}</p>
//         );
//     }

//     const mealItems = meals.map(meal => (
//         <MealItem
//             key={meal.id}
//             id={meal.id}
//             name={meal.name}
//             price={meal.price}
//             description={meal.description}
//         />));
//     return (
//         <section className={classes.meals}>
//         <Card>
//             <ul>
//                 {mealItems}
//             </ul>
//         </Card>
//         </section>
//     )
// }
// export default AvailableMeals;