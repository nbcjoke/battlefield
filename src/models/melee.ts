import { Unit } from "./unit";

export class Melee extends Unit {
  public type = "melee";
  public damage!: number;
}
