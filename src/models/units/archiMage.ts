import { Mage } from "../mage";

import archiMage from "../../assets/images/archiMage.jpg";

export class ArchiMage extends Mage {
  constructor(team: string) {
    super(team);
    this.name = "ArchiMage";
    this.health = 90;
    this.initiative = 40;
    this.damage = 30;
    this.image = archiMage;
  }
}
