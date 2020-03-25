import Hero from "./Hero";
import BadGuy from "./BadGuy";
import Game from "./Game";
import { outputTurn, outputResults } from "../scripts/output";
import { getRandomNumber } from "../scripts/random";
import Weapon from "./Weapon";
import inputTerminal from "../scripts/input";
const capitalize = require("lodash.capitalize");

export default class Battle {
  private _isFinished = false;

  private static _turnNumber: number;

  public currentAttacker: Hero | BadGuy = new Hero(
    "",
    0,
    0,
    0,
    new Weapon(0, 0, 0)
  );

  public game = new Game([], []);

  public teamIndex: number;

  constructor(isFinished: boolean = false) {
    this._isFinished = isFinished;
    this.teamIndex = 0;
    Battle._turnNumber = 0;
  }

  get isFinished() {
    return this._isFinished;
  }
  set isFinished(state: boolean) {
    this._isFinished = state;
  }

  public start = async () => {
    const length: any = await this.selectTeamsLength();
    // To increase inputs reading
    require("events").EventEmitter.defaultMaxListeners = length * 3;
    for (let i = 0; i < length; i++) {
      await this.selectHerosAttribute();
    }
    this.teamIndex = getRandomNumber(0, length - 1);
    this.currentAttacker = this.game.getFirstAttacker()[this.teamIndex];
  };

  createHero = (name: string, weapon: Weapon) => {
    this.game.addHero(new Hero(name, 100, 100, 5, weapon));
    this.game.createBadGuy();
  };

  selectHerosAttribute = async () => {
    const name: any = await this.selectHeroName();
    const selectedWeapon: any = await this.selectWeapon();
    this.createHero(capitalize(name), selectedWeapon);
  };

  selectHeroName = () => inputTerminal("Hero's name : ");

  selectTeamsLength = () =>
    inputTerminal("Choose how many heroes in your team.\n");

  selectWeapon = async () => {
    const weapons = [
      { minDamage: 8, maxDamage: 16, criticalRate: 10 },
      { minDamage: 5, maxDamage: 8, criticalRate: 40 }
    ];

    const index: any = await inputTerminal(
      `Choose your weapon: ${weapons.map(
        ({ minDamage, maxDamage, criticalRate }, index) =>
          `\n${index +
            1}: Damage range: ${minDamage}-${maxDamage}. Critical rate: ${criticalRate}`
      )}\n`
    );

    return weapons[index - 1];
  };

  turn = (character: Hero | BadGuy, enemyTeam: Hero[] | BadGuy[]) => {
    Battle._turnNumber++;
    const attack = character.attack(
      character.target(this.game.getOppositeTeam(character).length - 1)
    );
    const targettedEnemy = enemyTeam[attack.targetPosition];
    targettedEnemy.receiveDamage(attack.damage);
    outputTurn(character, attack, targettedEnemy, Battle._turnNumber);
    this.isDead(targettedEnemy, attack.targetPosition);
    this.nextPlayer(Boolean(Battle._turnNumber % 2 === 0));
  };

  isDead = (character: Hero | BadGuy, index: number) => {
    if (Boolean(character.hp <= 0)) {
      if (character instanceof Hero) {
        this.game.heroes.splice(index, 1);
      } else {
        this.game.badGuys.splice(index, 1);
      }
    }
    this.checkIsGameFinished(this.game.heroes, this.game.badGuys);
  };

  checkIsGameFinished = (heroes: Hero[], badguys: BadGuy[]) => {
    if (heroes.length === 0 || badguys.length === 0) {
      outputResults([heroes, badguys].filter(array => array.length > 0)[0]);
      this._isFinished = true;
    }
  };

  nextPlayer = (shouldIncrementTeamIndex: boolean) => {
    const oppositeTeam = this.game.getOppositeTeam(this.currentAttacker);
    if (shouldIncrementTeamIndex) {
      Boolean(oppositeTeam[this.teamIndex + 1])
        ? this.teamIndex++
        : (this.teamIndex = 0);
    }
    this.currentAttacker = oppositeTeam[this.teamIndex];
  };
}
