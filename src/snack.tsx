import * as React from "react";
import { View, Text, Button } from "react-native";
import { IDietItem } from "./models";

interface ISnackProps {
    snackInfo: IDietItem;
    updated: () => void;
}

interface ISnackState {
    quantity: number;
}

class Snack extends React.Component<ISnackProps, ISnackState> {
    constructor(props: ISnackProps) {
        super(props);

        this.state = { quantity: props.snackInfo.quantityEaten };
    }

    public render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ alignSelf: "stretch", flexDirection: "row", marginHorizontal: 48, alignContent: "center" }}>
                    <Text style={{ alignItems: "stretch", flex: 1 }}>
                        {this.props.snackInfo.productName}
                    </Text>
                    <Text>{this.state.quantity}</Text>
                </View>
                <View style={{ alignSelf: "flex-end", flexDirection: "row", marginHorizontal: 48, alignContent: "center" }}>
                    <Button title="⬆️" onPress={() => this.update(1)} />
                    <Button title="⬇️" onPress={() => this.update(-1)} />
                </View>
            </View>
        );
    }

    private update = (updateAmount: number) => {
        let quantity = this.state.quantity + updateAmount;
        if (quantity < 0) quantity = 0;

        this.setState({ ...this.state, quantity: quantity }, this.props.updated);
    }
}

export { Snack };
