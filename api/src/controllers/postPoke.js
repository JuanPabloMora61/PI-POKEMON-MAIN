const { Pokemon, Type } = require('../db.js');


const postPoke = async (req,res) => {
try {
 
  const { name, imagen, vida, ataque, defensa, velocidad, altura, peso, type } = req.body;

   
   const newPokemon = await Pokemon.create ({
    name,
    imagen,
    vida,
    ataque,
    defensa,
    velocidad,
    altura,
    peso
   })


   const typesToAdd = await Type.findOne({ where: { name: type } });
   

   await newPokemon.addTypes([typesToAdd]);
       

return res.status(200).send(newPokemon)

} catch (error) {
  return res.status(400).send(error.message)
}
}

module.exports = { postPoke };