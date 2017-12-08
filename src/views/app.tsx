import * as React from "react";
import { View, Text, Button, StyleSheet, Platform, FlatList } from "react-native";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { IProduct, IAppStore, IUserConsumption } from "../models";
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
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

interface IAppProps {
    hasEatenAnythingToday: boolean;
    totalIntake: number;
    availableProducts: IProduct[];
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
        return <Text style={styles.welcome}>What have you eaten today?</Text>
    }

    private renderItem = (item: IProduct) => {
        return (
            <Snack product={item} updated={this.handleSnackUpdated} />
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
        availableProducts: state.availableFood
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