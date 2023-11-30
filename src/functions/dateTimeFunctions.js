const dayInMilliseconds = 86400000;


function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate()
        && date1.getMonth() === date2.getMonth()
        && date1.getFullYear() === date2.getFullYear()
}

function isDifferenceOneDay(date1, date2) {
    date2.setTime(date2.getTime() - dayInMilliseconds)
    return isSameDay(date1, date2)
}

function getDifferenceInTimeString(d, now) {
    let difference = 0
    if (d.getHours() === now.getHours()) {
        if (d.getMinutes() === now.getMinutes()) {
            return "just now"
        }
        else {
            difference = now.getMinutes() - d.getMinutes()
            if (difference === 1) {
                return difference + " minute ago"
            }
            return difference + " minutes ago"
        }
    }
    else {
        difference = now.getHours() - d.getHours()
        if (difference === 1) {
            return difference + " hour ago"
        }
        return difference + " hours ago"
    }
}

function getDifferenceInDateString(d, now) {
    let difference = 0
    if (d.getFullYear() === now.getFullYear()) {
        if (d.getMonth() === now.getMonth()) {
            difference = now.getDate() - d.getDate()
            if (difference === 1) {
                return difference + " day ago"
            }
            return difference + " days ago"
        }
        else {
            difference = now.getMonth() - d.getMonth()
            if (difference === 1) {
                return difference + " month ago"
            }
            return difference + " months ago"
        }
    }
    else {
        difference = now.getFullYear() - d.getFullYear()
        if (difference === 1) {
            return difference + " year ago"
        }
        return difference + " years ago"
    }
}

export function formatDate(date) {
    let d
    if (date) {
        d = new Date(date + 'Z')
    }
    else {
        d = new Date()
    }
    const now = new Date()

    if (isSameDay(d, now))
        return getDifferenceInTimeString(d, now)
    else if (isDifferenceOneDay(d, now))
        return " yesterday"

    return getDifferenceInDateString(d, now)
}