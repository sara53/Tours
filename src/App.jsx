import { useEffect } from "react";
import { useState } from "react";

import Loading from './components/loading'
import Tours from './components/Tours'

const url = '/api/react-tours-project';

const App = () => {
  const [ isLoading, setIsLoading ] = useState( true );
  const [ tours, setTours ] = useState( [] )

  const removeTour = ( id ) => {
    setTours( tours.filter( tour => tour.id != id ) )
  }
  const fetchTours = async () => {
    setIsLoading( true )
    try {
      const response = await fetch( url )
      const tours = await response.json();
      setTours( tours )
    } catch ( error ) {
      console.log( error )
    }
    setIsLoading( false )
  }
  useEffect( () => { fetchTours() }, [] )

  if ( isLoading ) {
    return <main>
      <Loading />
    </main>
  }

  if ( tours.length === 0 ) {
    return <main>
      <div className="title">
        <h2>No Tours Left</h2>
        <button style={{ marginTop: '2rem' }} className="btn" onClick={fetchTours}>Fetch Tours</button>
      </div>
    </main>
  }
  return <main>
    <Tours tours={tours} removeTour={removeTour} />
  </main>;
};
export default App;
