import Character from "./Character";
import Weapon from "./Weapon";
import { getRandomBadGuyName } from "../scripts/random";

export default class BadGuy extends Character {
  constructor(
    name: string,
    hp: number = 100,
    hpMax: number = 100,
    block: number = 10,
    weapon: Weapon
  ) {
    super(name, hp, hpMax, block, weapon);
    this.name = this.generateRandomName();
  }

  generateRandomName = () => getRandomBadGuyName();
}
