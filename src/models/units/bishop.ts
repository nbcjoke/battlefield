import { Healer } from "../healer";

import bishop from "../../assets/images/bishop.jpg";

export class Bishop extends Healer {
  constructor() {
    super();
    this.name = "Bishop";
    this.health = 130;
    this.initiative = 20;
    this.heal = 25;
    this.image = bishop;
  }
}
