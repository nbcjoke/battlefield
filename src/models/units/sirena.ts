import { Paralyzer } from "../paralyzer";

import sirena from "../../assets/images/sirena.jpg";

export class Sirena extends Paralyzer {
  constructor(team: string) {
    console.log(team);
    super(team);
    this.name = "Sirena";
    this.health = 80;
    this.initiative = 20;
    this.image = sirena;
  }
}
