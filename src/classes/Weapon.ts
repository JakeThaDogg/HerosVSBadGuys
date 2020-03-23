export default class Weapon {
  private _minDamage: number;
  private _maxDamage: number;
  private _criticalRate: number;

  constructor(minDamage = 8, maxDamage = 12, criticalRate = 10) {
    this._minDamage = minDamage;
    this._maxDamage = maxDamage;
    this._criticalRate = criticalRate;
  }

  // Getters and setters

  get minDamage() {
    return this._minDamage;
  }
  set minDamage(minDamage: number) {
    this._minDamage = minDamage;
  }

  get maxDamage() {
    return this._maxDamage;
  }
  set maxDamage(maxDamage: number) {
    this._maxDamage = maxDamage;
  }

  get criticalRate() {
    return this._criticalRate;
  }
  set criticalRate(criticalRate: number) {
    this._criticalRate = criticalRate;
  }
}
