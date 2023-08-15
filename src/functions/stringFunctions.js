export function checkTittleFunction(nickname) {
    for (let i in nickname) {
        let c = nickname.charCodeAt(nickname.indexOf(i))
        if (!(
            ( c >= 65 && c <= 90 ) || ( c >= 97 && c <= 122 ) ||
            ( c >= 48 && c <= 57 ) || c === 95 || c === 46 || c === 45)
        ) {
            return false
        }
    }
    return true
}

export function checkEmailFunction(email) {
    let addressSigh = false
    for (let i =0; i < email.length(); i++) {
        let c = email.charCodeAt(i)
        if (c === 64) {
            addressSigh = true
        }
    }
    if (addressSigh === false)
        return false

    return true
}