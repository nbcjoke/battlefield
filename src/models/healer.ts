import { Unit } from "./unit";

export class Healer extends Unit {
  type = "healer";
  public heal!: number;
}
