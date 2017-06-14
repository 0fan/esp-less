;(function() {

  $.extend({
    steps: function(steps_arr) {
      if (!(steps_arr && steps_arr.data && steps_arr.data instanceof Array)) {
        return;
      }

      steps_html = '<div class=esp-steps><div class="sidebar-title">' + steps_arr.title + '</div>';

      _.map(steps_arr.data, function(item, index, arr) {
        steps_html += '\
          <div class="esp-steps-item ' + (item.active && 'active') + '">\
            <div class="esp-steps-tail"><em></em></div>\
            <div class="esp-steps-step">\
              <div class="esp-steps-head">\
                <div class="esp-steps-head-inner">\
                  <em></em>\
                  <i class="icon icon-material icon-' + item.icon + '"></i>\
                </div>\
              </div>\
              <div class="esp-steps-main">\
                <div class="esp-steps-main-title">' + item.text + '</div>\
              </div>\
            </div>\
          </div>';
      });

      steps_html += '</div>';

      $('.sidebar').html(steps_html);

    }
  });

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