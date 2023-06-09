const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon?limit=12";

const getAllPoke = async (req, res) => {
    try {
        const response = await axios.get(URL);
        const pokemons = response.data.results;
        const pokemonData = await Promise.all (pokemons.map(async (pokemon) => {
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
                types: results.data.types.map((type) => type.type.name)
            }

            return gettedPokemon;
        }
        ))
        return res.status(200).json(pokemonData);

    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = { getAllPoke }