import React, { useState } from 'react'
import WatchedMovieList from './watchedmovieList'
import WatchedSummary from './watchedSummary'

function WatchedBox({ watched }) {
    const [isOpen2, setIsOpen2] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen2((open) => !open)}
            >
                {isOpen2 ? "–" : "+"}
            </button>
            <WatchedSummary watched={watched} />
            {isOpen2 && (
                <>
                    <WatchedMovieList watched={watched} />
                    
                </>
            )}
        </div>
    )
}

export default WatchedBox