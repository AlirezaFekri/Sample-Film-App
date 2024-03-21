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
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");
  const KEY = '64d10ab1';

  function handleSelectMovie(id) {
    setSelectedId(selectedId => selectedId === id ? null : id)
  }
  function handleCloseMovie() {
    setSelectedId(null)
  }
  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie])
    localStorage.setItem("watched", JSON.stringify([...watched, movie]))

  }
  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter(vid => vid.imdbID !== id));
    localStorage.setItem("watched", JSON.stringify(watched.filter(vid => vid.imdbID !== id)))
  }

  useEffect(() => {
    const controller = new AbortController();

    const fetschMovie = async () => {
      try {
        setIsLoading(true);
        setError("")
        if (query === "")
          throw new Error("Please Enter Movie name(3 charcter)")

        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal });

        if (!res.ok)
          throw new Error("Network Error!")
        const data = await res.json();
        if (data.Response === "False")
          throw new Error("Video not Found!");
        setMovies(data.Search);
        setError("")
      } catch (err) {
        if (err.message !== "AbortError")
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
    setWatched(x => localStorage.getItem("watched") !== "" ? JSON.parse(localStorage.getItem("watched")) : [])
    return function () {
      controller.abort();
    }
  }, [query])



  return (
    <>
      <NavBar>
        <Search className="search" placeholder="Search movies..." type="text" setValue={setQuery} value={query} />
        <NumResults movies={movies} />
      </NavBar>

      <Main >
        <Box>
          {isLoading && <Loader>Loading...</Loader>}
          {!isLoading && !error && <MovieList onSelectMovie={handleSelectMovie} movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {
            selectedId ? <MovieDetails watched={watched} selectedId={selectedId} apiKey={KEY} onAddWatched={handleAddWatched} onCloseMovie={handleCloseMovie} /> :
              <>
                <WatchedSummary watched={watched} />
                <WatchedMovieList onDeleteWatched={handleDeleteWatched} watched={watched} />
              </>
          }
        </Box>
      </Main>

    </>
  );
}
