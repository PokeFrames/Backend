import db from "../database.js";
import Battle from "../Models/Battle.js";
import { effectsStack, EndEffect, StartEffect } from "./moves.js";
import { moveset } from "./moveset.js";

export const getBattleFromDb = async (battleId) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM battles WHERE id = ?', [battleId], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

export const createBattleInstance = (row) => {
  return new Battle(row.id, row.maker, row.taker, JSON.parse(row.maker_pokemons), JSON.parse(row.maker_battling_pokemons), JSON.parse(row.taker_pokemons), JSON.parse(row.taker_battling_pokemons), row.maker_move, row.taker_move, row.status, row.current_turn, row.is_competitive, JSON.parse(row.battle_log));
}

export const isUserPartOfBattle = (battle, userId) => {
  return battle.maker === userId || battle.taker === userId;
}

export const bothPlayersMoved = (battle) => {
  return battle.maker_move != null && battle.taker_move != null;
}

const arePrioritiesEqual = (maker_move, taker_move) => {
  return moveset[maker_move].priority == moveset[taker_move].priority;
}

const areThereMovesLeft = (maker_move, taker_move) => {
  if(maker_move != null) return true;
  if(taker_move != null) return true;
  return false;
}

const compareSpeeds = (battle) => {
  const { maker_pokemons, taker_pokemons, maker_battling_pokemons, taker_battling_pokemons } = battle;

  const makerSelectedPokemon = maker_pokemons[maker_battling_pokemons[0]];
  const takerSelectedPokemon = taker_pokemons[taker_battling_pokemons[0]];

  if (makerSelectedPokemon.speed > takerSelectedPokemon.speed) {
    return 'maker';
  } else if (takerSelectedPokemon.speed > makerSelectedPokemon.speed) {
    return 'taker';
  } else {
    return Math.random() < 0.5 ? 'maker' : 'taker';
  }
}

export const updateMove = (battle, userId, move) => {
  if (battle.maker === userId) {
    battle.maker_move = move;
  } else {
    battle.taker_move = move;
  }
}

export const determineMoveOrder = (battle) => {
  const { maker_move, taker_move } = battle;

  // if there are no moves left, return
  if(!areThereMovesLeft(maker_move, taker_move)) return null;

  // check if a move is null
  if(maker_move == null) return 'taker';
  if(taker_move == null) return 'maker';

  // first, compare move priorities
  if(arePrioritiesEqual(maker_move, taker_move)) {
    // if priorities are equal, compare speeds
    return compareSpeeds(battle);
  } else {
    if(isSwapMove(maker_move) && isSwapMove(taker_move)) return 'maker-taker-swap';
    if(isSwapMove(maker_move)) return 'maker-swap';
    if(isSwapMove(taker_move)) return 'taker-swap';
    return maker_move.priority > taker_move.priority ? 'maker' : 'taker';
  }
}

export const createBattleLog = (attacker, move, defender, damage) => {
  return {
    move: move.name,
    attacker: attacker.name,
    damage,
    defender: defender.name,
    remainingHP: defender.hp
  };
}

// Determine the outcome of the battle
export const determineBattleOutcome = (battle) => {
  // iterate over battling pokemons and check if everyone has <= 0 hp
  let makerAlive = false;
  let takerAlive = false;

  for(let i = 0; i < 2; i++) {
    if(battle.taker_pokemons[battle.taker_battling_pokemons[i]].hp > 0) {
      takerAlive = true;
    }
    if(battle.maker_pokemons[battle.maker_battling_pokemons[i]].hp > 0) {
      makerAlive = true;
    }
  }

  if (!makerAlive && !takerAlive) {
    battle.battle_log.push({ message: 'It\'s a tie!' });
    battle.status = 'ended';
  } else if (!makerAlive) {
    battle.battle_log.push({ message: 'Taker wins!' });
    battle.status = 'ended';
  } else if (!takerAlive) {
    battle.battle_log.push({ message: 'Maker wins!' });
    battle.status = 'ended';
  }
}

// Update the battle in the database
export const updateBattleInDatabase = async (battle) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE battles SET maker_pokemons = ?, maker_battling_pokemons = ?, taker_pokemons = ?, taker_battling_pokemons = ?, maker_move = ?, taker_move = ?, status = ?, current_turn = ?, battle_log = ? WHERE id = ?',
      [
        JSON.stringify(battle.maker_pokemons),
        JSON.stringify(battle.maker_battling_pokemons),
        JSON.stringify(battle.taker_pokemons),
        JSON.stringify(battle.taker_battling_pokemons),
        battle.maker_move,
        battle.taker_move,
        battle.status,
        battle.current_turn,
        JSON.stringify(battle.battle_log),
        battle.id
      ],
      (err) => {
        if (err) {
          console.error('Error updating battle:', err.message);
          return reject(err);
        }
        resolve();
      }
    );
  });
}

const isSwapMove = (move) => {
  return moveset[move].id == 0;
}

const resetPlayerMove = (player, battle) => {
  battle[`${player}_move`] = null;
}

const isPokemonAlive = (pokemon) => {
  return pokemon.status.currentHP > 0;
}

const notifyFaintedPokemon = (target, battle) => {
  const selectedPokemon = battle[`${target}_battling_pokemons`][0];
  const pokemon = battle[`${target}_pokemons`][selectedPokemon];

  if(!isPokemonAlive(pokemon)) {
    battle.battle_log.push(`${pokemon.name} fainted!`);

    resetPlayerMove('maker', battle);
    resetPlayerMove('taker', battle);

    battle[`${target}_battling_pokemons`].shift();
    // swap pokemon
    if(battle[`${target}_battling_pokemons`].length == 0) {
      battle.battle_log.push(`${target} has no more pokemons left!`);
      
      battle.battle_log.push(`${target == 'maker' ? 'taker' : 'maker'} wins!`);

      battle.status = 'ended';

      return
    }

    battle.battle_log.push(`${target} sent out ${battle[`${target}_pokemons`][battle[`${target}_battling_pokemons`][0]].name}`);
  }
}

// main function to perform the battle itself
export const performBattle = (battle) => {

  effectsStack.map(effect => {
    if(effect.checkDuration && effect instanceof StartEffect) effect.onExecute(battle);
    else effect.onPop();
  });
  
  notifyFaintedPokemon('maker', battle);
  notifyFaintedPokemon('taker', battle);

  if(battle.status == 'ended') {
    return;
  }

  const next = determineMoveOrder(battle);

  if(next == null) {
    return;
  }

  if(next == 'maker-taker-swap') {
    moveset[0].swapMove('maker', battle);
    moveset[0].swapMove('taker', battle);

    console.log('Both players swapped pokemons!');

    resetPlayerMove('maker', battle);
    resetPlayerMove('taker', battle);
  } else if(next == 'maker-swap' || next == 'taker-swap') {
    const executor = next == 'maker-swap' ? 'maker' : 'taker';
    moveset[0].swapMove(executor, battle);

    console.log(`${executor} swapped pokemons!`);

    resetPlayerMove(executor, battle);
  } else {
    moveset[next == 'maker' ? battle.maker_move : battle.taker_move].executeMove(next, battle);

    // setup next move to null
    resetPlayerMove(next, battle);
  }

  effectsStack.map(effect => {
    if(effect.checkDuration && effect instanceof EndEffect) effect.onExecute(battle);
    else effect.onPop();
  });

  performBattle(battle);

}