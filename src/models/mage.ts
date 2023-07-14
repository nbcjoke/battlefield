import { Unit, ActionTypes, Action } from "./unit";

export abstract class Mage extends Unit {
  public type = "mage";
  public damage!: number;

  public actions = [
    { label: "Attack", action: ActionTypes.attack },
    { label: "Defend", action: ActionTypes.defend },
  ];

  public performAction(action: Action, units: Unit[]): void {
    switch (action.action) {
      case ActionTypes.attack:
        this.attack(units);
        break;
      case ActionTypes.defend:
        this.defend();
        break;
    }
  }

  public attack(units: Unit[]): void {
    units
      .filter(({ team }) => team !== this.team)
      .forEach((unit) => {
        unit.takeDamage(this.damage);
      });
  }

  public getAvailableTargets(units: Unit[]): string[] {
    return [];
  }
}
