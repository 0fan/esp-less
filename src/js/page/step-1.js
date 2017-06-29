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
  var propertiesForSaleType;
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
        if (d.object.propertiesForSaleType.length != 0) {
          console.log(d);
          _.each(d.object.propertiesForSaleType, function (item, index, arr) {
            $("<div data-propertiesForSaleType='" + (JSON.stringify(item)) + "' class='switchProject-items_item'> <div class='info'> " + item.name + " </div> </div>").appendTo($('.j-switchProject-items .switchProject-items_wrap'));
          });
        } else {
          Toast({test:d.message});
          view.router.loadPage('index.html');
        }
      }
    })
    .fail(function (d) {
      view.router.loadPage('index.html');
      Toast({test:d.message});
    })
    .always(function () {
      console.log("complete");
    });
    // handle
    $('.switchProject-items_wrap').on('click', '.switchProject-items_item', function (e) {
      propertiesForSaleType = JSON.parse($(this).attr('data-propertiesForSaleType'));
      store.set('propertiesForSaleType',propertiesForSaleType);
      view.router.loadPage('identify-step1.html');
    });
})