import Hero from "./Hero";
import BadGuy from "./BadGuy";
import Weapon from "./Weapon";

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
    this.addBadGuy(new BadGuy("", 100, 100, 10, new Weapon(5, 10, 10)));
}
