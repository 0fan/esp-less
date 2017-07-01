import Toast from '../widget/toast'
import modal from '../widget/modal'
import timer from '../widget/timer'
import steps from '../widget/steps'

import { isTel }  from '../utility/match'
import { steps2 } from '../data/data-steps'
import { isCode } from '../utility/match'

import url     from '../data/data-url'
import config  from '../data/data-config'
import request from '../data/data-connect'

$(document).on('pageInit', '.page[data-page=identify-step3]', () => {
  
  steps({
    data: steps2,
    active: 2
  })
  
  $('#phoneNum').on('input', () => {
    throttled()
  })

  $('#identifyCode').on('input', () => {
    throttled()
  })

  let throttled = _.throttle(() => {
    
    if(!($('#phoneNum').val() === '') && !($('#identifyCode').val() === '') ){
      $('#toI4').removeAttr('disabled').removeClass('disabled');
    }else {
      $('#toI4').attr('disabled','disabled').addClass('disabled');
    }

  }, 500);

  $('#identify-code').click(function (e) {
    e.preventDefault

    let merchantId = new Date().getTime(),
        IDCardNo   = store.get('IDCardNo'),
        phone      = $('#phoneNum').val()

    if (!IDCardNo) {

      let m, t
      
      m = modal({ // 未获取到身份证号码

        status: 'error',
        legend: 'legend3',
        title : '未获取到身份证号码',
        info  : '将跳转到主页'

      }).on('open', () => {

        t = timer({
          time: 5
        }).on('close', () => {
          m.destory()
          view.router.loadPage('index.html')
        })

      })
    }

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
          $('#identify-code').code();
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
    let merchantId = new Date().getTime();
    let phoneNum = $('#phoneNum').val();
    let identifyCode = $('#identifyCode').val();
    let icNo = new Date().getTime();
    let accountNo=store.get('accountNo');
    store.set('icNo',icNo);
    store.set('identifyCode',identifyCode);
    store.set('phoneNum',phoneNum);

    let data = {},
        order = {};
    /*创建订单*/

    order = {
      fromType      : 1,
      payStatus     : -1,
      channel       : 'xingye',
      icNo          : icNo,
      phone         : phoneNum,
      bankNum       : accountNo,
      termId        : config.termid,
      identityCard  : store.get('IDCardNo'),
      IDCardNo      : store.get('IDCardNo'),
      houseBuyName  : store.get('accountName'),
      name          : store.get('accountName'),
      tradeAmount   : store.get('propertiesForSaleType').price,
      propertyId    : store.get('propertiesForSale').id,
      propertyTypeId: store.get('propertiesForSaleType').id,
    }

    data = {
      equType    : 'ytj',
      phone      : phoneNum,
      accountNo  : accountNo,
      merchantId : merchantId,
      redirectUrl: request.bankcardSigning,
      idCardNo   : store.get('IDCardNo'),
      accountName: store.get('accountName'),
      buildingId : store.get('propertiesForSale').id,
      price      : store.get('propertiesForSaleType').price,
    }

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

    data.redirectUrl = request.updateOrder
    data.merchantId = new Date().getTime()

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