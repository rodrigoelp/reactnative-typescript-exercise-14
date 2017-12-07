import * as React from "react";
import { View, Text, Button, StyleSheet, Platform, FlatList } from "react-native";
import { Snack } from "./snack";
import { IDietItem, IFoodDescription } from "./models";

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

interface IAppState {
    currentDiet: IDietItem[];
    totalConsumed: number;
}

class App extends React.Component<{}, IAppState> {
    constructor(props: any) {
        super(props);

        this.state = { currentDiet: [], totalConsumed: 0 };
    }

    componentDidMount() {
        const data = require("../res/db.json") as IFoodDescription[];
        this.setState({
            ... this.state,
            currentDiet: data.map<IDietItem>((x) => ({ productName: x.productName, quantityEaten: 0, associatedFood: x }))
        });
    }

    public render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 24, textAlign: "center" }}>
                    Today's Status
                </Text>
                <Text>
                    {this.renderIntakeMessage()}
                </Text>
                <FlatList
                    ListHeaderComponent={this.renderHeader}
                    ListEmptyComponent={this.renderEmptyList}
                    data={this.state.currentDiet}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={(item: IDietItem) => item.productName}
                />
            </View>
        );
    }

    private renderIntakeMessage = (): JSX.Element => {
        const energyConsumed = this.state.totalConsumed;
        if (energyConsumed > 0) {
            return (
                <Text style={{ textAlign: "center" }}>
                    <Text>You have consumed{"\n\n"}</Text>
                    <Text style={{ fontSize: 24, textAlign: "center" }}>{energyConsumed}</Text>
                </Text>
            );
        }

        return (
            <Text>
                You have not consumed anything today and you look peckish.
            </Text>
        );
    }

    private renderEmptyList = () => {
        return <Text>Please wait a sec while we load delicious treats.</Text>;
    }

    private renderHeader = () => {
        return <Text style={styles.welcome}>What have you eaten today?</Text>
    }

    private renderItem = (item: IDietItem) => {
        return (
            <Snack snackInfo={item} updated={this.handleUpdate} />
        )
    }

    private handleUpdate = (): void => {
        const total = this.state.currentDiet.reduce(
            (acc, v) => acc + (v.quantityEaten * v.associatedFood.energyIntake),
            0
        )

        this.setState({ ...this.state, totalConsumed: total });
    }
}

export { App };