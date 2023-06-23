const { Pokemon, Type } = require('../db.js');


const postPoke = async (req,res) => {
try {
 
  const { name, imagen, vida, ataque, defensa, velocidad, altura, peso, types } = req.body;

   
   const newPokemon = await Pokemon.create ({
    name: name,
    imagen,
    vida,
    ataque,
    defensa,
    velocidad,
    altura,
    peso,
    isCreated: true
   })


   const typesToAdd = await Promise.all(types.map(async (type) => await Type.findOne({ where: { name: type } })));
   

   await newPokemon.addTypes(typesToAdd);
       

return res.status(200).send(newPokemon)

} catch (error) {
  return res.status(400).send(error.message)
}
}

module.exports = { postPoke };