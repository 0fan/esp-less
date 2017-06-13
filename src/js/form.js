;(function() {

  $.fn.extend({
    showMsg: function(text, cb) {
      
      var self = $(this);

      if (!self.hasClass('esp-form-control')) {
        return;
      }

      var text    = text || self.attr('data-esp-tip') || '默认错误',
          pos     = self.attr('data-esp-tip-pos') || 'left',
          isInit  = false;

      self
        .attr('data-esp-tip', text)
        .attr('data-esp-tip-pos', pos)
        .attr('data-esp-tip-hasIcon', '')
        .addClass('hasWarming');

      setTimeout(function() {
        self.attr('data-esp-tip-visible', '');

        self.one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function() {
          if (!isInit) {
            cb && cb();
            isInit = true;
            self.off('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend');
          }
        });

      }, 0);


    },

    hideMsg: function(cb) {

      var self = $(this);

      if (!self.hasClass('esp-form-control')) {
        return;
      }

      var isInit = false;
      
      self.removeAttr('data-esp-tip-visible')
        
      self.one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function() {
        
        self
          .removeAttr('data-esp-tip data-esp-tip-pos data-esp-tip-hasIcon')
          .removeClass('hasWarming hasDanger');

        if (!isInit) {
          cb && cb();
          isInit = true;
          self.off('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend');
        }
      });

    }
  });

})()