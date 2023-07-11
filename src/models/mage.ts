import { Unit, ActionTypes } from "./unit";

export abstract class Mage extends Unit {
  type = "mage";
  public damage!: number;

  public actions = [
    { label: "Attack", action: ActionTypes.attack },
    { label: "Defend", action: ActionTypes.defened },
  ];
}
