// 验证
var $$ = function(){};
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
    var regx=/^(0?1[34578]\d{9})$|^((0(10|2[1-3]|[3-9]\d{2}))?[1-9]\d{6,7})$/;
    if (input.match(regx)) {
      return true;
    } else {
      return false;
    }
  },
  //        转化日期
  formatDay:function(num){
    var year=(new Date(num)).getFullYear();
    var month=(new Date(num)).getMonth();
    var day=(new Date(num)).getDate();
    return (year+''+(month<10?'0'+(month+1):month)+''+(day<10?('0'+day):day));
  },
  // 验证是否为手机号码
  checkPhone:function (input){
    var regx = /^1[3|4|5|7|8][0-9]{9}$/;
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
  // 验证报案号
  isReportNum:function(input){
    var year=input.substring(4,8);
    var curYear=(new Date()).getFullYear();
    var regx=/^RZCU[0-9]{18}$/;
    if (input.match(regx) && (year<=curYear)) {
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
  // 验证身份证号码
  isCardNo:function(input){
    var regx=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
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
  //判断数据是否为空
  isNull:function(input){
    if ((input == ''||input==undefined || input == null)&& input != 0){
      return "";
    }else{
      return input;
    }
  },
  // 判断是否是银行卡号
  isBankNo:function(input){
    var regx=/^([1-9]{1})(\d{14}|\d{18})$/;
    if (input.match(regx)){
      return true;
    }else{
      return false;
    }
  },
  //ajax GET
  getData:function(url,data,func){
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      data:data,
      success:function(data){
        console.log(data);
        func(data);
      },
      error:function(e){
        console.log(e);
      }
    });
  },
  //ajax POST
  postData:function(url,data,func){
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data:data,
      success:function(data){
        console.log(data);
        func(data);
      },
      error:function(e){
        console.log(e);
      }
    });
  },
  /*转换时间格式*/
  formatDate:function(num){
    num=num*1000;
    var year=(new Date(num)).getFullYear();
    var month=(new Date(num)).getMonth()+1;
    month=month<10?('0'+month):month;
    var day=(new Date(num)).getDate();
    day=day<10?('0'+day):day;
    var hour=(new Date(num)).getHours();
    hour=hour<10?('0'+hour):hour;
    var min=(new Date(num)).getMinutes();
    min=min<10?('0'+min):min;
    var sec=(new Date(num)).getSeconds();
    sec=sec<10?('0'+sec):sec;
    return (year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec);
  }
};
// 实例化
$$ = new $$();

export default $$;