import * as React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { store } from "../store";
import { AppContainer } from "./app";

class AppShell extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}

export { AppShell };
