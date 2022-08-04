/*
 * @Author: songyf
 * @Description: crypto-js aes加密与解密
 * @Date: 2022-06-13 11:11:11
 * @LastEditors: LaMando
 注意：
   1）.vue项目中使用crypto-js的AES加密方式，实现密码加密解密（ECB和CBC两种模式）,这里以ECB为例;(ebc---无iv偏移量)
    2） cryptojs支持对字符串计算，或者对WordArray类型（CryptoJS自己封装的数据类型）值的计算;
    3） keyStr(密钥) 的长度要不小于14位,否则解密时会显示空白;
*/

import CryptoJs from 'crypto-js' // 引用AES源码js

export function encryptByAES (data) {
  // 加密,调用该方法时，传入的data必须是字符串类型，
  //   故，如果要加密对象等类型，需要先用JSON.stringify()将其字符串化再传入
  let keyStr = 'oamanagementproj' // 16位，密钥字符串 前后端约定好的秘钥
  // let ivStr = 'qqqq'
  let key = CryptoJs.enc.Utf8.parse(keyStr) // 将字符串的转为WordArray类型
  let mydata = CryptoJs.enc.Utf8.parse(data)
  // const ivHex = CryptoJs.enc.Utf8.parse(ivStr) // 偏移量
  // console.log('key:', key, 'mydata:', mydata)
  let udata = CryptoJs.AES.encrypt(mydata, key, {
    // iv: ivHex,
    mode: CryptoJs.mode.ECB, // 加密模式，ECB模式
    padding: CryptoJs.pad.Pkcs7 // 填充方式
  })
  let encrypted = udata.toString() //  返回的是base64的密文,是字符串类型
  return encrypted
};

// 解密, 调用该方法时，传入的data是base64的密文
export function decryptByAES (data) {
  let keyStr = 'chaochaozi'
  // let ivStr = 'qqqq'
  let key = CryptoJs.enc.Utf8.parse(keyStr)
  // const ivHex = CryptoJs.enc.Utf8.parse(ivStr) // 偏移量
  let udata = CryptoJs.AES.decrypt(data, key, {
    // iv: ivHex,
    mode: CryptoJs.mode.ECB,
    padding: CryptoJs.pad.Pkcs7
  })
  let decrypted = udata.toString(CryptoJs.enc.Utf8) // 返回的是加密之前的原始数据,是字符串类型
  return decrypted
}

// 加密
export function encryptByDES (data) {
  let aeskey = 'chaochaozi'
  let key = CryptoJs.enc.Utf8.parse(aeskey)
  let encryptData = CryptoJs.DES.encrypt(data, key, {
    mode: CryptoJs.mode.ECB,
    padding: CryptoJs.pad.Pkcs7
  })
  return encryptData.toString()
}

// 解密
export function decryptByDES (data) {
  const aeskey = 'oamanagementproj'
  const key = CryptoJs.enc.Utf8.parse(aeskey)
  const decryptedData = CryptoJs.DES.decrypt(data, key, {
    mode: CryptoJs.mode.ECB,
    padding: CryptoJs.pad.Pkcs7
  })
  return decryptedData.toString(CryptoJs.enc.Utf8)
}
