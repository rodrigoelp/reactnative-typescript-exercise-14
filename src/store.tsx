import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { userConsumptionReducer, availableFoodReducer } from "./reducers";

const middleware = applyMiddleware(thunk);

/**
 * The reducer combination needs to generate an object similar in shape to @see IAppStore
 * so the interface can match when dealing with the state.
 */
const reducers = combineReducers({
    availableFood: availableFoodReducer,
    userInfo: userConsumptionReducer
});

/**
 * Creating the store with reducers matching @see IAppStore and async action creators if required.
 */
const store = createStore(reducers, middleware);

export { store };