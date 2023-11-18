import { Injectable } from "../../src";



@Injectable()
export class Transportation {
  drive() {
    return "driving a transportation";
  }
}

export const ITransportation = Symbol.for("ITransportation");


export interface ITransportation {
  drive(): string;
}
