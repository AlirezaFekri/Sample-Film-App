import React, { useState } from 'react'
import PropTypes from 'prop-types'

const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px"
};
const starsContainerStyles = {
    display: "flex",
};

StarRating.prototype = {
    maxRating: PropTypes.nunmber,
    size: PropTypes.number,
    color: PropTypes.string,
    message: PropTypes.array,
    defaultRaing: PropTypes.number,
    className: PropTypes.string,
    onSetRating: PropTypes.func
}

function StarRating({ maxRating = 5, size = 48, color = "#fcc419", message = [], defaultRaing = 0, className, onSetRating }) {

    const textStyle = {
        lineHeight: "1",
        margin: "0",
        fontSize: `${size / 1.2}px`,
        color: color
    }
    const [rating, setRating] = useState(defaultRaing <= maxRating ? defaultRaing : 0)
    const [tempRating, setTempRating] = useState(0)

    function HandleRating(rate) {
        setRating(rate)
        onSetRating(rate)
    }
    return (
        <div style={containerStyle} className={className}>
            <div style={starsContainerStyles}>
                {
                    Array.from(
                        { length: maxRating }, (_, i) => (
                            <Star
                                key={i}
                                full={tempRating ? tempRating > i : i < rating}
                                onHoverIn={(() => setTempRating(i + 1))}
                                onHoverOut={(() => setTempRating(0))}
                                onRate={() => HandleRating(i + 1)}
                                size={size}
                                color={color}
                            />
                        ))
                }
            </div>
            <p style={textStyle}>{message.length === maxRating ? message[tempRating ? tempRating - 1 : rating - 1] : tempRating || rating || ""}</p>
        </div>
    )
}

function Star({ onRate, full, onHoverIn, onHoverOut, size, color }) {
    const starStyle = {
        width: `${size}px`,
        height: `${size}px`,
        display: "block",
        cursor: "pointer"
    }

    return (
        <span onClick={onRate} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut} role='button' style={starStyle}>
            <svg xmlns="http://www.w3.org/2000/svg" fill={full ? color : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke={color} >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
        </span>
    )
}

export default StarRating