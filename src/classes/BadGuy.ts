import Character from "./Character";
import Weapon from "./Weapon";

export default class BadGuy extends Character {
  constructor(
    name: string = "",
    hp: number = 100,
    hpMax: number = 100,
    block: number = 10,
    weapon: Weapon
  ) {
    super(name, hp, hpMax, block, weapon);
    this.generateRandomName("toto");
  }

  generateRandomName = (name: string) => (this.name = name);
}
