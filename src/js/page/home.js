import Toast from '../widget/toast'
import modal from '../widget/modal'
import timer from '../widget/timer'
import steps from '../widget/steps'

import config from '../data/data-config'
import url from '../data/data-url'
import request from '../data/data-connect'

let isOnline = false, // 是否联网
    isInit = false // 是否初始化

window.app = new Framework7({ // 应用初始化
  activeState: false,
  init: false,
  cache: false,
  swipeBackPage: false,
  preloadPreviousPage: false,
  pushState: true,
  pushStateNoAnimation: true
})

window.view = app.addView('.view-main', { // 视图初始化
  dynamicNavbar: true
})

$(document).on('pageInit', '.page[data-page=index]', () => {
  var open = {'identifier': config.termid};
  $.ajax({
    url: url.test + request.allRequest,
    type: 'GET',
    dataType: 'json',
    data: {
      merchantId: new Date().getTime(),
      redirectUrl: request.getBuild,
      termid: config.termid
    },
  })
    .done(function (d) {
      if(d.code==0){
        console.log(d);
        isInit=true;
        Toast({text:'服务器链接成功'});
        $('.toolbar .name > span').text(d.object.propertiesForSale.address);
        $('.toolbar .tel > span').text(d.object.propertiesForSale.picPhone);
        $('.j-inner').removeClass('disabled').removeAttr('disabled');
        store.set('propertiesForSale',d.object.propertiesForSale);
        open.buildingId = d.object.propertiesForSale.id;
        canOpen(open);
      }
    })
    .fail(function (d) {
      Toast({text:d.message});
    })
    .always(function () {
      console.log("complete");
      if (!isInit) {
        modal({
          title: '正在初始化...',
          mask: true,
          full: true
        });
      }
    });


})

app.onPageInit('*', function (page) {
  console.log(page.name + ' init')
  if (page.name === 'index') {
    view.showToolbar()
    $.hideSidebar()
    $('.navbar').removeClass('navbar-reverse')
  } else {
    view.hideToolbar()
    $.showSidebar()
    $('.navbar').addClass('navbar-reverse')
  }
})



// canvas转化图片
function convertCanvasToImage(canvas) {
  var image = new Image();
  image.src = canvas.toDataURL("image/png");
  return image;
}


function canOpen(data) {
  data.redirectUrl = request.canOpen;
  data.merchantId = new Date().getTime();
  $.ajax({
    url: url.test + request.allRequest,
    type: 'POST',
    dataType: 'json',
    data: data,
  })
    .done(function (d) {
      if (d.code == 0) {
        console.log('可继续开户');
      } else {
        Toast("不可开户");
      }
    })
    .fail(function (d) {
      Toast("不可开户");
    })
}


app.init()