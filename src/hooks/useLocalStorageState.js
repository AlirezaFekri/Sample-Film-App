import { useEffect, useState } from "react";

export function useLocalStorageState(key, initalValue) {
    const [valuse, setValue] = useState(JSON.parse(localStorage.getItem(key)) ? JSON.parse(localStorage.getItem(key)) : initalValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(valuse))
    }, [valuse, key])
    return [valuse, setValue]
}
