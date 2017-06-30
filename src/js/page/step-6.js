import Toast from '../widget/toast'
import modal from '../widget/modal'
import steps from '../widget/steps'
import {steps3} from '../data/data-steps'
import {isTel} from '../utility/match'

import config from '../data/data-config'
import url from '../data/data-url'
import request from '../data/data-connect'
$(document).on('pageInit', '.page[data-page=deposit-step1]', () => {
  steps({
    data: steps3,
    active: 0
  });
  var propertiesForSaleType=store.get('propertiesForSaleType');
  var propertiesForSale=store.get('propertiesForSale');
  var accountNo=store.get('accountNo');
  var EbankNo=store.get('EbankNo');
  var icNo=store.get('icNo');
  var outOrderNo=store.get('outOrderNo');
  var bankName=store.get('bankName');
  var phoneNum=store.get('phoneNum');
  var accountName=store.get('accountName');
  var identifyCode=store.get('identifyCode');
  var IDCardNo=store.get('IDCardNo');

  $('#depositMoney').text(propertiesForSaleType.price/100);
  $('#depositBankNo').text(EbankNo);
  $('#sureDeposit').click(function (e) {
    e.preventDefault;
    var data = {};
    var order={};
    order.payStatus=0;
    order.orderId=outOrderNo;
    order.icNo=icNo;
    order.termId=config.termid;
    order.bankNum=accountNo;
    order.ebank=EbankNo;
    order.propertyAddress=propertiesForSale.address;
    order.tradeAmount=propertiesForSaleType.price;

    data.bankNum = accountNo;
    data.bankName = bankName;
    data.phone = phoneNum;
    data.realName = accountName;
    data.yzm = identifyCode;
    data.idcardNo = IDCardNo;
    data.outOrderNo = outOrderNo;
    data.type = 1;
    data.icNo = icNo;
    data.channel = 'xingye';
    data.equalMoney = 0.0;
    data.termId = config.termid;
    data.louPanId = propertiesForSale.id;
    data.merchantId = propertiesForSale.duId;
    data.price = propertiesForSaleType.price;
    data.goodsName = propertiesForSaleType.name;
    data.tradeAmount = propertiesForSaleType.price;
    data.yinPayPrice = propertiesForSaleType.price;
    data.type = propertiesForSaleType.type;
    data.fangyuanTypeId = propertiesForSaleType.id;
    data.redirectUrl = request.createOrder;
    data.merchantId = new Date().getTime();


    $.ajax({
      url: url.test + request.allRequest,
      type: 'POST',
      dataType: 'json',
      data: data,
    })
      .done(function (d) {
        if (d.code == 0) {
          Toast({text:d.object});
          upload(order,'inform-step1.html');
        } else {
          Toast('操作失败');
          view.router.loadPage('index.html');
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