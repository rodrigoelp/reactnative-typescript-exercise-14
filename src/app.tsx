import * as React from "react";
import { View, Text, Button, StyleSheet, Platform, FlatList  } from "react-native";
import { Snack } from "./snack";
import { IDietItem } from "./models";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        marginTop: 40
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


class App extends React.PureComponent {
    private availableSnacks: string[];
    private myCurrentDiet: IDietItem[];

    constructor(props: any) {
        super(props);
        this.availableSnacks = ["Apples", "Almonds", "Popcorn", "Chocolate", "Pack of lollies", "Deep Fried Sniker", "Corn dog", "Glass of water"];
        this.myCurrentDiet = this.availableSnacks.map<IDietItem>((name: string) => ({ productName: name, quantityEaten: 0 }));
    }

    public render() {
        return (
            <View style={styles.container}>
                <FlatList
                    ListHeaderComponent={this.renderHeader}
                    data={this.myCurrentDiet}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={(item: IDietItem) => item.productName}
                />
            </View>
        );
    }

    private renderHeader = () => {
        return <Text style={styles.welcome}>What have you eaten today?</Text>
    }

    private renderItem = (item: IDietItem) => {
        return (
            <Snack snackInfo={item} />
        )
    }
}

export { App };