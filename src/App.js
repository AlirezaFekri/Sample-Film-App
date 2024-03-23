import { useState } from "react";
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
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";


export default function App() {
  const KEY = '64d10ab1';
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useLocalStorageState("watched", [])
  const [selectedId, setSelectedId] = useState(null);

  const [movies, isLoading, error] = useMovies(query);


  function handleSelectMovie(id) {
    setSelectedId(selectedId => selectedId === id ? null : id)
  }
  function handleCloseMovie() {
    setSelectedId(null)
  }
  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie])
  }
  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter(vid => vid.imdbID !== id));
  }

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
