import React from 'react';
import { SignUp, SignIn, StartUp, BankAccount, BankDescription, Withdraw, Deposit, Loading } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Tabs from "./navigation/tabs";
import TabsAdmin from "./navigation/tabsAdmin";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));

const firebaseConfig = {
    apiKey: "AIzaSyC3XhF93xG5JnJSzRbfl__WOnJyIK5HyCo",
    authDomain: "fir-test-c9f0a.firebaseapp.com",
    projectId: "fir-test-c9f0a",
    storageBucket: "fir-test-c9f0a.appspot.com",
    messagingSenderId: "1057415065385",
    appId: "1:1057415065385:web:5a839943956446ce51d138",
    measurementId: "G-9N3VJ0NH3Q"
};
//Tam's firebase
// apiKey: "AIzaSyC3XhF93xG5JnJSzRbfl__WOnJyIK5HyCo",
// authDomain: "fir-test-c9f0a.firebaseapp.com",
// projectId: "fir-test-c9f0a",
// storageBucket: "fir-test-c9f0a.appspot.com",
// messagingSenderId: "1057415065385",
// appId: "1:1057415065385:web:5a839943956446ce51d138",
// measurementId: "G-9N3VJ0NH3Q"

//Cien's firebase
// apiKey: "AIzaSyD-U8hYj3kzXCYECo_5OWvtij5qB7unRD0",
// authDomain: "instaclone-75dc2.firebaseapp.com",
// projectId: "instaclone-75dc2",
// storageBucket: "instaclone-75dc2.appspot.com",
// messagingSenderId: "886924551037",
// appId: "1:886924551037:web:f66ece62d64657abed2214",
// measurementId: "G-SRJBL28KF6",

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent",
    }
};

const Stack = createStackNavigator();

const App = () => {
    const [loaded] = useFonts({
        "Roboto-Black" : require('./assets/fonts/Roboto-Black.ttf'),
        "Roboto-Bold" : require('./assets/fonts/Roboto-Bold.ttf'),
        "Roboto-Regular" : require('./assets/fonts/Roboto-Regular.ttf'),
    })
    
    if(!loaded){
    return null;
    }
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'SignUp'}
            >
                <Stack.Screen name="SignUp" component={SignUp} />

                {/* Tabs */}
                <Stack.Screen name="Home" component={Tabs} />

                {/* <Stack.Screen name="Scan" component={Scan} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
    
}

export default App;
 
