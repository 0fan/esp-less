import {steps1} from '../data/data-steps'
import steps from '../widget/steps'

import Toast from '../widget/toast'
import modal from  '../widget/modal'

import config from '../data/data-config'
import url from '../data/data-url'
import request from '../data/data-connect'

$(document).on('pageInit', '.page[data-page=switch-project]', () => {

  steps({
    data: steps1,
    active: 0
  });

  let propertiesForSaleType;

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
      if (d.code == 0) {

        let _data = d.object.propertiesForSaleType

        if (_data.length) {

          let _item = '',
              _type = 'gaoceng',
              _name

          for (let i = 0, len = _data.length; i < len; i++) {
            
            // 获取户型类型，默认为高层
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

            if (_data[i].name.match(/\u5546\u4E1A/)) { // 商业
              _type = 'shangye'
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

        } else {
          Toast({text:d.message});
          view.router.loadPage('index.html');
        }
      }
    })
    .fail(function (d) {
      view.router.loadPage('index.html');
      Toast({text:d.message});
    })
    .always(function () {
      console.log('complete');
    });

    // handle
    $('.switchProject-items_wrap').on('click', '.switchProject-items_item', function (e) {

      store.set('propertiesForSaleType',$(this).data());

      view.router.loadPage('identify-step1.html');

    });

})