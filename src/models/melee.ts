import { Unit, ActionTypes, Action } from "./unit";

export abstract class Melee extends Unit {
  public type = "melee";
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
    const { row, column } = this.position;

    if (row > 0) {
      const before = units.some(
        (unit) =>
          unit.position.row === row - 1 &&
          unit.team === this.team &&
          unit.status !== "dead"
      );
      if (before) {
        return [];
      }
    }

    let search = true;
    let rowToAttack = 0;
    let availableUnits: Unit[] = [];

    while (search) {
      availableUnits = units.filter(
        (unit) =>
          unit.team !== this.team &&
          unit.status !== "dead" &&
          unit.position.row === rowToAttack
      );
      if (availableUnits.length) {
        search = false;
      } else {
        rowToAttack += 1;
      }
    }

    const filteredUnits = availableUnits.filter((unit) => {
      return [column - 1, column, column + 1].includes(unit.position.column);
    });

    if (!filteredUnits.length) {
      return availableUnits.map(({ id }) => id);
    }

    return filteredUnits.map(({ id }) => id);
  }
}
