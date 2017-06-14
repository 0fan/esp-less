$(function() {
  var app  = new Framework7({ // 应用初始化
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
    }
  });

  var view = app.addView('.view-main', { // 视图初始化
    dynamicNavbar: true
  });

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
    $('.j-inner').on('click', function() {
      console.log('hello');
      view.router.loadPage('switch-project.html', {
        ignoreCache: true
      });
    });
    new IScroll('.j-sidebar');
  });
  /* /index */

  /* switch-project */
  app.onPageInit('switch-project', function(page) {
    // init
    $('.esp-steps').steps(0);
    new IScroll('.j-switchProject-items', {
      scrollbars: true,
      mouseWheel: true,
      shrinkScrollbars: 'scale',
      fadeScrollbars: true
    });
    // handle
    $('.switchProject-items_item').on('click', function(e) {
      view.router.loadPage('identify-step1.html', {
        ignoreCache: true
      });
      console.log('hello')
    });

  });
  /* /switch-project */


  /* /page identify-step1 */
  app.onPageInit('identify-step1', function(page) {
    $('.esp-steps').steps(0);
    $('#toI2').click(function (e) {
      e.preventDefault();
      view.router.loadPage('identify-step2.html?'+Math.random());
    })
  });
  /* /page identify-step1 */

  /* /page identify-step2 */
  app.onPageInit('identify-step2', function(page) {
    $('.esp-steps').steps(1);
    var cleave = new Cleave('#bankNum1', {
      // delimiter: '',
      blocks: [2, 4, 4, 4]
    });
    $('#toI3').click(function (e) {
      e.preventDefault();
      view.router.loadPage('identify-step3.html?'+Math.random());
    })
  });
  /* /page identify-step2 */

  /* /page identify-step3 */
  app.onPageInit('identify-step3', function(page) {
    $('.esp-steps').steps(2);
    var cleave = new Cleave('#phoneNum1', {
      // delimiter: '',
      blocks: [3, 4, 4]
    });
    $('#toI4').click(function (e) {
      e.preventDefault();
      view.router.loadPage('identify-step4.html?'+Math.random());
    })
  });
  /* /page identify-step3 */

  /* /page identify-step4 */
  app.onPageInit('identify-step4', function(page) {
    $('.esp-steps').steps(3);
    $('#btn-open-account').click(function (e) {
      e.preventDefault();
      view.router.loadPage('identify-step4-succ.html?'+Math.random());
    })
  });
  /* /page identify-step4 */

  /* /page identify-step4-succ */
  app.onPageInit('identify-step4-succ', function(page) {
    $('.esp-steps').steps(3);
    $('#btn-to-save').on('click',function (e) {
      e.preventDefault();
      view.router.loadPage('save-step1.html?'+Math.random());
    })
  });
  /* /page identify-step4-succ */
  /* /page save-step1 */
  app.onPageInit('save-step1', function(page) {
    $('.esp-steps').steps(0);
    $('#btn-sure-save').click(function (e) {
      e.preventDefault();
      view.router.loadPage('save-step2.html?'+Math.random());
    })
  });
  /* /page save-step1 */

  /* /page save-step2 */
  app.onPageInit('save-step2', function(page) {
    $('.esp-steps').steps(1);
    $('#btn-right-save').click(function (e) {
      e.preventDefault();
      view.router.loadPage('deposit-step2.html?'+Math.random());
    })
  });
  /* /page save-step2 */

  /* page deposit-step2 */
  app.onPageInit('deposit-step2', function(page) {
    $('.esp-steps').steps(1);
    $('.popup-about').on('open', function() {
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
        })
        app.closeModal();
      });

    });
  });
  /* /page deposit-step2 */










  app.init();
})
