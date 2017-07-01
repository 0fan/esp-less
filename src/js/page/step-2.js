import toast from '../widget/toast'
import modal from '../widget/modal'
import steps from '../widget/steps'

import { steps2 }   from '../data/data-steps'
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

    let name_wrap   = $('#isName'),
        idcard_wrap = $('#isIDCardNo'),
        name        = trim($('#name').val()),
        IDCardNo    = trim($('#IDCardNo').val())

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
      name         : name,
      houseBuyName : name,
      IDCardNo     : IDCardNo
    }

    $.ajax({
      url: url.test + request.allRequest,
      type: 'POST',
      dataType: 'json',
      data: {
        idCardNo       : IDCardNo,
        merchantId     : new Date().getTime(),
        redirectUrl    : request.getIDCardAfterStep,
        buildingId     : store.get('propertiesForSale').id,
        propertyTypeId : store.get('propertiesForSaleType').id
      }
    })
      .done(function (d) {
        let nextModal

        console.log(d)

        if (d.code === 0) {
          store.set('accountName', name)
          store.set('IDCardNo', IDCardNo)

          if(d.object.code === 1){

            goon()

          } else if (d.object.code === 0) {
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
        name        : name,
        IDCardNo    : IDCardNo,
        termid      : config.termid,
        redirectUrl : request.uploadIDCard,
        merchantId  : new Date().getTime()
      }
    })
      .done(function (d) {
        
        if (d.code === 0) {

          console.log(d)
          
          if (d.object && typeof d.object === 'string' && d.object.match(/\u5DF2\u5B58\u5728/)) { // 如果提示信息已存在
            let m = modal({
              legend: 'legend1',
              status: 'primary',
              title: d.object,
              info: '您当前有未完成的订单，请选择您的操作',
              action: [
                {
                  text: '继续开户',
                  onClick: () => {
                    view.router.loadPage('identify-step2.html')
                    m.destory()
                  }
                }, {
                  text: '完成订单',
                  onClick: () => {
                    view.router.loadPage('reprint-notice.html')
                    m.destory()
                  }
                }
              ]
            })

            return
          }


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

  $('#name').on('input',function () {
    throttled()
  })

  $('#IDCardNo').on('input',function () {
    throttled()
  })

  let throttled = _.throttle(function () {

    if(!($('#name').val() === '') && !($('#IDCardNo').val() === '')){
      $('#identifyStep1-submit').removeAttr('disabled').removeClass('disabled');
    }else {
      $('#identifyStep1-submit').attr('disabled','disabled').addClass('disabled');
    }

  }, 500)

});
