import test from 'ava'
import { BudgetService } from './budget-service';
import moment = require('moment')

test('2018/01/01 - 2018/01/31', (t) => {
  const service = new BudgetService()
  const actual = service.queryBudget(moment('2018-01-01'), moment('2018-01-31'))

  t.is(actual, 310)
})
