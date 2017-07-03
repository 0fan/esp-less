import toast from '../widget/toast'
import modal from '../widget/modal'
import steps from '../widget/steps'
import timer from '../widget/timer'

import {steps3} from '../data/data-steps'
import {isTel} from '../utility/match'

import config from '../data/data-config'
import url from '../data/data-url'
import request from '../data/data-connect'
$(document).on('pageInit', '.page[data-page=deposit-step1]', () => {

  steps({
    data: steps3,
    active: 0
  })
  
  const MAXTIME = 180 // 最长轮询时间

  let timerTask, // 定时器
      timer_index           = 0,
      propertiesForSaleType = store.get('propertiesForSaleType'),
      propertiesForSale     = store.get('propertiesForSale'),
      accountNo             = store.get('accountNo'),
      EbankNo               = store.get('EbankNo'),
      icNo                  = store.get('icNo'),
      outOrderNo            = store.get('outOrderNo'),
      bankName              = store.get('bankName'),
      phoneNum              = store.get('phoneNum'),
      accountName           = store.get('accountName'),
      identifyCode          = store.get('identifyCode'),
      IDCardNo              = store.get('IDCardNo')

  $('#depositMoney').text(propertiesForSaleType.price/100)
  $('#depositBankNo').text(EbankNo)

  $('#sureDeposit').click(function (e) {
    e.preventDefault;

    let m1

    m1 = modal({
      legend: 'anime-upgrade',
      status: 'primary',
      title: '正在支付...'
    })

    let order = { // 更新订单
      payStatus: 0,
      orderId:  outOrderNo,
      icNo:icNo,
      termId: config.termid,
      bankNum: accountNo,
      ebank: EbankNo,
      propertyAddress: propertiesForSale.address,
      tradeAmount: propertiesForSaleType.price
    }

    let data  = { // 接口参数
      type           : 1,
      channel        : 'xingye',
      equalMoney     : 0.0,
      termId         : config.termid,
      icNo           : icNo,
      bankNum        : accountNo,
      bankName       : bankName,
      phone          : phoneNum,
      realName       : accountName,
      yzm            : identifyCode,
      idcardNo       : IDCardNo,
      outOrderNo     : outOrderNo,
      louPanId       : propertiesForSale.id,
      price          : propertiesForSaleType.price,
      goodsName      : propertiesForSaleType.name,
      tradeAmount    : propertiesForSaleType.price,
      yinPayPrice    : propertiesForSaleType.price,
      type           : propertiesForSaleType.type,
      fangyuanTypeId : propertiesForSaleType.id,
      redirectUrl    : request.createOrder,
      merchantId     : propertiesForSale.duId
    }

    $.ajax({
      url: url.test + request.allRequest,
      type: 'POST',
      dataType: 'json',
      data: data,
    })
      .done(function (d) {

        console.log(d)

        if (d.code === 0) {

          store.set('parentOrderId', d.object.parentOrderId)

          timerTask = setInterval(() => { // 轮询判断订单状态

            if (timer_index > MAXTIME) { // 超时
              m1.destory()
              clearInterval(timerTask)
              let m2, t

              modal({
                legend: 'legend3',
                status: 'error',
                title: '反馈超时，将跳转到主页'
              }).on('open', () => {
                t = timer({
                  time: 10
                }).on('close', () => {
                  m2.destory()
                  view.router.loadPage('index.html')
                })
              })

            }

            timer_index += 1

            $.ajax({
              url: url.test + request.allRequest,
              type: 'POST',
              dataType: 'json',
              data: {
                redirectUrl   : request.getOrderStatus,
                merchantId    : new Date().getTime(),
                parentOrderId : store.get('parentOrderId')
              },
            })
            .done(function(d) {
              let code = d.code
              console.log(d)

              if (code === 0) { // 成功
                let status = d.object.payStatus

                if (status === -1) {
                  console.log('初始化')
                }

                if (status === 0) {
                  m1.destory()
                  console.log('等待支付')
                }

                if (status === 1 || status === 12) {
                  m1.destory()
                  console.log('支付成功')
                  clearInterval(timerTask)

                  let m, t

                  m = modal({
                    legend: 'legend1',
                    status: 'success',
                    title: '支付成功',
                    info: d.object.payRemark,
                  }).on('open', () => {
                    t = timer({
                      time: 5
                    }).on('close', () => {
                      m.destory()
                      view.router.loadPage('Inform-step1.html')
                    })
                  })
                }

                if (status === 2) {
                  m1.destory()
                  console.log('支付失败')
                  clearInterval(timerTask)

                  let m, t

                  m = modal({
                    legend: 'legend3',
                    status: 'error',
                    title: '支付失败',
                    info: d.object.payRemark,
                    action: [
                      {
                        text: '返回首页',
                        onClick: () => {
                          m.destory()
                          t.destory()
                          view.router.loadPage('index.html')
                        }
                      }
                    ]
                  }).on('open', () => {
                    t = timer({
                      time: 60
                    }).on('close', () => {
                      m.destory()
                      view.router.loadPage('index.html')
                    })
                  })
                }

              } else if (code !== 0) { // 失败
                let error = d.error,
                    message = d.message,
                    m,
                    t
                
                m = modal({
                  status: 'error',
                  legend: 'legend3',
                  title: error,
                  info: message
                }).on('open', () => {
                  t = timer({
                    time: 10
                  }).on('close', () => {
                    clearInterval(timerTask)
                    m.destory()
                    view.router.loadPage('index.html')
                  })
                })

              }
            })
            .fail(function() {
              console.log("error");
            })
            .always(function() {
              console.log("complete");
            })
            
          }, 1000)

        } else {
          m1.destory()
          toast('操作失败')
          view.router.loadPage('index.html')
        }
      })
      .fail(function (d) {
        m1.destory()
        toast('操作失败')
        view.router.loadPage('index.html')
      })
      .always(function () {

      })

  });
  // 更新订单状态
  function upload(data, Url) {
    data.redirectUrl = request.updateOrder
    data.merchantId = new Date().getTime()

    console.log(data)

    $.ajax({
      url: url.test + request.allRequest,
      type: 'POST',
      dataType: 'json',
      data: data,
    })
      .done(function (d) {
        if (d.code === 0) {
          console.log('订单更新成功')
          store.set('outOrderNo',d.object.id);
          view.router.loadPage(Url);
        } else {
          console.log(d);
          toast({text:d.message});
          view.router.loadPage('index.html');
        }
      })
      .fail(function (d) {
        toast({text:'操作失败'});
        view.router.loadPage('index.html');
      })
  }
  

})