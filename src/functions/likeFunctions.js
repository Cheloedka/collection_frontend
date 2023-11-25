import LikeService from "../API/LikeService";

export async function LikeFunction(isDelete, id, setIsLike, setCount) {
    let func
    if (isDelete) {
        func = () => LikeService.deleteLike(id)
        setCount(prevState => prevState - 1)
    } else {
        func = () => LikeService.newLike(id)
        setCount(prevState => prevState + 1)
    }

    await func()
    setIsLike(prev => !prev)
}
