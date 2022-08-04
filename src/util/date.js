function addZero (str) {
  return str > 9 ? str : '0' + str
}
/**
 *
 * @param 时间戳-秒
 * @return {yyyy-MM-dd}
 */
function parseNumTime (num) {
  let date = new Date(num * 1000)
  return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`
};
/**
 *
 * @param 时间戳-秒
 * @return {number}
 */
function timeStamp (date) {
  if (typeof date === 'string') {
    date = new Date(date)
    return Math.round(date.getTime() / 1000)
  }
  return date
}
export {
  parseNumTime,
  timeStamp
}
