import { ActionTypes, Unit } from "./unit";

export abstract class Healer extends Unit {
  type = "healer";
  public heal!: number;

  public actions = [
    { label: "Heal", action: ActionTypes.heal },
    { label: "Defend", action: ActionTypes.defened },
  ];
}
