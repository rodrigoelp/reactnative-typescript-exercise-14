import { AnyAction, Dispatch } from "redux";
import { IUserConsumption, IFoodDescription, IDietItem } from "./models";

enum ActionType {
    ProductsAdded = "Products_Added",
    UserEatItem = "Yum_Yum_Yum",
}

interface IConsumedAction extends AnyAction {
    type: ActionType;
    item: IFoodDescription;
    amount: number;
}

const initialUserConsumption: IUserConsumption = { consumedItems: [], totalEnergyIntake: 0 };
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

const initialFoodList: IFoodDescription[] = [];
const availableFoodReducer = (state: IFoodDescription[] = initialFoodList, action: AnyAction): IFoodDescription[] => {
    if (action.type === ActionType.ProductsAdded) {
        return state.concat(action.payload);
    }
    return state;
}
//**********************************************/
// Creating list of action Creators
//**********************************************/

const fetchAvailableProductsActionCreator = () => (dispatch: Dispatch<any>): void => {
    const food = require("../res/db.json") as IFoodDescription[];
    dispatch({ type: ActionType.ProductsAdded, payload: food });
}

const updateDietActionCreator = (item: IFoodDescription, quantity: number) => (dispatch: Dispatch<any>): void => {
    const action: IConsumedAction = { type: ActionType.UserEatItem, item: item, amount: quantity };
    dispatch(action);
}

export { userConsumptionReducer, availableFoodReducer, fetchAvailableProductsActionCreator, updateDietActionCreator };
