import moment = require('moment')

export class BudgetService {
  repo: IRepo

  constructor(repo) {
    this.repo = repo
  }

  queryBudget(start: moment.Moment, end: moment.Moment): any {
    const budgets = this.repo.getAll()

    if (start.format('YYYYMM') === end.format('YYYYMM')) {
      const match = budgets.filter(b => b.yearMonth === start.format('YYYYMM'))
      if (match.length > 0) {
        const current = match[0]
        const days = end.diff(start, 'days') + 1
        const daysInMonth = moment(current.yearMonth, 'YYYYMM').daysInMonth()
        const proportion = days / daysInMonth

        return current.amount * proportion
      }
    }

    return 0
  }

}

class IRepo {
  getAll() {
    return []
  }
}
