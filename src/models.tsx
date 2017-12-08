interface IDietItem {
    productName: string;
    quantityEaten: number; 
    associatedFood: IProduct;
}

interface IProduct {
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
    availableFood: IProduct[];
    userInfo: IUserConsumption;
}

export { IDietItem, IProduct, IAppStore, IUserConsumption };