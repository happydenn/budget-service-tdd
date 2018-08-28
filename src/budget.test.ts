import test from 'ava'
import { BudgetService } from './budget-service';
import moment = require('moment')

function givenBudgets(budgets) {
  const fakeRepo = { getAll: () => budgets }
  return new BudgetService(fakeRepo)
}

test('2018/01/01 - 2018/01/31', (t) => {
  const service = givenBudgets([{ yearMonth: '201801', amount: 310 }])
  const actual = service.queryBudget(moment('2018-01-01'), moment('2018-01-31'))

  t.is(actual, 310)
})

test('2018/02/01 - 2018/02/28', (t) => {
  const service = givenBudgets([{ yearMonth: '201802', amount: 28 }])
  const actual = service.queryBudget(moment('2018-02-01'), moment('2018-02-28'))

  t.is(actual, 28)
})

test('2018/07/01 - 2018/07/02', (t) => {
  const service = givenBudgets([{ yearMonth: '201807', amount: 3100 }])
  const actual = service.queryBudget(moment('2018-07-01'), moment('2018-07-02'))

  t.is(actual, 200)
})

test('2018/03/01 - 2018/03/31 - undefined budget', (t) => {
  const service = givenBudgets([{ yearMonth: '201802', amount: 28 }])
  const actual = service.queryBudget(moment('2018-03-01'), moment('2018-03-31'))

  t.is(actual, 0)
})

test('2018/03/01 - 2018/03/31 - no budget', (t) => {
  const service = givenBudgets([{ yearMonth: '201803', amount: 0 }])
  const actual = service.queryBudget(moment('2018-03-01'), moment('2018-03-31'))

  t.is(actual, 0)
})

test('2018/01/31 - 2018/02/01', (t) => {
  const service = givenBudgets([
    { yearMonth: '201801', amount: 310 },
    { yearMonth: '201802', amount: 28 },
  ])
  const actual = service.queryBudget(moment('2018-01-31'), moment('2018-02-01'))

  t.is(actual, 11)
})

test('2018/02/03 - 2018/03/30', (t) => {
  const service = givenBudgets([{ yearMonth: '201802', amount: 28 }])
  const actual = service.queryBudget(moment('2018-02-03'), moment('2018-03-30'))

  t.is(actual, 26)
})

test('2018/01/01 - 2018/12/31', (t) => {
  const service = givenBudgets([
    { yearMonth: '201801', amount: 310 },
    { yearMonth: '201802', amount: 28 },
    { yearMonth: '201807', amount: 3100 },
  ])
  const actual = service.queryBudget(moment('2018-01-01'), moment('2018-12-31'))

  t.is(actual, 3438)
})

test('2017/12/31 - 2018/01/01', (t) => {
  const service = givenBudgets([
    { yearMonth: '201801', amount: 310 }
  ])
  const actual = service.queryBudget(moment('2017-12-31'), moment('2018-01-01'))

  t.is(actual, 10)
})

test('2016/02/01 - 2016/02/01', (t) => {
  const service = givenBudgets([
    { yearMonth: '201602', amount: 300 }
  ])
  const actual = service.queryBudget(moment('2016-02-01'), moment('2016-02-01'))

  t.is(actual, 10.34)
})

test('2016/02/02 - 2016/02/01', (t) => {
  const service = givenBudgets([
    { yearMonth: '201602', amount: 300 }
  ])
  const actual = service.queryBudget(moment('2016-02-02'), moment('2016-02-01'))

  t.is(actual, 0)
})
