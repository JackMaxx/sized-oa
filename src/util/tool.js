/* 项目所需要的工具js方法 */

/**
 * 系统非空判断
 * @param content
 * @returns {boolean}
 */
export function isEmpty (content) {
  if (content == null || content === 'null' || content === '' || typeof (content) === 'undefined' || content === '{}' || content === '[]') {
    return true
  } else {
    return false
  }
}

/**
 * 时间小于10自动补0
 */
function change (t) {
  if (t < 10) {
    return '0' + t
  } else {
    return t
  }
};
/**
 * 时间戳转化为YYYY-MM-DD HH-mm-SS
 */
export function timestampToTime (timestamp) {
  let date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = change(date.getDate()) + ' '
  let h = change(date.getHours()) + ':'
  let m = change(date.getMinutes()) + ':'
  let s = change(date.getSeconds())
  return Y + M + D + h + m + s
};

/**
 * IPv4验证
 */
export function validateIP (str) {
  let re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/ // 正则表达式
  if (re.test(str) && (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256)) {
    return true
  }
  return false
}

/**
 * IPv6验证
 */
export function validateIPv6 (ipvalue) {
  var matchStr = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
  var ret = ipvalue.match(matchStr)
  if (ret) {
    return true
  } else {
    return false
  }
}

/**
 * ip转化为数值
 */
function ipToNumber (ip) {
  let num = 0
  if (ip === '') {
    return num
  }
  let aNum = ip.split('.')
  if (aNum.length !== 4) {
    return num
  }
  num += parseInt(aNum[0]) << 24
  num += parseInt(aNum[1]) << 16
  num += parseInt(aNum[2]) << 8
  num += parseInt(aNum[3]) << 0
  num = num >>> 0 // 这个很关键，不然可能会出现负数的情况
  return num
}
/**
 * 比较IP的大小
 */
export function validateIPcompare (start, end) {
  if (validateIP(start) === false || validateIP(end) === false) {
    return false
  }
  const number1 = ipToNumber(start)
  const number2 = ipToNumber(end)

  if (number1 < number2) {
    return true
  }
  return false
}
/**
 * ip的大小
 */
export function validateIPRange (start, end) {
  const number1 = ipToNumber(start)
  const number2 = ipToNumber(end)

  if (number1 <= number2) {
    return true
  }
  return false
}

/* 对象交集 */
export function intersectObj (sourceObj, targetObj, tostring) {
  var flag = tostring || false
  var res = {}
  for (let key in targetObj) {
    if (sourceObj.hasOwnProperty(key) && (targetObj.hasOwnProperty(key))) {
      res[key] = targetObj[key]
      if (flag && res[key] !== null && res[key] !== undefined && typeof (res[key]) === 'number') {
        res[key] = res[key].toString()
      }
    }
  }
  return res
}

// 生成原理：利用时间戳+随机字母生成，永远不会重复。32位
export function getRandomUuid () {
  let date = (new Date()).valueOf() // 获取时间戳
  let txt = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' // 生成的随机机器码
  let len = 19 // 机器码有多少位
  let pwd = '' // 定义空变量用来接收机器码
  for (let i = 0; i < len; i++) {
    pwd += txt.charAt(Math.floor(Math.random() * txt.length)) // 循环机器码位数随机填充
  }
  console.log(date + pwd) // 相加生成唯一ID
  return date + pwd
}

export function getCookie (name) {
  // eslint-disable-next-line one-var
  var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  // eslint-disable-next-line no-cond-assign
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2])
  } else {
    return null
  }
}

export function setCookie (name, value) {
  var Days = 30
  var exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
}

export function delCookie (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = this.getCookie(name)
  if (cval != null) { document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() }
}
export function getDownload (url) {
  var downloadIframe = document.createElement('iframe')
  downloadIframe.style.display = 'none'
  downloadIframe.src = `https://192.168.212.52:8080/${url}`
  document.body.appendChild(downloadIframe)
}
