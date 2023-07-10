import { Unit } from "./unit";

export class Range extends Unit {
  type = "range";
  public damage!: number;
}
