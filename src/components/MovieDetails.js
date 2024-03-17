import React, { useEffect, useState } from 'react'
import ErrorMessage from './errorMessage';
import Loader from './loader';
import StarRating from './starRating'


function MovieDetails({ selectedId, onCloseMovie, apiKey, onAddWatched, watched }) {
    const [moveDetails, setMovieDetails] = useState({});
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [rate, setRate] = useState(0);
    const isWatched = watched.map(vid => vid.imdbID).includes(selectedId);
    const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;

    const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = moveDetails;

    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            poster,
            year,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ').at(0)),
            userRating: rate

        }
        onAddWatched(newWatchedMovie);
        onCloseMovie();
    }

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setIsLoading(true);
                setError("");
                const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`);
                if (!res.ok)
                    throw new Error("Network Error! Please check ypur internet connection.");
                const data = await res.json();
                setMovieDetails(data);
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchMovie();
    }, [selectedId])

    return (<>
        {error && <ErrorMessage message={error} />}
        {isLoading && <Loader>Loading...</Loader>}
        {!error && !isLoading &&
            <div className='details'>

                <header>
                    <button className='btn-back' onClick={onCloseMovie} >&larr;</button>

                    <img src={poster} alt='movie cover' />

                    <div className='details-overview'>

                        <h2>{title}</h2>
                        <p>{released} &bull; {runtime} </p>
                        <p>{genre}</p>
                        <p><span>⭐</span> {imdbRating} IMDb Rating</p>

                    </div>
                </header>

                <section>

                    <div className='rating'>
                        {
                            !isWatched ?
                                <>
                                    <StarRating maxRating={10} size={24} onSetRating={setRate} />
                                    {rate > 0 && <button className='btn-add' onClick={handleAdd} >+Add to List</button>}
                                </> :
                                <p>You rated this movie <span>⭐</span> {watchedUserRating}</p>

                        }
                    </div>

                    <p>
                        <em>{plot}</em>
                    </p>
                    <p>Starring {actors}</p>
                    <p>Directed by {director}</p>

                </section>
            </div>
        }
    </>
    )
}

export default MovieDetails