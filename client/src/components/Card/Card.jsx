import style from "./Card.module.css";
import { NavLink } from "react-router-dom";

const Card = ({ name, id, imagen, types}) => {
  return (
      <NavLink to={`/detail/${id}`} className={style.nameNav}>
    <div className={style.container}>
        <h2 className={style.nameContainer}>{name}</h2>
      <div className={style.imgContainer}>
        <img
          src={imagen}
          alt={name}
          />
      </div>
      <div className={style.typeContainer}>
      {
        types ? types.map( el => {
          return(
            <h2 className={style[el]} key={id + el}>{el}</h2>
            )
          }
          ) :
          <span>Types not found</span>
        }
      </div>
    </div>
        </NavLink>
  );
};

export default Card;
