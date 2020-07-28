export default (message, maxlength=20) => {
    if (message.length > maxlength) return message.slice(0, maxlength) + '…'
    return message
}