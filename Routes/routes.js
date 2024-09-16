import express from 'express';

import { assignPokemon, createBattle, forfeitBattle, getBattleById, getBattleIdByStatus, getPokemonById, getPokemonName, getUserBattlesByFid, getUserBattlesByWallet, joinBattle, makeMove, pokemonsByPlayerId, selectPokemons } from '../Controllers/backController.js';
import { registerConverseWallet, retrieveFidFromConverseWallet } from '../Controllers/subscribeController.js';

const router = express.Router();

router.post('/create-battle', createBattle);
router.post('/assign-pokemon', assignPokemon);
router.post('/join-battle', joinBattle);
router.post('/make-move', makeMove);
router.post('/select-pokemons', selectPokemons);
router.post('/register-converse-user', registerConverseWallet);
router.post('/forfeit-battle', forfeitBattle);
router.get('/converse-user/:wallet', retrieveFidFromConverseWallet);
router.get('/battle/:id', getBattleById);
router.get('/user/:id/pokemons', pokemonsByPlayerId);
router.get('/pokemon/:id', getPokemonById);
router.get('/pokemon/:id/name', getPokemonName);
router.get('/get/:status', getBattleIdByStatus);
router.get('/converse-user/:wallet/battles', getUserBattlesByWallet);
router.get('/user/:fid/battles', getUserBattlesByFid);

export default router;