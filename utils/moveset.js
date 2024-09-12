import { Move } from './moves.js';

export const moveset = [
    new Move(0, 'Swap', null, 0, null, 'Swap the active Pokemon.', function(agent, battle) {
      console.log('Swap move executed');
      this.swapMove(agent, battle);
    }, 10),
    new Move(1, 'Tackle', 'Normal', 40, 100, 'A physical attack that deals damage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
    }),
    new Move(2, 'Vine Whip', 'Grass', 45, 100, 'A physical attack that deals damage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
    }),
    new Move(3, 'Growl', 'Normal', 0, 100, 'Lowers the opponent\'s Attack by one stage.', function(agent, battle, attacker, defender) {
      this.statsMultiplier(defender, 'attack', -1, battle);
      // pushEffect(new Effect(defender, 'attack', -1, Infinity))
    }),
    new Move(4, 'Razor Leaf', 'Grass', 55, 95, 'A physical attack that deals damage with a high critical hit ratio.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender, 0.125);
    }),
    new Move(5, 'Solar Beam', 'Grass', 120, 100, 'Charges on the first turn, then attacks on the second.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender); // This will be changed to a charge move
    }),
    new Move(6, 'Sleep Powder', 'Grass', 0, 75, 'Puts the opponent to sleep.', function(agent, battle, attacker, defender) {
      this.inflictStatus(defender, 'sleep', battle);
    }),
    new Move(7, 'Leech Seed', 'Grass', 0, 90, 'Plants a seed on the opponent to absorb HP each turn.', function(agent, battle, attacker, defender) {
      this.inflictStatus(defender, 'leech seed', battle);
    }),
    new Move(8, 'Scratch', 'Normal', 40, 100, 'A physical attack that deals damage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
    }),
    new Move(9, 'Ember', 'Fire', 40, 100, 'Deals damage with a 10% chance to burn the opponent.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.1) this.inflictStatus(defender, 'burn', battle);
    }),
    new Move(10, 'Flamethrower', 'Fire', 90, 100, 'Deals damage with a 10% chance to burn the opponent.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.1) this.inflictStatus(defender, 'burn', battle);
    }),
    new Move(11, 'Smokescreen', 'Normal', null, 100, 'Lowers the opponent\'s accuracy by one stage.', function(agent, battle, attacker, defender) {
      this.statsMultiplier(defender, 'accuracy', -1, battle);
    }),
    new Move(12, 'Wing Attack', 'Flying', 60, 100, 'A physical attack that deals damage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
    }),
    new Move(13, 'Dragon Claw', 'Dragon', 80, 100, 'A physical attack that deals damage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
    }),
    new Move(14, 'Water Gun', 'Water', 40, 100, 'A special attack that deals damage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
    }),
    new Move(15, 'Tail Whip', 'Normal', null, 100, 'Lowers the opponent\'s Defense by one stage.', function(agent, battle, attacker, defender) {
      this.statsMultiplier(defender, 'defense', -1, battle);
    }),
    new Move(16, 'Water Pulse', 'Water', 60, 100, 'A special attack that deals damage with a 20% chance to confuse the opponent.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.2) this.inflictStatus(defender, 'confuse', battle);
    }),
    new Move(17, 'Bite', 'Dark', 60, 100, 'A physical attack that deals damage with a 30% chance to flinch.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.3) this.inflictStatus(defender, 'flinch', battle);
    }),
    new Move(18, 'Hydro Pump', 'Water', 110, 80, 'A special attack that deals damage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
    }),
    new Move(19, 'Skull Bash', 'Normal', 130, 100, 'A physical attack that raises Defense on the first turn, then deals damage on the second.', function(agent, battle, attacker, defender) {
      this.statsMultiplier(attacker, 'defense', 1, battle);
      this.dealDamage(agent, battle, attacker, defender);
    }),
    new Move(20, 'String Shot', 'Bug', null, 95, 'Lowers the opponent\'s Speed by one stage.', function(agent, battle, attacker, defender) {
      this.statsMultiplier(defender, 'speed', -1, battle);
    }),
    new Move(21, 'Harden', 'Normal', null, null, 'Raises the user\'s Defense by one stage.', function(agent, battle, attacker, defender) {
      this.statsMultiplier(attacker, 'defense', 1, battle);
    }),
    new Move(22, 'Gust', 'Flying', 40, 100, 'A special attack that deals damage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
    }),
    new Move(23, 'Confusion', 'Psychic', 50, 100, 'A special attack that deals damage with a 10% chance to confuse the opponent.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.1) this.inflictStatus(defender, 'confuse', battle);
    }),
    new Move(24, 'Poison Sting', 'Poison', 15, 100, 'A physical attack that deals damage with a 30% chance to poison the opponent.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.3) this.inflictStatus(defender, 'poison', battle);
    }),
    new Move(25, 'Twineedle', 'Bug', 25, 100, 'A physical attack that hits the target twice.', function(agent, battle, attacker, defender) {
      this.multiHitDamage(agent, battle, attacker, defender, 2, 5);
      if (Math.random() < 0.1) this.inflictStatus(defender, 'poison', battle);
    }),
    new Move(26, 'Poison Jab', 'Poison', 80, 100, 'A physical attack that deals damage with a 30% chance to poison the opponent.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.3) this.inflictStatus(defender, 'poison', battle);
    }),
    new Move(27, 'Agility', 'Psychic', null, null, 'Raises the user\'s Speed by two stages.', function(agent, battle, attacker, defender) {
      this.statsMultiplier(attacker, 'speed', 2, battle);
    }),
    new Move(28, 'Sand Attack', 'Ground', null, 100, 'Lowers the opponent\'s accuracy by one stage.', function(agent, battle, attacker, defender) {
      this.statsMultiplier(defender, 'accuracy', -1, battle);
    }),
    new Move(29, 'Hurricane', 'Flying', 110, 70, 'A special attack that deals damage with a 30% chance to confuse the opponent.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.3) this.inflictStatus(defender, 'confuse', battle);
    }),
    new Move(30, 'Hyper Fang', 'Normal', 80, 90, 'A physical attack that deals damage with a 10% chance to flinch the opponent.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.1) this.inflictStatus(defender, 'flinch', battle);
    }),
    new Move(31, 'Crunch', 'Dark', 80, 100, 'A physical attack that deals damage with a 20% chance to lower the opponent\'s Defense by one stage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.2) this.statsMultiplier(defender, 'defense', -1, battle);
    }),
    new Move(32, 'Peck', 'Flying', 35, 100, 'A physical attack that deals damage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
    }),
    new Move(33, 'Fury Attack', 'Normal', 15, 85, 'A physical attack that hits the target 2-5 times.', function(agent, battle, attacker, defender) {
      this.multiHitDamage(agent, battle, attacker, defender, 2, 5);
    }),
    new Move(34, 'Drill Peck', 'Flying', 80, 100, 'A physical attack that deals damage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
    }),
    new Move(35, 'Wrap', 'Normal', 15, 90, 'A physical attack that deals damage and prevents the opponent from escaping for 2-5 turns.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      this.inflictStatus(defender, 'wrap', battle);
    }),
    new Move(36, 'Glare', 'Normal', null, 100, 'Paralyzes the opponent.', function(agent, battle, attacker, defender) {
      this.inflictStatus(defender, 'paralyze', battle);
    }),
    new Move(37, 'Thunderbolt', 'Electric', 90, 90, 'A special attack that deals damage with a 10% chance to paralyze the opponent.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.1) this.inflictStatus(defender, 'paralyze', battle);
    }),
    new Move(38, 'Charm', 'Fairy', null, 100, 'Lowers the opponent\'s Attack by two stages.', function(agent, battle, attacker, defender) {
      this.statsMultiplier(defender, 'attack', -2, battle);
    }),
    new Move(39, 'Bug Bite', 'Bug', 60, 100, 'A physical attack that deals damage and eats the opponent\'s Berry if it is holding one.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
    }),
    new Move(40, 'Quick Attack', 'Normal', 40, 100, 'A physical attack that always goes first.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
    }),
    new Move(41, 'Giga Drain', 'Grass', 75, 100, 'A physical attack that deals damage and heals the user for a portion of the damage dealt.', function(agent, battle, attacker, defender) {
      const damageDealt = this.dealDamage(agent, battle, attacker, defender);
      this.healMove(attacker, damageDealt, battle, 0.5); // Heal for 50% of the damage dealt
    }),
    new Move(42, 'Soft Boiled', 'Normal', null, null, 'Heals the user for 50% of its max HP.', function(agent, battle, attacker, defender) {
      this.healMove(attacker, attacker.hp, battle, 0.5);
    }),
    new Move(43, 'Swords Dance', 'Normal', null, null, 'Raises the user\'s Attack by two stages.', function(agent, battle, attacker, defender) {
      this.statsMultiplier(attacker, 'attack', 2, battle);
    }),
    new Move(44, 'Drain Punch', 'Fighting', 75, 100, 'A physical attack that deals damage and heals the user for a portion of the damage dealt.', function(agent, battle, attacker, defender) {
      const damageDealt = this.dealDamage(agent, battle, attacker, defender);
      this.healMove(attacker, damageDealt, battle, 0.5);
    }),
    new Move(45, 'Drain Kiss', 'Fairy', 50, 100, 'A special attack that deals damage and heals the user for a portion of the damage dealt.', function(agent, battle, attacker, defender) {
      const damageDealt = this.dealDamage(agent, battle, attacker, defender);
      this.healMove(attacker, damageDealt, battle, 0.5);
    }),
    new Move(46, 'Recover', 'Normal', null, null, 'Heals the user for 50% of its max HP.', function(agent, battle, attacker, defender) {
      this.healMove(attacker, attacker.hp, battle, 0.5);
    }),
    new Move(47, 'Rest', 'Psychic', null, null, 'Puts the user to sleep and heals it for 100% of its max HP.', function(agent, battle, attacker, defender) {
      this.healMove(attacker, attacker.hp, battle);
      this.inflictStatus(attacker, 'sleep', battle);
    }),
    new Move(48, 'Earthquake', 'Ground', 100, 100, 'A physical attack that deals damage. Hits all Pokémon in battle, including allies.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
    }),
    new Move(49, 'Psychic', 'Psychic', 90, 100, 'A special attack that deals damage with a 10% chance to lower the opponent\'s Special Defense by one stage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.1) this.statsMultiplier(defender, 'defense', -1, battle);
    }),
    new Move(50, 'Ice Beam', 'Ice', 90, 100, 'A special attack that deals damage with a 10% chance to freeze the opponent.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.1) this.inflictStatus(defender, 'freeze', battle);
    }),
    new Move(51, 'Rock Slide', 'Rock', 75, 90, 'A physical attack that deals damage with a 30% chance to flinch the opponent.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.3) this.inflictStatus(defender, 'flinch', battle);
    }),
    new Move(52, 'Shadow Ball', 'Ghost', 80, 100, 'A special attack that deals damage with a 20% chance to lower the opponent\'s Special Defense by one stage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.2) this.statsMultiplier(defender, 'defense', -1, battle);
    }),
    new Move(53, 'Iron Tail', 'Steel', 100, 75, 'A physical attack that deals damage with a 30% chance to lower the opponent\'s Defense by one stage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.3) this.statsMultiplier(defender, 'defense', -1, battle);
    }),
    new Move(54, 'Brick Break', 'Fighting', 75, 100, 'A physical attack that deals damage and breaks through Light Screen and Reflect.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      // Logic for breaking through Light Screen and Reflect can be added here if implemented
    }),
    new Move(55, 'Sludge Bomb', 'Poison', 90, 100, 'A special attack that deals damage with a 30% chance to poison the opponent.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.3) this.inflictStatus(defender, 'poison', battle);
    }),
    new Move(56, 'Thunder Wave', 'Electric', 0, 90, 'Paralyzes the opponent.', function(agent, battle, attacker, defender) {
      this.inflictStatus(defender, 'paralyze', battle);
    }),
    new Move(57, 'Toxic', 'Poison', 0, 90, 'Badly poisons the opponent. The damage inflicted by poison increases every turn.', function(agent, battle, attacker, defender) {
      this.inflictStatus(defender, 'badly poison', battle);
    }),
    new Move(58, 'Double Team', 'Normal', 0, 100, 'Raises the user\'s evasion by one stage.', function(agent, battle, attacker, defender) {
      this.statsMultiplier(attacker, 'evasion', 1, battle);
    }),
    new Move(59, 'Focus Punch', 'Fighting', 150, 100, 'A powerful physical attack that fails if the user takes damage before attacking.', function(agent, battle, attacker, defender) {
      // Logic for checking if the user took damage before attacking can be added here if implemented
      this.dealDamage(agent, battle, attacker, defender);
    }),
    new Move(60, 'Calm Mind', 'Psychic', 0, 100, 'Raises the user\'s Special Attack and Special Defense by one stage each.', function(agent, battle, attacker, defender) {
      this.statsMultiplier(attacker, 'attack', 1, battle);
      this.statsMultiplier(attacker, 'defense', 1, battle);
    }),
    new Move(61, 'Blizzard', 'Ice', 110, 70, 'A special attack that deals damage with a 10% chance to freeze the opponent.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.1) this.inflictStatus(defender, 'freeze', battle);
    }),
    new Move(62, 'Leech Life', 'Bug', 80, 100, 'A physical attack that deals damage and heals the user by half the damage dealt.', function(agent, battle, attacker, defender) {
      let damageDealt = this.dealDamage(agent, battle, attacker, defender);
      this.healMove(attacker, damageDealt, battle, 0.5);
    }),
    new Move(63, 'Earth Power', 'Ground', 90, 100, 'A special attack that deals damage with a 10% chance to lower the opponent\'s Special Defense by one stage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.1) this.statsMultiplier(defender, 'defense', -1, battle);
    }),
  new Move(64, 'Aura Sphere', 'Fighting', 80, null, 'A special attack that never misses.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
    }),
  new Move(65, 'Thunder Punch', 'Electric', 75, 100, 'A physical attack that deals damage with a 10% chance to paralyze the opponent.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.1) this.inflictStatus(defender, 'paralyze', battle);
    }),  
  new Move(66, 'Will-O-Wisp', 'Fire', null, 85, 'Burns the opponent.', function(agent, battle, attacker, defender) {
      this.inflictStatus(defender, 'burn', battle);
    }),
  new Move(67, 'Air Slash', 'Flying', 75, 95, 'A special attack that deals damage with a 30% chance to flinch the opponent.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.3) this.inflictStatus(defender, 'flinch', battle);
    }),
  new Move(68, 'Shadow Claw', 'Ghost', 70, 100, 'A physical attack that deals damage with a high critical hit ratio.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender, 0.125);
    }),
  new Move(69, 'X-Scissor', 'Bug', 80, 100, 'A physical attack that deals damage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
    }),
  new Move(70, 'Energy Ball', 'Grass', 90, 100, 'A special attack that deals damage with a 10% chance to lower the opponent\'s Special Defense by one stage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.1) this.statsMultiplier(defender, 'defense', -1, battle);
    }),
  new Move(71, 'Flash Cannon', 'Steel', 80, 100, 'A special attack that deals damage with a 10% chance to lower the opponent\'s Special Defense by one stage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.1) this.statsMultiplier(defender, 'defense', -1, battle);
    }),
  new Move(72, 'Heat Wave', 'Fire', 95, 90, 'A special attack that deals damage with a 10% chance to burn the opponent.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.1) this.inflictStatus(defender, 'burn', battle);
    }),
  new Move(73, 'Dark Pulse', 'Dark', 80, 100, 'A special attack that deals damage with a 20% chance to flinch the opponent.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.2) this.inflictStatus(defender, 'flinch', battle);
    }),
  new Move(74, 'Leaf Storm', 'Grass', 130, 90, 'A special attack that deals damage and lowers the user\'s Special Attack by two stages.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      this.statsMultiplier(attacker, 'attack', -2, battle);
    }),
  new Move(75, 'Close Combat', 'Fighting', 120, 100, 'A physical attack that deals damage and lowers the user\'s Defense and Special Defense by one stage each.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      this.statsMultiplier(attacker, 'defense', -1, battle);
      this.statsMultiplier(attacker, 'defense', -1, battle);
    }),
  new Move(76, 'Volt Switch', 'Electric', 70, 100, 'A special attack that deals damage and switches the user out.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      // Add logic to switch out the user after attacking
    }),
  new Move(77, 'U-turn', 'Bug', 70, 100, 'A physical attack that deals damage and switches the user out.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      // Add logic to switch out the user after attacking
    }),
    new Move(78, 'Moonblast', 'Fairy', 95, 100, 'A special attack that deals damage with a 30% chance to lower the opponent\'s Special Attack by one stage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.3) this.statsMultiplier(defender, 'attack', -1, battle);
    }),
  new Move(79, 'Overheat', 'Fire', 130, 90, 'A special attack that deals damage and lowers the user\'s Special Attack by two stages.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      this.statsMultiplier(attacker, 'attack', -2, battle);
    }),
    new Move(80, 'Inferno', 'Fire', 100, 50, 'A special attack that deals damage and burns the opponent.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      this.inflictStatus(defender, 'burn', battle);
    }),
    new Move(81, 'Draco Meteor', 'Dragon', 130, 90, 'A powerful special attack that sharply lowers the user\'s Special Attack after dealing damage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      this.statsMultiplier(attacker, 'special attack', -2, battle);
    }),
    new Move(82, 'Dragon Pulse', 'Dragon', 85, 100, 'A special attack that deals damage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
    }),
    new Move(83, 'Dragon Dance', 'Dragon', null, null, 'Raises the user\'s Attack and Speed by one stage each.', function(agent, battle, attacker, defender) {
      this.statsMultiplier(attacker, 'attack', 1, battle);
      this.statsMultiplier(attacker, 'speed', 1, battle);
    }),
    new Move(84, 'Flame Charge', 'Fire', 50, 100, 'A physical attack that deals damage and raises the user\'s Speed by one stage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      this.statsMultiplier(attacker, 'speed', 1, battle);
    }),
    new Move(85, 'Dragon Breath', 'Dragon', 60, 100, 'A special attack that deals damage with a 30% chance to paralyze the opponent.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.3) this.inflictStatus(defender, 'paralyze', battle);
    }),
    new Move(86, 'Dragon Rage', 'Dragon', 40, 100, 'A special attack that deals 40 damage.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      // implement this very specific move
    }),
    new Move(87, 'Dragon Tail', 'Dragon', 60, 90, 'A physical attack that deals damage and forces the opponent to switch out.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      // Add logic to force the opponent to switch out after attacking
    }),
    new Move(88, 'Outrage', 'Dragon', 120, 100, 'A powerful physical attack that lasts 2-3 turns, during which the user cannot switch out.', function(agent, battle, attacker, defender) {
      // Add logic to implement the multi-turn effect of the move
      this.dealDamage(agent, battle, attacker, defender);
    }),
    new Move(89, 'Fire Blast', 'Fire', 110, 85, 'A special attack that deals damage with a 10% chance to burn the opponent.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.1) this.inflictStatus(defender, 'burn', battle);
    }),
    new Move(90, 'Flare Blitz', 'Fire', 120, 100, 'A powerful physical attack that deals damage to the user as recoil.', function(agent, battle, attacker, defender) {
      const damageDealt = this.dealDamage(agent, battle, attacker, defender);
      this.selfDamage(attacker, damageDealt, battle, 0.33);
    }),
    new Move(91, 'Fire Spin', 'Fire', 35, 85, 'A special attack that deals damage and traps the opponent for 2-5 turns.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      this.inflictStatus(defender, 'trap', battle);
    }),
    new Move(92, 'Flame Wheel', 'Fire', 60, 100, 'A physical attack that deals damage with a 10% chance to burn the opponent.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      if (Math.random() < 0.1) this.inflictStatus(defender, 'burn', battle);
    }),
    new Move(93, 'Flame Burst', 'Fire', 70, 100, 'A special attack that deals damage to the target and adjacent opponents.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
    }),
    new Move(94, 'Belly Drum', 'Normal', null, null, 'Maxes out the user\'s Attack but causes it to lose 50% of its max HP.', function(agent, battle, attacker, defender) {
      this.statsMultiplier(attacker, 'attack', 4, battle);
      this.selfDamage(attacker, attacker.status.currentHP, battle, 0.5, false);
      //this.selfDamage(attacker, ammount, battle, percentage, isRecoilDamage);
    }),
    new Move(95, 'Brave Bird', 'Flying', 120, 100, 'A powerful physical attack that deals damage to the user as recoil.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
      this.selfDamage(attacker, attacker.hp, battle, 0.33);
    }),
    new Move(96, 'Aerial Ace', 'Flying', 60, null, 'A physical attack that never misses.', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
    }),
    new Move(97, 'Take Down', 'Normal', 90, 85, 'A physical attack that deals damage to the user as recoil.', function(agent, battle, attacker, defender) {
      const damageDealt = this.dealDamage(agent, battle, attacker, defender);
      this.selfDamage(attacker, damageDealt, battle, 0.25);
    }),
    new Move(98, 'Double-Edge', 'Normal', 120, 100, 'A powerful physical attack that deals damage to the user as recoil.', function(agent, battle, attacker, defender) {
      const damageDealt = this.dealDamage(agent, battle, attacker, defender);
      this.selfDamage(attacker, damageDealt, battle, 0.33);
    }),
    new Move(99, 'Wild Charge', 'Electric', 90, 100, 'A physical attack that deals damage to the user as recoil.', function(agent, battle, attacker, defender) {
      const damageDealt = this.dealDamage(agent, battle, attacker, defender);
      this.selfDamage(attacker, damageDealt, battle, 0.25);
    }),
    new Move(100, 'Volt Tackle', 'Electric', 120, 100, 'A powerful physical attack that deals damage to the user as recoil.', function(agent, battle, attacker, defender) {
      const damageDealt = this.dealDamage(agent, battle, attacker, defender);
      this.selfDamage(attacker, damageDealt, battle, 0.33);
    }),
    new Move(101, 'AccTest', 'Normal', 10, 0, 'testing accuracy', function(agent, battle, attacker, defender) {
      this.dealDamage(agent, battle, attacker, defender);
    }),
    new Move(102, 'multiTest', 'Normal', 10, 100, 'testing multi-hit moves', function(agent, battle, attacker, defender) {
      this.multiHitDamage(agent, battle, attacker, defender, 2, 10);
    }),
    new Move(103, 'healTest', 'Normal', 10, 100, 'testing healing moves', function(agent, battle, attacker, defender) {
      this.healMove(attacker, attacker.hp, battle);
    }),
];