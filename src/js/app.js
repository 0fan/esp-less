$(function() {
  window.app  = new Framework7({ // 应用初始化
    activeState: false,
    init: false,
    cache: false,
    swipeBackPage: false,
    preloadPreviousPage: false,
    pushState: true,
    pushStateNoAnimation: true,
    onAjaxStart: function() {
      app.showIndicator();
    },
    onAjaxComplete: function() {
      app.hideIndicator()
    },
    test: function() {

    }
  });

  window.view = app.addView('.view-main', { // 视图初始化
    dynamicNavbar: true
  });
  

  /* ========== 导航 ========== */

  var steps1 = {
    title: '选择项目',
    data: [
      {
        text: '选择项目类型',
        icon: 'grain'
      }
    ]
  };

  var steps2 = {
    title: '开通银行E卡账户',
    data: [
      {
        text: '客户信息',
        icon: 'person'
      },
      {
        text: '银行卡',
        icon: 'creditcard'
      },
      {
        text: '手机号',
        icon: 'stayprimaryportrait'
      },
      {
        text: 'E卡开户',
        icon: 'openinbrowser'
      }
    ]
  };

  var steps3 = {
    title: '存入存款',
    data: [
      {
        text: '存入存款',
        icon: 'presenttoall'
      },
      {
        text: '输入密码',
        icon: 'lockoutline'
      }
    ]
  };

  var steps4 = {
    title: '打印告知书',
    data: [
      {
        text: '确认告知书',
        icon: 'fingerprint'
      },
      {
        text: '打印告知书',
        icon: 'print'
      }
    ]
  };


  /* ========== pages ========== */

  app.onPageInit('*', function (page) {
    console.log(page.name + ' init');

    if (page.name === 'index') {
      view.showToolbar();
      $.hideSidebar();
      $('.navbar').removeClass('navbar-reverse');
    } else {
      view.hideToolbar();
      $.showSidebar();
      $('.navbar').addClass('navbar-reverse');
    }
  });

  /* index */
  app.onPageInit('index', function(page) {
    // handle
    // $('.j-inner').on('click', function() {
    //   view.router.loadPage('identify-step1.html');
    // });
    // new IScroll('.j-sidebar');
  });
  /* /index */

  /* switch-project */
  app.onPageInit('switch-project', function(page) {
    // init
    $.steps(steps1);
    $('.esp-steps').steps(0);

    new IScroll('.j-switchProject-items', {
      scrollbars: true,
      mouseWheel: true,
      click: true,
      shrinkScrollbars: 'scale',
      fadeScrollbars: true
    });
    // handle
    $('.switchProject-items_item').on('click', function(e) {
      view.router.loadPage('identify-step1.html');
    });

  });
  /* /switch-project */

  /* identify-step1 */
  app.onPageInit('identify-step1', function(page) {
    // init
    $.steps(steps2);
    $('.esp-steps').steps(0);

    $('#identifyStep1-submit').on('click', function() {
      $.showResult({
        legend: 'legend5',
        title: '您已开通过兴业银行E账户，是否继续？',
        // status: 'error',
        action: [
          {
            text: '继续办理',
            onClick: function() {
              $.hideResult();
              view.router.loadPage('./identify-step2.html');
            }
          }, {
            text: '重新开户',
            onClick: function() {
              $.hideResult();
             view.router.loadPage('./reprint-notice.html'); 
            }
          }
        ]
      });
    });
  });
  /* /identify-step1 */

  /* identify-step2 */
  app.onPageInit('identify-step2', function(page) {
    // init
    $.steps(steps2);
    $('.esp-steps').steps(1);
  });
  /* /identify-step2 */

  /* identify-step3 */
  app.onPageInit('identify-step3', function(page) {
    // init

    $.steps(steps2);
    $('.esp-steps').steps(2);

    
    // var countdown=60;
    // $('#testCode').on('click',function (e) {
    //   e.preventDefault;
    //   console.log('sad');
    //   var _self=$(this);
    //   settime(_self);
    // });
    // function settime(obj) {
    //   var html="获取验证码";
    //   if (countdown == 0) {
    //     obj.removeAttr("disabled");
    //     html="获取验证码";
    //     obj.html(html);
    //     countdown = 60;
    //     return;
    //   } else {
    //     obj.attr("disabled", true);
    //     countdown--;
    //     html="验证时间(" + countdown + ")";
    //     obj.html(html);
    //     console.log(countdown);
    //   }
    //   setTimeout(function() {
    //       settime(obj)
    //     },1000)
    // }
  });
  /* /identify-step3 */

  /* identify-step4 */
  app.onPageInit('identify-step4', function(page) {
    // init
    $.steps(steps2);
    $('.esp-steps').steps(3);

    $('.sureCard').on('click', function() {
      Toast({
        text: '银行卡修改成功',
        timer: 2000
      });
    });

    $('.surePhone').on('click', function() {
      Toast({
        text: '电话号码修改成功',
        timer: 2000
      });
    });

    $('.j-identifyStep4-open-error-btn').on('click', function() {
      console.log('hello');
      $('.j-identifyStep4-open-error').removeClass('active');
      $.card('error');
    });

  });

  /* /identify-step4 */

  /* deposit-step1 */
  app.onPageInit('deposit-step1', function(page) {
    // init
    $.steps(steps3);
    $('.esp-steps').steps(0);
  });
  /* /deposit-step1 */

  /* deposit-step2 */
  app.onPageInit('deposit-step2', function(page) {
    // init
    $.steps(steps3);
    $('.esp-steps').steps(1);
  });
  /* /deposit-step2 */

  /* inform-step1 */
  app.onPageInit('inform-step1', function(page) {
    // init
    $.steps(steps4);
    $('.esp-steps').steps(0);
    
    $('#informStep1-sign').on('click', function() {
      setTimeout(function() {
        var wrapper = document.getElementById("sign"),
            canvas  = wrapper.querySelector("canvas"),
            sign;

        function resizeCanvas() {
          var ratio =  Math.max(window.devicePixelRatio || 1, 1);
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

        $('.sign-btn.reset').on('click', function() {
          sign.clear();
          $('.icon', this).addClass('active');
          $('.icon', this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationend animationend', function() {
            $(this).removeClass('active');
          });
        });

        $('.sign-btn.done').on('click', function() {
          Toast({
            text: '签名成功',
            timer: 2000
          });
          app.closeModal();
          view.router.loadPage('inform-step2.html');
        });
      }, 0);
    });


  });
  /* /inform-step1 */

  /* inform-step2 */
  app.onPageInit('inform-step2', function(page) {
    // init
    $.steps(steps4);
    $('.esp-steps').steps(1);
  });
  /* /inform-step2 */

  /* reprint-notice */
  app.onPageInit('reprint-notice', function(page) {
    // init
    $.hideSidebar();

    $('.j-reprintNotice-table').on('click', '.esp-table-content-row', function() {
      $(this).addClass('active').siblings().removeClass('active');
    });

  });
  /* /reprint-notice */

  /* refund */
  app.onPageInit('refund', function(page) {
    // init
    $.hideSidebar();

    $('.j-refund-table').on('click', '.esp-table-content-row', function() {
      $(this).addClass('active').siblings().removeClass('active');
    });

  });
  /* /refund */

  app.init();
});

