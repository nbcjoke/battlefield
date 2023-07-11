import { Unit, ActionTypes } from "./unit";

export abstract class Paralyzer extends Unit {
  type = "paralyzer";

  public actions = [
    { label: "Paralyze", action: ActionTypes.attack },
    { label: "Defend", action: ActionTypes.defened },
  ];
}
