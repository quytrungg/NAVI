import React from 'react';
import { SignUp, SignIn, StartUp, BankAccount, BankDescription } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Tabs from "./navigation/tabs";
import TabsAdmin from "./navigation/tabs";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent",
    },
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
                    "tabBarShowLabel": false,
                    "tabBarStyle":[{
                        "display": "flex"
                    },
                    null],
                    headerShown: false,
                }}
                initialRouteName={'StartUp'}>
                <Stack.Screen name="BankDescription" component={BankDescription} />
                <Stack.Screen name="StartUp" component={StartUp} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="BankAccount" component={BankAccount}/>
                <Stack.Screen name="HomeAdmin" component={TabsAdmin}/>
                <Stack.Screen name="Home" component={Tabs} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;
