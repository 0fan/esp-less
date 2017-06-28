let request = {
  allRequest          : 'portal/app/openAccount/start.json',
  getBuild            : 'portal/terminal/houses/getAboutInfo.json',          // 获取楼盘相关信息
  updateOrder         : 'portal/terminal/order/createBusinessOrder.json',    // 创建/更新业务订单
  uploadIDCard        : 'portal/terminal/user/IDCardDetail/save.json',       // 上传身份证详细信息
  canOpen             : 'portal/terminal/openAccount/isCanOpenAccount.json', // 是否还能继续开户
  bankcardSigning     : 'portal/terminal/user/bankCardSign.json',            // 用户银行卡签约
  getValid            : 'portal/terminal/user/informBankSendCode.json',      // 通知银行发送验证码
  open                : 'portal/terminal/openAccount/createBankNum.json',    // 二类卡开户
  createOrder         : 'portal/terminal/order/createOrder.json',            // 创建交易订单
  getOrderStatus      : 'portal/terminal/order/getPayStatus.json',           // 获取订单支付状态
  getMonitoringConfig : 'portal/terminal/config/down.json',                  // 获取监控配置
  uploadSign          : 'portal/terminal/contract/submitSign.json',          // 上传签名文件
  moneyFrozen         : 'portal/terminal/capital/unfreeze.json',             // 资金解冻
  saveLog             : 'portal/terminal/log/save.json',                     // 终端操作记录日志保存
  baseFill            : 'portal/terminal/order/data/backfill.json',          // 终端数据回填
  getIDCardAfterStep  : 'portal/terminal/user/nextStep/get.json',            // 刷完身份证下一步操作获取
  getNotification     : 'portal/terminal/contract/getNotification.html'      // 获取告知书地址
}

export default request