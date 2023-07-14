import { Melee } from "../melee";

import sceleton from "../../assets/images/sceleton.jpg";

export class Sceleton extends Melee {
  constructor(team: string, row: number, column: number) {
    super(team, row, column);
    this.name = "Sceleton";
    this.health = 100;
    this.initiative = 50;
    this.damage = 25;
    this.image = sceleton;
  }
}
