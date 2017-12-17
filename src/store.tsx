import { AsyncStorage } from "react-native";
import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { PersistConfig, persistCombineReducers, persistStore } from "redux-persist";
import { userConsumptionReducer, availableProductsReducer, hasLoadedProductsReducer, loadingReducer } from "./reducers";

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
    isLoading: loadingReducer
});

/**
 * Creating the store with reducers matching @see IAppStore and async action creators if required.
 */
const store = createStore(reducers, middleware);
const persistor = persistStore(store);

export { persistor, store };