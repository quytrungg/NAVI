import React, {useState} from "react";
import { SafeAreaView, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, StatusBar, ScrollView, Alert, TextInput, Dimensions } from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import { LinearGradient } from 'expo-linear-gradient';
import CurrencyInput from 'react-native-currency-input';

const heightScreen = Dimensions.get('window').height;

const Transfer = ({navigation, route}) => {

    var balance = route.params.balance;
    const [value, setValue] = useState(0); 
    var mess = "";

    function renderHeader(){
        return (
        <TouchableOpacity style={{flexDirection: 'row', 
                                    alignItems: "center", 
                                    marginTop: heightScreen * 0.025,
                                    paddingHorizontal: SIZES.padding * 2}} 
                            onPress={() => navigation.goBack()}>
            <Image  source={icons.back} 
                    resizeMode="contain" 
                    style={{width: 15, 
                            height: 15, 
                            tintColor: COLORS.black}}/>
            <Text style={{marginLeft: SIZES.padding / 2, 
                        color: COLORS.black, 
                        ...FONTS.h4}}>Back</Text>
            </TouchableOpacity>
        );
    }

    function renderLogo(){
        return (
            <View style={{flexDirection: 'row', marginVertical: SIZES.padding * 2}}>
                <View   style={{flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'}}>
                    <Text style={{...FONTS.h1, color: COLORS.blueprim}}>Transfer Money</Text>
                </View>
            </View>
        )
    }

    function renderForm(){

        return (
                <View style={{marginTop: SIZES.padding * 1, marginHorizontal: SIZES.padding * 3}}>
                    
                        <View style={{marginTop: SIZES.padding * 2, paddingHorizontal: SIZES.padding * 1}}>
                            <View style={{ marginTop: SIZES.padding / 2}}>
                                <CurrencyInput  style={{flex: 1,
                                                    marginBottom: SIZES.padding / 1,
                                                    borderBottomColor: COLORS.blueprim,
                                                    borderBottomWidth: 1,
                                                    height: 50,
                                                    ...FONTS.h1,
                                                    color: COLORS.gray, textAlign: 'center'}}
                                            keyboardType="number-pad"
                                            placeholder = "0 VND"
                                            placeholderTextColor={COLORS.gray}
                                            value = {value}
                                            onChangeValue = {setValue}
                                            separator = "."
                                            suffix = " VND"
                                            precision = {value >= 1000 && 0}/>
                            </View>
                        </View>
                        <View style={{marginTop: SIZES.padding * 5}}>
                            <Text style={{color: COLORS.black, ...FONTS.body3}}>Message</Text>
                            <View style={{marginTop: SIZES.padding}}>
                                <TextInput  style={{paddingHorizontal: SIZES.padding * 1,
                                                    borderRadius: 10,
                                                    borderWidth: 1,
                                                    height: 190,
                                                    ...FONTS.body2,
                                                    borderColor: COLORS.blueprim,
                                                    backgroundColor: COLORS.white}}
                                            placeholder = "Enter message"
                                            multiline={true}
                                            placeholderTextColor={COLORS.gray}
                                            onChangeText = {(text) => mess = text}/>
                            </View>
                        </View>
                </View>
        )
    }

    function renderUser(){
        const arr = [
            {
                phoneNumber: route.params.recipientPhoneNumber,
                name: route.params.recipientUsername,
            }
        ];
        return(
        <View>
            {arr.map(data => {
                return (
                    <View   key={data.phoneNumber} 
                            style={{borderWidth: 1,
                                    borderRadius: 10,
                                    borderColor: COLORS.blueprim,
                                    backgroundColor: COLORS.white,
                                    marginHorizontal: 15}}>
                            <View style={{flexDirection: 'row', paddingVertical: 10}}>
                                <Image  source={images.avatar}
                                                resizeMode="contain" 
                                                style={{width: 50,
                                                        height: 50,
                                                        marginLeft: 20, alignSelf: 'center'}}/>
                                <View style={{flexDirection: 'column', alignSelf: 'center', marginLeft: 20}}>
                                    <Text style={{color: COLORS.black, ...FONTS.h3, alignSelf: 'center'}}>{data.name}</Text>
                                    <Text style={{color: COLORS.black, ...FONTS.body4}}>{data.phoneNumber}</Text>
                                </View>
                            </View>
                    </View>
                )
            })}
        </View>
        )
    }

    function handleDeposit() {
        if (value <= 0){
            Alert.alert(
                "Warning",
                "Transfer amount cannot be equal to or lower than 0!");
        }
        else if (value > balance){
            Alert.alert(
            "Warning",
            "Transfer amount is larger than balance!");
        }
        else {
            setValue(0)
            navigation.push("Verification", {
                username: route.params.username,
                phoneNumber: route.params.phoneNumber,
                recipientUsername: route.params.recipientUsername,
                recipientPhoneNumber: route.params.recipientPhoneNumber,
                balanceChange: value,
                transactionType: "Transfer",
                transcMessage: mess != "" ? mess : route.params.username + " transfers to " + route.params.recipientUsername,
            });
        }
    }

    function renderButton() {
        return(
            <View style={{margin: SIZES.padding * 0.5}}>
                <TouchableOpacity style={{height: 60,
                                        width: 180,
                                        alignSelf: "center",
                                        backgroundColor: COLORS.bluesec,
                                        borderRadius: SIZES.radius / 1.5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderColor: COLORS.blueprim}}
                                onPress={() => handleDeposit()}>
                <Text style={{color: COLORS.white, ...FONTS.h3}}>Transfer</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{flex: 1}}>
        <LinearGradient colors={[COLORS.blueback, COLORS.blueback]} style={{flex: 1}}>
            <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
            <SafeAreaView>
                {renderHeader()}
            </SafeAreaView>
            <ScrollView>
                {renderLogo()}
                {renderUser()} 
                {renderForm()} 
            </ScrollView>
            <SafeAreaView>
                {renderButton()}
            </SafeAreaView>
        </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default Transfer;