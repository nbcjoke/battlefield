import { Melee } from "../melee";

import centaur from "../../assets/images/centaur.jpg";

export class Centaur extends Melee {
  constructor() {
    super();
    this.name = "Centaur";
    this.health = 150;
    this.initiative = 50;
    this.damage = 50;
    this.image = centaur;
  }
}
