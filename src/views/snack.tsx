import * as React from "react";
import { View, Text } from "react-native";
import { Button, Avatar } from "react-native-elements";
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

        this.state = { quantity: 0 };
    }

    public render() {
        return (
            <View style={{ flex: 1, marginVertical: 24, marginHorizontal: 48, flexDirection: "row" }}>
                <Avatar source={{ uri: this.props.product.photoUrl }} avatarStyle={{ borderRadius: 4 }} large={true} />
                <View style={{ flex: 1, marginLeft: 16 }}>
                    <View style={{ alignSelf: "stretch", flexDirection: "row", alignContent: "center" }}>
                        <Text style={{ flex: 1, textAlignVertical: "bottom" }}>
                            {this.props.product.productName}
                        </Text>
                        <Text style={{ fontSize: 24 }}>{this.state.quantity}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end", flexDirection: "row", marginHorizontal: 48 }}>
                        <Button style={{ flex: 1, minWidth: 45 }} borderRadius={4} title="+" onPress={() => this.update(1)} />
                        <Button style={{ flex: 1, minWidth: 45 }} borderRadius={4} title="-" onPress={() => this.update(-1)} />
                    </View>
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
