import modal from '../widget/modal'
import url from '../data/data-url'
import request from '../data/data-connect'

$(document).on('pageInit', '.page[data-page=refund]', () => {
  function freshHtml() {
    var orderList=store.get('orderList');
    var html='';
    if(!orderList==''){
      $.each(orderList,function (i,p) {
        html+=`<div data-orderId="${p.orderId}" class="esp-table-content-row">
              <div class="esp-table-content-col">${p.payAmount}元</div>
              <div class="esp-table-content-col">${p.bankName}</div>
              <div class="esp-table-content-col">${p.tradeDate}</div>
              <div class="esp-table-content-col">
                <div class="esp-table-check"><i class="icon icon-material icon-check"></i></div>
              </div>
            </div>`;
      })
      $('#refundList').html(html);
    }
  }
  freshHtml();
  $('.page-content').on('click','.esp-table-content-row',function (e) {
    e.preventDefault();
    $('#refund_btn').removeClass('disabled').removeAttr('disabled');
    $(this).addClass('active').siblings().removeClass('active');
  });
  $('#refund_btn').click(function (e) {
    e.preventDefault;
    var data=$('#refundList .esp-table-content-row.active').data();
    $.ajax({
      url: url.test + request.refund,
      type: 'POST',
      dataType: 'json',
      data: data,
    })
      .done(function (d) {
        console.log(d);
        if (d.code == 0) {
          toHomeModdal=modal({
            legend: 'legend3',
            clickMaskHide: false,
            title: '退款申请已提交',
            info:'我们将在24小时内完成退款,退款结果将会以短信的方式进行告知',
            status: 'success',
            action:[{text: '返回首页',
              onClick: function () {
                toHomeModdal.destory();
                t.destory();
                view.router.loadPage('index.html');
              }}],
          }).on('open', () => {
            t = timer({
              time: 5
            }).on('close', function () {
              toHomeModdal.destory();
              view.router.loadPage('index.html');
            });
          })
        }
      })
      .fail(function (d) {
        Toast({text:'操作失败'});
        view.router.loadPage('index.html');
      })
      .always(function () {
        console.log("complete");
      });
  })
})
