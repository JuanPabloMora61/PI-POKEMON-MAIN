const getPokeByName = async (req, res) => {
    console.log(req.query);
    try {
        const { name } = req.query;
        const { data } = await axios.get(`${URL}/${name}`)

        if (!data.name) throw new Error(`Pokemon: ${name} Not found`)


        const pokemon = {
            id: data.id,
            name: data.name,
            imagen: data.sprites.front_default,
            vida: data.stats[0].base_stat,
            ataque: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
            velocidad: data.stats[5].base_stat,
            altura: data.height,
            peso: data.weight,
        };

        return res.status(200).json(pokemon);


    } catch (error) {
        error.message.includes('ID')
        ? res.status(404).send({ message: 'Pokemon no encontrado' })
        :res.status(500).send(error.message);
    }
}

module.exports = { getPokeByName }