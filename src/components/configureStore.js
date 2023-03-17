import { createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { AuthReducer } from './Login/AuthReducer';

const enhancers = [];
const isDevelopment = process.env.NODE_ENV === 'development';
if(isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__)
{
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore (
    combineReducers({
       auth: AuthReducer
    }),

    compose(
        applyMiddleware(thunk),
        ...enhancers
    )
)

export default store;