import style from './Loading.module.css';

const Loading = () => {
    return (
        <div className={style.container}>
            <div className={style.loader}></div>
        </div>
    )
}

export default Loading;