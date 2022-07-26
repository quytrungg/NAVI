import React from 'react';
import { SignUp, SignIn, StartUp, BankAccount, BankDescription, Withdraw, Deposit, Loading, Password, Profile, Verification, Transfer, Search } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Tabs from "./navigation/tabs";
import TabsAdmin from "./navigation/tabsAdmin";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));

const firebaseConfig = {
    apiKey: "AIzaSyD4el1dD8ea8s9VSrlM9zH_Nu7jhFAtSrE",
    authDomain: "fir-test-6daef.firebaseapp.com",
    projectId: "fir-test-6daef",
    storageBucket: "fir-test-6daef.appspot.com",
    messagingSenderId: "623775787174",
    appId: "1:623775787174:web:8274635b31986cca88ec67",
    measurementId: "G-F3JJFHX1GL"
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
                    headerShown: false
                }}
                initialRouteName={"SignIn"}>

                <Stack.Screen name="BankDescription" component={BankDescription}/>
                <Stack.Screen name="StartUp" component={StartUp}/>
                <Stack.Screen name="SignUp" component={SignUp}/>
                <Stack.Screen name="SignIn" component={SignIn}/>
                <Stack.Screen name="BankAccount" component={BankAccount}/>
                <Stack.Screen name="HomeAdmin" component={TabsAdmin}/>
                <Stack.Screen name="Home" component={Tabs}/>
                <Stack.Screen name="Loading" component={Loading}/>
                <Stack.Screen name="Withdraw" component={Withdraw}/>
                <Stack.Screen name="Deposit" component={Deposit}/>
                <Stack.Screen name="Password" component={Password}/>
                <Stack.Screen name="Profile" component={Profile}/>
                <Stack.Screen name="Verification" component={Verification}/>
                <Stack.Screen name="Transfer" component={Transfer}/>
                <Stack.Screen name="Search" component={Search}/>
            </Stack.Navigator>
        </NavigationContainer>
        
    )
}

export default App;