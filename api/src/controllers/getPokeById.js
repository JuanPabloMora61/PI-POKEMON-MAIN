const axios = require("axios");
const { Pokemon, Type } = require('../db.js');
const URL = "https://pokeapi.co/api/v2/pokemon";

const getPokeById = async (req,res) => {
    try {
        const { id } = req.params;
        let data;
        
        if(/^\d+$/.test(id)){
            const pokemonApi = await axios.get(`${URL}/${id}`)
            
            if (!pokemonApi.data.name) throw new Error(`ID: ${id} Not found`)
            if(pokemonApi.data.name){
                data = [{
                    id: pokemonApi.data.id,
                    name: pokemonApi.data.name,
                    imagen: pokemonApi.data.sprites.front_default,
                    vida: pokemonApi.data.stats[0].base_stat,
                    ataque: pokemonApi.data.stats[1].base_stat,
                    defensa: pokemonApi.data.stats[2].base_stat,
                    velocidad: pokemonApi.data.stats[5].base_stat,
                    altura: pokemonApi.data.height,
                    peso: pokemonApi.data.weight,
                    types: pokemonApi.data.types.map(t => t.type.name)
                }];
            }
        }

        if(!/^\d+$/.test(id)){
            const dataDb = await Pokemon.findOne({where:{id},
                include: {
                    model: Type,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                }
            })
            if (!dataDb.dataValues.name) throw new Error(`ID: ${id} Not found`)
    
            if(dataDb.dataValues.name){
                data = [{
                    id: dataDb.dataValues.id,
                    name: dataDb.dataValues.name,
                    imagen: dataDb.dataValues.imagen,
                    vida: dataDb.dataValues.vida,
                    ataque: dataDb.dataValues.ataque,
                    defensa: dataDb.dataValues.defensa,
                    velocidad: dataDb.dataValues.velocidad,
                    altura: dataDb.dataValues.altura,
                    peso: dataDb.dataValues.peso,
                    types: dataDb.dataValues.Types.map(t => t.dataValues.name)
                }];
            }

        }

        return res.status(200).json(data);


    } catch (error) {
        error.message.includes('ID')
        ? res.status(404).send({ message: 'Pokemon no encontrado' })
        :res.status(500).send(error.message);
    }
}

module.exports = { getPokeById }