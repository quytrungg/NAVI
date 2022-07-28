import React, {useEffect, useState} from "react";
import { SafeAreaView, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, TouchableHighlight, StatusBar, ScrollView, Alert, TextInput } from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import { LinearGradient } from 'expo-linear-gradient';
import CurrencyInput from 'react-native-currency-input';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const Withdraw = ({navigation, route}) => {
    function banknameToBankicon(bankName) {
        if (bankName.substring(0, 4).toLowerCase() == "acb") {
            return images.acb;
          } else if (bankName.substring(0, 5).toLowerCase() == "bidv") {
            return bidv;
          } else if (bankName.substring(0, 2).toLowerCase() == "mb") {
            return images.mb;
          } else if (bankName.substring(0, 4).toLowerCase() == "tech") {
            return images.tech;
          } else if (bankName.substring(0, 2).toLowerCase() == "vi") {
            return images.vcb;
          } else if (bankName.substring(0, 2).toLowerCase() == "vp") {
            return images.vp;
          }
        }

        const [balance, getBalance] = useState(0);
        const [bankList, getBankList] = useState([]);
        useEffect(() => {
            const getBalance_ = async () => {
                await firebase
                    .firestore()
                    .collection("user")
                    .doc(route.params.phoneNumber)
                    .get()
                    .then((snapshot) => {
                        if (snapshot.data() != undefined) {
                            getBalance(snapshot.data().balance);
                        } else {
                            console.log("does not exist");
                        }
                    });
            }
            const getBankList_ = async () => {
                await firebase
                    .firestore()
                    .collection("user")
                    .doc(route.params.phoneNumber)
                    .collection("bank")
                    .get()
                    .then((snapshot) => {
                        if (snapshot != undefined) {
                            var list = [], i = 1
                            snapshot.forEach((doc) => {
                                var element = {}
                                element.id = i++;
                                element.icon = banknameToBankicon(doc.data().bankName);
                                element.description = doc.data().bankName;
                                element.choice = false;
                                list.push(element)
                            })
                            getBankList(list)
                        } else {
                            console.log("does not exist");
                        }
                    })
            }
            getBalance_()
            getBankList_()
        }, []);

  function renderHeader(){
      return (
      <TouchableOpacity style={{flexDirection: 'row', 
                                  alignItems: "center", 
                                  marginTop: SIZES.padding * 1,
                                  paddingHorizontal: SIZES.padding * 2}} 
                          onPress={() => navigation.goBack()}>
          <Image  source={icons.back} 
                  resizeMode="contain" 
                  style={{width: 15, 
                          height: 15, 
                          tintColor: COLORS.black}}/>
          <Text style={{marginLeft: SIZES.padding / 2, 
                      color: COLORS.black, 
                      ...FONTS.h4}}>Home</Text>
          </TouchableOpacity>
      );
  }

  function renderLogo(){
      return (
          <View style={{flexDirection: 'row', marginVertical: SIZES.padding * 2}}>
              <View   style={{flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center'}}>
                  <Text style={{...FONTS.h1, color: COLORS.blueprim}}>Withdraw Money</Text>
              </View>
          </View>
      )
  }

  function balanceDisplay(){
    var temp = balance.toString();
    for (var i = temp.length; i > 0; i -= 3){
        if(i == temp.length){
            continue;
        }
        temp = temp.substring(0, i) + "." + temp.substring(i, temp.length);
    }
    return temp + " VND";
  }

  const [value, setValue] = useState(0); 

  function renderForm(){

      return (
          <View style={{  borderWidth: 1,
                          borderColor: COLORS.blueprim,
                          borderRadius: 10,
                          backgroundColor: COLORS.white,
                          marginHorizontal: 10,
                          paddingVertical: 10,
                          marginTop: 10}}>
              <View style={{marginTop: SIZES.padding * 1, marginHorizontal: SIZES.padding * 3}}>
                  <View style={{ flexDirection: 'row', backgroundColor: "#DDDDDD", flex: 1,
                                              borderRadius: 10,
                                              height: 60 }}>
                      <Image  source={images.navilogo}
                              resizeMode="contain" 
                              style={{width: 45,
                                      height: 45,
                                      tintColor: COLORS.blueprim,
                                      alignSelf: 'center',
                                      marginLeft: 10}}/>
                      <Text style={{color: COLORS.black, ...FONTS.body3, 
                                  alignSelf: 'center', marginLeft: 10}}>Balance: </Text>
                      <TextInput style={{...FONTS.body3, bottom: 0.5}}
                                      editable={false} 
                                      value={balanceDisplay()}/>
                  </View>
                  <View style={{marginTop: SIZES.padding * 2}}>
                      <Text style={{color: COLORS.black, ...FONTS.body3}}>Withdraw Amount</Text>
                      <View style={{ flexDirection: 'row', marginTop: SIZES.padding / 2}}>
                          <CurrencyInput  style={{flex: 1,
                                              marginBottom: SIZES.padding / 1,
                                              paddingHorizontal: SIZES.padding,
                                              borderColor: COLORS.black,
                                              borderRadius: 10,
                                              borderWidth: 1,
                                              height: 50,
                                              ...FONTS.body2}}
                                      keyboardType="number-pad"
                                      placeholder = "e.g 500.000 VND"
                                      placeholderTextColor={COLORS.gray}
                                      value = {value}
                                      onChangeValue = {setValue}
                                      separator = "."
                                      suffix = " VND"
                                      precision = {value >= 1000 && 0}/>
                      </View>
                  </View>
              </View>
          </View>
      )
  }

  function renderSource(){
      return(
          <View>
              <View style={{flexDirection: 'row', marginTop: SIZES.padding * 3,
                          paddingHorizontal: SIZES.padding * 2}}>
                  <View style={{flex: 1}}>
                      <Text style={{...FONTS.h3}}>Source Money</Text>
                  </View>
                  <TouchableOpacity onPress={() => console.log("View All")}>
                      <Text style={{color: COLORS.gray, ...FONTS.body4}}>View All</Text>
                  </TouchableOpacity>
              </View>
          </View>
      )
  }

  function handleWithdraw(data){
    if(value <= 0){
        Alert.alert(
            "Warning",
            "Withdraw amount cannot be 0!",
            [
                {
                    text: "OK",
                },
            ]
        );
    }
    else if(value > balance){
        Alert.alert(
          "Warning",
          "Withdraw amount is larger than balance!",
          [
              {
                  text: "OK",
              },
          ]
        );
      }
    else{
    navigation.navigate("Verification",{
        info: data.description,
    })
    }
  }

  function renderBank(){
      return(
      <View>
          {bankList.map(data =>{
              return(
                  <View   key={data.id} 
                          style={{borderWidth: 1,
                                  borderColor: COLORS.blueprim,
                                  borderRadius: 10,
                                  backgroundColor: COLORS.white,
                                  marginHorizontal: 10,
                                  marginTop: 10}}>

                      <TouchableHighlight onPress={() => handleWithdraw(data)}
                                          style={{borderRadius: 10}}
                                          underlayColor="#DDDDDD">
                          <View style={{flexDirection: 'row', paddingVertical: 10}}>
                              <Image  source={data.icon}
                                              resizeMode="contain" 
                                              style={{width: 50,
                                                      height: 50,
                                                      marginLeft: 20, alignSelf: 'center'}}/>
                              <View style={{flexDirection: 'column', alignSelf: 'center', marginLeft: 20}}>
                                  <Text style={{color: COLORS.black, ...FONTS.h4, 
                                              alignSelf: 'center'}}>{data.description}</Text>
                                  <Text style={{color: COLORS.black, ...FONTS.body4}}>Free charge</Text>
                              </View>
                          </View>
                      </TouchableHighlight>
                  </View>
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
              {renderLogo()}
              {renderForm()}
              {renderSource()}
              {renderBank()}          
          </ScrollView>
          <SafeAreaView>
          </SafeAreaView>
      </LinearGradient>
      </KeyboardAvoidingView>
  )
}

export default Withdraw;