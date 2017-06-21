;(function() {
  
  $.extend({
    
    timer: function(cfg) {
      
      $('.esp-timer').remove();

      var CFG = $.extend({}, {
        target             : document.body,
        time               : 15,
        position           : 'right-bottom',
        radius             : 40,
        borderWidth        : 6,
        borderDefaultColor : '#d1d3d7',
        borderActiveColor  : '#00abfb',
        disX               : '50px',
        disY               : '50px',
        callback           : null
      }, cfg);

      var perimeter = Math.PI * CFG.radius * 2;

      var html = $('<div class="esp-timer">\
                  <svg width="' + ((CFG.radius + 5) * 2) + '" height="' + ((CFG.radius + 5) * 2) + '">\
                    <circle cx="' + (CFG.radius + 5) + '" cy="' + (CFG.radius + 5) + '" r="' + CFG.radius + '" stroke-width="' + CFG.borderWidth + '" stroke="' + CFG.borderDefaultColor + '" fill="none" transform="matrix(0,-1,1,0,0,' + ((CFG.radius + 5) * 2) + ')"></circle>\
                    <circle cx="' + (CFG.radius + 5) + '" cy="' + (CFG.radius + 5) + '" r="' + CFG.radius + '" stroke-width="' + CFG.borderWidth + '" stroke="' + CFG.borderActiveColor + '" fill="none" transform="matrix(0,-1,1,0,0,' + ((CFG.radius + 5) * 2) + ')" stroke-dasharray="' + (perimeter + ' ' + perimeter) + '"></circle>\
                  </svg>\
                  <div class="esp-timer-count">\
                    ' + CFG.time + '\
                  </div>\
                </div>');

      var timer_svg   = html.find('circle').eq(1),
          timer_count = html.find('.esp-timer-count'),
          step        = CFG.time - 1,
          p           = CFG.position,
          per         = perimeter / CFG.time,
          count       = perimeter - per,
          _timer      = null;

      if (p === 'right-bottom' || p === 'bottom-right' || p === 'r-b' || p === 'b-r') {
        html.css({
          right: CFG.disY,
          bottom: CFG.disX,
          top: 'atuo',
          left: 'auto'
        });
      }

      if (p === 'left-bottom' || p === 'bottom-left' || p === 'l-b' || p === 'b-l') {
        html.css({
          left: CFG.disY,
          bottom: CFG.disX,
          right: 'auto',
          top: 'auto'
        });
      }

      if (p === 'right-top' || p === 'top-right' || p === 'r-t' || p === 't-r') {
        html.css({
          right: CFG.disY,
          top: CFG.disX,
          left: 'auto',
          bottom: 'auto'
        });
      }

      if (p === 'left-top' || p === 'top-left' || p === 'l-t' || p === 't-l') {
        html.css({
          left: CFG.disY,
          top: CFG.disX,
          right: 'auto',
          bottom: 'auto'
        });
      }
      
      $(CFG.target).css('position') === 'static' && $(CFG.target).css({'position': 'relative'});

      html.appendTo($(CFG.target));

      _timer = setInterval(function() {

        if (step <= 0) {
          timer_svg.attr('stroke-dasharray',  '0 ' + perimeter);
          timer_count.text('0');

          clearInterval(_timer);
          setTimeout(function() {
            CFG.callback && CFG.callback();
          }, 1000);
        } else {
          timer_svg.attr('stroke-dasharray',  count + ' ' + perimeter);
          count -= per;

          timer_count.text(step--);
        }
        
      }, 1000);
      
    }

  });

})()