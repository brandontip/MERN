import {useState, useCallback, useRef, useEffect} from 'react';

export function useHttpClient(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    // useRef is used to store data across component re-renders
    // if user navigates away from the page before the request is completed, we don't want to update the state
     const activeHttpRequests = useRef([]);

    // useCallback ensures that this function is not recreated every time the component is re-rendered
    const sendRequest =  useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);
        try{
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal
            });
            const responseData = await response.json();
            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl);
            if(!response.ok){
                throw new Error(responseData.message);
            }
            setIsLoading(false);
            return responseData;
        }
        catch (err){
            setIsLoading(false);
            setError(err.message || "Something went wrong, please try again.");
            throw err;
        }
    },[]);

    const clearError = () => {
        setError(null);
    }

    useEffect(() => {
        //runs when component is unmounted
        // never continue request if the component is unmounted
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        }
    }, []);

    return {isLoading, error, sendRequest, clearError};
}