import { GET_POKEMONS, GET_POKEMONS_ID, GET_TYPES, GET_POKEMONS_NAME, CREATE_POKEMON, FILTER_POKEMON } from "./actionsTypes";

const initialState = {
    pokemons: [],
    filteredPokemon: [],
    types: [],
    itemsPerPage: 12,
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: payload,
                filteredPokemon: payload
            }

        case GET_POKEMONS_ID:
            return {
                ...state,
                pokemons: payload
            }

        case GET_POKEMONS_NAME:
            return {
                ...state,
                filteredPokemon: [payload]
            }

        case GET_TYPES:
            return{
                ...state,
                types: payload
            }

        case CREATE_POKEMON:
            return{
                ...state,
                }

        case FILTER_POKEMON:
            let pokemonsCopia = [...state.pokemons]
            let pokemonsFiltrados = pokemonsCopia;
            let pokemonesOrdenados;
            
            if(payload.order === "default"){
                pokemonesOrdenados = pokemonsCopia
                if(payload.type !== "all"){
                    pokemonsFiltrados = pokemonesOrdenados.filter((item) => item.types.includes(payload.type))
                }

                if(payload.origin !== "all"){
                    if(payload.origin === "created"){
                        pokemonsFiltrados = pokemonsFiltrados.filter(pokemon => pokemon.isCreated === true)
                    }
                    if(payload.origin === "original"){
                        pokemonsFiltrados = pokemonsFiltrados.filter(pokemon => pokemon.isCreated === false)
                    }
                }
            }

            if(payload.order === "A"){
                pokemonesOrdenados = pokemonsCopia.sort(function (a, b) {
                    if (a.name < b.name) {
                      return -1;
                    }
                    if (a.name > b.name) {
                      return 1;
                    }
                    return 0;
                  });

                if(payload.type !== "all"){
                    pokemonsFiltrados = pokemonesOrdenados.filter(pokemon => pokemon.types.includes(payload.type))
                }

                if(payload.origin !== "all"){
                    if(payload.origin === "created"){
                        pokemonsFiltrados = pokemonsFiltrados.filter(pokemon => pokemon.isCreated === true)
                    }
                    if(payload.origin === "original"){
                        pokemonsFiltrados = pokemonsFiltrados.filter(pokemon => pokemon.isCreated === false)
                    }
                }
            }

            
            if(payload.order === "Z"){
                pokemonesOrdenados = pokemonsCopia.sort(function (a, b) {
                    if (a.name > b.name) {
                      return -1;
                    }
                    if (a.name < b.name) {
                      return 1;
                    }
                    return 0;
                  });

                if(payload.type !== "all"){
                    pokemonsFiltrados = pokemonesOrdenados.filter(pokemon => pokemon.types.includes(payload.type))
                }

                if(payload.origin !== "all"){
                    if(payload.origin === "created"){
                        pokemonsFiltrados = pokemonsFiltrados.filter(pokemon => pokemon.isCreated === true)
                    }
                    if(payload.origin === "original"){
                        pokemonsFiltrados = pokemonsFiltrados.filter(pokemon => pokemon.isCreated === false)
                    }
                }
            }

            if(payload.order === "P"){
                pokemonesOrdenados = pokemonsCopia.sort((a, b) => {return b.ataque - a.ataque});

                if(payload.type !== "all"){
                    pokemonsFiltrados = pokemonesOrdenados.filter(pokemon => pokemon.types.includes(payload.type))
                }

                if(payload.origin !== "all"){
                    if(payload.origin === "created"){
                        pokemonsFiltrados = pokemonsFiltrados.filter(pokemon => pokemon.isCreated === true)
                    }
                    if(payload.origin === "original"){
                        pokemonsFiltrados = pokemonsFiltrados.filter(pokemon => pokemon.isCreated === false)
                    }
                }
            }

            if(payload.order === "D"){
                pokemonesOrdenados = pokemonsCopia.sort((a, b) => {return a.ataque - b.ataque});

                if(payload.type !== "all"){
                    pokemonsFiltrados = pokemonesOrdenados.filter(pokemon => pokemon.types.includes(payload.type))
                }

                if(payload.origin !== "all"){
                    if(payload.origin === "created"){
                        pokemonsFiltrados = pokemonsFiltrados.filter(pokemon => pokemon.isCreated === true)
                    }
                    if(payload.origin === "original"){
                        pokemonsFiltrados = pokemonsFiltrados.filter(pokemon => pokemon.isCreated === false)
                    }
                }
            }

            return{
                ...state,
                filteredPokemon: pokemonsFiltrados
            }

        default:
            return { ...state }
    }
}

export default reducer;