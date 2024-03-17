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
import MovieDetails from "./components/MovieDetails";


export default function App() {
  const [query, setQuery] = useState("interstellar");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");
  const KEY = '64d10ab1'

  function handleSelectMovie(id) {
    setSelectedId(selectedId => selectedId === id ? null : id)
  }
  function handleCloseMovie() {
    setSelectedId(null)
  }
  function handleAddWatched(movie) {
    if (watched.length === 0) {
      setWatched(watched => [...watched, movie])
      return
    }
    watched?.map(vid => vid.imdbID === movie.imdbID ? vid.userRating === movie.userRating ? <></> : vid.userRating = movie.userRating : setWatched(watched => [...watched, movie]))

  }

  useEffect(() => {
    const fetschMovie = async () => {
      try {
        setIsLoading(true);
        setError("")
        if (query === "")
          throw new Error("Please Enter Movie name(3 charcter)")
        console.log(query);
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);

        if (!res.ok)
          throw new Error("Network Error!")
        const data = await res.json();
        if (data.Response === "False")
          throw new Error("Video not Found!");
        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setError("")
      setMovies([]);

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
          {!isLoading && !error && <MovieList onSelectMovie={handleSelectMovie} movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {
            selectedId ? <MovieDetails selectedId={selectedId} apiKey={KEY} onAddWatched={handleAddWatched} onCloseMovie={handleCloseMovie} /> :
              <>
                <WatchedSummary watched={watched} />
                <WatchedMovieList watched={watched} />
              </>
          }
        </Box>
      </Main>

    </>
  );
}
