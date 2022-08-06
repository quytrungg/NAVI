import React, {useEffect, useState} from "react";
import { SafeAreaView, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, StatusBar, ScrollView, StyleSheet, Dimensions } from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import { LinearGradient } from 'expo-linear-gradient';
import moment from "moment";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

const History = ({navigation, route}) => {

    function renderLogo(){
        return (
            <View style={{flexDirection: 'row', marginVertical: SIZES.padding * 2}}>
                <View   style={{flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center'}}>
                    <Text style={{...FONTS.h1, color: COLORS.blueprim}}>Transaction History</Text>
                </View>
            </View>
        )
    }

    function renderSource(){
        return(
            <View>
                <View style={{flexDirection: 'row', marginTop: SIZES.padding * 3,
                          paddingHorizontal: SIZES.padding * 2, marginBottom: 5}}>
                    <View style={{flex: 1}}>
                        <Text style={{...FONTS.h4}}>Result</Text>
                    </View>
                    <TouchableOpacity onPress={() => console.log("View All")}>
                        <Text style={{color: COLORS.gray, ...FONTS.body4}}>View All</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    function balanceDisplay(text){
        temp = Math.abs(parseInt(text, 10))
        for (var i = temp.length; i > 0; i -= 3){
            if(i == temp.length){
                continue;
            }
            temp = temp.substring(0, i) + "." + temp.substring(i, temp.length);
        }
        return temp + " VND";
    }

    function handleDisplay(type, balance){
        //return balanceDisplay((String(balance)));
        return type == "Withdraw" ? ("+" + balanceDisplay((String(balance)))) : (type == "Deposit" ? ("-" + balanceDisplay(String(balance))) : balanceDisplay((String(balance))));
    }

  function renderTransaction(){
    const [transactionList, getTransactionList] = useState([]);
    useEffect(() => {
        const getTransactionList_ = async () => {
            var list = []
            await firebase
                .firestore()
                .collection("transaction-history")
                .where("senderID", "==", route.params.phoneNumber)
                .orderBy("ID", "desc")
                .limit(10)
                .get()
                .then((snapshot) => {
                    if (snapshot != undefined) {
                        snapshot.forEach((doc) => {
                            list.push({
                                ID: moment(doc.data().date),
                                senderID: doc.data().senderID,
                                senderName: doc.data().senderName,
                                amount: doc.data().type == "Transfer" ? -doc.data().balanceChange : doc.data().balanceChange,
                                icon: doc.data().type == "Withdraw" ? images.withdraw : (doc.data().type == "Deposit" ? images.deposit : images.transfer),
                                date: doc.data().date,
                                recipientID: doc.data().recipientID,
                                recipientName: doc.data().recipientName,
                                type: doc.data().type,
                                message: doc.data().message,
                                bankName: doc.data().bankName,
                                bankID: doc.data().bankID
                            })
                            
                        })
                    } else {
                        console.log("does not exist");
                    }
                })
            await firebase
                .firestore()
                .collection("transaction-history")
                .where("recipientID", "==", route.params.phoneNumber)
                .orderBy("ID", "desc")
                .limit(10)
                .get()
                .then((snapshot) => {
                    if (snapshot != undefined) {
                        snapshot.forEach((doc) => {
                            list.push({
                                ID: moment(doc.data().date),
                                senderID: doc.data().recipientID,
                                senderName: doc.data().recipientName,
                                amount: doc.data().balanceChange,
                                recipientID: doc.data().recipientID,
                                recipientName: doc.data().recipientName,
                                icon: doc.data().type == "Withdraw" ? images.withdraw : (doc.data().type == "Deposit" ? images.deposit : images.transfer),
                                date: doc.data().date,
                                type: doc.data().type,
                                message: doc.data().message,
                                bankName: doc.data().bankName,
                                bankID: doc.data().bankID
                            })
                        })
                    } else {
                        console.log("does not exist");
                    }
                })
                await firebase
                    .firestore()
                    .collection("admin-log")
                    .where("targetPhoneNumber", "==", route.params.phoneNumber)
                    .orderBy("ID", "desc")
                    .limit(10)
                    .get()
                    .then((snapshot) => {
                        if (snapshot != undefined) {
                            snapshot.forEach((doc) => {
                                list.push({
                                    ID: moment(doc.data().date),
                                    amount: doc.data().balanceChange,
                                    icon: doc.data().type == "Increase" ? images.up : images.down,
                                    date: doc.data().date,
                                    type: doc.data().type,
                                    message: doc.data().message,
                                })
                            })
                        } else {
                            console.log("does not exist");
                        }
                    })
            list = [...list].sort((a, b) => a.ID.isBefore(b.ID, "second") ? 1 : -1,)
            getTransactionList(list.slice(0, 15))
        }
        getTransactionList_()
    }, []);
    return(
      <View>
          {transactionList.map(data =>{
              return(
                    <TouchableOpacity key={moment(data.ID)} 
                                onPress={() => {
                                    if (data.type != "Increase" && data.type != "Decrease") {
                                        navigation.push("Bill", {
                                            transactionType: data.type,
                                            balanceChange: data.amount,
                                            phoneNumber: data.senderID,
                                            username: data.senderName,
                                            transcMessage: data.message,
                                            recipientPhoneNumber: data.recipientID,
                                            recipientUsername: data.recipientName,
                                            bankID: data.bankID,
                                            bankName: data.bankName,
                                            flag: false,
                                        })
                                    }
                                }}>
                        <View   style={{borderWidth: 1,
                                  borderColor: COLORS.blueprim,
                                  backgroundColor: COLORS.white,
                                  borderRadius: 5,
                                  marginHorizontal: 10,
                                  paddingVertical: 5,
                                  marginTop: 5,
                                  flexDirection:'row'}}>
                        <Image  source={data.icon}
                                style={{width: 30,
                                    height: 30,
                                    marginLeft: 20, alignSelf: 'center', tintColor: COLORS.bluesec, 
                                    resizeMode:"contain",
                                    flexDirection: 'column'}}/>
                        <View style={{flexDirection: 'column', alignSelf: 'center', marginLeft: 20}}>
                            <Text style={{color: COLORS.black, ...FONTS.h4}}>{data.message}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: COLORS.black, ...FONTS.body4}}>{data.date}</Text>
                                <Text style={{color: '#2B7A0B', ...FONTS.h4, marginLeft: widthScreen - 360}}>{handleDisplay(data.type, data.amount)}</Text>
                            </View>
                        </View>
                    </View>
                    </TouchableOpacity>
              )
            })}
            </View>
        )
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{flex: 1}}>
        <LinearGradient colors={[COLORS.blueback, COLORS.blueback]} style={{flex: 1}}>
            <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
            <SafeAreaView>
            {renderLogo()}
            </SafeAreaView>
            <ScrollView style={{flexGrow: heightScreen}}>
                {renderSource()}
                {renderTransaction()}
            </ScrollView>
        </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default History;