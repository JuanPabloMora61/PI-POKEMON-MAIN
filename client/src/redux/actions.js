import { GET_POKEMONS, GET_POKEMONS_ID, GET_TYPES, GET_POKEMONS_NAME, CREATE_POKEMON, FILTER_POKEMON } from "./actionsTypes";
import axios from 'axios';

export const getPokemons = () => {
   const endpoint = 'http://localhost:3001/pokemon';
   return async (dispatch) => {
      try {
         const { data } = await axios.get(endpoint)

         if (!data.length) throw new Error('No hay pokemons')

         return dispatch({
            type: GET_POKEMONS,
            payload: data,
         })
      } catch (error) {
         console.log(error.message);
      }
   };
};

export const getTypes = () => {
   const endpoint = 'http://localhost:3001/types'
   return async (dispatch) => {
      try {
         const { data } = await axios.get(endpoint)

         if (!data.length) throw new Error('No hay pokemons')

         return dispatch({
            type: GET_TYPES,
            payload: data,
         })
      } catch (error) {
         console.log(error.message);
      }
   };
}

export const getPokemonsId = (id) => {
   const endpoint = `http://localhost:3001/pokemon/${id}`;
   return async (dispatch) => {
      try {
         const { data } = await axios.get(endpoint)

         if (!data.length) throw new Error('No hay pokemon en este ID')

         return dispatch({
            type: GET_POKEMONS_ID,
            payload: data,
         })
      } catch (error) {
         console.log(error.message);
      }
   };
}

export const getPokemonsName = (name) => {
   const endpoint = `http://localhost:3001/pokemon/name`;
   return async (dispatch) => {
      try {
         const { data } = await axios.get(`${endpoint}/${name}`)

         if (!data) throw new Error('No hay pokemon en este ID')

         return dispatch({
            type: GET_POKEMONS_NAME,
            payload: data,
         })
      } catch (error) {
         window.alert(`El pokemon "${name}" no existe`)
      }
   };
}

export const createPokemon = (data) => {
   const endpoint = `http://localhost:3001/post`
   return async (dispatch) => {
      try {
         const result = await axios.post(endpoint, data)

         if(!result.name) throw new Error('El pokemon no se creó con exito, vuelva a intentar')

         return dispatch({
            type: CREATE_POKEMON,
            payload: data,
         })

      } catch (error) {
         window.alert(error.message)
      }
   }
}

export const pokemonFilters = (data) => {
   return({
      type: FILTER_POKEMON,
      payload: data
   })
}