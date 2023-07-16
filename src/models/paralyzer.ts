import { Unit, ActionTypes, Action } from "./unit";

export abstract class Paralyzer extends Unit {
  public type = "paralyzer";

  public actions = [
    { label: "Paralyze", action: ActionTypes.paralyze, isTargetRequired: true },
    { label: "Defend", action: ActionTypes.defend },
  ];

  public performAction(action: Action, _: Unit[], target?: Unit): void {
    switch (action.action) {
      case ActionTypes.paralyze:
        this.paralyze(target);
        break;
      case ActionTypes.defend:
        this.defend();
        break;
    }
  }

  public paralyze(target?: Unit): void {
    if (!target) {
      return;
    }
    target.paralyzeUnit();
  }

  public getAvailableTargets(units: Unit[]): string[] {
    return units.filter(({ team }) => team !== this.team).map(({ id }) => id);
  }
}
