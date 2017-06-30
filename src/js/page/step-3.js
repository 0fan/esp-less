import steps from '../widget/steps'

import {steps2} from '../data/data-steps'

import {isBank} from '../utility/match'

$(document).on('pageInit', '.page[data-page=identify-step2]', () => {

  steps({
    data: steps2,
    active: 1
  })
  $('#accountNum').on('input',function () {
    throttled();
  });
  var throttled = _.throttle(function () {
    if(!$('#accountNum').val()==''){
      $('#toI3').removeAttr('disabled').removeClass('disabled');
    }else {
      $('#toI3').attr('disabled','disabled').addClass('disabled');
    }
  }, 500);

  $('#toI3').click(function () {

    var accountNo = $.trim($('#accountNum').val());
    if (!accountNo.length) {
      $('#isBankNo').showMsg('银行卡号不能为空')
      return;
    }

    if (!isBank(accountNo)) {
      $('#isBankNo').showMsg('银行卡号填写有误');
      var cardErrorModal = modal({
        legend: 'legend2',
        title: '银行卡填写有误，是否继续操作',
        status: 'error',
        action: [
          {
            text: '返回',
            onClick: function () {
              cardErrorModal.destory();
              return;
            }
          },
          {
            text: '确认',
            onClick: function () {
              cardErrorModal.destory();
              $('#isBankNo').hideMsg();
              store.set('accountNo', accountNo);
              view.router.loadPage('identify-step3.html');
            }
          }
        ]
      });

    } else {
      view.router.loadPage('identify-step3.html');
      store.set('accountNo', accountNo);
    }


    // if(!accountNo==''){
    //   if (!isBank(accountNo)) {
    //     $('#isBankNo').showMsg('银行卡号填写有误');
    //     return;
    //   } else {
    //     $('#isBankNo').hideMsg();
    // store.set('accountNo',accountNo);
    // view.router.loadPage('identify-step3.html')
    //   }
    // }else {
    //   $('#isBankNo').showMsg('银行卡号不能为空');
    //   return;
    // }

  })
})