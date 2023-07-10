import { Healer } from "../healer";

import monk from "../../assets/images/monk.jpg";

export class Monk extends Healer {
  constructor() {
    super();
    this.name = "Monk";
    this.health = 90;
    this.initiative = 20;
    this.heal = 40;
    this.image = monk;
  }
}
