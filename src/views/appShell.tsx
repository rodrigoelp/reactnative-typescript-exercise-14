import * as React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { store } from "../store";
import { App } from "./app";

class AppShell extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

export { AppShell };
