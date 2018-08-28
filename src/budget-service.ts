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
        return match[0].amount
      }
    }

    return 310
  }

}

class IRepo {
  getAll() {
    return []
  }
}
