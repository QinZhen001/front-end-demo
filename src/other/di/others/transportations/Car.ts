import { Injectable } from "../../di"

@Injectable()
export class Car {
  constructor() {
    console.log("New Car")
  }

  drive() {
    return "driving a car"
  }
}
