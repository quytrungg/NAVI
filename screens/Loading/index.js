import React from "react";
import {View, Text, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform, StatusBar} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, FONTS, images } from "../../constants";

const Loading = ({navigation, route}) => {

  setTimeout(() => {
    navigation.navigate("Home", {
      username: route.params.username,
      phoneNumber: route.params.phoneNumber,
    });
  }, 1000);

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
                                  justifyContent: 'center'}}>
          <Text style={{color: COLORS.bluesec, ...FONTS.h4}}>Loading...</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return(
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{flex: 1}}>
      <LinearGradient colors={[COLORS.blueback, COLORS.blueback]} style={{flex: 1}}>
        <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
        <ScrollView>
          {renderLogo()}
          {renderButton()}
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

export default Loading;
