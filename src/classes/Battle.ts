import Hero from "./Hero";
import BadGuy from "./BadGuy";
import Game from "./Game";
import { outputTurn } from "../scripts/output";
import { getRandomNumber } from "../scripts/random";
import Weapon from "./Weapon";
const capitalize = require("lodash.capitalize");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

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

  constructor(isFinished: boolean = false) {
    this._isFinished = isFinished;
    // this.currentAttacker;
    Battle._turnNumber = 0;
  }

  get isFinished() {
    return this._isFinished;
  }
  set isFinished(state: boolean) {
    this._isFinished = state;
  }

  public start = async () => {
    const name: any = await this.selectHeroName();
    const selectedWeapon: any = await this.selectWeapon();
    readline.close();
    await this.createHero(name, selectedWeapon);
    this.currentAttacker = this.game.getFirstAttacker()[0];
  };

  createHero = (name: any, weapon: any) => {
    this.game.addHero(new Hero(name, 100, 100, 5, weapon));
    this.game.createBadGuy();
  };

  selectHeroName = () =>
    new Promise((resolve, reject) => {
      readline.question("Hero's name: ", (answer: string): void => {
        resolve(capitalize(answer));
      });
    });

  selectWeapon = () => {
    const weapons = [
      { minDamage: 8, maxDamage: 16, criticalRate: 10 },
      { minDamage: 5, maxDamage: 8, criticalRate: 40 }
    ];

    return new Promise((resolve, reject) => {
      readline.question(
        `Choose your weapon: ${weapons.map(
          ({ minDamage, maxDamage, criticalRate }, index) =>
            `\n${index +
              1}: Damage range: ${minDamage}-${maxDamage}. Critical rate: ${criticalRate}`
        )}\n`,
        (choiceIndex: number) => {
          resolve(weapons[choiceIndex - 1]);
        }
      );
    });
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
    this.nextPlayer();
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
      this._isFinished = true;
    }
  };

  nextPlayer = () => {
    this.currentAttacker = this.game.getOppositeTeam(this.currentAttacker)[0];
  };
}
