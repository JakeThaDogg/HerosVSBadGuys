import Hero from "./Hero";
import BadGuy from "./BadGuy";
import Weapon from "./Weapon";
import { getRandomNumber } from "../scripts/random";

export default class Game {
  _heroes: Hero[];
  _badGuys: BadGuy[];

  constructor(heroes: Hero[], badGuys: BadGuy[]) {
    this._heroes = heroes;
    this._badGuys = badGuys;
  }

  addHero = (hero: Hero) => this._heroes.push(hero);

  addBadGuy = (badGuy: BadGuy) => this._badGuys.push(badGuy);

  get heroes() {
    return this._heroes;
  }
  set heroes(heroes: Hero[]) {
    this._heroes = heroes;
  }

  get badGuys() {
    return this._badGuys;
  }
  set badGuys(badGuys: BadGuy[]) {
    this._badGuys = badGuys;
  }

  createBadGuy = () =>
    this.addBadGuy(new BadGuy("", 100, 100, 5, new Weapon(7, 14, 15)));

  getOppositeTeam = (character: Hero | BadGuy) =>
    character instanceof Hero ? this.badGuys : this.heroes;

  // Returns randomly the first attacker team
  getFirstAttacker = (): Hero[] | BadGuy[] =>
    [this.heroes, this._badGuys][getRandomNumber(0, 1)];
}
