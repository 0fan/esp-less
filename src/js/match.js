$(function () {
  var $$=function(){};
  $$.prototype={
    // 消除左右两边空格
    trim:function (str){
      return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    // 验证是否为邮箱
    checkEmail:function (input){
      var regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (input.match(regex)) {
        return true;
      } else {
        return false;
      }
    },
    // 验证是否为电话号码
    checkTel:function (input){
      var regx=/^(0?1[358]\d{9})$|^((0(10|2[1-3]|[3-9]\d{2}))?[1-9]\d{6,7})$/;
      if (input.match(regx)) {
        return true;
      } else {
        return false;
      }
    },
    // 验证数字
    isNumber:function (input){
      var regx=/^\d+(\.\d{1,2})?$/;
      if (input.match(regx)) {
        return true;
      } else {
        return false;
      }
    },
    // 验证小数，百分比
    isPer:function (input) {
      var regx=/^0(\.\d{1,2})$/;
      if (input.match(regx)) {
        return true;
      } else {
        return false;
      }
    },
    // 账号验证
    isAccount:function (input) {
      var regx=/^[a-zA-Z0-9_]{3,10}$/;
      if (input.match(regx)) {
        return true;
      } else {
        return false;
      }
    },
    // 验证车牌
    isPlate:function (input){
      var regx=/^[新]?[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/;
      if (input.match(regx)) {
        return true;
      } else {
        return false;
      }
    },
    // 验证负值数字
    isAmount:function(input){
      var regx=/^[-]?\d+(\.\d{1,2})?$/;
      if (input.match(regx)) {
        return true;
      } else {
        return false;
      }
    },
    // 验证银行卡
    isBankNo:function (input) {
      var regx=/^([1-9]{1})(\d{14}|\d{18})$/;
      if (input.match(regx)) {
        return true;
      } else {
        return false;
      }
    }
  };
// 实例化
  $$ = new $$();
})