import Weapon from "./Weapon";
import { getRandomNumber } from "../scripts/random";

export interface Attack {
  damage: number;
  isCritical: boolean;
  targetPosition: number;
}
export default class Character {
  private _name: string;
  private _hp: number;
  private _hpMax: number;
  private _block: number;
  private _weapon: Weapon;

  constructor(name = "", hp = 100, hpMax = 100, block = 10, weapon: Weapon) {
    this._name = name;
    this._hp = hp;
    this._hpMax = hpMax;
    this._block = block;
    this._weapon = weapon;
  }

  // Getters and setters

  get name() {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  get hp() {
    return this._hp;
  }
  set hp(hp: number) {
    this._hp = hp;
  }

  get hpMax() {
    return this._hpMax;
  }
  set hpMax(hpMax: number) {
    this._hpMax = hpMax;
  }

  get block() {
    return this._block;
  }
  set block(block: number) {
    this._block = block;
  }

  get weapon() {
    return this._weapon;
  }
  set weapon(weapon: Weapon) {
    this._weapon = weapon;
  }

  //  Critical rate roll

  isCritical = () => getRandomNumber(0, 100) <= this._weapon.criticalRate;

  // Returns data with target and damage
  attack = (target: any): Attack => {
    const isCritical = this.isCritical();
    let damage = getRandomNumber(this._weapon.minDamage, this.weapon.maxDamage);
    if (isCritical) {
      damage = damage * 3;
    }
    return {
      damage,
      targetPosition: target,
      isCritical
    };
  };

  // Returns randomly targeted enemy position
  target = (enemyTeamLength: number) => getRandomNumber(0, enemyTeamLength);

  receiveDamage = (damage: number) =>
    (this.hp = this.hp - (damage - this._block));
}
