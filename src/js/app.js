$(function() {
  var app=new Framework7({
    init: false,
    cache: false, // 页面缓存
    activeState: false, // 启用这个设置时，会给当前点击的元素增加一个 'active-state' class
    // 弹层
    modalTitle: '提示',
    modalButtonOk: '确认',
    modalButtonCancel: '取消',
    modalPreloaderTitle: '加载中...'
  });

  /* 初始化view */
  var mainView = app.addView('.view-main', {
    dynamicNavbar: true
  });

  $$ = Framework7.$;

  /* page index */
  app.onPageInit('index', function(page) {
    $('#btn-guide').on('click', function() {
      mainView.router.loadPage('switch-project.html?' + Math.random());
    });
  });
  /* /page index */

  /* /page switch-project*/
  app.onPageInit('switch-project', function(page) {
    var switch_swiper = new Swiper('.switch_swiper', {
      scrollbar: '.swiper-scrollbar',
      direction: 'vertical',
      slidesPerView: 'auto',
      mousewheelControl: true,
      freeMode: true,
      roundLengths : true,
    });
    $('.switch_swiper .swiper-box').each(function () {
      $('.switch_swiper .swiper-box:nth-child(4n + 4)').css({'margin-right':0});
    })
    $('.switch_swiper .swiper-box').on('click',function (e) {
      e.preventDefault();
      mainView.router.loadPage('identify-step1.html?' + Math.random());
    })
    $('.navbar').addClass('navbar-brand no-border');
    $('.steps .steps-item:eq(0)').addClass('active')
      .siblings().removeClass('active');
  });
  /* /page switch-project */

  /* /page identify-step1 */
  app.onPageInit('identify-step1', function(page) {
    $('.navbar').addClass('navbar-brand no-border');
    $('.steps .steps-item:eq(0)').addClass('active')
      .siblings().removeClass('active');
    $('.eps-back').on('click', function() {
      $('.navbar').removeClass('navbar-brand no-border');
    });
    $('#toI2').click(function (e) {
      e.preventDefault();
      mainView.router.loadPage('identify-step2.html?'+Math.random());
    })
  });
  /* /page identify-step1 */

  /* /page identify-step2 */
  app.onPageInit('identify-step2', function(page) {
    $('.navbar').addClass('navbar-brand no-border');
    $('.steps .steps-item:eq(1)').addClass('active')
      .siblings().removeClass('active');
    $('.eps-back').on('click', function() {
      $('.navbar').removeClass('navbar-brand no-border');
    });
    $('#toI3').click(function (e) {
      e.preventDefault();
      mainView.router.loadPage('identify-step3.html?'+Math.random());
    })
  });
  /* /page identify-step2 */

  /* /page identify-step3 */
  app.onPageInit('identify-step3', function(page) {
    $('.navbar').addClass('navbar-brand no-border');
    $('.steps .steps-item:eq(2)').addClass('active')
      .siblings().removeClass('active');
    $('.eps-back').on('click', function() {
      $('.navbar').removeClass('navbar-brand no-border');
    });
    $('#toI4').click(function (e) {
      e.preventDefault();
      mainView.router.loadPage('identify-step4.html?'+Math.random());
    })
  });
  /* /page identify-step3 */

  /* /page identify-step4 */
  app.onPageInit('identify-step4', function(page) {

    $('.navbar').addClass('navbar-brand no-border');
    $('.steps .steps-item:eq(3)').addClass('active')
      .siblings().removeClass('active');
    $('.eps-back').on('click', function() {
      $('.navbar').removeClass('navbar-brand no-border');
    });
    $('#btn-open-account').click(function (e) {
      e.preventDefault();
      mainView.router.loadPage('identify-step4-succ.html?'+Math.random());
    })
  });
  /* /page identify-step4 */

  /* /page identify-step4-succ */
  app.onPageInit('identify-step4-succ', function(page) {
    $('.navbar').addClass('navbar-brand no-border');
    $('.steps .steps-item:eq(0)').addClass('active')
      .siblings().removeClass('active');
    $('.eps-back').on('click', function() {
      $('.navbar').removeClass('navbar-brand no-border');
    });
    $('#btn-succ').on('click',function (e) {
      e.preventDefault();
      mainView.router.loadPage('save-step1.html?'+Math.random());
    })
  });
  /* /page identify-step4-succ */

  /* page deposit-step2 */
  app.onPageInit('deposit-step2', function(page) {

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