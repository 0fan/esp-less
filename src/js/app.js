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







  app.init();
})