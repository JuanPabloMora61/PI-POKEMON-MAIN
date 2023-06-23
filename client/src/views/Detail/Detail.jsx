import { Nav } from "../../components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPokemonsId } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import style from "./Detail.module.css";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const dispatch = useDispatch();

  useEffect( () => {
    axios(`http://localhost:3001/pokemon/id/${id}`).then(({ data }) => {
      if (data[0].name) {
        setPokemon(data[0]);
      } else {
        window.alert({ data });
      }
    });
    return setPokemon({});
  }, [id]);

  const onSearch = (id) => {
    dispatch(getPokemonsId(id));
  };

  return (
    <>
      <Nav onSearch={onSearch} />
      {
        <div className={style.mainContainer}>
          <div className={style.pokedexContainer}>
            <h1 className={style.pokeName}>{pokemon.name}</h1>
            <img src={pokemon.imagen} alt={pokemon.name} className={style.pokeImg} />
            <div className={style.statsContainer}>
            <p className={style.pokeStats}>Vida: {pokemon.vida}</p>
            <p className={style.pokeStats}>Ataque: {pokemon.ataque}</p>
            <p className={style.pokeStats}>Def: {pokemon.defensa}</p>
            <p className={style.pokeStats}>Vel: {pokemon.velocidad}</p>
            <p className={style.pokeStats}>Altura: {pokemon.altura}</p>
            <p className={style.pokeStats}>Peso: {pokemon.peso}</p>
            </div>
            <div className={style.typesContainer}>
            {pokemon.types ? (
              pokemon.types.map((el) => {
                return <p className={style[el]}>{el}</p>;
              })
            ) : (
              <span>Types not found</span>
            )}
            </div>
          </div>
          <NavLink to={`/home`}><button>Regresar</button></NavLink>
        </div>
      }
    </>
  );
};

export default Detail;
