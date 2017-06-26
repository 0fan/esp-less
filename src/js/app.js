$(function () {
  window.app = new Framework7({ // 应用初始化
    activeState: false,
    init: false,
    cache: false,
    swipeBackPage: false,
    preloadPreviousPage: false,
    pushState: true,
    pushStateNoAnimation: true,

  });

  window.view = app.addView('.view-main', { // 视图初始化
    dynamicNavbar: true
  });


  /* ========== 导航 ========== */

  var steps1 = {
    title: '选择项目',
    data: [
      {
        text: '选择项目类型',
        icon: 'grain'
      }
    ]
  };

  var steps2 = {
    title: '开通银行E卡账户',
    data: [
      {
        text: '客户信息',
        icon: 'person'
      },
      {
        text: '银行卡',
        icon: 'creditcard'
      },
      {
        text: '手机号',
        icon: 'stayprimaryportrait'
      },
      {
        text: 'E卡开户',
        icon: 'openinbrowser'
      }
    ]
  };

  var steps3 = {
    title: '存入存款',
    data: [
      {
        text: '存入存款',
        icon: 'presenttoall'
      }
 /*     {
        text: '输入密码',
        icon: 'lockoutline'
      }*/
    ]
  };

  var steps4 = {
    title: '打印告知书',
    data: [
      {
        text: '确认告知书',
        icon: 'fingerprint'
      }
/*      {
        text: '打印告知书',
        icon: 'print'
      }*/
    ]
  };

  /* ========== 业务 ========== */

  var DATA,
    propertiesForSale,
    propertiesForSaleType,
    accountNo,
    IDCardNo,
    accountName,
    identifyCode,
    phoneNum,
    icNo,
    outOrderNo,
    bankName;


  /* 地址 */
  var URL = {
    test: 'http://10.0.10.97:8080/'
  };

  var allRequest='portal/app/openAccount/start.json';
  var REQUEST = {
    getBuild: 'portal/terminal/houses/getAboutInfo.json',          // 获取楼盘相关信息
    updateOrder: 'portal/terminal/order/createBusinessOrder.json',    // 创建/更新业务订单
    uploadIDCard: 'portal/terminal/user/IDCardDetail/save.json',       // 上传身份证详细信息
    canOpen: 'portal/terminal/openAccount/isCanOpenAccount.json', // 是否还能继续开户
    bankcardSigning: 'portal/terminal/user/bankCardSign.json',            // 用户银行卡签约
    getValid: 'portal/terminal/user/informBankSendCode.json',      // 通知银行发送验证码
    open: 'portal/terminal/openAccount/createBankNum.json',    // 二类卡开户
    createOrder: 'portal/terminal/order/createOrder.json',            // 创建交易订单
    getOrderStatus: 'portal/terminal/order/getPayStatus.json',           // 获取订单支付状态
    getMonitoringConfig: 'portal/terminal/config/down.json',                  // 获取监控配置
    uploadSign: 'portal/terminal/contract/submitSign.json',          // 上传签名文件
    moneyFrozen: 'portal/terminal/capital/unfreeze.json',             // 资金解冻
    saveLog: 'portal/terminal/log/save.json',                     // 终端操作记录日志保存
    baseFill: 'portal/terminal/order/data/backfill.json',          // 终端数据回填
    getIDCardAfterStep: 'portal/terminal/user/nextStep/get.json',            // 刷完身份证下一步操作获取
    getNotification: 'portal/terminal/contract/getNotification.html'      // 获取告知书地址
  }

  var baseUrl = URL.test;

  var testDate = {
    termid: '4CCC6AOED489'
  };

  /* ========== pages ========== */

  app.onPageInit('*', function (page) {
    console.log(page.name + ' init');

    if (page.name === 'index') {
      view.showToolbar();
      $.hideSidebar();
      $('.navbar').removeClass('navbar-reverse');
    } else {
      view.hideToolbar();
      $.showSidebar();
      $('.navbar').addClass('navbar-reverse');
    }
  });

  /* index */
  app.onPageInit('index', function (page) {
    // $.showResult({
    //   clickMaskHide: false,
    //   legend: 'legend4',
    //   full: true,
    //   title: '正在连接服务器...'
    // });
    // init
    var open={'identifier':testDate.termid};
    var merchantId=new Date().getTime();
    $.ajax({
      url: baseUrl + allRequest,
      type: 'POST',
      dataType: 'json',
      data: {
        merchantId:merchantId,
        redirectUrl:REQUEST.getBuild,
        termid: testDate.termid
      },
    })
      .done(function (d) {
        console.log("success");
        $.hideResult();
        Toast('服务器连接成功');
        $('.toolbar .name > span').text(d.object.propertiesForSale.address);
        $('.toolbar .tel > span').text(d.object.propertiesForSale.picPhone);
        $('.j-inner').removeClass('disabled').removeAttr('disabled');
        open.buildingId=d.object.propertiesForSale.id;
        open.redirectUrl=REQUEST.canOpen;
        open.merchantId=new Date().getTime();
        canOpen(open);
      })
      .fail(function () {
        console.log("error");
      })
      .always(function () {
        console.log("complete");
      });

  });
  /* /index */

  /* switch-project */
  app.onPageInit('switch-project', function (page) {
    // init
    $.steps(steps1);
    $('.esp-steps').steps(0);
    var merchantId=new Date().getTime();
    $.ajax({
      url: baseUrl + allRequest,
      type: 'POST',
      dataType: 'json',
      data: {
        merchantId:merchantId,
        redirectUrl:REQUEST.getBuild,
        termid: testDate.termid
      },
    })
      .done(function (d) {
        if (d.code == 0) {
          propertiesForSale = d.object.propertiesForSale;
          if (d.object.propertiesForSaleType.length != 0) {
            console.log(d);
            _.each(d.object.propertiesForSaleType, function (item, index, arr) {
              $("<div data-propertiesForSaleType='" + (JSON.stringify(item)) + "' class='switchProject-items_item'> <div class='info'> " + item.name + " </div> </div>").appendTo($('.j-switchProject-items .switchProject-items_wrap'));
            });
          } else {
            Toast("楼盘暂无信息");
            view.router.loadPage('index.html');
            console.log(d.message);
          }
        }
      })
      .fail(function (d) {
        view.router.loadPage('index.html');
        console.log(d.message);
      })
      .always(function () {
        console.log("complete");
      });

    new IScroll('.j-switchProject-items', {
      scrollbars: true,
      mouseWheel: true,
      click: true,
      shrinkScrollbars: 'scale',
      fadeScrollbars: true
    });

    // handle
    $('.switchProject-items_wrap').on('click', '.switchProject-items_item', function (e) {
      propertiesForSaleType = JSON.parse($(this).attr('data-propertiesForSaleType'));
      view.router.loadPage('identify-step1.html');
    });

  });
  /* /switch-project */

  /* identify-step1 */
  app.onPageInit('identify-step1', function (page) {
    // init
    console.log(propertiesForSaleType)
    $.steps(steps2);
    $('.esp-steps').steps(0);

    $('#identifyStep1-submit').on('click', function (e) {
      e.preventDefault;
      var merchantId=new Date().getTime();
      var name = $('#name').val();
      var idCardNo = $('#IDCardNo').val();
      var data = {};
      data.name = name;
      data.houseBuyName = name;
      data.IDCardNo = idCardNo;
      IDCardNo = idCardNo;
      $.ajax({
        url: baseUrl + allRequest,
        type: 'POST',
        dataType: 'json',
        data: {
          redirectUrl:REQUEST.uploadIDCard,
          merchantId:merchantId,
          termid: testDate.termid,
          name: name,
          IDCardNo: IDCardNo
        },
      })
        .done(function (d) {
          console.log(d);
          if (d.code == 0) {
            accountName = name;
            view.router.loadPage('identify-step2.html');
          } else {
            Toast(d.message);
          }
        })
        .fail(function (d) {
          Toast(d.message);
        })
        .always(function () {
          console.log("complete");
        });
    })
    // $.showResult({
    //   legend: 'legend5',
    //   title: '您已开通过兴业银行E账户，是否继续？',
    //   // status: 'error',
    //   action: [
    //     {
    //       text: '继续办理',
    //       onClick: function () {
    //         $.hideResult();
    //         view.router.loadPage('./identify-step2.html');
    //       }
    //     }, {
    //       text: '重新开户',
    //       onClick: function () {
    //         $.hideResult();
    //         view.router.loadPage('./reprint-notice.html');
    //       }
    //     }
    //   ]
    // });
  });
  /* /identify-step1 */

  /* identify-step2 */
  app.onPageInit('identify-step2', function (page) {
    // init
    $.steps(steps2);
    $('.esp-steps').steps(1);
    $('#toI3').click(function () {
      var num = $('#accountNum').val();
      accountNo = num;
      view.router.loadPage('identify-step3.html');
    })

  });
  /* /identify-step2 */

  /* identify-step3 */
  app.onPageInit('identify-step3', function (page) {
    // init
    $.steps(steps2);
    $('.esp-steps').steps(2);
    $('#identify-code').click(function (e) {
      e.preventDefault;
      var merchantId=new Date().getTime();
      var phone = $('#phoneNum').val();
      $.ajax({
        url: baseUrl + allRequest,
        type: 'POST',
        dataType: 'json',
        data: {
          merchantId:merchantId,
          redirectUrl:REQUEST.getValid,
          mobile: phone,
          channel: 'xingye'
        },
      })
        .done(function (d) {
          if (d.code == 0) {
            Toast('验证码发送成功');
          } else {
            Toast(d.message);
          }
        })
        .fail(function (d) {
          console.log(d);
          Toast(d.message);
        })
        .always(function () {
          console.log("complete");
        });
    });
    $('#toI4').click(function (e) {
      e.preventDefault;
      var merchantId=new Date().getTime();
      var phone = $('#phoneNum').val();
      var i = $('#identifyCode').val();
      var ic = new Date().getTime();
      icNo = ic;
      identifyCode = i;
      phoneNum = phone;
      var data = {};
      var order = {};
      /*创建订单*/
      order.termid = testDate.termid;
      order.icNo = icNo;
      order.fromType = 1;
      order.identityCard = IDCardNo;
      order.propertyId = propertiesForSale.id;
      order.name = accountName;
      order.IDCardNo = IDCardNo;
      order.merchantId=merchantId;
      order.redirectUrl=REQUEST.updateOrder;

      data.redirectUrl=REQUEST.bankcardSigning;
      data.merchantId=merchantId;
      data.accountName = accountName;
      data.phone = phone;
      data.accountNo = accountNo;
      data.idCardNo = IDCardNo;
      data.price = propertiesForSaleType.price;
      data.buildingId = propertiesForSale.id;
      data.equType = 'ytj';
      $.ajax({
        url: baseUrl + allRequest,
        type: 'POST',
        dataType: 'json',
        data: data,
      })
        .done(function (d) {
          console.log(d);
          if (d.code == 0) {
            bankName = d.object.bankName;
            console.log(d);
            upload(order, 'identify-step4.html');
          } else {
            Toast(d.message);
          }
        })
        .fail(function (d) {
          Toast(d.message);
        })
        .always(function () {
          console.log("complete");
        });

    })

    // var countdown=60;
    // $('#testCode').on('click',function (e) {
    //   e.preventDefault;
    //   console.log('sad');
    //   var _self=$(this);
    //   settime(_self);
    // });
    // function settime(obj) {
    //   var html="获取验证码";
    //   if (countdown == 0) {
    //     obj.removeAttr("disabled");
    //     html="获取验证码";
    //     obj.html(html);
    //     countdown = 60;
    //     return;
    //   } else {
    //     obj.attr("disabled", true);
    //     countdown--;
    //     html="验证时间(" + countdown + ")";
    //     obj.html(html);
    //     console.log(countdown);
    //   }
    //   setTimeout(function() {
    //       settime(obj)
    //     },1000)
    // }
  });
  /* /identify-step3 */

  /* identify-step4 */
  app.onPageInit('identify-step4', function (page) {
    // init
    $.steps(steps2);
    $('.esp-steps').steps(3);
    $('#cardName').html(accountName);
    $('#cardAccountNum').html(accountNo);
    $('#cardIDCardNo').html(IDCardNo);
    $('#cardPhoneNum').html(phoneNum);
    $('#sureOpen').click(function (e) {
      e.preventDefault;
      var data = {};
      data.phone = phoneNum;
      data.bankNum = accountNo;
      data.yzm = identifyCode;
      data.idCardNo = IDCardNo;
      data.channel = 'xingye';
      data.buildingId = propertiesForSale.id;
      data.redirectUrl=REQUEST.open;
      data.merchantId=new Date().getTime();
      console.log(data);
      $.ajax({
        url: baseUrl + allRequest,
        type: 'POST',
        dataType: 'json',
        data: data,
      })
        .done(function (d) {
          console.log(d);
          if (d.code == 0) {
            Toast('开户成功');
            view.router.loadPage('deposit-step1.html');
          } else {
            Toast(d.message);
          }
        })
        .fail(function (d) {
          Toast(d.message);
        })
        .always(function () {
          console.log("complete");
        });
    })
    $('.sureCard').on('click', function () {
      Toast({
        text: '银行卡修改成功',
        timer: 2000
      });
    });

    $('.surePhone').on('click', function () {
      Toast({
        text: '电话号码修改成功',
        timer: 2000
      });
    });

    $('.j-identifyStep4-open-error-btn').on('click', function () {
      $('.j-identifyStep4-open-error').removeClass('active');
      $.card('error');
    });

  });

  /* /identify-step4 */

  /* deposit-step1 */
  app.onPageInit('deposit-step1', function (page) {
    // init
    $.steps(steps3);
    $('.esp-steps').steps(0);

    $('#sureDeposit').click(function (e) {
      e.preventDefault;
      var data = {};
      data.bankNum = accountNo;
      data.bankName = bankName;
      data.phone = phoneNum;
      data.realName = accountName;
      data.yzm = identifyCode;
      data.idcardNo = IDCardNo;
      data.outOrderNo = outOrderNo;
      data.type = 1;
      data.icNo = icNo;
      data.channel = 'xingye';
      data.equalMoney = 0.0;
      data.termId = testDate.termid;
      data.louPanId = propertiesForSale.id;
      data.merchantId = propertiesForSale.duId;
      data.price = propertiesForSaleType.price;
      data.goodsName = propertiesForSaleType.name;
      data.tradeAmount = propertiesForSaleType.price;
      data.yinPayPrice = propertiesForSaleType.price;
      data.type = propertiesForSaleType.type;
      data.fangyuanTypeId = propertiesForSaleType.id;
      data.redirectUrl=REQUEST.createOrder;
      data.merchantId=new Date().getTime();
      console.log(data);
      $.ajax({
        url: baseUrl + allRequest,
        type: 'POST',
        dataType: 'json',
        data: data,
      })
        .done(function (d) {
          console.log(d);
          if (d.code == 0) {
            Toast('存入成功')
            view.router.loadPage('inform-step1.html');
          } else {
            Toast(d.message);
          }
        })
        .fail(function (d) {
          Toast(d.message);
        })
        .always(function () {
          console.log("complete");
        });

    })
  });
  /* /deposit-step1 */

  /* deposit-step2 */
/*  app.onPageInit('deposit-step2', function (page) {
    // init
    $.steps(steps3);
    $('.esp-steps').steps(1);
  });*/
  /* /deposit-step2 */

  /* inform-step1 */
  app.onPageInit('inform-step1', function (page) {
    // init
    $.steps(steps4);
    $('.esp-steps').steps(0);
    $('#informStep1-sign').on('click', function () {
      setTimeout(function () {
        var wrapper = document.getElementById("sign"),
          canvas = wrapper.querySelector("canvas"),
          sign;

        function resizeCanvas() {
          var ratio = Math.max(window.devicePixelRatio || 1, 1);
          canvas.width = canvas.offsetWidth * ratio;
          canvas.height = canvas.offsetHeight * ratio;
          canvas.getContext("2d").scale(ratio, ratio);
        }

        window.onresize = resizeCanvas;

        resizeCanvas();

        sign = new SignaturePad(canvas, {
          minWidth: 2,
          maxWidth: 4
        });

        $('.sign-btn.reset').on('click', function () {
          sign.clear();
          $('.icon', this).addClass('active');
          $('.icon', this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationend animationend', function () {
            $(this).removeClass('active');
          });
        });

        $('.sign-btn.done').on('click', function () {
          var signimg=convertCanvasToImage(sign);
          var merchantId=new Date().getTime();
          if (sign.isEmpty()) {
            Toast({
              text: '请签名后再提交',
              timer: 2000
            });
          } else {
            Toast({
              text: '签名成功,等待信息提交...',
              timer: 2000
            });
            $.ajax({
              url: baseUrl + allRequest,
              type: 'POST',
              dataType: 'json',
              data: {
                redirectUrl:REQUEST.uploadSign,
                merchantId:merchantId,
                orderId: outOrderNo,
                signimg:signimg
              },
            })
              .done(function (d) {
                console.log(d);
                if (d.code == 0) {
                  Toast({
                    text: '信息提交成功',
                    timer: 2000
                  });
                  app.closeModal();
                } else {
                  Toast(d.message);
                }
              })
              .fail(function (d) {
                Toast(d.message);
              })
              .always(function () {
                console.log("complete");
              });
          }

        });
      }, 0);
    });


  });
  /* /inform-step1 */

  /* inform-step2 */
/*  app.onPageInit('inform-step2', function (page) {
    // init
    $.steps(steps4);
    $('.esp-steps').steps(1);
  });*/
  /* /inform-step2 */

  /* reprint-notice */
  app.onPageInit('reprint-notice', function (page) {
    // init
    $.hideSidebar();

    $('.j-reprintNotice-table').on('click', '.esp-table-content-row', function () {
      $(this).addClass('active').siblings().removeClass('active');
    });

  });
  /* /reprint-notice */

  /* refund */
  app.onPageInit('refund', function (page) {
    // init
    $.hideSidebar();

    $('.j-refund-table').on('click', '.esp-table-content-row', function () {
      $(this).addClass('active').siblings().removeClass('active');
    });

  });
  /* /refund */

  // canvas转化图片
  function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    console.log(image);
    return image;
  }

  // 更新订单状态
  function upload(data, url) {
    $.ajax({
      url: baseUrl + allRequest,
      type: 'POST',
      dataType: 'json',
      data: data,
    })
      .done(function (d) {
        if (d.code == 0) {
          console.log(d);
          outOrderNo = d.object.id;
          console.log('订单更新成功');
          view.router.loadPage(url);
        } else {
          Toast("订单更新失败");
          view.router.loadPage('index.html');
          console.log(d.message);
        }
      })
      .fail(function (d) {
        view.router.loadPage('index.html');
        console.log(d.message);
      })
  }

  function canOpen(data) {
    $.ajax({
      url: baseUrl + allRequest,
      type: 'POST',
      dataType: 'json',
      data: data,
    })
      .done(function (d) {
        if (d.code == 0) {
          console.log('可继续开户');
        } else {
          Toast("不可开户");
        }
      })
      .fail(function (d) {
          Toast("不可开户");
      })
  }

  app.init();
});

