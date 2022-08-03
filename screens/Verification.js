import React from "react";
import { SafeAreaView, Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar} from "react-native";
import { COLORS, SIZES, FONTS, images } from "../constants";
import {ScrollView} from 'react-native-gesture-handler';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const Verification = ({navigation, route}) => {
    const styles = StyleSheet.create({ 
        image: {
            marginBottom: 10,
            justifyContent: 'center',
            width: 200,
            height: 200,
            borderRadius: 150,
        },
        header: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            marginTop: 10,
        },
        titleBox: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            marginTop: 30,
        },
        title: {
            ...FONTS.h1,
            color: COLORS.bluetext,
        },
        inforText: {
            ...FONTS.h4,
            color: COLORS.gray,
        },
        otpBlock: {
            backgroundColor: "#F5F4F2", 
            fontWeight: '600',
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: 20,
            height: 60,
            width: '10%',
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: 'gray',
        },
        confirmButton: {
            borderColor: COLORS.blueprim,
            backgroundColor: COLORS.bluesec,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            width: 180,
            height: 60,
            borderRadius: SIZES.radius / 1.5,
        },
        confirmText: {
            ...FONTS.h2, 
            color: COLORS.white
        }
        
    });

    function renderImage() {
        return (
            <View style = {styles.header}>
                <Image source = {images.lock} style = {styles.image}/>
            </View>
        );
    }

    var randomOTP = {
        num1: Math.floor(Math.random() * 10),
        num2: Math.floor(Math.random() * 10),
        num3: Math.floor(Math.random() * 10),
        num4: Math.floor(Math.random() * 10),
    }

    var digit = {
        pin1: "",
        pin2: "",
        pin3: "",
        pin4: "",
    };

    function showOTP() {
        return Alert.alert(
            "Your Verification Code",
            `${randomOTP.num1}` + `${randomOTP.num2}` + `${randomOTP.num3}` + `${randomOTP.num4}`,
            [
                {
                    text: "OK",
                    style: {...FONTS.body1},
                }
            ]
        )
    }

    function showOTPTimeout(){
        setTimeout(() => {
            showOTP();
        }, 1000);
    }

    function OTP() {
        return (
            <View style = {{flex: 1}}>
                <View style = {styles.titleBox}>
                    <Text style = {styles.title}>OTP Verification</Text>
                    <Text style = {styles.inforText}>Please enter the 4-digit code on the screen</Text>
                </View>
                <View style = {{flex: 0.6, justifyContent: 'space-evenly', flexDirection: 'row', marginTop: 40}}>
                    <TextInput keyboardType = "number-pad"
                        autoFocus = {true}
                        maxLength = {1}
                        clearTextOnFocus = {true}
                        onChangeText = {(pin1) => (digit.pin1 = pin1)}
                        style = {styles.otpBlock}
                        />
                    <TextInput keyboardType = "number-pad"
                        maxLength = {1}
                        clearTextOnFocus = {true}
                        onChangeText = {(pin2) => (digit.pin2 = pin2)}
                        style = {styles.otpBlock}
                        />
                    <TextInput keyboardType = "number-pad"
                        maxLength = {1}
                        clearTextOnFocus = {true}
                        onChangeText = {(pin3) => (digit.pin3 = pin3)}
                        style = {styles.otpBlock}
                        />
                    <TextInput keyboardType = "number-pad"
                        maxLength = {1}
                        clearTextOnFocus = {true}
                        onChangeText = {(pin4) => (digit.pin4 = pin4)}
                        style = {styles.otpBlock}
                        />
                </View>
            </View>
        );
    }

    function renderButton() {
        return (
            <View style = {{marginTop: 150}}>
                <TouchableOpacity style = {styles.confirmButton} onPress={() => handleNavigation()}>
                    <Text style = {styles.confirmText}>Confirm</Text>
                </TouchableOpacity> 
            </View>
        )
    }

    function handleNavigation() {
        var flag = false;

        if(digit.pin1 == randomOTP.num1 && digit.pin2 == randomOTP.num2 && digit.pin3 == randomOTP.num3 && digit.pin4 == randomOTP.num4) {
            flag = true;
        }

        if (flag == true) {
            if (route.params.transactionType == "Withdraw" || route.params.transactionType == "Deposit") {
                var temp = 0;
                firebase
                    .firestore()
                    .collection("user")
                    .doc(route.params.phoneNumber)
                    .get()
                    .then((snapshot) => {
                        if (snapshot != undefined) {
                            temp = snapshot.data().balance + route.params.balanceChange
                        }
                    })
                    .then(() => {
                        firebase
                            .firestore()
                            .collection("user")
                            .doc(route.params.phoneNumber)
                            .update({
                                balance: temp
                            })
                    })
                firebase
                    .firestore()
                    .collection("user")
                    .doc(route.params.phoneNumber)
                    .collection("bank")
                    .doc(route.params.bankName)
                    .get()
                    .then((snapshot) => {
                        if (snapshot != undefined) {
                            temp = snapshot.data().balance - route.params.balanceChange
                        }
                    })
                    .then(() => {
                        firebase
                            .firestore()
                            .collection("user")
                            .doc(route.params.phoneNumber)
                            .collection("bank")
                            .doc(route.params.bankName)
                            .update({
                                balance: temp
                            })
                    })
                navigation.navigate("Bill", {
                    username: route.params.username,
                    phoneNumber: route.params.phoneNumber,
                    balanceChange: route.params.balanceChange,
                    transactionType: route.params.transactionType,
                    bankName: route.params.bankName,
                    bankID: route.params.bankID,
                    transcMessage: route.params.transcMessage,
                });
            }
            else {
                firebase
                    .firestore()
                    .collection("user")
                    .doc(route.params.phoneNumber)
                    .get()
                    .then((snapshot) => {
                        if (snapshot != undefined) {
                            temp = snapshot.data().balance - route.params.balanceChange
                        }
                    })
                    .then(() => {
                        firebase
                            .firestore()
                            .collection("user")
                            .doc(route.params.phoneNumber)
                            .update({
                                balance: temp
                            })
                    })
                firebase
                    .firestore()
                    .collection("user")
                    .doc(route.params.recipientPhoneNumber)
                    .get()
                    .then((snapshot) => {
                        if (snapshot != undefined) {
                            temp = snapshot.data().balance + route.params.balanceChange
                        }
                    })
                    .then(() => {
                        firebase
                            .firestore()
                            .collection("user")
                            .doc(route.params.recipientPhoneNumber)
                            .update({
                                balance: temp
                            })
                        
                            
                    })
                navigation.push("Bill", {
                    username: route.params.username,
                    phoneNumber: route.params.phoneNumber,
                    recipientUsername: route.params.recipientUsername,
                    recipientPhoneNumber: route.params.recipientPhoneNumber,
                    balanceChange: route.params.balanceChange,
                    transactionType: route.params.transactionType,
                    transcMessage: route.params.transcMessage,
                });
            }
        }
        
        else{
            Alert.alert(
                "Error",
                "Your OTP is incorrect. Please try again",
                [{
                    text: "Resend",
                    onPress: () => {
                        showOTPTimeout();
                    },
                },
                {
                    text: "OK",
                },]
            );
        }
    }

    return (
        <SafeAreaView style={{flexGrow: 1, backgroundColor: COLORS.blueback}}>
            <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
            <ScrollView>
                {renderImage()}
                {showOTPTimeout()}
                {OTP()}
                {renderButton()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Verification;