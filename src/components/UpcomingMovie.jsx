import React,{useState,useEffect} from 'react'
import Spinner from './Spinner'
import UpcomingMovieCard from './UpcomingMovieCard'
const API_BASE_URL="https://api.themoviedb.org/3"
const API_KEY=import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS={
    method:'GET',
    headers:{
      accept:'application/json',
      Authorization:`Bearer ${API_KEY}`
    }
  }
const UpcomingMovie = () => {
      const [movieList, setMovieList] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
      
    const fetchMovies=async()=>{
        setIsLoading(true); 

try{
    const endpoint=`${API_BASE_URL}/movie/upcoming`
    const response=await fetch(endpoint,API_OPTIONS)
    if(!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data=await response.json()
      const currentDate = new Date().toISOString().split('T')[0];
      const filteredMovies = data.results.filter(
          (movie) => movie.release_date >= currentDate
      );

      setMovieList(filteredMovies);
}
catch(error){
    console.error(`Error fetching movies: ${error}`);

}finally{
    setIsLoading(false)
}


    }
    useEffect(()=>{
        fetchMovies()
    },[])
  return (
    <div className='mt-10'>
        <section className='all-movies'>
            <h2>Upcoming Movies</h2>
{isLoading ?(
    <Spinner/>
):(
    <ul>
        {movieList.map((movie)=>(
            <UpcomingMovieCard key={movie.id} movie={movie}/>

        ))}
    </ul>
)}
        </section>
    </div>
  )
}

export default UpcomingMovie