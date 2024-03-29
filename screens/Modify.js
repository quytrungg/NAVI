import React, {useState, useEffect} from "react";
import { SafeAreaView, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, StatusBar, ScrollView, Alert, TextInput, Dimensions } from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import { LinearGradient } from 'expo-linear-gradient';
import CurrencyInput from 'react-native-currency-input';
import moment from "moment";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const widthScreen = Dimensions.get('window').width;

const Modify = ({navigation, route}) => {
    const [balance, getBalance] = useState(0);
    const [value, setValue] = useState(0); 
    var mess = "";
    useEffect(() => {
        const getBalance_ = async () => {
            await firebase
                .firestore()
                .collection("user")
                .doc(route.params.recipientPhoneNumber)
                .get()
                .then((snapshot) => {
                    if (snapshot.data() != undefined) {
                        getBalance(snapshot.data().balance);
                    } else {
                        console.log("does not exist");
                    }
                });
        }
        getBalance_()
    }, []);

    function renderHeader(){
        return (
        <TouchableOpacity style={{flexDirection: 'row', 
                                    alignItems: "center", 
                                    marginTop: widthScreen * 0.05,
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
                    <Text style={{...FONTS.h1, color: COLORS.blueprim}}>Modify Balance</Text>
                </View>
            </View>
        )
    }

    function renderForm(){

        return (
                <View style={{marginTop: SIZES.padding * 1, marginHorizontal: SIZES.padding * 3}}>
                    <View>
                        <View style={{marginTop: SIZES.padding * 3, paddingHorizontal: SIZES.padding * 1}}>
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
                    </View>
                    
                    <View style={{marginTop: SIZES.padding * 3}}>
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
                                        onChangeText={(text) => mess = text}/>
                        </View>
                    </View>
                    {renderButton()}
              </View>
      )
  }

  function balanceDisplay(text){
    var temp = text.toString();
    for (var i = temp.length; i > 0; i -= 3){
        if(i == temp.length){
            continue;
        }
        temp = temp.substring(0, i) + "." + temp.substring(i, temp.length);
    }
    return temp + " VND";
}

    function renderBank(){
        const arr = [
        { password: "",
            email: "",
            phoneNumber: route.params.recipientPhoneNumber,
            name: route.params.recipientUsername,
            balance: balance,
        }];
        return(
        <View>
            {arr.map(data =>{
                return(
                    <View   key={data.phoneNumber} 
                            style={{borderWidth: 1,
                                    borderRadius: 10,
                                    borderColor: COLORS.blueprim,
                                    backgroundColor: COLORS.white,
                                    marginHorizontal: 15, marginTop: 10}}>
                            <View style={{flexDirection: 'row', paddingVertical: 10}}>
                                <Image  source={images.avatar}
                                                resizeMode="contain" 
                                                style={{width: 50,
                                                        height: 50,
                                                        marginLeft: 20, alignSelf: 'center'}}/>
                                <View style={{flexDirection: 'column', alignSelf: 'center', marginLeft: 20}}>
                                    <Text style={{color: COLORS.black, ...FONTS.h4, textAlign: 'left'}}>{data.name}</Text>
                                    <Text style={{color: COLORS.black, ...FONTS.body4, textAlign: 'left'}}>{balanceDisplay(data.balance)}</Text>
                                </View>
                            </View>
                    </View>
                )
            })}
        </View>
        )
    }

    function balanceDisplay(text){
        var temp = String(Math.abs(parseInt(text, 10)))
        for (var i = temp.length; i > 0; i -= 3){
            if(i == temp.length){
                continue;
            }
            temp = temp.substring(0, i) + "." + temp.substring(i, temp.length);
        }
        return temp + " VND";
    }

    function handleDisplay(balance){
        return (balance > 0 ? "+" : "-") + balanceDisplay((String(balance)))
    }

  function handleModify(value){
      if(value == 0){
        Alert.alert(
            "Warning",
            "Modify amount cannot be 0!");
      }
      else if(-value > balance){
        Alert.alert(
            "Warning",
            "Modify amount larger than user balance");
      }
      else{
        Alert.alert(
            "Warning",
            "Are you sure? You cannot undo this action",
            [
                {
                    text: "No",
                },
                {
                    text: "Yes",
                    onPress: () => {
                        setTimeout(() => {
                            firebase
                                .firestore()
                                .collection("user")
                                .doc(route.params.recipientPhoneNumber)
                                .update({
                                    balance: balance + value,
                                })
                                .then(() => {
                                    var newAdminLogID = 0;
                                    firebase
                                        .firestore()
                                        .collection("admin-log")
                                        .orderBy("ID", "desc")
                                        .limit(1)
                                        .get()
                                        .then((querySnapshot) => {
                                            querySnapshot.forEach((doc) => {
                                                newAdminLogID = doc.data().ID + 1
                                            })
                                        })
                                        .then(() => {
                                            firebase
                                                .firestore()
                                                .collection("admin-log")
                                                .doc(String(newAdminLogID))
                                                .set({
                                                    ID: newAdminLogID,
                                                    date: moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss'),
                                                    balanceChange: value,
                                                    targetUsername: route.params.recipientUsername,
                                                    targetPhoneNumber: route.params.recipientPhoneNumber,
                                                    type: value < 0 ? "Decrease" : "Increase",
                                                    message: mess != "" ? mess : (value < 0 ? "Decrease " + route.params.recipientUsername + "'s balance":
                                                                        "Increase " + route.params.recipientUsername + "'s balance"),
                                                })
                                                .then(() => {
                                                    firebase
                                                        .firestore()
                                                        .collection("user")
                                                        .doc(route.params.recipientPhoneNumber)
                                                        .get()
                                                        .then((snapshot) => {
                                                            firebase
                                                                .firestore()
                                                                .collection("user")
                                                                .doc(route.params.recipientPhoneNumber)
                                                                .update({
                                                                    notifCount: snapshot.data().notifCount + 1,
                                                                })
                                                        })
                                                })
                                        })
                                })
                            Alert.alert(
                                "Notification",
                                "Modify successful",
                                [
                                    {
                                        text: "OK",
                                        onPress: () => {
                                            navigation.push("HomeAdmin", {
                                                username: "admin",
                                            });
                                        }
                                    },
                                ]
                            );
                        }, 1000);
                    },
                }
            ]
        );
      }
  }

    function renderButton() {
        return(
            <View style={{marginTop: SIZES.padding * 5, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: SIZES.padding * 1.5}}>
                <TouchableOpacity style={{height: 60,
                                        width: 120,
                                        alignSelf: "center",
                                        backgroundColor: COLORS.white,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderColor: COLORS.blueprim, borderWidth: 1}}
                                onPress={() => handleModify(-1 * value)}>
                    <Image source={images.down} style={{height: 30, width: 30, tintColor: COLORS.bluesec}}/>
                </TouchableOpacity>
                <TouchableOpacity style={{height: 60,
                                        width: 120,
                                        alignSelf: "center",
                                        backgroundColor: COLORS.white,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderColor: COLORS.blueprim, borderWidth: 1}}
                                onPress={() => handleModify(value)}>
                    <Image source={images.up} style={{height: 30, width: 30, tintColor: COLORS.bluesec}}/>
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
                {renderBank()}
                {renderForm()} 
            </ScrollView>
            <SafeAreaView>
            </SafeAreaView>
        </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default Modify;