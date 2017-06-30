import Toast from '../widget/toast'
import modal from '../widget/modal'
import steps from '../widget/steps'
import {steps2} from '../data/data-steps'
import {isIdCard} from '../utility/match'
import {isName} from '../utility/match'

import config from '../data/data-config'
import url from '../data/data-url'
import request from '../data/data-connect'

$(document).on('pageInit', '.page[data-page=identify-step1]', () => {
  steps({
    data: steps2,
    active: 0
  });
  $('#name').on('input',function () {
    throttled();
  });
  $('#IDCardNo').on('input',function () {
    throttled();
  });
  var throttled = _.throttle(function () {
    if(!$('#name').val()==''&&!$('#IDCardNo').val()==''){
      $('#identifyStep1-submit').removeAttr('disabled').removeClass('disabled');
    }else {
      $('#identifyStep1-submit').attr('disabled','disabled').addClass('disabled');
    }
  }, 500);
  $('#identifyStep1-submit').on('click', function (e) {
    e.preventDefault;
    var name = $('#name').val();
    var IDCardNo = $('#IDCardNo').val();
    if (!name == '') {
      if (!isName(name)) {
        $('#isName').showMsg('姓名填写有误');
        return;
      } else {
        $('#isName').hideMsg();
      }
      ;
    } else {
      $('#isName').showMsg('姓名不能为空');
      return;
    }
    if (!IDCardNo == '') {
      if (!isIdCard(IDCardNo)) {
        $('#isIDCardNo').showMsg('身份证号填写有误');
        return;
      } else {
        $('#isIDCardNo').hideMsg();
      }
      ;
    } else {
      $('#isIDCardNo').showMsg('身份证号不能为空');
      return;
    }


    var data = {};
    data.name = name;
    data.houseBuyName = name;
    data.IDCardNo = IDCardNo;
    $.ajax({
      url: url.test + request.allRequest,
      type: 'POST',
      dataType: 'json',
      data: {
        redirectUrl: request.getIDCardAfterStep,
        merchantId: new Date().getTime(),
        idCardNo: IDCardNo,
        buildingId: store.get('propertiesForSale').id,
        propertyTypeId: store.get('propertiesForSaleType').id
      },
    })
      .done(function (d) {
        let nextModal;
        console.log(d);
        if (d.code == 0) {
          store.set('accountName', name);
          store.set('IDCardNo', IDCardNo);
          let nextModal;
          if(d.object.code==1){
            goon();
          }else if(d.object.code==0){
            store.set('orderList', d.object.orderList);
            nextModal = modal({
              legend: 'legend3',
              clickMaskHide: false,
              title: '你已成功办理E账户，是否继续?',
              status: 'primary',
              action: [
                {
                  text: '继续办理',
                  onClick: function () {
                    nextModal.destory();
                    view.router.loadPage('reprint-notice.html');
                  }
                },
                {
                  text: '重新开户',
                  onClick: function () {
                    nextModal.destory();
                    goon();
                  }
                },
              ]
            })
          }else if(d.object.code==2){
            store.set('orderList', d.object.orderList);
            nextModal = modal({
              legend: 'legend3',
              clickMaskHide: false,
              title: '你已成功办理E账户，是否继续?',
              status: 'primary',
              action: [
                {
                  text: '继续办理',
                  onClick: function () {
                    nextModal.destory();
                    view.router.loadPage('reprint-notice.html');
                  }
                },
                {
                  text: '重新开户',
                  onClick: function () {
                    nextModal.destory();
                    goon();
                  }
                },
              ]
            })
          }else if(d.object.code==3){
            store.set('orderList', d.object.orderList);
            nextModal = modal({
              legend: 'legend3',
              clickMaskHide: false,
              title: '你已成功办理E账户，是否继续?',
              status: 'primary',
              action: [
                {
                  text: '继续办理',
                  onClick: function () {
                    nextModal.destory();
                    view.router.loadPage('refund.html');
                  }
                },
                {
                  text: '重新开户',
                  onClick: function () {
                    nextModal.destory();
                    goon();
                  }
                },
              ]
            })
          }

        } else {
          Toast({text: d.message});
        }
      })
      .fail(function (d) {
        Toast({text: '操作失败'});
        view.router.loadPage('index.html');
      })
      .always(function () {
        console.log("complete");
      });

  });
  function goon() {
    var name = $('#name').val();
    var IDCardNo = $('#IDCardNo').val();
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
          view.router.loadPage('identify-step2.html');
        } else {
          Toast({text: d.message});
        }
      })
      .fail(function (d) {
        Toast({text: '操作失败'});
        view.router.loadPage('index.html');
      })

  }

});
