import React, {useEffect, useState} from "react";
import { SafeAreaView, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, StatusBar, ScrollView, Dimensions } from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../../constants"
import { LinearGradient } from 'expo-linear-gradient';
import styles from "./styles";
import messages from "./messages";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

const Log = () => {

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


  function renderLog(){
    const [logList, getLogList] = useState([]);
    useEffect(() => {
        const getLogList_ = async () => {
            await firebase
                .firestore()
                .collection("admin-log")
                .where("ID", "!=", 0)
                .orderBy("ID", "desc")
                .get()
                .then((snapshot) => {
                    if (snapshot != undefined) {
                        var list = []
                        snapshot.forEach((doc) => {
                            list.push({
                                ID: doc.data().ID,
                                date: doc.data().date,
                                amount: doc.data().balanceChange,
                                targetUsername: doc.data().targetUsername,
                                targetPhoneNumber: doc.data().targetPhoneNumber,
                                description: doc.data().message,
                                icon: doc.data().balanceChange > 0 ? images.up : images.down,
                            })
                        })
                        getLogList(list)
                    } else {
                        console.log("does not exist");
                    }
                })
        }
        getLogList_()
    }, []);
    return(
      <View>
          {logList.map(data =>{
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
                                    marginLeft: 15, alignSelf: 'center', tintColor: COLORS.bluesec, 
                                    resizeMode:"contain",
                                    flexDirection: 'column'}}/>
                        <View style={{flexDirection: 'column', alignSelf: 'center', marginLeft: 15}}>
                            <Text style={{color: COLORS.black, ...FONTS.h4, marginRight: 55}}
                                resizeMode = "contain">{data.description}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: COLORS.black, ...FONTS.body4}}>{data.date}</Text>
                                <Text style={{color: '#2B7A0B', ...FONTS.h4, marginLeft: widthScreen - 380, top: 0}}>{handleDisplay(data.amount)}</Text>
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
                {renderLog()}
            </ScrollView>
        </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default Log;