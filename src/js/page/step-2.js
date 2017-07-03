import toast from '../widget/toast'
import modal from '../widget/modal'
import steps from '../widget/steps'

import {steps2}   from '../data/data-steps'
import {
  trim,
  isIdCard,
  isName
} from '../utility/match'

import url from '../data/data-url'
import config from '../data/data-config'
import request from '../data/data-connect'

$(document).on('pageInit', '.page[data-page=identify-step1]', () => {

  steps({
    data: steps2,
    active: 0
  })

  // handle
  $('#identifyStep1-submit').on('click', function (e) {
    e.preventDefault

    let name_wrap = $('#isName'),
      idcard_wrap = $('#isIDCardNo'),
      name = trim($('#name').val()),
      IDCardNo = trim($('#IDCardNo').val())

    if (!name.length) {
      name_wrap.showMsg('姓名不能为空')
      return
    }

    if (!isName(name)) {
      name_wrap.showMsg('姓名格式有误')
      return
    }

    name_wrap.hideMsg()

    if (!IDCardNo.length) {
      idcard_wrap.showMsg('身份证号不能为空')
      return
    }

    if (!isIdCard(IDCardNo)) {
      idcard_wrap.showMsg('身份证格式有误')
      return
    }

    idcard_wrap.hideMsg()


    let data = {
      name: name,
      houseBuyName: name,
      IDCardNo: IDCardNo
    }

    $.ajax({
      url: url.test + request.allRequest,
      type: 'POST',
      dataType: 'json',
      data: {
        channel: 'xingye',
        idCardNo: IDCardNo,
        merchantId: new Date().getTime(),
        redirectUrl: request.getIDCardAfterStep,
        buildingId: store.get('propertiesForSale').id,
        propertyTypeId: store.get('propertiesForSaleType').id
      }
    })
      .done(function (d) {
        let nextModal

        console.log(d)

        if (d.code === 0) {
          store.set('accountName', name)
          store.set('IDCardNo', IDCardNo)

          if (d.object.code === 1) {

            goon();

          }
          if (d.object.code === 0) {
            let accountNo = d.object.cardNo;
            let phoneNum = d.object.phone;
            let bankName = d.object.cardName;
            let accountName = name;
            let EbankNo = d.object.eCardNo;
            let icNo = new Date().getTime();
            let order = {
              icNo: icNo,
              fromType: 1,
              payStatus: -1,
              channel: 'xingye',
              phone: phoneNum,
              bankNum: accountNo,
              termId: config.termid,
              identityCard: IDCardNo,
              ebank: EbankNo,
              IDCardNo: IDCardNo,
              houseBuyName: name,
              name: name,
              tradeAmount: store.get('propertiesForSaleType').price,
              propertyId: store.get('propertiesForSale').id,
              propertyTypeId: store.get('propertiesForSaleType').id,
            }
            store.set('accountNo', accountNo);
            store.set('bankName', bankName);
            store.set('phoneNum', phoneNum);
            store.set('EbankNo', EbankNo);
            store.set('icNo', icNo);
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
                    upload(order, 'reprint-notice.html');
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
          if (d.object.code === 2) {
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
          }
          if (d.object.code === 3) {
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
          toast({text: d.message});
        }
      })
      .fail(function (d) {
        toast({text: '操作失败'});
        view.router.loadPage('index.html');
      })
      .always(function () {
        console.log("complete");
      });

  });

  function goon() {
    let name = $('#name').val();
    let IDCardNo = $('#IDCardNo').val();
    $.ajax({
      url: url.test + request.allRequest,
      type: 'POST',
      dataType: 'json',
      data: {
        name: name,
        IDCardNo: IDCardNo,
        termid: config.termid,
        redirectUrl: request.uploadIDCard,
        merchantId: new Date().getTime()
      }
    })
      .done(function (d) {

        if (d.code === 0) {

          console.log(d)

          view.router.loadPage('identify-step2.html')
        } else {
          toast({text: d.message});
        }
      })
      .fail(function (d) {
        toast({text: '操作失败'});
        view.router.loadPage('index.html');
      })

  }

  function upload(data, Url) {

    data.redirectUrl = request.updateOrder
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
          store.set('outOrderNo', d.object.id);
          view.router.loadPage(Url);
        } else {
          console.log(d);
          Toast({text: d.message});
          view.router.loadPage('index.html');
        }
      })
      .fail(function (d) {
        Toast({text: '操作失败'});
        view.router.loadPage('index.html');
      })

  }

  $('#name').on('input', function () {
    throttled()
  })

  $('#IDCardNo').on('input', function () {
    throttled()
  })

  let throttled = _.throttle(function () {

    if (!($('#name').val() === '') && !($('#IDCardNo').val() === '')) {
      $('#identifyStep1-submit').removeAttr('disabled').removeClass('disabled');
    } else {
      $('#identifyStep1-submit').attr('disabled', 'disabled').addClass('disabled');
    }

  }, 500)


});
