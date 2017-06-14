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
  });
  /* /identify-step3 */

  /* identify-4 */
  app.onPageInit('identify-step4', function(page) {
    // init
    $.steps(steps2);
    $('.esp-steps').steps(3);
  });
  /* /identify-4 */

  app.init();
});

