const { Type } = require('../db');
const axios = require('axios');

const getAllTypes = async (req,res) => {
    const validate = await Type.count()
    
    if(validate === 0){
        const apiTypes = await axios.get('https://pokeapi.co/api/v2/type')
    
        apiTypes.data.results.map((type) => {
            Type.findOrCreate({
                where: {
                    name: type.name
                },
            })
        })  
    }

    const allTypes = await Type.findAll();

    res.status(200).send(allTypes);
}

module.exports = { getAllTypes }