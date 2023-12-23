import React from 'react'

function Search({className, type, placeholder, value, setValue}) {
    return (
        <input
        className={className}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
    />
    )
}

export default Search