import { Action, ActionTypes, Unit } from "./unit";

export abstract class Healer extends Unit {
  type = "healer";
  public healAmount!: number;

  public actions = [
    { label: "Heal", action: ActionTypes.heal, isTargetRequired: true },
    { label: "Defend", action: ActionTypes.defend },
  ];

  public performAction(action: Action, units: Unit[], target?: Unit): void {
    switch (action.action) {
      case ActionTypes.heal:
        this.heal(units, target);
        break;
      case ActionTypes.defend:
        this.defend();
        break;
    }
  }

  public heal(units: Unit[], target?: Unit): void {
    console.log("heal");
    if (!target) {
      return;
    }
    target.takeHeal(this.healAmount);
  }
}
