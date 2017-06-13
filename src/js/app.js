$(function() {
  var app  = new Framework7({ // 应用初始化
        activeState: false,
        init: false,
        pushState: true
      }),
      view = app.addView('.view-main', { // 视图初始化
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
      view.router.loadPage('switch-project.html');
    });
    new IScroll('.j-sidebar');
  });
  /* /index */

  /* switch-project */
  app.onPageInit('switch-project', function(page) {
    // handle
    new IScroll('.j-switchProject-items', {
      scrollbars: true,
      mouseWheel: true,
      shrinkScrollbars: 'scale',
      fadeScrollbars: true
    });

  });
  /* /switch-project */

  app.init();
})