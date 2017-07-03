import toast from '../widget/toast'
import modal from '../widget/modal'
import timer from '../widget/timer'
import steps from '../widget/steps'

import config from '../data/data-config'
import url from '../data/data-url'
import request from '../data/data-connect'

console.log(request.allRequest)

let isOnline = false, // 是否联网
    isInit = false // 是否初始化

window.modal = modal

window.app = new Framework7({ // 应用初始化
  activeState: false,
  init: false,
  swipeBackPage: false,
  pushState: true,
  pushStateNoAnimation: true,
})

window.view = app.addView('.view-main', { // 视图初始化
  dynamicNavbar: true
})

$(document).on('pageInit', '.page[data-page=index]', () => {
  // store.clearAll();
  var open = {'identifier': config.termid}

  $.ajax({
    url: url.test + request.allRequest,
    type: 'POST',
    dataType: 'json',
    data: {
      merchantId: new Date().getTime(),
      redirectUrl: request.getBuild,
      termid: config.termid
    },
  })
    .done(function (d) {

      if (d.code === 0){
        console.log(d)
        isInit=true
        $('.toolbar .name > span').text(d.object.propertiesForSale.address)
        $('.toolbar .tel > span').text(d.object.propertiesForSale.picPhone)
        $('.j-inner').removeClass('disabled').removeAttr('disabled')
        store.set('propertiesForSale',d.object.propertiesForSale)
        open.buildingId = d.object.propertiesForSale.id
        canOpen(open)
      }
    })
    .fail(function (d) {
      toast({text:d.message})
    })
    .always(function () {
      if (!isInit) {
        modal({
          legend: 'anime-upgrade',
          status: 'primary',
          title: '正在和服务器取得连接...',
        })
      }
    })


})

app.onPageInit('*', function (page) {
  console.log(page.name + ' init')
  if (page.name === 'index'||page.name === 'reprint-notice'||page.name === 'refund') {
    view.showToolbar()
    $.hideSidebar()
    $('.navbar').removeClass('navbar-reverse')
  } else {
    view.hideToolbar()
    $.showSidebar()
    $('.navbar').addClass('navbar-reverse')
  }
})

function canOpen(data) {
  data.redirectUrl = request.canOpen
  data.merchantId = new Date().getTime()
  $.ajax({
    url: url.test + request.allRequest,
    type: 'POST',
    dataType: 'json',
    data: data,
  })
    .done(function (d) {
      if (d.code == 0) {
        console.log('可继续开户')
      } else {
        toast({text:"不可开户"})
      }
    })
    .fail(function (d) {
      toast({text:"不可开户"})
    })
}

app.init()