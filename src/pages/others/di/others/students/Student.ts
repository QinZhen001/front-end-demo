import { Inject, Injectable } from "../../src";
import { Transportation } from "../transportations";


@Injectable({ muiltple: true })
export class Student {
  constructor(protected transportation: Transportation) {}

  gotoSchool() {
    const ret = this.transportation.drive();
    return `Go to school by ${ret}.`;
  }
}
