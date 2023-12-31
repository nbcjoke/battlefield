import { Healer } from "../healer";

import bishop from "../../assets/images/bishop.jpg";
import { ActionTypes, Unit } from "../unit";

export class Bishop extends Healer {
  public actions = [
    { label: "Heal", action: ActionTypes.heal, isTargetRequired: false },
    { label: "Defend", action: ActionTypes.defend },
  ];

  constructor(team: string, row: number, column: number) {
    super(team, row, column);
    this.name = "Bishop";
    this.health = 130;
    this.initiative = 20;
    this.healAmount = 25;
    this.image = bishop;
  }

  public heal(units: Unit[]): void {
    units
      .filter(({ team }) => team === this.team)
      .forEach((unit) => {
        unit.takeHeal(this.healAmount);
      });
  }
}
