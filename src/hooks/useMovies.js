import { useEffect, useState } from 'react'

export function useMovies(query) {
    const KEY = '64d10ab1';


    const [isLoading, setIsLoading] = useState(false)
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");


    useEffect(() => {
        const controller = new AbortController();

        const fetschMovie = async () => {
            try {
                setIsLoading(true);
                setError("")
                if (query === "")
                    throw new Error("Please Enter Movie name(3 charcter)")

                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal });

                if (!res.ok)
                    throw new Error("Network Error!")
                const data = await res.json();
                if (data.Response === "False")
                    throw new Error("Video not Found!");
                setMovies(data.Search);
                setError("")
            } catch (err) {
                if (err.message !== "AbortError")
                    setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        if (query.length < 3) {
            setError("")
            setMovies([]);

        }

        fetschMovie();
        return function () {
            controller.abort();
        }
    }, [query])
    return [movies, isLoading, error]

}