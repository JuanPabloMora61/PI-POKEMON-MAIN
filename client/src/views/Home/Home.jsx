import { Nav, Cards } from "../../components";
import style from "./Home.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPokemons, getTypes } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  },[dispatch]);

  return (
    <div className={style.mainContainer}>
      <Nav />
      <div className={style.cardsContainer}>
        <Cards />
      </div>
    </div>
  );
};

export default Home;
