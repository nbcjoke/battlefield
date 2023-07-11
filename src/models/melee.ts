import { Unit, ActionTypes, Action } from "./unit";

export abstract class Melee extends Unit {
  public type = "melee";
  public damage!: number;

  public actions = [
    { label: "Attack", action: ActionTypes.attack, isTargetRequired: true },
    { label: "Defend", action: ActionTypes.defened },
  ];

  public performAction(action: Action, units: Unit[], target?: Unit): void {
    switch (action.action) {
      case ActionTypes.attack:
        if (!target) {
          return;
        }
        this.attack(target);
        break;
      case ActionTypes.defened:
        this.defend();
        break;
    }
  }

  public attack(target: Unit): void {
    target.takeDamage(this.damage);
  }
}
