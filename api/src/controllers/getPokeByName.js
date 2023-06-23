const axios = require('axios')

const getPokeByName = async (req, res) => {
    try {
        const url = 'https://pokeapi.co/api/v2/pokemon'
        const { name } = req.params;
        const nombreMinusculas = name.toLowerCase();
        const { data } = await axios.get(`${url}/${nombreMinusculas}`)
        let pokemon;

        

        if (!data.name) throw new Error(`Pokemon: ${name} Not found`)


        pokemon = {
            id: data.id,
            name: data.name,
            imagen: data.sprites.front_default,
            vida: data.stats[0].base_stat,
            ataque: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
            velocidad: data.stats[5].base_stat,
            altura: data.height,
            peso: data.weight,
            types: data.types.map(t => t.type.name)
        };

        return res.status(200).json(pokemon);


    } catch (error) {
        error.message.includes('Pokemon')
        ? res.status(404).send(error.message)
        :res.status(500).send(error.message);
    }
}

module.exports = { getPokeByName }