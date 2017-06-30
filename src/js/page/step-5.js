import Toast from '../widget/toast'
import modal from '../widget/modal'
import steps from '../widget/steps'
import {steps2} from '../data/data-steps'
import {isBank} from '../utility/match'
import {isTel} from '../utility/match'
import {isCode} from '../utility/match'

import url from '../data/data-url'
import config from '../data/data-config'
import request from '../data/data-connect'

$(document).on('pageInit', '.page[data-page=identify-step4]', () => {
  steps({
    data: steps2,
    active: 3
  });

  $('#resetBank').on('input',function () {
    throttled2();
  });
  var throttled2 = _.throttle(function () {
    if(!$('#resetBank').val()==''){
      $('.sureCard').removeAttr('disabled').removeClass('disabled');
    }else {
      $('.sureCard').attr('disabled','disabled').addClass('disabled');
    }
  }, 500);
  $('#resetPhone').on('input',function () {
    throttled();
  });
  $('#resetCode').on('input',function () {
    throttled();
  });
  var throttled = _.throttle(function () {
    if(!$('#resetCode').val()==''&&!$('#resetPhone').val()==''){
      $('.surePhone').removeAttr('disabled').removeClass('disabled');
    }else {
      $('.surePhone').attr('disabled','disabled').addClass('disabled');
    }
  }, 500);
  var accountName=store.get('accountName');
  var accountNo=store.get('accountNo');
  var IDCardNo=store.get('IDCardNo');
  var phoneNum=store.get('phoneNum');
  $('#cardName span').text(accountName);
  $('#cardAccountNum span').text(accountNo);
  $('#cardIDCardNo span').text(IDCardNo);
  $('#cardPhoneNum span').text(phoneNum);
  $('#open').click(function (e) {
    e.preventDefault;
    var accountName=store.get('accountName');
    var accountNo=store.get('accountNo');
    var IDCardNo=store.get('IDCardNo');
    var phoneNum=store.get('phoneNum');
    var data = {};
    data.phone = phoneNum;
    data.bankNum = accountNo;
    data.yzm = store.get('identifyCode');
    data.idCardNo = IDCardNo;
    data.channel = 'xingye';
    data.buildingId = store.get('propertiesForSale').id;
    data.redirectUrl = request.open;
    data.merchantId = new Date().getTime();
    let loadingModal=modal({
      legend: 'anime-opencard',
      clickMaskHide: false,
      title: '银行E卡正在开户中...',
      status: 'primary',
    });

    $.ajax({
      url: url.test + request.allRequest,
      type: 'POST',
      dataType: 'json',
      data: data,
    })
      .done(function (d) {
        console.log(d);
        if (d.code == 0) {
          loadingModal.destory();
          $.card('success', function () {
            $('#open').text('确认开户').hide();
            $('#open-success').show();
            $('#eBankNo').text(d.object.eBankNo);
            store.set('EbankNo',d.object.eBankNo);
          });
        } else {
          loadingModal.destory();
          var errorModal=modal({
            legend: 'legend2',
            title: '兴业银行E账户开通失败，请仔细核对开户信息',
            status: 'error',
            action: [
              {
                text: '确认',
                onClick: function () {
                  errorModal.destory();
                  $.card('error', function () {
                    $('#open').text('重新开户').show();
                  });
                }
              }
            ]
          });

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

  $('.j-identifyStep4-open-error-btn').on('click', function () {
    $('.j-identifyStep4-open-error').removeClass('active');
    $.card('error');
  });
  
// 信息修改弹出框
  $('#resetCodeBtn').click(function (e) {
    e.preventDefault;
    var merchantId = new Date().getTime();
    var phone = $('#resetPhone').val();
    var IDCardNo = store.get('IDCardNo');
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
          $('#resetCodeBtn').code();
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
  $('.surePhone').click(function (e) {
    e.preventDefault;
    var merchantId = new Date().getTime();
    var phoneNum = $('#resetPhone').val();
    var identifyCode = $('#resetCode').val();
    var icNo = store.get('icNo');
    var outOrderNo = store.get('outOrderNo');
    var accountNo = store.get('accountNo');
    var accountName = store.get('accountName');
    var IDCardNo=store.get('IDCardNo')

    store.set('identifyCode',identifyCode);
    store.set('phoneNum',phoneNum);

    var data = {};
    var order = {};
    /*创建订单*/
    order.termId = config.termid;
    order.icNo = icNo;
    order.orderId=outOrderNo;
    order.identityCard = store.get('IDCardNo');
    order.phone = phoneNum;

    data.redirectUrl = request.bankcardSigning;
    data.merchantId = merchantId;
    data.accountName = accountName;
    data.phone = phoneNum;
    data.accountNo = accountNo;
    data.idCardNo = IDCardNo;
    data.price = store.get('propertiesForSaleType').price;
    data.buildingId = store.get('propertiesForSale').id;
    data.equType = 'ytj';
    if(!phoneNum==''){
      if (!isTel(phoneNum)) {
        $('#popupPhone').showMsg('手机号填写有误');
        return;
      }else {
        $('#popupPhone').hideMsg();
      }
    }else {
      $('#popupPhone').showMsg('手机号不能为空');
      return;
    }
    if(!identifyCode==''){
      if (!isCode(identifyCode)) {
        $('#popupCode').showMsg('验证码填写有误');
        return;
      }else {
        $('#popupCode').hideMsg();
      }
    }else {
      $('#popupCode').showMsg('验证码不能为空');
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
          upload(order);
        } else {
          Toast({text:d.message});
        }
      })
      .fail(function (d) {
        Toast('操作失败');
        view.router.loadPage('index.html');
      })
      .always(function () {
        console.log("complete");
      });
  });
  $('.sureCard').click(function () {
    $('#popupCard').hideMsg();
    var accountNo = $('#resetBank').val();
    if(!accountNo==''){
      if (!isBank(accountNo)) {
        $('#popupCard').showMsg('银行卡号填写有误');
        return;
      } else {
        store.set('accountNo',accountNo);
        Toast({text:'银行卡号修改成功'});
        $('#cardAccountNum span').text(store.get('accountNo'));
        app.closeModal('.resetCard');
      }
    }else {
      $('#popupCard').showMsg('银行卡号不能为空');
      return;
    }


  })

// 更新订单状态
  function upload(data) {
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
          Toast({text:'电话号码修改成功'});
          $('#cardPhoneNum span').text(store.get('phoneNum'));
          app.closeModal('.resetPhone');
          store.set('outOrderNo',d.object.id);
        } else {
          console.log(d);
          Toast({text:d.message});
          view.router.loadPage('index.html');
        }
      })
      .fail(function (d) {
        Toast('操作失败');
        view.router.loadPage('index.html');
      })
  }
})