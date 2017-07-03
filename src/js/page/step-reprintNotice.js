import toast from '../widget/toast'
import modal from '../widget/modal'
import timer from '../widget/timer'

import url     from '../data/data-url'
import config  from '../data/data-config'
import request from '../data/data-connect'

$(document).on('pageInit', '.page[data-page=reprint-notice]', () => {

  let orderList = store.get('orderList'),
      html      = ''
  
  if(!orderList) { // 如果数据没有获取到
    let m, t
    
    m = modal({
      status: 'error',
      legend: 'legend3',
      title: '未获取到订单信息，将跳转到主页',
      action: [
        {
          text: '回到主页',
          onClick: () => {
            view.router.loadPage('index.html')
            m.destory()
            t.destory()
          }
        }
      ]
    }).on('open', () => {

      t = timer({
        time: 10
      }).on('close', () => {
        view.router.loadPage('index.html')
        m.destory()
      })

    })

    return
  }
  // bankName
  //   :
  //   "工商银行"
  // icNo
  //   :
  //   "1498800066274"
  // orderId
  //   :
  //   "170630131745010509"
  // payAmount
  //   :
  //   "0"
  // tradeDate
  //   :
  //   "2017-06-30 13:17:57"

  $.each(orderList,function (i,p) {
    html += `<div class="esp-table-content-row">
               <div class="esp-table-content-col">${p.payAmount}元</div>
               <div class="esp-table-content-col">${p.bankName}</div>
               <div class="esp-table-content-col">${p.tradeDate}</div>
               <div class="esp-table-content-col">
                 <div class="esp-table-check"><i class="icon icon-material icon-check"></i></div>
               </div>
             </div>`
  })
  
  $('#reprintNoticeList').html(html)

  $('.page-content').on('click','.esp-table-content-row',function (e) {
    e.preventDefault()

    $(this).addClass('active').siblings().removeClass('active')
    $('#goonDeposit').removeClass('disabled').removeAttr('disabled')
    // $('#goonStamp').removeClass('disabled').removeAttr('disabled')

  });

})