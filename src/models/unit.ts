import { uniqueId } from "lodash";
import { act } from "react-dom/test-utils";

export enum ActionTypes {
  defend = "defend",
  attack = "attack",
  heal = "heal",
  paralyze = "paralyze",
}

export enum Status {
  alive = "alive",
  dead = "dead",
  paralyzed = "paralyzed",
}

export interface Action {
  label: string;
  action: ActionTypes;
  isTargetRequired?: boolean;
}
export abstract class Unit {
  private _health!: number;

  public set health(value: number) {
    this._health = value;
    this._currentHealth = value;
  }

  public get health(): number {
    return this._health;
  }

  private _currentHealth!: number;

  public get currentHealth(): number {
    return this._currentHealth;
  }

  public id: string;
  public initiative!: number;
  public name!: string;
  public image!: string;
  public abstract actions: Action[];
  public status: Status = Status.alive;
  public isDefending = false;
  public type!: string;
  public position!: { row: number; column: number };
  public isAttacking = false;
  public isHealing = false;

  constructor(public team: string, row: number, column: number) {
    this.id = uniqueId();
    this.position = { row, column };
  }

  public abstract performAction(
    action: Action,
    units: Unit[],
    target?: Unit
  ): void;

  public takeDamage(damage: number): void {
    if (this.isDefending) {
      damage = damage / 2;
    }
    this._currentHealth -= damage;

    if (this._currentHealth <= 0) {
      this._currentHealth = 0;
      this.status = Status.dead;
    }
    this.resetAction();
  }

  public takeHeal(heal: number): void {
    if (this._currentHealth <= 0) {
      return;
    }
    this._currentHealth += heal;
    if (this._currentHealth > this._health) {
      this._currentHealth = this._health;
    }
    this.resetAction();
  }

  public paralyzeUnit(): void {
    this.status = Status.paralyzed;
  }

  public resetAction(): void {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 2000);
  }

  public defend() {
    this.isDefending = true;
  }

  public resetState() {
    if (this.status === Status.dead) {
      return;
    }

    this.status = Status.alive;
    this.isDefending = false;
  }

  public abstract getAvailableTargets(units: Unit[]): string[];
}
