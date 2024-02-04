import { useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx'
import { useEffect } from 'react';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [error, setError] = useState();

 
  useEffect(() => {
    async function fetchPlaces () {
      setIsFetching(true);

      try {
        const response = await fetch('http://localhost:3000/places')
        const responseData = await response.json()
        if(!response.ok) {
          throw new Error('Failed to fetch places');
        }
        setAvailablePlaces(responseData.places)
      } catch (error){
        setError({message: error.message || "Couldn't fetch places..."});
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);


if (error){ 
  return <Error title="An error occured!" message={error.message}/>
}


  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
