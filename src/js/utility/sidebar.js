$.extend({

  showSidebar: function(cb) {
    let sidebar = $('.sidebar')

    if (!sidebar.length) {
      return
    }

    let pages   = $('.pages'),
        navbar  = $('.navbar-hidden').length,
        toolbar = $('.toolbar-hidden').length

    if (!navbar && (pages.hasClass('navbar-fixed') || pages.hasClass('navbar-through'))) {
      sidebar.css({top: $('.navbar').eq(0).height() + 'px'})
    }

    if (!toolbar && (pages.hasClass('toolbar-fixed') || pages.hasClass('toolbar-through'))) {
      sidebar.css({bottom: $('.toolbar').eq(0).height() + 'px'})
    }

    pages.addClass('sidebar-through')

    sidebar[0].offsetWidth

    let isTransitionend = false

    sidebar.addClass('active')
    sidebar.one('transitionend', (e) => {
      isTransitionend = true

      if (isTransitionend) {
        isTransitionend = false
        cb && cb()
      }

    })

  },

  hideSidebar: function(cb) {
    let sidebar = $('.sidebar')

    if (!sidebar.length) {
      return
    }

    let pages = $('.pages')
    
    pages.removeClass('sidebar-through sidebar-fixed')

    sidebar[0].offsetWidth

    let isTransitionend = false

    sidebar.removeClass('active')
    sidebar.one('transitionend', (e) => {
      isTransitionend = true

      if (isTransitionend) {
        isTransitionend = false
        
        cb && cb()
      }

    })
  }

})