import {steps1} from '../data/data-steps'
import Steps from '../widget/steps'

$(document).on('pageInit', '.page[data-page=switch-project]', () => {
  
  Steps({
    data: steps1,
    active: 0
  })

})