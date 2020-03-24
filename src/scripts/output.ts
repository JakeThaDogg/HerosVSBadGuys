import BadGuy from "../classes/BadGuy";
import Hero from "../classes/Hero";
import { Attack } from "../classes/Character";

export const outputTurn = (
  attacker: Hero | BadGuy,
  attack: Attack,
  targetted: Hero | BadGuy,
  turnNb: number
) => {
  console.log(
    `Turn: ${turnNb}\n${attacker.name} attack ${targetted.name} with ${
      attack.damage
    } damages. ${targetted.name} blocks ${targetted.block}\n ${
      attack.isCritical ? "Critical!\n" : ""
    }${targetted.name} is at ${targetted.hp}${
      targetted.hp <= 0 ? `\n${targetted.name} is dead` : ""
    }`
  );
};
