import React, {useState} from "react";
import {View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView, Platform, Alert} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const Loading = ({navigation}) => {

  function renderLogo(){
    return(
      <View style={{marginTop: SIZES.padding * 33, 
                    height: 90, 
                    alignItems: 'center', 
                    justifyContent: 'center'}}>
        <Image  source={images.navilogo} 
                resizeMode="contain" 
                style={{width: "65%"}}/>
      </View>
    )
  }
  
  function renderButton(){
    return(
      <View style={{ margin: SIZES.padding * 10 }}>
        <TouchableOpacity style={{height: 60,
                                  width: 180,
                                  alignSelf: "center",
                                  alignItems: 'center',
                                  justifyContent: 'center'}}
                          onPress={() => navigation.navigate("HomeAdmin")}>
          <Text style={{color: COLORS.blueprim, ...FONTS.h4}}>Loading...</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return(
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
                          style={{flex: 1}}>
      <LinearGradient colors={[COLORS.blueback, COLORS.blueback]}
                      style={{flex: 1}}>
        <ScrollView>
          {renderLogo()}
          {renderButton()}
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

export default Loading;
