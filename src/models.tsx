interface IDietItem {
    productName: string;
    quantityEaten: number; 
    associatedFood: IFoodDescription;
}

interface IFoodDescription {
    Id: string;
    productName: string;
    photoUrl: string,
    energyIntake: number;
}

interface IUserConsumption {
    totalEnergyIntake: number;
    consumedItems: IDietItem[];
}

interface IAppStore {
    availableFood: IFoodDescription[];
    userInfo: IUserConsumption;
}

export { IDietItem, IFoodDescription, IAppStore, IUserConsumption };