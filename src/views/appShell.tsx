import * as React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { store, persistor } from "../store";
import { AppContainer } from "./app";

class AppShell extends React.Component {
    public render() {
        return (
            <PersistGate persistor={persistor}>
                <Provider store={store}>
                    <AppContainer />
                </Provider>
            </PersistGate>
        );
    }
}

export { AppShell };
