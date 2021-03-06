import { AnyAction, Dispatch } from "redux";
import { IUserConsumption, IProduct, IDietItem } from "./models";

/**
 * Possible actions I will be taking into consideration.
 */
enum ActionType {
    ProductsAdded = "Products_Added",
    UserEatItem = "Yum_Yum_Yum",
    LoadingInfo = "DisplayLoading",
    LoadingDone = "HideLoading",
}

/**
 * General shape of actions to pass to @see userConsumptionReducer
 */
interface IConsumedAction extends AnyAction {
    type: ActionType;
    item: IProduct;
    amount: number;
}

const initialUserConsumption: IUserConsumption = { consumedItems: [], totalEnergyIntake: 0 };
/**
 * Affects the current consumed items by the user.
 * @param state current consumed products
 * @param action indicates which product has been newly added to the consumed list.
 */
const userConsumptionReducer = (state: IUserConsumption = initialUserConsumption, action: AnyAction): IUserConsumption => {
    const caction = action as IConsumedAction;
    if (caction.type === ActionType.UserEatItem) {
        let eaten = state.consumedItems;
        const index = eaten.findIndex((item) => item.associatedFood.Id === caction.item.Id);
        if (index !== -1) {
            const existing = eaten[index];
            const updatedDiet: IDietItem = { ...existing, quantityEaten: caction.amount };
            eaten = eaten.filter((v, i) => i !== index).concat(updatedDiet);
        } else {
            const justAte: IDietItem = { productName: caction.item.productName, associatedFood: caction.item, quantityEaten: caction.amount };
            eaten = eaten.concat(justAte);
        }
        const total = eaten.reduce((acc, a) => (a.associatedFood.energyIntake * a.quantityEaten) + acc, 0);
        return { totalEnergyIntake: total, consumedItems: eaten };
    }
    return state;
}

const initialFoodList: IProduct[] = [];
/**
 * Affects the list of available products.
 * @param state List of known products handled at this moment
 * @param action action to refresh the list or include more items.
 */
const availableProductsReducer = (state: IProduct[] = initialFoodList, action: AnyAction): IProduct[] => {
    if (action.type === ActionType.ProductsAdded) {
        return state.concat(action.payload).sort((a, b) => a.productName.localeCompare(b.productName));
    }
    return state;
}
/**
 * Affects the marker to prevent the application from loading from resources when it has
 * already loaded data from the persisted storage.
 */
const hasLoadedProductsReducer = (state: boolean = false, action: AnyAction): boolean => {
    if (action.type == ActionType.ProductsAdded) {
        return true;
    }
    return state;
}

/**
 * Affects the loading indicator.
 */
const loadingReducer = (state: boolean = false, action: AnyAction): boolean => {
    switch (action.type) {
        case ActionType.LoadingInfo:
            return true;
        case ActionType.LoadingDone:
            return false;
        default: return state;
    }
}

//**********************************************/
// Creating list of action Creators
//**********************************************/

/**
 * fetches the list of products bundled with the application.
 */
const fetchAvailableProductsActionCreator = () => (dispatch: Dispatch<any>): void => {
    dispatch({ type: ActionType.LoadingInfo });
    setTimeout(() => {
        const food = require("../res/db.json") as IProduct[];
        dispatch({ type: ActionType.ProductsAdded, payload: food });
        dispatch({ type: ActionType.LoadingDone });
    }, 3000);
}
/**
 * updates the information associated with the current diet of the user.
 * @param item product chosen by the user
 * @param quantity amount the user has consumed this item
 */
const updateDietActionCreator = (item: IProduct, quantity: number) => (dispatch: Dispatch<any>): void => {
    const action: IConsumedAction = { type: ActionType.UserEatItem, item: item, amount: quantity };
    dispatch(action);
}

export { userConsumptionReducer, availableProductsReducer, hasLoadedProductsReducer, loadingReducer, fetchAvailableProductsActionCreator, updateDietActionCreator };
