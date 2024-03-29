import { Inject, Injectable } from "../../di"
import { Transportation, ITransportation } from "../transportations"

@Injectable({ muiltple: true })
export class Student {
  constructor(protected transportation: Transportation) {}

  gotoSchool() {
    const ret = this.transportation.drive()
    return `Go to school by ${ret}.`
  }
}

@Injectable({ muiltple: true })
export class StudentWithAbstraction extends Student {
  constructor(@Inject(ITransportation) protected transportation: ITransportation) {
    super(transportation)
  }
}

@Injectable({ muiltple: true })
export class StudentWithLazyInstance {
  @Inject(ITransportation)
  protected transportation!: ITransportation

  constructor() {
    console.log("New Student")
  }

  gotoSchool() {
    const ret = this.transportation.drive()
    return `Go to school by ${ret}.`
  }
}
