import moment = require('moment')

interface IRepo {
  getAll(): Budget[]
}

interface Budget {
  yearMonth: string
  amount: number
}

export class BudgetService {
  private repo: IRepo

  constructor(repo: IRepo) {
    this.repo = repo
  }

  public queryBudget(start: moment.Moment, end: moment.Moment) {
    let resultBudget = 0

    if (this.isSameMonth(start, end)) {
      const budget = this.getBudgetByYearMonth(start)
      const proportion = this.getProportionOfMonth(start, end)
      resultBudget = budget * proportion
    } else {
      const startMonth = start.month()

      while (start <= end) {
        const budget = this.getBudgetByYearMonth(start)
        let proportion = 1

        if (start.month() === startMonth) {
          proportion = this.getProportionOfMonth(
            start,
            start.clone().endOf('month')
          )
        } else if (start.month() === end.month()) {
          proportion = this.getProportionOfMonth(
            start.clone().startOf('month'),
            end
          )
        }

        resultBudget += budget * proportion
        start.date(1).add(1, 'month')
      }
    }

    return this.formatBudget(resultBudget)
  }

  private formatBudget(budget: number) {
    return Math.round(budget * 100) / 100
  }

  private isSameMonth(start: moment.Moment, end: moment.Moment) {
    return start.format('YYYYMM') === end.format('YYYYMM')
  }

  private getBudgetByYearMonth(m: moment.Moment) {
    const budgets = this.repo.getAll()
    const r = budgets.find((b) => b.yearMonth === m.format('YYYYMM'))
    return r ? r.amount : 0
  }

  private getProportionOfMonth(start: moment.Moment, end: moment.Moment) {
    const days = end.diff(start, 'days') + 1
    const daysInMonth = start.daysInMonth()
    return days / daysInMonth
  }
}
