import Toast from '../widget/toast'
import modal from '../widget/modal'
import steps from '../widget/steps'
import {steps4} from '../data/data-steps'
import {isTel} from '../utility/match'

import config from '../data/data-config'
import url from '../data/data-url'
import request from '../data/data-connect'
$(document).on('pageInit', '.page[data-page=inform-step1]', () => {
  // init
  steps({
    data: steps4,
    active: 0
  });
  var icNo=store.get('icNo');
  $('#pact').attr('src', url.test + request.getNotification + '?icNo=' + icNo);
  $('#informStep1-sign').on('click', function () {
    setTimeout(function () {
      var wrapper = document.getElementById("sign"),
        canvas = wrapper.querySelector("canvas"),
        sign;

      function resizeCanvas() {
        var ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
      }

      window.onresize = resizeCanvas;

      resizeCanvas();

      sign = new SignaturePad(canvas, {
        minWidth: 2,
        maxWidth: 4
      });

      $('.sign-btn.reset').on('click', function () {
        sign.clear();
        $('.icon', this).addClass('active');
        $('.icon', this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationend animationend', function () {
          $(this).removeClass('active');
        });
      });

      $('.sign-btn.done').on('click', function () {
        var signimg = convertCanvasToImage(sign).src;
        var pos = signimg.indexOf(4) + 2;
        var web64imgstr = signimg.substring(pos, signimg.length - pos);
        var merchantId = new Date().getTime();
        var outOrderNo=store.get('outOrderNo');
        if (sign.isEmpty()) {
          Toast({text: '请签名后再提交'});
        } else {
          Toast({text: '签名成功,等待信息提交...',});
          $.ajax({
            url: url.test + request.allRequest,
            type: 'POST',
            dataType: 'json',
            data: {
              redirectUrl: request.uploadSign,
              merchantId: merchantId,
              orderId: outOrderNo,
              xhrFields: {withCredentials: true},
              web64imgstr: web64imgstr,
              fileSuffix: 'png',
              signimg: ''
            },
          })
            .done(function (d) {
              console.log(d);
              if (d.code == 0) {
                Toast({text: '信息提交成功',});
                app.closeModal();
              } else {
                console.log(d);
                Toast({text:d.message});
              }
            })
            .fail(function (d) {
              Toast({text:'操作失败'});
              view.router.loadPage('index.html');
            })
            .always(function () {
              console.log("complete");
            });
        }

      });
    }, 0);
  });

  // canvas转化图片
  function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
  }

})