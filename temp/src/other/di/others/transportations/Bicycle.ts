import { Injectable } from "../../di"

@Injectable()
export class Bicycle {
  constructor() {
    console.log("New Bicycle")
  }

  drive() {
    return "driving a bicycle"
  }
}
