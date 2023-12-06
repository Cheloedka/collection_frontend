import {useFetching} from "../../../hooks/useFetching";
import {useLoadingAndError} from "../../../hooks/useLoadingAndError";
import {usePaginate} from "../../../hooks/usePaginate";

function SearchResponseListObserver({searchFunction, setError, setIsLoading}) {

    const [fetchSearch, isFetchLoading, fetchError] = useFetching(async () => {
        searchFunction(pageNumber)
    })

    const [pageNumber, triggerElement] = usePaginate(fetchSearch, isFetchLoading)

    useLoadingAndError(isFetchLoading, setIsLoading, fetchError, setError)

    return (
        <div> {/*trigger element to load more data*/}
            {triggerElement}
        </div>
    );
}

export default SearchResponseListObserver;