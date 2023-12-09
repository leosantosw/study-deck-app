export class SM2Algorithm {
  public easeFactor: number
  public interval: number
  public nextReviewDate: Date | null
  private easyBonus: number
  private hardIntervalMultiplier: number

  constructor({ ease = 2.5, interval = 10, easyBonus = 1.3 }) {
    this.easeFactor = ease
    this.interval = interval
    this.easyBonus = easyBonus
    this.hardIntervalMultiplier = 1.2
    this.nextReviewDate = null
  }

  getEaseFactor(): number {
    return parseFloat(this.easeFactor.toFixed(2))
  }

  getInterval(): number {
    return parseFloat(this.interval.toFixed(2))
  }

  hard() {
    this.easeFactor -= 2.0
    this.interval *= 1.0
    this.updateNextReviewDate()
  }

  // hard() {
  //   this.easeFactor -= 0.15
  //   this.interval *= this.hardIntervalMultiplier
  //   this.updateNextReviewDate()
  // }

  good() {
    this.interval *= this.easeFactor
    this.updateNextReviewDate()
  }

  easy() {
    const bonus = this.easeFactor * this.easyBonus
    this.easeFactor += 0.15
    this.interval *= bonus
    this.updateNextReviewDate()
  }

  private updateNextReviewDate() {
    const now = new Date()
    this.nextReviewDate = new Date(
      now.getTime() + this.interval * 24 * 60 * 60 * 1000
    )
  }
}
