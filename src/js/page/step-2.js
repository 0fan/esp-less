import Toast from '../widget/toast'
import modal from '../widget/modal'
import steps from '../widget/steps'
import {steps2} from '../data/data-steps'
import {isIdCard} from '../utility/match'

import config from '../data/data-config'
import url from '../data/data-url'
import request from '../data/data-connect'

$(document).on('pageInit', '.page[data-page=identify-step1]', () => {
  steps({
    data: steps2,
    active: 0
  });
  $('#identifyStep1-submit').on('click', function (e) {
    e.preventDefault;
    var name = $('#name').val();
    var IDCardNo = $('#IDCardNo').val();
    if (!isIdCard(IDCardNo)) {
      $('#isIDCardNo').showMsg('身份证填写有误');
      return;
    }else {
      $('#isIDCardNo').hideMsg();
    }
    ;
    var data = {};
    data.name = name;
    data.houseBuyName = name;
    data.IDCardNo = IDCardNo;
    $.ajax({
      url: url.test + request.allRequest,
      type: 'POST',
      dataType: 'json',
      data: {
        redirectUrl: request.uploadIDCard,
        merchantId: new Date().getTime(),
        termid: config.termid,
        name: name,
        IDCardNo: IDCardNo
      },
    })
      .done(function (d) {
        console.log(d);
        if (d.code == 0) {
          store.set('accountName',name);
          store.set('IDCardNo',IDCardNo);
          view.router.loadPage('identify-step2.html');
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
});
