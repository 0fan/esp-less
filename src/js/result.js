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
        class         : '',
        action        : [],
        withSidebar   : false,
        callback      : null,
        mask          : true,
        clickMaskHide : true
      }, cfg);

      var html = $('<div class="resultPage-wrap">\
                      <div class="resultPage ' + (CFG.status && ('has' + CFG.status.substr(0,1).toUpperCase() + CFG.status.substr(1).toLowerCase())) + (CFG.class && (' ' + CFG.class + ' ')) + (CFG.full ? 'resultPage-full' : '') +'">\
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

      setTimeout(function() {
        html.addClass('active');

        CFG.callback && CFG.callback();
      }, 10);
    
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