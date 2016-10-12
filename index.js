'use strict'

var crypto = require('crypto');

function md5(str) {
  var _md5 = crypto.createHash('md5');
  _md5.update(str);
  return _md5.digest('hex');
}

/**
 * 对字符串生成校验码
 * @param  string originCode 原始字符串
 * @return string            校验位数据
 * @description
 * 1.奇数位相连生成字符串A，偶数位相连生成字符串B
 * 2.字符串B在前，字符串A在后 B+A相连生成字符串C
 * 3.然后求得C字符串的MD5 D字符串
 * 4.再取D字符串的0、16、31位三个字符串作为校验码
 */
function validcodeGen(origin) {
  var strA = '';
  var strB = '';
  var strC = '';
  var strD = '';

  for (var i = 0; i < origin.length; i++) {
    var tmp = origin[i];
    if (i % 2 == 0)
      strA += tmp;
    else
      strB += tmp;
  }

  strC = strB + strA;
  strD = md5(strC);

  return strD[0] + strD[Math.round(strD.length / 2)] + strD[strD.length - 1]
}

/**
 * 校验字符串是否合法，检验位是否正确
 * @param  string code 字符串
 * @return boolean     校验位是否通过
 */
function validcodeValid(code) {
  var validcode = code.substr(code.length - 3, 3);
  var origin = code.substr(0, code.length - 3);

  return validcodeGen(origin) === validcode;
}

module.exports = {
  generate: validcodeGen,
  valid: validcodeValid
};
