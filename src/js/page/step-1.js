import steps from '../widget/steps'
import toast from '../widget/toast'
import modal from '../widget/modal'
import timer from '../widget/timer'

import {steps1} from '../data/data-steps'

import config from '../data/data-config'
import url from '../data/data-url'
import request from '../data/data-connect'

$(document).on('pageInit', '.page[data-page=switch-project]', () => {
  
  steps({
    data: steps1,
    active: 0
  });

  $.ajax({
    url: url.test + request.allRequest,
    type: 'POST',
    dataType: 'json',
    data: {
      merchantId: new Date().getTime(),
      redirectUrl: request.getBuild,
      termid: config.termid
    }
  })
    .done(function (d) {
      if (d.code === 0) { // 成功

        let _data = d.object.propertiesForSaleType
        
        if (!_data.length) { // 无户型数据
          let t, m

          m = modal({
            legend: 'legend3',
            status: 'error',
            title: '当前户型为空',
            mask: true,
            action: [
              {
                text: '返回首页',
                onClick: () => {
                  t.destory()
                  view.router.loadPage('index.html')
                }
              }
            ]
          })
            .on('open', () => {
              t = timer({
                time: 10
              })
                .on('close', () => {
                  m.destory()
                  view.router.loadPage('index.html')
                })
            })
            .on('close', () => {
              t.destory()
            })

          return
        }

        let _item = '',
            _type = 'zidingyi',
            _name

        for (let i = 0, len = _data.length; i < len; i++) {
          
          // 获取户型类型
          if (_data[i].name.match(/\u9AD8\u5C42/)) { // 高层
            _type = 'gaoceng'
          }

          if (_data[i].name.match(/\u5927\u5E73\u5C42/)) { // 大平层
            _type = 'dapingceng'
          }

          if (_data[i].name.match(/\u6D0B\u623F/)) { // 洋房
            _type = 'yangfang'
          }

          if (_data[i].name.match(/\u522B\u5885/)) { // 别墅
            _type = 'bieshu'
          }

          if (_data[i].name.match(/\u53E0\u62FC/)) { // 叠拼
            _type = 'diepin'
          }

          if (_data[i].name.match(/\u5546\u94FA/)) { // 商铺
            _type = 'shangpu'
          }
          
          _item += '<div class="switchProject-items_item ' + _type + '"\
                      data-equalMoney =' + _data[i].equalMoney + '\
                      data-iTime      =' + _data[i].iTime + '\
                      data-id         =' + _data[i].id + '\
                      data-name       =' + _data[i].name + '\
                      data-price      =' + _data[i].price + '\
                      data-type       =' + _data[i].type + '\
                    >'
          _name = '<div class=info>' + (_data[i].name || '默认户型') + '</div>'
          _item += _name
          _name += '</div>'

        }

        $(_item).appendTo($('.j-switchProject-items .switchProject-items_wrap'))
        
      }
      if (d.code === -1) {

        let t, m

        m = modal({
          legend: 'legend3',
          status: 'error',
          title: d.error,
          info: d.message,
          full: true,
          action: [
            {
              text: '返回首页',
              onClick: () => {
                t.destory()
                view.router.loadPage('index.html')
              }
            }
          ]
        })
          .on('open', () => {
            t = timer({
              time: 10
            })
              .on('close', () => {
                m.destory()
                view.router.loadPage('index.html');
              })
          })
          .on('close', () => {
            t.destory()
          }) // 失败

      }
    })
    .fail(function (d) {
      toast({
        text: '服务器连接失败'
      })
      view.router.loadPage('index.html')
    })

    // handle
    $('.switchProject-items_wrap').on('click', '.switchProject-items_item', function (e) {

      store.set('propertiesForSaleType', $(this).data())

      view.router.loadPage('identify-step1.html')

    });
})