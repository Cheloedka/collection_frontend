import userImg from '../images/default.jpg'
import collectionImg from '../images/imageNotFound.png'

export function getUserImage(image) {
    if (!image)
        return userImg
    else
        return getImageApiLink(image)
}

export function getImage(image) {
    if (image)
        return getImageApiLink(image)
}

export function getCollectionImage(image) {
    if (image)
        return getImageApiLink(image)
    else
        return collectionImg
}

export function getImageApiLink(name) {
    return process.env.REACT_APP_API_LINK + '/image/' + name
}