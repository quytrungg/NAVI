import React from "react";
import { StatusBar } from 'expo-status-bar';
import {View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView, Platform} from "react-native";
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, SIZES, FONTS, images } from "../constants";

const StartUp = ({ navigation, phoneNum }) => {

    function renderHeader(){
        return (
            <TouchableOpacity style={{flexDirection: 'row', 
                                    alignItems: "center", 
                                    marginTop: SIZES.padding * 10,
                                    paddingHorizontal: SIZES.padding * 2}} 
                            onPress={() => console.log("Start Up")}>
            </TouchableOpacity>
        );
    }

    function renderLogo(){
        return (
        <View style={{marginTop: SIZES.padding * 5, 
                        height: 120, alignItems: 'center', 
                        justifyContent: 'center'}}>
            <Image source={images.navilogo} 
                resizeMode="contain" 
                style={{width: "70%"}}/>
        </View>
        );
    }

    function renderForm(){
        return (
        <View style={{marginTop: SIZES.padding * 7, 
                        marginHorizontal: SIZES.padding * 3}}>
            <View style={{marginTop: SIZES.padding * 2}}>
                <Text style={{color: COLORS.black, ...FONTS.body3}}>Phone Number</Text>
                <View style={{flexDirection: 'row'}}>
                    <TextInput  style={{flex: 1,
                                    marginVertical: SIZES.padding,
                                    borderBottomColor: COLORS.black,
                                    borderBottomWidth: 1,
                                    height: 40,
                                    color: COLORS.black,
                                    ...FONTS.body3}}
                            keyboardType="number-pad"
                            placeholder="Enter Phone Number"
                            placeholderTextColor={COLORS.gray}
                            selectionColor={COLORS.black}
                            onChangeText={(text) => phoneNum = text}/>
                </View>
            </View>
        </View>
        )
    }

  function renderButton(){
    return (
      <>
        <View style={{margin: SIZES.padding * 2}}>
          <TouchableOpacity style={{height: 60,
                                    width: 180,
                                    alignSelf: "center",
                                    backgroundColor: COLORS.bluesec,
                                    borderRadius: SIZES.radius / 1.5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderColor: COLORS.blueprim}}
                            onPress={() => navigation.navigate("SignIn")}>
            <Text style={{color: COLORS.white, ...FONTS.h3}}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View style={{margin: SIZES.padding / 10, 
                      alignSelf: "center"}}>
          <Text style={{color: COLORS.bluetext, ...FONTS.h4body}}>Don't have an account?</Text>
        </View>
        <View style={{margin: SIZES.padding / 1.5}}>
          <TouchableOpacity style={{height: 60,
                                    width: 180,
                                    alignSelf: "center",
                                    backgroundColor: COLORS.bluesec,
                                    borderRadius: SIZES.radius / 1.5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderColor: COLORS.blueprim,}}
                            onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} 
                          style={{flex: 1}}>
      <LinearGradient colors={[COLORS.blueback, COLORS.blueback]} 
                      style={{flex:1 }}>
        <ScrollView>
          {renderHeader()}
          {renderLogo()}
          {renderForm()}
          {renderButton()}
          <StatusBar style='auto'/>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

export default StartUp;
