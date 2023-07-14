import { Mage } from "../mage";

import sceletonMage from "../../assets/images/sceletonMage.jpg";

export class SceletonMage extends Mage {
  constructor(team: string, row: number, column: number) {
    super(team, row, column);
    this.name = "SceletonMage";
    this.health = 50;
    this.initiative = 40;
    this.damage = 20;
    this.image = sceletonMage;
  }
}
