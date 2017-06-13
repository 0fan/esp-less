;(function() {

  $.fn.extend({
    steps: function(where, loop) {
      
      var self  = $(this);

      if (!self.hasClass('esp-steps')) {
        return;
      }

      var len   = self.find('.esp-steps-item').length,
          loop  = loop || false,
          where = where === 'prev' || (typeof where === 'number') && where >= 0 && where < len ? where : 'next', //prev next 或者范围内的数字
          index;

      console.log(where, len);

      if (where === 'next') {
        index = self.find('.esp-steps-item.active').index();

        if (index + 1 >= len) {
          if (loop) {
            index = -1;
          } else {
            return;
          }
        } 

        _to(index + 1);
        return;
      }

      if (where === 'prev') {
        index = self.find('.esp-steps-item.active').index();

        if (index - 1 < 0) {
          if (loop) {
            index = len;
          } else {
            return;
          }
        }

        _to(index - 1);
        return;
      }
      
      _to(where);

      function _to(index) {
        self.find('.esp-steps-item').eq(index).addClass('active').siblings().removeClass('active');
      }

    }
  });

})()