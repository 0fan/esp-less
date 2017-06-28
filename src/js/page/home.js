import toast from '../widget/toast'
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

  if (!isInit) {
    modal({
      title: '正在初始化...',
      mask: true
    });
  }

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


app.init()

function init() { // 初始化

  $.ajax({
    url: url.test + request.getBuild,
    type: 'POSt',
    dataType: 'json',
    data: {
      termid: config.termid
    },
  })
  .done(function(res) {

    console.log(res)

    if (res.code === 0) {
      toast({text: '服务器连接成功'})
      isInit = true

    }

    if (res.code === -1) {
      var m = modal({
        legend: 'legend2',
        title: res.error,
        info: res.message,
        mask: true
      })
      .on('open', () => {
        timer({
          target: $('.esp-modal').eq(0),
          time: 5
        })
        .on('close', () => {
          m.destory()
        })
      })
    }

  })
  .fail(function() {
    
  })
  .always(function() {
    
  })

}

function online() {

}