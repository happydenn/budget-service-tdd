import test from 'ava'
import { BudgetService } from './budget-service';
import moment = require('moment')

const fakeRepo = {
  getAll() {
    return [
      { yearMonth: '201801', amount: 310 },
      { yearMonth: '201802', amount: 28 },
      { yearMonth: '201807', amount: 3100 },
    ]
  }
}

test('2018/01/01 - 2018/01/31', (t) => {
  const service = new BudgetService(fakeRepo)
  const actual = service.queryBudget(moment('2018-01-01'), moment('2018-01-31'))

  t.is(actual, 310)
})

test('2018/02/01 - 2018/02/28', (t) => {
  const service = new BudgetService(fakeRepo)
  const actual = service.queryBudget(moment('2018-02-01'), moment('2018-02-28'))

  t.is(actual, 28)
})

test('2018/07/01 - 2018/07/02', (t) => {
  const service = new BudgetService(fakeRepo)
  const actual = service.queryBudget(moment('2018-07-01'), moment('2018-07-02'))

  t.is(actual, 200)
})

test('2018/03/01 - 2018/03/31', (t) => {
  const service = new BudgetService(fakeRepo)
  const actual = service.queryBudget(moment('2018-03-01'), moment('2018-03-31'))

  t.is(actual, 0)
})
