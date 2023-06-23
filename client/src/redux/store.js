import { createStore, applyMiddleware, compose } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import reducer from './reducer';

//Esta linea sirve para conectar con Redux Devtools
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(ThunkMiddleware))//esta linea sirve para hacer peticiones a una API / servidor
);

export default store;