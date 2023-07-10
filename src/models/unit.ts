import { uniqueId } from "lodash";
import { Unit as UnitType } from "../types/unit";

export class Unit {
  public id: string;
  public health!: number;
  public initiative!: number;
  public name!: string;
  public image!: string;
  constructor() {
    this.id = uniqueId();
  }

  getStatus() {}

  getAvailableActions() {}

  defend() {}
}
