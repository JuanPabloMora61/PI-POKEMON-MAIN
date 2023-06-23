import { Nav } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTypes, createPokemon } from "../../redux/actions";
import validate from "./validate";
import style from "./Form.module.css";

const Form = () => {
  const typesArray = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});
  const [pokemonData, setPokemonData] = useState({
    nombre: "",
    imagen: "",
    vida: 1,
    ataque: 1,
    defensa: 1,
    velocidad: 1,
    altura: "",
    peso: "",
    types: [],
    isCreated: true,
  });
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleOnChange(event) {
    setPokemonData({
      ...pokemonData,
      [event.target.name]: event.target.value,
    });
    
    setErrors(validate({ ...pokemonData, [event.target.name]: event.target.value }));
  }

  function handleOnChangeTypes(event) {
    setPokemonData({
      ...pokemonData,
      types: [...pokemonData.types, event.target.value],
    });
    setErrors(validate({ ...pokemonData, types: [...pokemonData.types, event.target.value] }));
  }

  function handleBorrarTipos () {
    setPokemonData({
      ...pokemonData,
      types: []
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      alert("Pokemon creado");
      setPokemonData({
        name: "",
        imagen: "",
        vida: 0,
        ataque: 0,
        defensa: 0,
        velocidad: 0,
        altura: "",
        peso: "",
        types: [],
        isCreated: true,
      });
      dispatch(createPokemon(pokemonData));
      window.location.reload(false);
    } else {
      alert("Complete toda la información para crear un pokemon");
    }
  }

  return (
    <>
      <Nav />
      <div className={style.mainContainer}>
        <form className={style.formContainer} onSubmit={handleSubmit}>
          <div className={style.nameContainer}>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ingresa un name"
              onChange={handleOnChange}
              autocomplete="off"
            />
            {errors.name && <p className={style.error}>{errors.name}</p>}
          </div>

          <div className={style.imagenContainer}>
            <label htmlFor="imagen">Imagen:</label>
            <input
              type="text"
              id="imagen"
              name="imagen"
              placeholder="Ingresa link de imagen"
              onChange={handleOnChange}
              autocomplete="off"
            />
            
            {errors.imagen && <p className={style.error}>{errors.imagen}</p>}
          </div>

          <div className={style.vidaContainer}>
            <label htmlFor="vida">Hp:</label>
            <input
              type="range"
              id="vida"
              name="vida"
              min="1"
              max="100"
              defaultValue={1}
              onChange={handleOnChange}
            />
            <p>{pokemonData.vida}</p>
          </div>

          <div className={style.ataqueContainer}>
            <label htmlFor="ataque">Ataque:</label>
            <input
              type="range"
              id="ataque"
              name="ataque"
              min="1"
              max="100"
              defaultValue={1}
              onChange={handleOnChange}
            />
            <p>{pokemonData.ataque}</p>
          </div>

          <div className={style.defensaContainer}>
            <label htmlFor="defensa">Defensa:</label>
            <input
              type="range"
              id="defensa"
              name="defensa"
              min="1"
              max="100"
              defaultValue={1}
              onChange={handleOnChange}
            />
            <p>{pokemonData.defensa}</p>
          </div>

          <div className={style.velocidadContainer}>
            <label htmlFor="velocidad">Velocidad:</label>
            <input
              type="range"
              id="velocidad"
              name="velocidad"
              min="1"
              max="100"
              defaultValue={1}
              onChange={handleOnChange}
            />
            <p>{pokemonData.velocidad}</p>
          </div>

          <div className={style.alturaContainer}>
            <label htmlFor="altura">Altura:</label>
            <input
              type="number"
              id="altura"
              name="altura"
              placeholder="Ingresa una altura"
              onChange={handleOnChange}
            />
            {errors.altura && <p className={style.error}>{errors.altura}</p>}
          </div>

          <div className={style.pesoContainer}>
            <label htmlFor="peso">Peso:</label>
            <input
              type="number"
              id="peso"
              name="peso"
              placeholder="Ingresa el peso"
              onChange={handleOnChange}
            />
            {errors.peso && <p className={style.error}>{errors.peso}</p>}
          </div>

          <div className={style.tiposContainer}>
            <label htmlFor="types">Tipos:</label>
            <input
              type="text"
              name="types"
              value={pokemonData.types.join(", ")}
              readOnly={true}
            />
            <select
              onChange={handleOnChangeTypes}
              disabled={pokemonData.types.length >= 2}
            >
              <option value="">Selecciona un tipo</option>
              {typesArray.map((type) => {
                return (
                  <option key={type.name} value={type.name}>
                    {type.name}
                  </option>
                );
              })}
            </select>
              <button onClick={handleBorrarTipos}>Borrar tipos</button>
            {errors.types && <p className={style.error}>{errors.types}</p>}
          </div>
          <div className={style.submitButtonContainer}>
            <button type="submit" className={style.submitButton} disabled={errors === {}}>Crear nuevo Pokémon</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
