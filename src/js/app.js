$(function() {
  console.log('成功进入');
  var app=new Framework7({
    init: false,
    cache: false, // 页面缓存
    activeState: false, // 启用这个设置时，会给当前点击的元素增加一个 'active-state' class
    // 弹层
    modalTitle: '提示',
    modalButtonOk: '确认',
    modalButtonCancel: '取消',
    modalPreloaderTitle: '加载中...'
  });

  /* 初始化view */
  var mainView = app.addView('.view-main', {
    dynamicNavbar: true
  });

  $$ = Framework7.$;

  /* page index */
  app.onPageInit('index', function(page) {

    $('#btn-guide').on('click', function() {
      mainView.router.loadPage('switch-project.html?' + Math.random());
    });

  });
/* /page index */
})