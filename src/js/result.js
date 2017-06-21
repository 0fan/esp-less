;(function() {

  $.extend({
    
    showResult: function(cfg) {
      
      $.hideResult();

      var CFG = $.extend({}, {
        target : document.body,
        legend : '',
        title  : '默认提示',
        full   : false,
        info   : '',
        status : '',
        class  : '',
        action : [],
        callback: null
      }, cfg);

      var html = $('<div class="resultPage ' + ('has' + CFG.status.substr(0,1).toUpperCase() + CFG.status.substr(1).toLowerCase()) + ' ' + (CFG.class) + ' ' + (CFG.full && 'resultPage-full') +'">\
                      <div class="resultPage-legend ' + CFG.legend + '"></div>\
                      <div class="resultPage-title">' + CFG.title + '</div>\
                      <div class="resultPage-info">' + CFG.info + '</div>\
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

        $(actions).appendTo(html);
      }

      html.appendTo($(CFG.target));

      setTimeout(function() {
        html.addClass('active');

        CFG.callback && CFG.callback();
      }, 0);
    
    },

    hideResult: function(cfg) {
      var resultPage = $('.resultPage');

      if (!resultPage.length) {
        return;
      }

      resultPage.each(function(index, item) {
        (function(item) {
          item.removeClass('active');
          item.one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend', function() {
            $(this).remove();
          });
        })($(item));
      });
    }

  });

})()