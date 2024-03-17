import React from 'react'
import WatchedMovie from './watchedMovie'

function WatchedMovieList({watched, onDeleteWatched}) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched} />
            ))}
        </ul>
    )
}

export default WatchedMovieList