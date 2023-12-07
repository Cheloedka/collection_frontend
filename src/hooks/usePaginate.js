import {useObserver} from "./useObserver";
import {useState, useEffect, useRef} from "react";

export function usePaginate(fetchFunc, isFetchLoading) {

    const [pageNumber, setPageNumber] = useState(0)
    const [canLoad, setCanLoad] = useState(true)

    const triggerElementRef = useRef()
    const triggerElement = <div ref={triggerElementRef} style={{height: 20}}> </div>

    useObserver(triggerElementRef, canLoad, isFetchLoading, () => {
        setPageNumber(prev => prev + 1)
        console.log("Triggered")
    })

    useEffect(() => {
        fetchFunc()
    }, [pageNumber])

    function clearData() {
        setCanLoad(true)
        setPageNumber(0)
        /*setTimeout(() => setPageNumber(0), 300)*/
    }

    return [pageNumber, triggerElement, setCanLoad, clearData]
}