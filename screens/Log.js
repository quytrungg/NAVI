import React, {useEffect, useState} from "react";
import { SafeAreaView, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, StatusBar, ScrollView, StyleSheet, Dimensions } from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import { LinearGradient } from 'expo-linear-gradient';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

const Log = ({navigation, route}) => {

    function renderLogo(){
        return (
            <View style={{flexDirection: 'row', marginVertical: SIZES.padding * 2}}>
                <View   style={{flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center'}}>
                    <Text style={{...FONTS.h1, color: COLORS.blueprim}}>Acitivity Log</Text>
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


  function renderTransaction(){
    const [transactionList, getTransactionList] = useState([]);
    useEffect(() => {
        const getTransactionList_ = async () => {
            await firebase
                .firestore()
                .collection("transaction-history")
                .where("senderID", "==", route.params.phoneNumber)
                .orderBy("ID", "desc")
                .limit(10)
                .get()
                .then((snapshot) => {
                    if (snapshot != undefined) {
                        var list = [], i = 1
                        snapshot.forEach((doc) => {
                            var element = {}
                            element.ID = i++;
                            element.description = doc.data().message;
                            element.senderID = doc.data().senderID;
                            element.amount = doc.data.balanceChange;
                            element.icon = doc.data().type == "Withdraw" ? images.withdraw : (doc.data().type == "Deposit" ? images.deposit : images.transfer);
                            element.date = doc.data().date;
                            list.push(element)
                        })
                        getTransactionList(list)
                    } else {
                        console.log("does not exist");
                    }
                })
        }
        getTransactionList_()
    }, []);
    return(
      <View>
          {transactionList.map(data =>{
              return(
                    <TouchableOpacity key={data.ID} 
                                onPress={() =>console.log("work")}>
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
                            <Text style={{color: COLORS.black, ...FONTS.h4}}>{data.description}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: COLORS.black, ...FONTS.body4}}>{data.date}</Text>
                                <Text style={{color: '#2B7A0B', ...FONTS.h4, marginLeft: widthScreen - 270, top: -10}}>{data.amount}</Text>
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

export default Log;