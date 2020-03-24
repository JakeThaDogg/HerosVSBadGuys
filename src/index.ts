import Battle from "./classes/Battle";

const battle = new Battle();

battle.start().then(() => {
  while (!battle.isFinished) {
    const game = battle.game;
    const attacker = battle.currentAttacker;
    battle.turn(attacker, game.getOppositeTeam(attacker));
  }
});
