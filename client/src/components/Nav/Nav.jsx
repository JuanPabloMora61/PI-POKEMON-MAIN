import style from "./Nav.module.css";
import { SearchBar } from "../index";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPokemonsName } from "../../redux/actions";

const Nav = () => {


  const dispatch = useDispatch();

  const onSearch = (name) => {
    dispatch(getPokemonsName(name));
  };

  const handleReset = () => {
    window.location.reload(false);
  }

  return (
    <>
      <nav className={style.contenedorNav}>
        <div className={style.contenedorBoton}>
          <button className={style.botonNav}>
            <NavLink to="/home" className={style.linkNav}>
              Home
            </NavLink>
          </button>

          <button className={style.botonNav}>
            <NavLink to="/post" className={style.linkNav}>
              Crear
            </NavLink>
          </button>

          <button className={style.botonNav}></button>
        </div>

        <div className={style.contenedorSearch}>
          <SearchBar onSearch={onSearch} handleReset={handleReset} />
        </div>
      </nav>
    </>
  );
};

export default Nav;
