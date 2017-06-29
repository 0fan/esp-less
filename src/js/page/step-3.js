import steps from '../widget/steps'
import toast from '../widget/steps'

import {steps2} from '../data/data-steps'

import {isBank} from '../utility/match'

$(document).on('pageInit', '.page[data-page=identify-step2]', () => {

  steps({
    data: steps2,
    active: 1
  })

  $('#toI3').click(function () {

    let accountNo = $.trim($('#accountNum').val());

    if (!accountNo.length) {
      $('#isBankNo').showMsg('银行卡号不能为空')

      return
    }

    if (!accountNo.match(isBank)) {
      $('#isBankNo').showMsg('银行卡号填写有误')

      return;
    }
    

    store.set('accountNo',accountNo)
    view.router.loadPage('identify-step3.html')
    

    // if(!accountNo==''){
    //   if (!isBank(accountNo)) {
    //     $('#isBankNo').showMsg('银行卡号填写有误');
    //     return;
    //   } else {
    //     $('#isBankNo').hideMsg();
        // store.set('accountNo',accountNo);
        // view.router.loadPage('identify-step3.html')
    //   }
    // }else {
    //   $('#isBankNo').showMsg('银行卡号不能为空');
    //   return;
    // }

  })
})