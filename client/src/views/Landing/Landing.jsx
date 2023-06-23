import style from './Landing.module.css';
import { EnterBtn } from '../../components';

const Landing = () => {
    return (
        <div className={style.container}>
            <EnterBtn/>
        </div>
    )
}

export default Landing;