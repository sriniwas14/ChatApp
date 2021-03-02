export const getTimeFromTimestamp = (timestamp) => {
    const d = new Date(timestamp)
    const prependZero = (number) => {
        if(number<10) return '0'+number.toString()
        return number
    }

    return `${prependZero(d.getHours())}:${prependZero(d.getMinutes())}`
}