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
  apiKey: "AIzaSyD-U8hYj3kzXCYECo_5OWvtij5qB7unRD0",
  authDomain: "instaclone-75dc2.firebaseapp.com",
  projectId: "instaclone-75dc2",
  storageBucket: "instaclone-75dc2.appspot.com",
  messagingSenderId: "886924551037",
  appId: "1:886924551037:web:f66ece62d64657abed2214",
  measurementId: "G-SRJBL28KF6",
};

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
    return(
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName={"StartUp"}>

                <Stack.Screen options={{headerShown: false}} name="BankDescription" component={BankDescription}/>
                <Stack.Screen name="StartUp" component={StartUp}/>
                <Stack.Screen name="SignUp" component={SignUp}/>
                <Stack.Screen name="SignIn" component={SignIn}/>
                <Stack.Screen name="BankAccount" component={BankAccount}/>
                <Stack.Screen name="HomeAdmin" component={TabsAdmin}/>
                <Stack.Screen name="Home" component={Tabs}/>
                <Stack.Screen name="Loading" component={Loading}/>
                <Stack.Screen name="Withdraw" component={Withdraw}/>
                <Stack.Screen name="Deposit" component={Deposit}/>
            </Stack.Navigator>
        </NavigationContainer>
        
    )
}

export default App;
