import React, {useEffect, useState} from "react";
import { SafeAreaView, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, StatusBar, ScrollView, StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import { LinearGradient } from 'expo-linear-gradient';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

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


  function renderBank(){
      const arr = [
      {   id: 1,
          icon: images.transfer,
          color: COLORS.purple,
          backgroundColor: COLORS.lightpurple,
          description: "Transfer",
          amount: "-500.000 VND"
      },
      {   id: 2,
          icon: images.withdraw,
          color: COLORS.yellow,
          backgroundColor: COLORS.lightyellow,
          description: "Withdraw",
          amount: "-500.000 VND"
      },
      {   id: 3,
          icon: images.deposit,
          color: COLORS.primary,
          backgroundColor: COLORS.lightGreen,
          description: "Deposit",
          amount: "+500.000 VND"
      },
      {   id: 4,
        icon: images.deposit,
        color: COLORS.primary,
        backgroundColor: COLORS.lightGreen,
        description: "Deposit",
        amount: "+500.000 VND"
    },
    {   id: 5,
        icon: images.deposit,
        color: COLORS.primary,
        backgroundColor: COLORS.lightGreen,
        description: "Deposit",
        amount: "+500.000 VND"
    },
    {   id: 6,
        icon: images.deposit,
        color: COLORS.primary,
        backgroundColor: COLORS.lightGreen,
        description: "Deposit",
        amount: "+500.000 VND"
    },
    {   id: 7,
        icon: images.deposit,
        color: COLORS.primary,
        backgroundColor: COLORS.lightGreen,
        description: "Deposit",
        amount: "+500.000 VND"
    },
    {   id: 8,
        icon: images.deposit,
        color: COLORS.primary,
        backgroundColor: COLORS.lightGreen,
        description: "Deposit",
        amount: "+500.000 VND"
    }];
      return(
      <View>
          {arr.map(data =>{
              return(
                  <View   key={data.id} 
                          style={{borderWidth: 1,
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
                                <Text style={{color: COLORS.black, ...FONTS.h3}}>{data.description}</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{color: COLORS.black, ...FONTS.body4}}>HH:MM</Text>
                                    <Text style={{color: '#2B7A0B', ...FONTS.h4, marginLeft: 100, top: -10}}>{data.amount}</Text>
                                </View>
                            </View>
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

          </SafeAreaView>
          <ScrollView>
              {renderLogo()}
              {renderSource()}
              {renderBank()}
          </ScrollView>
          <SafeAreaView>
          </SafeAreaView>
      </LinearGradient>
      </KeyboardAvoidingView>
  )
}

export default History;