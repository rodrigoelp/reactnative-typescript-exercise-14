import * as React from "react";
import { View, Text, Button } from "react-native";
import { IProduct } from "../models";

interface ISnackProps {
    product: IProduct;
    updated: (product: IProduct, qty: number) => void;
}

interface ISnackState {
    quantity: number;
}

class Snack extends React.Component<ISnackProps, ISnackState> {
    constructor(props: ISnackProps) {
        super(props);

        this.state = { quantity: 0};
    }

    public render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ alignSelf: "stretch", flexDirection: "row", marginHorizontal: 48, alignContent: "center" }}>
                    <Text style={{ alignItems: "stretch", flex: 1 }}>
                        {this.props.product.productName}
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

        this.setState({ ...this.state, quantity: quantity },
            () => this.props.updated(this.props.product, quantity));
    }
}

export { Snack };
