import Hero from "./Hero";
import BadGuy from "./BadGuy";

export default class Battle {
  private _isFinished = false;

  private static _turnNumber: number;

  constructor(isFinished: boolean = false) {
    this._isFinished = isFinished;
    Battle._turnNumber = 1;
  }

  get isFinished() {
    return this._isFinished;
  }
  set isFinished(state: boolean) {
    this._isFinished = state;
  }

  turn = (character: Hero | BadGuy, enemyTeam: Hero[] | BadGuy[]) => {
    const { damage, targetPosition } = character.attack(character.target(0));
    enemyTeam[targetPosition].receiveDamage(damage);
    Battle._turnNumber++;
  };
}
