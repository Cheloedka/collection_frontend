import style from "./LoaderAndErrorDiv.module.css";
import MainMessage from "../UI/message/MainMessage";
import MainLoader from "../UI/loader/MainLoader";

function LoaderAndErrorDiv({isLoading, error}) {

    return (
        <div className={style.main}>
            <MainMessage type={"error"} text={error} />
            <MainLoader isLoading={isLoading} />
        </div>
    );
}

export default LoaderAndErrorDiv;