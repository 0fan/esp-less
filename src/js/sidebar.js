;(function() {

  $.extend({

    showSidebar: function() {
      var sidebar = $('.sidebar');

      if (!sidebar.length) {
        return;
      }

      var pages   = $('.pages'),
          navbar  = $('.navbar-hidden').length,
          toolbar = $('.toolbar-hidden').length;

      if (!navbar && (pages.hasClass('navbar-fixed') || pages.hasClass('navbar-through'))) {
        sidebar.css({top: $('.navbar').eq(0).height() + 'px'});
      }
      if (!toolbar && (pages.hasClass('toolbar-fixed') || pages.hasClass('toolbar-through'))) {
        sidebar.css({bottom: $('.toolbar').eq(0).height() + 'px'});
      }

      sidebar.addClass('active');
      pages.addClass('sidebar-through');
    },

    hideSidebar: function() {
      var sidebar = $('.sidebar');

      if (!sidebar.length) {
        return;
      }

      var pages = $('.pages');
      
      sidebar.removeClass('active');
      pages.removeClass('sidebar-through sidebar-fixed');
    }

  });

})()