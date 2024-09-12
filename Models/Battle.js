class Battle {
  constructor(id, maker, taker, maker_pokemons, maker_battling_pokemons, taker_pokemons, taker_battling_pokemons, maker_move, taker_move, status, current_turn, battle_log) {
    this.id = id;
    this.maker = maker;
    this.taker = taker;
    this.maker_pokemons = maker_pokemons;
    this.maker_battling_pokemons = maker_battling_pokemons;
    this.taker_pokemons = taker_pokemons;
    this.taker_battling_pokemons = taker_battling_pokemons;
    this.maker_move = maker_move;
    this.taker_move = taker_move;
    this.status = status;
    this.current_turn = current_turn;
    this.battle_log = battle_log; 
  }
}

export default Battle;