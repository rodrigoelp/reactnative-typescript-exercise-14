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

export { IDietItem, IFoodDescription };