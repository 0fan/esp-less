$.fn.extend({
  code: function (x) {
    var X = $.extend({}, {
      countdown: 1000,
      html: '获取验证码',
      time: 60
    }, x);

    var html = X.html,
      time = X.time,
      _self = $(this),
      countdown = X.countdown,
      allTime = X.countdown;

    setTime();
    function setTime() {
      if (time == 0) {
        html = '获取验证码';
        _self.text(html).removeAttr("disabled");
        time = allTime;
        return;
      } else {
        _self.attr("disabled", true);
        time--;
        html = time + "s";
        _self.html(html);
      }
      setTimeout(function () {
        setTime(_self);
      }, countdown);
    }


  }
})





