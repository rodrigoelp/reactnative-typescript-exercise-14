import * as React from "react";
import { View, Text, Button, StyleSheet, Platform, FlatList, ActivityIndicator } from "react-native";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { IProduct, IAppStore, IUserConsumption, IDietItem } from "../models";
import { fetchAvailableProductsActionCreator, updateDietActionCreator } from "../reducers";
import { Snack } from "./snack";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 40
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: "center",
        margin: 10,
    },
});

interface IAppProps {
    hasEatenAnythingToday: boolean;
    totalIntake: number;
    availableProducts: IProduct[];
    consumed: IDietItem[],
    hasLoadedProducts: boolean;
    isLoading: boolean;
}

interface IAppActions {
    fetchProducts: () => any;
    updateUserDiet: (product: IProduct, qty: number) => any;
}

type AppProps = IAppProps & IAppActions;

class App extends React.Component<AppProps> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        // if you comment this if statement, you will get warning when binding the list because the items
        // will be added multiple times as you launch the application over and over and over again.
        // this will save some time when displaying the application for the very first time.
        if (this.props.hasLoadedProducts)
            return;
        this.props.fetchProducts();
    }

    public render() {
        const energyForamtter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 24 }}>
                    Today's Status
                </Text>
                <Text style={{ textAlign: "right", marginHorizontal: 40, marginBottom: 24 }}>
                    You have consumed today:{"\n"}
                    <Text style={{ fontSize: 24 }}>
                        {energyForamtter.format(this.props.totalIntake)} / {energyForamtter.format(8700)}kJ
                    </Text>
                </Text>
                <FlatList
                    ListHeaderComponent={this.renderHeader}
                    ListEmptyComponent={this.renderEmptyList}
                    data={this.props.availableProducts}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={(item: IProduct) => item.productName}
                />
            </View>
        );
    }

    private renderEmptyList = () => {
        return <Text>Please wait a sec while we load delicious treats.</Text>;
    }

    private renderHeader = () => {
        return (
            <View style={{ flex: 1 }}>
                <ActivityIndicator size="large" hidesWhenStopped={true} animating={this.props.isLoading} style={{ alignSelf: "center" }} />
                <Text style={styles.welcome}>What have you eaten today?</Text>
            </View>
        );
    }

    private renderItem = (item: IProduct) => {
        const consumedItem = this.props.consumed.find(c => c.associatedFood.Id === item.Id);
        return (
            <Snack product={item} consumed={consumedItem} updated={this.handleSnackUpdated} />
        )
    }

    private handleSnackUpdated = (product: IProduct, qty: number) => {
        this.props.updateUserDiet(product, qty);
    }
}

const mapStateToProps = (state: IAppStore): IAppProps => {
    return {
        hasEatenAnythingToday: state.userInfo.totalEnergyIntake !== 0,
        totalIntake: state.userInfo.totalEnergyIntake,
        consumed: state.userInfo.consumedItems,
        availableProducts: state.availableProducts,
        hasLoadedProducts: state.hasLoadedProducts,
        isLoading: state.isLoading,
    };
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IAppActions => {
    return bindActionCreators({
        fetchProducts: fetchAvailableProductsActionCreator,
        updateUserDiet: updateDietActionCreator,
    }, dispatch);
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export { AppContainer };