;(function() {

  $.extend({
    
    showResult: function(cfg) {
      
      $.hideResult();

      var CFG = $.extend({}, {
        target        : document.body,
        legend        : '',
        title         : '默认提示',
        full          : false,
        info          : '',
        status        : '',
        action        : [],
        withSidebar   : false,
        callback      : null,
        mask          : false,
        clickMaskHide : false,
        animation     : true
      }, cfg);

      var html = $('<div class="resultPage-wrap">\
                      <div class="resultPage ' + (CFG.status ? ('has' + CFG.status.substr(0,1).toUpperCase() + CFG.status.substr(1).toLowerCase()) : "") + (CFG.full ? ' resultPage-full ' : '') +'">\
                        <div class="resultPage-legend ' + CFG.legend + '"></div>\
                        <div class="resultPage-title">' + CFG.title + '</div>\
                        <div class="resultPage-info">' + CFG.info + '</div>\
                      </div>\
                    </div>');

      var i          = 0,
          actionsLen = CFG.action && CFG.action.length;

      if (actionsLen) {
        var actions = $('<div class=resultPage-action></div>');

        for (; i < actionsLen; i++) {
          (function(i) {
            var btn = $('<button class="resultPage-btn esp-btn">' + CFG.action[i].text + '</button>');
            btn.on('click', function() {
              CFG.action[i].onClick && CFG.action[i].onClick();
            });

            btn.appendTo(actions);
          })(i);
        }

        $(actions).appendTo($('.resultPage', html));
      }

      if (CFG.withSidebar) {
        html.css({
          left: ($('.sidebar').length && $('.sidebar').outerWidth() || 340) + 'px'
        });
      }

      if (!CFG.mask) {
        html.css({
          top: '120px'
        });
        $('.resultPage', html).css({
          top: 0
        });
      }

      if (CFG.clickMaskHide) {

        $(html).on('click', function(e) {
          if ($(e.target).closest($('.resultPage')).length === 0) {
            $.hideResult();
          }
        });

      }

      html.appendTo($(CFG.target));
      html[0].offsetWidth;
      html.addClass('active');
      CFG.callback && CFG.callback();
    
    },

    hideResult: function(cfg) {
      var resultPage = $('.resultPage-wrap');

      if (!resultPage.length) {
        return;
      }

      resultPage.removeClass('active');
      resultPage.one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend', function() {
        $(this).remove();
      });

    }

  });

})()