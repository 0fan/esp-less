import Toast from '../widget/toast'
import modal from '../widget/modal'
import steps from '../widget/steps'
import {steps2} from '../data/data-steps'
import {isTel} from '../utility/match'
import {isCode} from '../utility/match'

import config from '../data/data-config'
import url from '../data/data-url'
import request from '../data/data-connect'

$(document).on('pageInit', '.page[data-page=identify-step3]', () => {
  steps({
    data: steps2,
    active: 2
  });
  $('#identify-code').click(function (e) {
    e.preventDefault;
    var merchantId = new Date().getTime();
    var phone = $('#phoneNum').val();
    var IDCardNo = store.get('IDCardNo');
    if(!phone==''){
      if (!isTel(phone)) {
        $('#checkPhone').showMsg('手机号填写有误');
        return;
      }else {
        $('#checkPhone').hideMsg();
      }
    }else {
      $('#checkPhone').showMsg('手机号不能为空');
      return;
    }
    $.ajax({
      url: url.test + request.allRequest,
      type: 'POST',
      dataType: 'json',
      data: {
        idCardNo:IDCardNo,
        merchantId: merchantId,
        redirectUrl: request.getValid,
        mobile: phone,
        channel: 'xingye'
      },
    })
      .done(function (d) {
        console.log(d);
        if (d.code == 0) {
          Toast({text:'验证码发送成功'});
        } else {
          Toast({text:d.message});
        }
      })
      .fail(function (d) {
        Toast({text:'操作失败'});
        view.router.loadPage('index.html');
      })
      .always(function () {
        console.log("complete");
      });
  });
  $('#toI4').click(function (e) {
    e.preventDefault;
    var merchantId = new Date().getTime();
    var phoneNum = $('#phoneNum').val();
    var identifyCode = $('#identifyCode').val();
    var icNo = new Date().getTime();
    store.set('icNo',icNo);
    store.set('identifyCode',identifyCode);
    store.set('phoneNum',phoneNum);

    var data = {};
    var order = {};
    /*创建订单*/
    order.termId = config.termid;
    order.icNo = icNo;
    order.fromType = 1;
    order.identityCard = store.get('IDCardNo');
    order.propertyId = store.get('propertiesForSale').id;
    order.propertyTypeId = store.get('propertiesForSaleType').id;
    order.name = store.get('accountName');
    order.IDCardNo = store.get('IDCardNo');
    order.phone = phoneNum;
    order.bankNum = store.get('accountNo');
    order.channel = 'xingye';
    order.houseBuyName = store.get('accountName');
    order.payStatus = -1;
    order.tradeAmount = store.get('propertiesForSaleType').price;


    data.redirectUrl = request.bankcardSigning;
    data.merchantId = merchantId;
    data.accountName = store.get('accountName');
    data.phone = phoneNum;
    data.accountNo = store.get('accountNo');
    data.idCardNo = store.get('IDCardNo');
    data.price = store.get('propertiesForSaleType').price;
    data.buildingId = store.get('propertiesForSale').id;
    data.equType = 'ytj';

    if(!phoneNum==''){
      if (!isTel(phoneNum)) {
        $('#checkPhone').showMsg('手机号填写有误');
        return;
      }else {
        $('#checkPhone').hideMsg();
      }
    }else {
      $('#checkPhone').showMsg('手机号不能为空');
      return;
    }
    if(!identifyCode==''){
      if (!isCode(identifyCode)) {
        $('#checkCode').showMsg('验证码填写有误');
        return;
      }else {
        $('#checkCode').hideMsg();
      }
    }else {
      $('#checkCode').showMsg('验证码不能为空');
      return;
    }

    $.ajax({
      url: url.test + request.allRequest,
      type: 'POST',
      dataType: 'json',
      data: data,
    })
      .done(function (d) {
        if (d.code == 0) {
          console.log(d);
          store.set('bankName',d.object.bankName);
          upload(order, 'identify-step4.html');
        } else {
          Toast({text:d.message});
        }
      })
      .fail(function (d) {
        Toast({text:'操作失败'});
        view.router.loadPage('index.html');
      })
      .always(function () {
        console.log("complete");
      });
  })

// 更新订单状态
  function upload(data, Url) {
    data.redirectUrl=request.updateOrder;
    data.merchantId = new Date().getTime();
    console.log(data);
    $.ajax({
      url: url.test + request.allRequest,
      type: 'POST',
      dataType: 'json',
      data: data,
    })
      .done(function (d) {
        if (d.code == 0) {
          console.log('订单更新成功');
          store.set('outOrderNo',d.object.id);
          view.router.loadPage(Url);
        } else {
          console.log(d);
          Toast({text:d.message});
          view.router.loadPage('index.html');
        }
      })
      .fail(function (d) {
        Toast({text:'操作失败'});
        view.router.loadPage('index.html');
      })
  }
})