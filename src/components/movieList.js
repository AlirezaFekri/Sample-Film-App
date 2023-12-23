import React from 'react'
import Movie from './movie'

function MovieList({movies}) {
    return (
        <ul className="list">
            {movies?.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    )
}

export default MovieList