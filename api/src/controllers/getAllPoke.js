const axios = require("axios");
const { Pokemon, Type } = require('../db.js');
const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281";

const getAllPoke = async (req, res) => {
    try {
        const response = await axios.get(URL);
        const pokemons = response.data.results;
        const pokemonDataApi = await Promise.all (pokemons.map(async (pokemon) => {
            const results = await axios.get(pokemon.url);
            const gettedPokemon = {
                id: results.data.id,
                name: results.data.name,
                imagen: results.data.sprites.front_default,
                vida: results.data.stats[0].base_stat,
                ataque: results.data.stats[1].base_stat,
                defensa: results.data.stats[2].base_stat,
                velocidad: results.data.stats[5].base_stat,
                altura: results.data.height,
                peso: results.data.weight,
                types: results.data.types.map((type) => type.type.name),
                isCreated: false
            }

            return gettedPokemon;
        }
        ))

        const pokemonDataDB = await Pokemon.findAll({include: Type})
         const pokemonDBFormated = pokemonDataDB.map((pokemon) => {
             const gettedPokemon = {
                 id: pokemon.id,
                 name: pokemon.name,
                 imagen: pokemon.imagen,
                 vida: pokemon.vida,
                 ataque: pokemon.ataque,
                 defensa: pokemon.defensa,
                 velocidad: pokemon.velocidad,
                 altura: pokemon.altura,
                 peso: pokemon.peso,
                 types: pokemon.Types.map((type) => type.name),
                 isCreated: true
             }

             return gettedPokemon;
        });

        const pokemonData = pokemonDataApi.concat(pokemonDBFormated)

        return res.status(200).json(pokemonData);

    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = { getAllPoke }