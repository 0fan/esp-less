$(document).on("contextmenu",function(e){
    return false;
});

// 初始化宽高
$(() => {
  $('body').css({
    width: window.screen.width + 'px',
    height: window.screen.height + 'px'
  })
})