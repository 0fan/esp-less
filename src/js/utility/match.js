function trim(t) {
  return t.replace(/(^\s*)|(\s*$)/g, '')
}

function isEmail(t) {
  return t.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/) ? true : false
}

function isTel(t) {
  return t.match(/^(0?1[34578]\d{9})$|^((0(10|2[1-3]|[3-9]\d{2}))?[1-9]\d{6,7})$/) ? true : false
}

function isIdCard(t) {
  return t.match(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/) ? true : false
}

function isBank(t) {
  return t.match(/^([1-9]{1})(\d{14}|\d{18})$/) ? true : false
}
function isCode(t) {
  return t.match(/^\d{6}$/) ? true : false
}

export {
  trim,
  isEmail,
  isTel,
  isIdCard,
  isBank,
  isCode
}