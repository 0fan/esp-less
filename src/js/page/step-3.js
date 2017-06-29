import steps from '../widget/steps'
import {steps2} from '../data/data-steps'
import {isBank} from '../utility/match'

$(document).on('pageInit', '.page[data-page=identify-step2]', () => {
  steps({
    data: steps2,
    active: 1
  });
  $('#toI3').click(function () {
    var accountNo = $('#accountNum').val();
    if (!isBank(accountNo)) {
      $('#isBankNo').showMsg('银行卡号填写有误');
      return;
    } else {
      store.set('accountNo',accountNo);
      view.router.loadPage('identify-step3.html');
    }

  })
})