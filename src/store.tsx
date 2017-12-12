import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistCombineReducers, PersistConfig } from "redux-persist";
import { AsyncStorage } from "react-native";
import { userConsumptionReducer, availableProductsReducer, hasLoadedProductsReducer } from "./reducers";

const middleware = applyMiddleware(thunk);

const config: PersistConfig = {
    key: "root",
    storage: AsyncStorage,
};
/**
 * The reducer combination needs to generate an object similar in shape to @see IAppStore
 * so the interface can match when dealing with the state.
 */
// const reducers = combineReducers({
//     availableFood: availableProductsReducer,
//     userInfo: userConsumptionReducer
// });

const reducers = persistCombineReducers(config, {
    availableProducts: availableProductsReducer,
    userInfo: userConsumptionReducer,
    hasLoadedProducts: hasLoadedProductsReducer,
});

/**
 * Creating the store with reducers matching @see IAppStore and async action creators if required.
 */
const store = createStore(reducers, middleware);
const persistor = persistStore(store);

export { persistor, store };