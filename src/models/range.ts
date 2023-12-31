import { Unit, ActionTypes, Action } from "./unit";

export abstract class Range extends Unit {
  public type = "range";
  public damage!: number;

  public actions = [
    { label: "Attack", action: ActionTypes.attack, isTargetRequired: true },
    { label: "Defend", action: ActionTypes.defend },
  ];

  public performAction(action: Action, units: Unit[], target?: Unit): void {
    switch (action.action) {
      case ActionTypes.attack:
        if (!target) {
          return;
        }
        this.attack(target);
        break;
      case ActionTypes.defend:
        this.defend();
        break;
    }
  }

  public attack(target: Unit): void {
    target.takeDamage(this.damage);
  }

  public getAvailableTargets(units: Unit[]): string[] {
    return units.filter(({ team }) => team !== this.team).map(({ id }) => id);
  }
}
