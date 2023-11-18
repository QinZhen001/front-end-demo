import { Inject, Injectable } from "../../di";
import { Transportation } from "../transportations";


@Injectable({ muiltple: true })
export class Student {
  constructor(protected transportation: Transportation) {}
  

  gotoSchool() {
    const ret = this.transportation.drive();
    return `Go to school by ${ret}.`;
  }
}



// @Injectable({ muiltple: true })
// export class StudentWithAbstraction extends Student{}



// @Injectable({ muiltple: true })
