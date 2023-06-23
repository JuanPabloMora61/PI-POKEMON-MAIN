import style from "./Cards.module.css";
import { Card, Loading,  } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { pokemonFilters } from "../../redux/actions";

const Cards = () => {
  const pokemons = useSelector(state => state.filteredPokemon)
  const typesArray = useSelector(state => state.types)
  const itemsPerPage = useSelector(state => state.itemsPerPage)
  const [currentPage, setCurrentPage] = useState(1);
  const [orderFilter, setOrderFilter] = useState("default")
  const [typeFilter, setTypeFilter] = useState("all")
  const [originFilter, setOriginFilter] = useState("all")
  const dispatch = useDispatch();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pokemons.slice(indexOfFirstItem, indexOfLastItem);
  const lastPage = Math.floor(pokemons.length/itemsPerPage) +1;

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const handleLastPage = () => {
    setCurrentPage(lastPage)
  }

  const handleFirstPage = () => {
    setCurrentPage(1)
  }

  const handleFivePlus = () => {
    if(currentPage <= lastPage -5){
      setCurrentPage(currentPage + 5)
    }else{
      setCurrentPage(currentPage + (lastPage - currentPage))
    }
  }

  const handleFiveLess = () => {
    if(currentPage <= 5){
      setCurrentPage(currentPage  - (currentPage - 1))
    }else{
      setCurrentPage(currentPage - 5)
    }
  }

  const handleInputPage = (event) => {
    setCurrentPage(event.target.value)
  }

  const handleOrder = (event) => {
    event.preventDefault()
    setOrderFilter(event.target.value)
  }
  
  const handleTypeFilter = (event) => {
    event.preventDefault()
    setTypeFilter(event.target.value)
  }

  const handleOriginFilter = (event) => {
    event.preventDefault()
    setOriginFilter(event.target.value)
  }

  const handleFilter = () => {
    setCurrentPage(1);
    let filters = {
      order: orderFilter,
      type: typeFilter,
      origin: originFilter
    }
    dispatch(pokemonFilters(filters))
  }

  return (
    <div className={style.container}>
      <div className={style.filterContainer}>
        <select onChange={handleOrder}>
          <option value="default">Elige un orden</option>
          <option value="A">A -Z</option>
          <option value="Z">Z - A</option>
          <option value="P">Ataque ↑</option>
          <option value="D">Ataque ↓</option>
        </select>
        <select onChange={handleOriginFilter}>
          <option value="all">Todos los pokemons</option>
          <option value="created">Pokemones creados</option>
          <option value="original">Pokemones originales</option>
        </select>
        <select onChange={handleTypeFilter}>
          <option value="all">Todos los tipos</option>
          {typesArray.map(type => { 
             return (<option key={type.name} value={type.name}>{type.name}</option>) 
           })
          } 
        </select>
        <button onClick={handleFilter}>Aplicar filtros</button>
      </div>
      <div className={style.buttonsContainer}>
        <button className={style.buttonsPag} onClick={handleFirstPage} disabled={currentPage === 1}>Primer página</button>
        <button className={style.buttonsPag} onClick={handleFiveLess} disabled={currentPage === 1}>- 5</button>
        <button className={style.buttonsPag} onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <h3 className={style.buttonsTxt}>Página <input type="text" value={currentPage} onChange={handleInputPage}/>  de {lastPage}</h3>
        <button className={style.buttonsPag} onClick={handleNextPage} disabled={indexOfLastItem > pokemons.length}>Next</button> 
        <button className={style.buttonsPag} onClick={handleFivePlus} disabled={indexOfLastItem > pokemons.length}>+ 5</button>
        <button className={style.buttonsPag} onClick={handleLastPage} disabled={indexOfLastItem > pokemons.length}>Ultima página</button>
      </div>
      <div className={style.cardContainer}>
        {
        currentItems.length?
        currentItems.map(
          ({ name, id, imagen, types}) => {
            return (
               <Card
                key={id}
                id={id}
                name={name}
                imagen={imagen}
                types={types}
              />
            )
          }
        )
        : <Loading/>
        }
      </div>
      <div className={style.buttonsContainer}>
        <button className={style.buttonsPag} onClick={handleFirstPage} disabled={currentPage === 1}>Primer página</button>
        <button className={style.buttonsPag} onClick={handleFiveLess} disabled={currentPage === 1}>- 5</button>
        <button className={style.buttonsPag} onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <h3 className={style.buttonsTxt}>Página {currentPage} de {lastPage}</h3>
        <button className={style.buttonsPag} onClick={handleNextPage} disabled={indexOfLastItem >= pokemons.length}>Next</button> 
        <button className={style.buttonsPag} onClick={handleFivePlus} disabled={indexOfLastItem >= pokemons.length}>+ 5</button>
        <button className={style.buttonsPag} onClick={handleLastPage} disabled={indexOfLastItem >= pokemons.length}>Ultima página</button>
      </div>
    </div>
  );
};

export default Cards;
