import Toast from '../widget/toast'
import modal from '../widget/modal'
import url from '../data/data-url'
import config from '../data/data-config'
import request from '../data/data-connect'

$(document).on('pageInit', '.page[data-page=reprint-notice]', () => {
  function freshHtml() {
    var orderList=store.get('orderList');
    var html='';
    if(!orderList==''){
      $.each(orderList,function (i,p) {
        html+=`<div class="esp-table-content-row">
              <div class="esp-table-content-col">${p.payAmount}元</div>
              <div class="esp-table-content-col">${p.bankName}</div>
              <div class="esp-table-content-col">${p.tradeDate}</div>
              <div class="esp-table-content-col">
                <div class="esp-table-check"><i class="icon icon-material icon-check"></i></div>
              </div>
            </div>`;
      })
      $('#reprintNoticeList').html(html);
    }
  }
  freshHtml();
  $('.page-content').on('click','.esp-table-content-row',function (e) {
    e.preventDefault();
    $(this).addClass('active').siblings().removeClass('active');
  });

})