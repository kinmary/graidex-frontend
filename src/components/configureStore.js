import { createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { AuthReducer } from './Login/AuthReducer';
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from 'redux-first-history';
import { MainReducer } from './MainReducer';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist'
import { CreateTestReducer } from './TeacherSide/CreateTest/CreateTestReducer';
import { TestOfStudentReducer } from './ReviewTest/TestOfStudentReducer';


const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({ 
    history: createBrowserHistory(),
    //other options if needed 
  });

const enhancers = [];
const isDevelopment = process.env.NODE_ENV === 'development';
if(isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__)
{
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const mainPersistConfig = {
    key: 'main',
    storage,
    whitelist: ['selectedSubjectId', 'editPage', 'createTestPage', 'studentName', 'testOfStudentPage', 'selectedTest', 'editTestPage', 'userRole']
  }

  const newTestPersistConfig = {
    key: 'createTest',
    storage,
  }

  const testPersistConfig = {
    key: 'testOfStudent',
    storage,
  }


const store = createStore (
    combineReducers({
       auth: AuthReducer,
       main: persistReducer(mainPersistConfig, MainReducer),
       createTest: persistReducer(newTestPersistConfig, CreateTestReducer),
       testOfStudent: persistReducer(testPersistConfig, TestOfStudentReducer),
       router: routerReducer
    }),

    compose(
        applyMiddleware(thunk),
        applyMiddleware(routerMiddleware),
        ...enhancers
    )
)
export const history = createReduxHistory(store);
//export default store;

export default () => {
  let persistor = persistStore(store)
    return { store, persistor }
  }