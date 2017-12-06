import * as React from "react";
import { View, Text, Button } from "react-native";
import { IDietItem } from "./models";

interface ISnackProps {
    snackInfo: IDietItem;
}

class Snack extends React.Component<ISnackProps> {
    constructor(props: ISnackProps) {
        super(props);
    }

    public render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ alignSelf: "stretch", flexDirection: "row", marginHorizontal: 48, alignContent: "center" }}>
                    <Text style={{ alignItems: "stretch", flex: 1 }}>
                        {this.props.snackInfo.productName}
                    </Text>
                    <Text>{this.props.snackInfo.quantityEaten}</Text>
                </View>
                <View style={{ alignSelf: "flex-end", flexDirection: "row", marginHorizontal: 48, alignContent: "center" }}>
                    <Button title="⬆️" onPress={() => { }} />
                    <Button title="⬇️" onPress={() => { }} />
                </View>
            </View>
        );
    }
}

export { Snack };
