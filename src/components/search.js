import React, { useEffect, useRef } from 'react'
import { useKey } from '../hooks/useKey';

function Search({ className, type, placeholder, value, setValue }) {
    const inputEl = useRef(null);

    useKey("enter", searchFocus)

    function searchFocus(e) {
        if (document.activeElement === inputEl.current)
            return
        inputEl.current.focus();
        setValue("")
    }

    useEffect(() => {
        inputEl.current.focus();
        document.addEventListener("keydown", searchFocus)
    }, [])

    return (
        <input
            className={className}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            ref={inputEl}
        />
    )
}

export default Search