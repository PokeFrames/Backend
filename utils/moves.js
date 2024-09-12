import { typeMatchup } from "./typeMatchup.js";

export class Move {
  constructor(id, name, type, power, accuracy, effect, onExecute, priority = 1) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.power = power;
    this.accuracy = accuracy;
    this.effect = effect;
    this.onExecute = onExecute;
    this.priority = priority;
  }

  // new quick game multiplier logic
  getStatMultiplier(stage) {
    const multipliers = {
      "-4": 0.125,
      "-3": 0.25,
      "-2": 0.5,
      "-1": 0.75,
      "0": 1,
      "1": 1.5,
      "2": 2.25,
      "3": 3,
      "4": 4.5
    };
    return multipliers[stage.toString()] || 1;
  }

  executeMove(agent, battle) {
    const attacker = agent == 'maker' ? battle.maker_pokemons[battle.maker_battling_pokemons[0]] : battle.taker_pokemons[battle.taker_battling_pokemons[0]];
    const defender = agent == 'maker' ? battle.taker_pokemons[battle.taker_battling_pokemons[0]] : battle.maker_pokemons[battle.maker_battling_pokemons[0]];

    battle.battle_log.push(`${attacker.name} used ${this.name}!`);
    // console.log(this.onExecute.arguments);
  
    // Calculate the accuracy roll using attacker's accuracy and defender's evasion
    const accuracyMultiplier = this.getStatMultiplier(attacker.status.statusMultipliers.accuracy);
    const evasionMultiplier = this.getStatMultiplier(defender.status.statusMultipliers.evasion);

    // Effective accuracy after applying multipliers
    const effectiveAccuracy = this.accuracy * (accuracyMultiplier / evasionMultiplier);
    if (Math.random() * 100 <= effectiveAccuracy || this.accuracy == null) { // null means move will always hit
      this.onExecute(agent, battle, attacker, defender);
    } else {
      battle.battle_log.push(`${this.name} missed!`);
    }
  }

  dealDamage(agent, battle, attacker, defender, critChance = 0.0625) {
    const modifier = typeMatchup[this.type][defender.type[0]] * (defender.type[1] ? typeMatchup[this.type][defender.type[1]] : 1);

    const modifierMessages = {
      0: `${defender.name} is not affected by ${this.name}!`,
      0.25: `${this.name} is not very effective...`,
      0.5: `${this.name} is not very effective...`,
      2: `${this.name} is super effective!`,
      4: `${this.name} is super effective!`
    };
  
    if (modifierMessages[modifier]) { // If the modifier is 1, we don't need to display a message
      battle.battle_log.push(modifierMessages[modifier]);
    }
    
    const atkMultiplier = this.getStatMultiplier(attacker.status.statusMultipliers.attack);
    const defMultiplier = this.getStatMultiplier(defender.status.statusMultipliers.defense);

    const stab = attacker.type.includes(this.type) ? 1.5 : 1;
    let isCrit = Math.random() < critChance;

    // console.log(critChance, isCrit, stab, modifier, atkMultiplier, defMultiplier);
    
    const damage = (isCrit + 1) * Math.ceil(
      Math.ceil(
        Math.ceil(
          Math.ceil((2 * (attacker.level || 16) / 5 + 2) * this.power * (attacker.attack * atkMultiplier / defender.defense * defMultiplier) / 50) + 2
        ) * stab * modifier
      )
    );
  
    defender.status.currentHP -= damage;
    battle.battle_log.push(`${defender.name} has taken ${damage} damage!`);
    isCrit && battle.battle_log.push("It\'s a critical hit!");

    return damage;
  }
  
  multiHitDamage(agent, battle, attacker, defender, minHits, maxHits) {
    const hits = Math.floor(Math.random() * (maxHits - minHits + 1)) + minHits;
    for (let i = 0; i < hits; i++) {
      this.dealDamage(agent, battle, attacker, defender);
    }
    battle.battle_log.push(`${attacker.name} hit ${hits} times!`);
  }

  swapMove(agent, battle) {
    const agentPokemons = agent == 'maker' ? battle.maker_pokemons : battle.taker_pokemons;
    const agentBattlingPokemons = agent == 'maker' ? battle.maker_battling_pokemons : battle.taker_battling_pokemons;

    const temp = agentBattlingPokemons[0];
    agentBattlingPokemons[0] = agentBattlingPokemons[1];
    agentBattlingPokemons[1] = temp;

    battle.battle_log.push(`${agentPokemons[agentBattlingPokemons[0]].name} and ${agentPokemons[agentBattlingPokemons[1]].name} swapped places!`);
  }

  statsMultiplier(pokemon, stat, amount, battle) {
    const currentStat = pokemon.status.statusMultipliers[stat];
    const newStat = currentStat + amount;
  
    if (newStat > 4) {
      pokemon.status.statusMultipliers[stat] = 4;
      battle.battle_log.push(`${pokemon.name}'s ${stat} can't go any higher!`);
    } else if (newStat < -4) {
      pokemon.status.statusMultipliers[stat] = -4;
      battle.battle_log.push(`${pokemon.name}'s ${stat} can't go any lower!`);
    } else if ((currentStat >= 3 && amount > 0) || (currentStat <= -3 && amount < 0)) {
      // Cap the stat
      pokemon.status.statusMultipliers[stat] = amount > 0 ? 4 : -4;
      battle.battle_log.push(`${pokemon.name}'s ${stat} was ${amount > 0 ? 'maxed out' : 'minimized'}!`);
    } else {
      // Apply the amount normally if within bounds
      pokemon.status.statusMultipliers[stat] = newStat;
      battle.battle_log.push(`${pokemon.name}'s ${stat} was ${amount > 0 ? 'raised' : 'lowered'}!`);
    }
  }

  // try to make this more generic and implement use cases (maybe try implement effect status dmg)
  selfDamage(attacker, evaluateNumber, battle, selfPercentage, recoilDamage = true) {
    const actualDamage = Math.floor(evaluateNumber * selfPercentage);
    attacker.status.currentHP -= actualDamage;

    recoilDamage ? battle.battle_log.push(`${attacker.name} took ${actualDamage} recoil damage!`) : battle.battle_log.push(`${attacker.name} lost ${actualDamage} HP!`);
  }

  resetStats(target) {
    target.stats.attackModifier = 1;
    target.stats.defenseModifier = 1;
    target.stats.specialAttackModifier = 1;
    target.stats.specialDefenseModifier = 1;
    target.stats.speedModifier = 1;
    target.stats.evasionModifier = 1;
    battle.battle_log.push(`${target.name}'s stat changes were reset!`);
  }    
  
  healMove(attacker, evaluateNumber, battle, healPercentage = 1) { //evaluate number is the base number used to calculate the healing amount
    const healingAmount = Math.ceil(evaluateNumber * healPercentage);

    const actualHealing = Math.min(healingAmount, attacker.hp - attacker.status.currentHP);

    if (actualHealing) { //can be zero
      attacker.status.currentHP += actualHealing;
      battle.battle_log.push(`${attacker.name} healed for ${actualHealing} HP!`);
    } else {
      battle.battle_log.push(`${attacker.name} is already at full health!`);
    }
  }

  inflictStatus(defender, status, battle) {
    const validStatuses = ['paralyze', 'burn', 'freeze', 'poison', 'sleep', 'confuse', 'flinch', 'wrap'];
    
    // Check if the status to be inflicted is valid
    if (!validStatuses.includes(status)) {
      battle.battle_log.push(`${status} is not a valid status condition!`);
      return;
    }

    // Check if the defender already has a status condition
    if (defender.status.statusCondition !== null) {
      battle.battle_log.push(`${defender.name} is already affected by ${defender.status.statusCondition}!`);
      return;
    }

    // Set the new status condition
    defender.status.statusCondition = status;
  
    const statusMessages = {
      'paralyze': `${defender.name} is paralyzed! It may be unable to move!`,
      'burn': `${defender.name} is burned! It will take damage every turn!`,
      'freeze': `${defender.name} is frozen solid! It can't move!`,
      'poison': `${defender.name} is poisoned! It will take damage every turn!`,
      'sleep': `${defender.name} fell asleep! It won't be able to move!`,
      'confuse': `${defender.name} became confused! It might hurt itself in its confusion!`,
      'flinch': `${defender.name} flinched and couldn't move!`,
      'wrap': `${defender.name} is wrapped! It takes damage every turn and can't escape!`
    };
  
    if (statusMessages[status]) {
      battle.battle_log.push(statusMessages[status]);
    }
  }

}

class Effect {
  constructor(statusName, target, stat, amount, duration, startTurn) {
    this.statusName = statusName;
    this.target = target;
    this.stat = stat;
    this.amount = amount;
    this.duration = duration;
    this.startTurn = startTurn;
  }

  checkDuration() {
    return this.startTurn + this.duration <= battle.turn;
  }

  onPop() {
    this.target.status[this.stat] -= this.amount;
    effectsStack.splice(effectsStack.indexOf(this), 1);
  }
}

export class StartEffect extends Effect {
  constructor(statusName, target, stat, amount, duration, startTurn, triggerStart, triggerEnd) {
    super(statusName, target, stat, amount, duration, startTurn);
    this.triggerStart = triggerStart;
    this.triggerEnd = triggerEnd;
  }
}

export class EndEffect extends Effect {
  constructor(statusName, target, stat, amount, duration, startTurn, triggerEnd) {
    super(statusName, target, stat, amount, duration, startTurn);
    this.triggerEnd = triggerEnd;
  }
}

const pushEffect = (effect) => {
  effectsStack.push(effect);
}

export const effectsStack = [];
