import {useEffect, useRef, useState} from 'react';
import MInputSearch from "./MInputSearch";
import MModal from "../../UI/modal/MModal";
import MainMessage from "../../UI/message/MainMessage";
import {useFetching} from "../../../hooks/useFetching";
import SearchService from "../../../API/SearchService";
import MainLoader from "../../UI/loader/MainLoader";
import SearchResponseList from "./SearchResponseList";
import style from "./SearchResponseList.module.css"
import {useLoadingAndError} from "../../../hooks/useLoadingAndError";

function SearchDiv({className, showModal, setShowModal}) {


    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState("")

    const [value, setValue] = useState("")
    const [usersData, setUsersData] = useState([])
    const [collectionsData, setCollectionsData] = useState([])

    const [usersLength, setUsersLength] = useState(0)
    const [collectionsLength, setCollectionsLength] = useState(0)
    const prevValue = useRef("")


    const [searchFetch, isFetchLoading, fetchError] = useFetching( async () => {
        let response = await SearchService.firstSearch(value)
        setUsersData(response.users)
        setCollectionsData(response.collections)
        setUsersLength(response.usersLength);
        setCollectionsLength(response.collectionsLength);
        prevValue.current = value
    })

    function firstSearch() {
        if (value && prevValue.current !== value) {
            searchFetch()
        }
        setShowModal(true)
    }

    useEffect(() => {
        if (!showModal && value) {
            setValue("")
            setCollectionsLength(0)
            setUsersLength(0)
            setCollectionsData([])
            setUsersData([])
        }
    },[showModal])

    useLoadingAndError(isFetchLoading, setIsLoading, fetchError, setError)

    return (
        <div className={className}>

            <MInputSearch
                value={value}
                setValue={setValue}
                onClick={firstSearch}
            />

            <MModal
                visible={showModal}
                setVisible={setShowModal}
                className={style.modal}
            >
                <MInputSearch
                    value={value}
                    setValue={setValue}
                    className={style.searchModal}
                    onClick={firstSearch}
                />

                <MainMessage
                    type={"error"}
                    text={error}
                />

                <SearchResponseList
                    data={usersData}
                    setData={setUsersData}
                    searchValue={value}
                    setError={setError}
                    setIsLoading={setIsLoading}
                    countItems = {usersLength}
                    type={"USER"}
                    isLoadingNewRequest={isFetchLoading}
                    setModal={setShowModal}
                />

                <SearchResponseList
                    data={collectionsData}
                    setData={setCollectionsData}
                    searchValue={value}
                    setError={setError}
                    setIsLoading={setIsLoading}
                    countItems = {collectionsLength}
                    type={"COLLECTION"}
                    isLoadingNewRequest={isFetchLoading}
                    setModal={setShowModal}
                />

                <MainLoader isLoading={isLoading} color={"white"} />
            </MModal>
        </div>
    );
}

export default SearchDiv;
