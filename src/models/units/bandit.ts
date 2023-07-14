import { Range } from "../range";

import bandit from "../../assets/images/bandit.jpg";

export class Bandit extends Range {
  constructor(team: string, row: number, column: number) {
    super(team, row, column);
    this.name = "Bandit";
    this.health = 75;
    this.initiative = 60;
    this.damage = 30;
    this.image = bandit;
  }
}
