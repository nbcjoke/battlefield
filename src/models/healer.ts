import { Action, ActionTypes, Unit } from "./unit";

export abstract class Healer extends Unit {
  public type = "healer";
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
    if (!target) {
      return;
    }
    target.takeHeal(this.healAmount);
  }

  public getAvailableTargets(units: Unit[]): string[] {
    return units
      .filter(
        (unit) => unit.team === this.team && unit.currentHealth !== unit.health
      )
      .map(({ id }) => id);
  }
}
