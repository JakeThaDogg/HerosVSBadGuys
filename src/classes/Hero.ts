import Character from "./Character";
import Weapon from "./Weapon";

export default class Hero extends Character {
  private _role: string;
  constructor(
    name: string = "",
    hp: number = 100,
    hpMax: number = 100,
    block: number = 10,
    weapon: Weapon,
    role: string = "Hero"
  ) {
    super(name, hp, hpMax, block, weapon);
    this._role = role;
  }

  get role() {
    return this._role;
  }
  set role(role: string) {
    this._role = role;
  }

  heal = () => console.log("healed");
}
