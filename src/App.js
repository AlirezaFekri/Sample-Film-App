import { useEffect, useState } from "react";
import NavBar from "./components/navBar";
import Main from "./components/main";
import Search from './components/search'
import NumResults from './components/numresults'
import Box from './components/box'
import MovieList from "./components/movieList";
import WatchedMovieList from './components/watchedmovieList'
import WatchedSummary from './components/watchedSummary'
import Loader from "./components/loader";
import ErrorMessage from "./components/errorMessage";


export default function App() {
  const [query, setQuery] = useState("interstellar");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("");
  const KEY = '64d10ab1'

  useEffect(() => {
    const fetschMovie = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
        if (!res.ok)
          throw new Error("Network Error!")
        const data = await res.json();
        if (data.Response === 'False')
          throw new Error("Video not Found!")
        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetschMovie();
    // .then(res => res.json())
    // .then(data => setMovies(data.Search))
  }, [query])


  return (
    <>
      <NavBar>
        <Search className="search" placeholder="Search movies..." type="text" setValue={setQuery} value={query} />
        <NumResults movies={movies} />
      </NavBar>

      <Main >
        {/* <Box element={<MovieList movies={movies} />} />
        <Box
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          }
        /> */}

        <Box>
          {isLoading && <Loader>Loading...</Loader>}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>

    </>
  );
}
