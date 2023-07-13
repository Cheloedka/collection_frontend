import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetching = async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch (e) {
            if (e.response.data.message === '') {
                setError(e.message)
            }
            else {
                setError(e.response.data.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error]
}