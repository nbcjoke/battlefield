import { Healer } from "../healer";

import monk from "../../assets/images/monk.jpg";

export class Monk extends Healer {
  constructor(team: string, row: number, column: number) {
    super(team, row, column);
    this.name = "Monk";
    this.health = 90;
    this.initiative = 20;
    this.healAmount = 40;
    this.image = monk;
  }
}
