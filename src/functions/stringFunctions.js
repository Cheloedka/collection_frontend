export function checkTittleFunction(nickname) {
    for (let i in nickname) {
        let c = nickname.charCodeAt(i)
        if (!(
            ( c >= 65 && c <= 90 ) || ( c >= 97 && c <= 122 ) ||
            ( c >= 48 && c <= 57 ) || c === 95 || c === 46 || c === 45)
        ) {
            return false
        }
    }
    return true
}