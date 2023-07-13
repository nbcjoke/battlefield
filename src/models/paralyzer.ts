import { Unit, ActionTypes, Action } from "./unit";

export abstract class Paralyzer extends Unit {
  type = "paralyzer";

  public actions = [
    { label: "Paralyze", action: ActionTypes.paralyze, isTargetRequired: true },
    { label: "Defend", action: ActionTypes.defend },
  ];

  public performAction(action: Action, units: Unit[], target?: Unit): void {
    switch (action.action) {
      case ActionTypes.paralyze:
        if (!target) {
          return;
        }
        this.paralyze(target);
        break;
      case ActionTypes.defend:
        this.defend();
        break;
    }
  }

  public paralyze(target: Unit): void {
    target.paralyzeUnit();
  }
}
