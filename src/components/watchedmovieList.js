import React from 'react'
import WatchedMovie from './watchedMovie'

function WatchedMovieList({watched}) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    )
}

export default WatchedMovieList