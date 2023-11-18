import { Injectable } from "../../src";


@Injectable()
export class Bicycle {

  constructor() {
    console.log("New Bicycle");
  }

  drive() {
    return "driving a bicycle";
  }
}
