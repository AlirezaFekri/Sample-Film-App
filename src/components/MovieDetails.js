import React, { useEffect, useState } from 'react'
import ErrorMessage from './errorMessage';
import Loader from './loader';
import StarRating from './starRating'


function MovieDetails({ selectedId, onCloseMovie, apiKey }) {
    const [moveDetails, setMovieDetails] = useState({});
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [rate, setRate] = useState(0);
    const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = moveDetails;
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
                        <StarRating maxRating={10} size={24} onSetRating={setRate} defaultRaing={imdbRating} />
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