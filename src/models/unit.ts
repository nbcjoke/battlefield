import { uniqueId } from "lodash";

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
