import { useEffect, useState } from 'react';

import MealItem from './MealItem';
import fetchAvailableMeals from '../../https';
import Error from '../Error';

export default function Meals() {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchMeals, setFetchMeals] = useState([]);
  let meals;
  useEffect(() => {
    async function fetchMeals() {
      setIsFetching(true);
      try {
        meals = await fetchAvailableMeals();
        setFetchMeals(meals);
        setIsFetching(false);
      } catch (error) {
        setError({
          message:
            error.message || 'Could not fetch meals ,Please try again later !',
        });
        setIsFetching(false);
      }
    }
    fetchMeals();
  }, []);

  if (error) {
    return <Error title="An Error Occured !!!!! " message={error.message} />;
  }
  return (
    <ul id="meals">
      {isFetching && <p className="fallback-text"> Fetching Meals data...</p>}
      {!isFetching && fetchMeals.length === 0 && <p>No meals are available</p>}
      {!isFetching &&
        fetchMeals.map((item, index) => {
          return (
            <MealItem
              key={item.id}
              id={item.id}
              imgSrc={`http://localhost:3000/${item.image}`}
              name={item.name}
              price={item.price}
              description={item.description}
            />
          );
        })}
    </ul>
  );
}
