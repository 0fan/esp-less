import Toast from '../widget/toast'
import modal from '../widget/modal'
import steps from '../widget/steps'
import {steps2} from '../data/data-steps'

import url from '../data/data-url'
import request from '../data/data-connect'
$(document).on('pageInit', '.page[data-page=identify-step4]', () => {
  steps({
    data: steps2,
    active: 3
  });
  var accountName=store.get('accountName');
  var accountNo=store.get('accountNo');
  var IDCardNo=store.get('IDCardNo');
  var phoneNum=store.get('phoneNum');
  var redirectUrl=request.open
  $('#cardName').text(accountName);
  $('#cardAccountNum').text(accountNo);
  $('#cardIDCardNo').text(IDCardNo);
  $('#cardPhoneNum').text(phoneNum);
  $('#open').click(function (e) {
    e.preventDefault;
    var data = {};
    data.phone = phoneNum;
    data.bankNum = accountNo;
    data.yzm = store.get('identifyCode');
    data.idCardNo = IDCardNo;
    data.channel = 'xingye';
    data.buildingId = store.get('propertiesForSale').id;
    data.redirectUrl = redirectUrl;
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
      // data: data,
    })
      .done(function (d) {
        console.log(d);
        if (d.code == 0) {
          Toast({text:'开户成功'});

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
        Toast({text:'开户出现问题'});
      })
      .always(function () {
        console.log("complete");
      });
  })
  $('.sureCard').on('click', function () {
    Toast({
      text: '银行卡修改成功',
      timer: 2000
    });
  });

  $('.surePhone').on('click', function () {
    Toast({
      text: '电话号码修改成功',
      timer: 2000
    });
  });

  $('.j-identifyStep4-open-error-btn').on('click', function () {
    $('.j-identifyStep4-open-error').removeClass('active');
    $.card('error');
  });
  

})