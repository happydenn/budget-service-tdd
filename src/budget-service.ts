import moment = require('moment')

export class BudgetService {
  repo: IRepo

  constructor(repo) {
    this.repo = repo
  }

  getBudgetByYearMonth(m: moment.Moment) {
    const budgets = this.repo.getAll()
    const match = budgets.filter(b => b.yearMonth === m.format('YYYYMM'))
    if (match.length > 0) {
      return match[0].amount
    }

    return 0
  }

  queryBudget(start: moment.Moment, end: moment.Moment): any {
    const budgets = this.repo.getAll()

    if (start.format('YYYYMM') !== end.format('YYYYMM')) {
      const numberOfMonths = end.diff(start, 'month')

      const startMonth = start.month()
      let sum = 0
      while (start <= end) {
        if (start.month() === startMonth) {
          const budget = this.getBudgetByYearMonth(start)
          const days = start.clone().endOf('month').diff(start, 'days') + 1
          const daysInMonth = start.daysInMonth()
          const proportion = days / daysInMonth

          sum += budget * proportion
        } else if (start.month() === end.month()) {
          const budget = this.getBudgetByYearMonth(start)
          const days = start.diff(start.clone().startOf('month'), 'days') + 1
          const daysInMonth = start.daysInMonth()
          const proportion = days / daysInMonth

          sum += budget * proportion
        } else {
          const budget = this.getBudgetByYearMonth(start)
          sum += budget
        }

        start.date(1).add(1, 'month')
      }

      return sum
    }

    if (start.format('YYYYMM') === end.format('YYYYMM')) {
      const budget = this.getBudgetByYearMonth(start)

      const days = end.diff(start, 'days') + 1
      const daysInMonth = start.daysInMonth()
      const proportion = days / daysInMonth

      return budget * proportion
    }

    return 0
  }

}

class IRepo {
  getAll() {
    return []
  }
}
