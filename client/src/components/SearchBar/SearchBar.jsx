import style from './SearchBAr.module.css'
import { useState } from 'react';

export default function SearchBar({onSearch, handleReset}) {
   const [name, setName] = useState("");

   const handleChange = (event) => {
      setName(event.target.value)
   }

   return (
      <div className={style.contenedorBarra}>
         {
         <>
         <input type='search' onChange={handleChange} value={name} className={style.inputSearch}/>
         <button onClick={() => {onSearch(name);}} className={style.buttonSearch}>Buscar</button>
         <button onClick={() => {handleReset(); setName("")}} className={style.buttonReset}>Regresar</button>
         </>
         }
      </div>
   );
}
