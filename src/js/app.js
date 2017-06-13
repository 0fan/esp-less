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

  /* identify-step1 */
  app.onPageInit('identify-step1', function(page) {
    // init
    $('.esp-steps').steps(1);

  });
  /* /identify-step1 */

  app.init();
})