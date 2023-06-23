import { NavLink } from 'react-router-dom';
import style from './EnterBtn.module.css';

const EnterBtn = () => {
    return (
        <div className={style.container}>
            <div className={style.nameContainer}/>
            <button className={style.catchBtn}>
                <NavLink to='/home' className={style.linkCatch}>Catch'em all!</NavLink>
            </button>
        </div>
    )
}

export default EnterBtn;