import React, {useState, useEffect} from "react";
import { SafeAreaView, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, StatusBar, ScrollView, TextInput, Dimensions } from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../../constants"
import { LinearGradient } from 'expo-linear-gradient';
import moment from "moment";
import styles from "./styles";
import messages from "./messages";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const ViewAdmin = ({navigation}) => {

    const [userList, getUserList] = useState([]);
    
    async function trackUserHistory(text) {
        var list = []
            await firebase
                .firestore()
                .collection("transaction-history")
                .where("senderID", "==", text)
                .orderBy("ID", "desc")
                .limit(10)
                .get()
                .then((snapshot) => {
                    if (snapshot != undefined) {
                        snapshot.forEach((doc) => {
                            list.push({
                                ID: moment(doc.data().date),
                                description: doc.data().message,
                                senderID: doc.data().senderID,
                                amount: doc.data().balanceChange,
                                icon: doc.data().type == "Withdraw" ? images.withdraw : (doc.data().type == "Deposit" ? images.deposit : images.transfer),
                                date: doc.data().date
                            })
                        })
                    } else {
                        console.log("does not exist");
                    }
                })
                await firebase
                    .firestore()
                    .collection("transaction-history")
                    .where("recipientID", "==", text)
                    .orderBy("ID", "desc")
                    .limit(10)
                    .get()
                    .then((snapshot) => {
                        if (snapshot != undefined) {
                            snapshot.forEach((doc) => {
                                list.push({
                                    ID: moment(doc.data().date),
                                    description: doc.data().message,
                                    senderID: doc.data().recipientID,
                                    amount: doc.data().balanceChange,
                                    icon: doc.data().type == "Withdraw" ? images.withdraw : (doc.data().type == "Deposit" ? images.deposit : images.transfer),
                                    date: doc.data().date
                                })
                            })
                        } else {
                            console.log("does not exist");
                        }
                    })
                getUserList([...list].sort((a, b) => a.ID.isBefore(b.ID, "second") ? 1 : -1,))
    }

  function renderHeader(){
      return (
        <View style={{flexDirection: 'row', marginTop: SIZES.padding * 2}}>
            <TouchableOpacity style={{marginTop: SIZES.padding * 1,
                                    marginLeft: SIZES.padding * 1.5}} 
                          onPress={() => navigation.goBack()}>
                <Image  source={icons.back} 
                        resizeMode="contain" 
                        style={{width: 20, 
                                height: 20, 
                                tintColor: COLORS.black}}/>
            </TouchableOpacity>
            <View>
                <TextInput  style={{paddingHorizontal: SIZES.padding * 3.5,
                                    backgroundColor: COLORS.white,
                                    marginLeft: SIZES.padding * 1.5,
                                    borderColor: COLORS.black,
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    height: 40,
                                    width: 310,
                                    ...FONTS.bdoy3}}
                            placeholder ="Search by phone number"
                            placeholderTextColor={COLORS.gray}
                            onChangeText = {(text) => trackUserHistory(text)} />

            </View>
            <TouchableOpacity onPress={() => console.log("Search")}>
            <Image  source={icons.search}
                    resizeMode="contain"
                    style={{width: 20, height: 20, tintColor: COLORS.gray, marginTop: SIZES.padding * 1, marginLeft: -300}}/>
            </TouchableOpacity>
        </View>
      );
  }

  function renderSource(){
      return(
          <View>
              <View style={{flexDirection: 'row', marginTop: SIZES.padding * 5,
                          paddingHorizontal: SIZES.padding * 2}}>
                  <View style={{flex: 1}}>
                      <Text style={{...FONTS.h3}}>Results</Text>
                  </View>
                  <TouchableOpacity onPress={() => console.log("View All")}>
                      <Text style={{color: COLORS.gray, ...FONTS.body4}}>View All</Text>
                  </TouchableOpacity>
              </View>
          </View>
      )
  }

  function renderUsers(){
        return(
        <View>
            {userList.map(data =>{
                return(
                    <TouchableOpacity key={data.ID} onPress={() => {console.log('worked')}}>
                        <View   style={{borderWidth: 1,
                                    borderColor: COLORS.blueprim,
                                    borderRadius: 10,
                                    backgroundColor: COLORS.white,
                                    marginHorizontal: 20,
                                    marginTop: 10}}>
                            <View style={{flexDirection: 'row', paddingVertical: 10, marginRight: 70}}>
                                <Image  source={data.icon}
                                                resizeMode="contain" 
                                                style={{width: 50,
                                                        height: 80,
                                                        marginLeft: 15, alignSelf: 'center', tintColor: COLORS.bluesec}}/>
                                <View style={{flexDirection: 'column', alignSelf: 'center', marginLeft: 15}}>
                                    <Text style={{color: COLORS.black, ...FONTS.h4,}}>ID: {data.senderID}</Text>
                                    <Text style={{color: COLORS.black, ...FONTS.h4,}}>Amount: {data.amount}</Text>
                                    <Text style={{color: COLORS.black, ...FONTS.body4}}><Text style={{fontFamily: "Roboto-Bold"}}>Message:</Text> {data.description}</Text>
                                    <Text style={{color: COLORS.black, ...FONTS.body4}}><Text style={{fontFamily: "Roboto-Bold"}}>Date/Time:</Text> {data.date}</Text>
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
              {renderHeader()}
          </SafeAreaView>
          <ScrollView>
              {renderSource()}
              {renderUsers()}
          </ScrollView>
          <SafeAreaView>
          </SafeAreaView>
      </LinearGradient>
      </KeyboardAvoidingView>
  )
}

export default ViewAdmin;