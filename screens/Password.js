import React, {useState} from "react";
import {View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView, Platform, Alert} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const Password = ({ navigation }) => {

  var password = "";

  const [showPassword, setShowPassword] = useState(false);

  function renderHeader(){
    return(
      <TouchableOpacity style={{flexDirection: 'row', 
                                alignItems: "center",
                                marginTop: SIZES.padding * 5,
                                marginBottom: SIZES.padding,
                                paddingHorizontal: SIZES.padding * 2}}
                        onPress={() => navigation.goBack()}>
        <Image  source={icons.back} 
                resizeMode="contain" 
                style={{width: 15, 
                        height: 15, 
                        tintColor: COLORS.black}}/>
        <Text style={{marginLeft: SIZES.padding / 2,
                      color: COLORS.black, 
                      ...FONTS.h4 }}
                onPress={() => navigation.goBack()}>Back</Text>
      </TouchableOpacity>
    )
  }

  function renderLogo(){
    return(
      <View style={{marginTop: SIZES.padding * 10, 
                    height: 90, 
                    alignItems: 'center', 
                    justifyContent: 'center'}}>
        <Image  source={images.navilogo} 
                resizeMode="contain" 
                style={{width: "60%"}}/>
      </View>
    )
  }

  function handleConfirm(text){

  }

  function renderForm(){
    return (
      <View style={{marginTop: SIZES.padding * 7, 
                    marginHorizontal: SIZES.padding * 3}}>
        <View style={{marginTop: SIZES.padding * 2}}>
          <Text style={{ color: COLORS.black, ...FONTS.body3 }}>New Password</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput  style={{flex: 1,
                                marginVertical: SIZES.padding,
                                borderBottomColor: COLORS.black,
                                borderBottomWidth: 1,
                                height: 40,
                                color: COLORS.black,
                                ...FONTS.body3}}
                        placeholder="Enter Password"
                        placeholderTextColor={COLORS.gray}
                        maxLength={11}
                        selectionColor={COLORS.black}
                        onChangeText={(text) => password = text}/>
            <TouchableOpacity style={{position: 'absolute',
                                        right: 0,
                                        bottom: 10,
                                        height: 30,
                                        width: 30}}
                                onPress={() => setShowPassword(!showPassword)}>
                <Image  source={showPassword ? icons.disable_eye : icons.eye}
                        style={{height: 22,
                                width: 22,
                                tintColor: COLORS.black}}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: SIZES.padding * 2}}>
          <Text style={{ color: COLORS.black, ...FONTS.body3 }}>Confirm New Password</Text>
          <TextInput  style={{marginVertical: SIZES.padding,
                              borderBottomColor: COLORS.black,
                              borderBottomWidth: 1,
                              height: 40,
                              color: COLORS.black,
                              ...FONTS.body3}}
                      placeholder="Enter Password"
                      placeholderTextColor={COLORS.gray}
                      selectionColor={COLORS.black}
                      secureTextEntry={!showPassword}
                      onChangeText={(text) => handleConfirm(text)}/>
          <TouchableOpacity style={{position: 'absolute',
                                    right: 0,
                                    bottom: 10,
                                    height: 30,
                                    width: 30}}
                            onPress={() => setShowPassword(!showPassword)}>
            <Image  source={showPassword ? icons.disable_eye : icons.eye}
                    style={{height: 22,
                            width: 22,
                            tintColor: COLORS.black}}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  
  function renderButton(){
    return(
      <View style={{ margin: SIZES.padding * 7 }}>
        <TouchableOpacity style={{height: 60,
                                  width: 180,
                                  alignSelf: "center",
                                  backgroundColor: COLORS.bluesec,
                                  borderRadius: SIZES.radius / 1.5,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderColor: COLORS.blueprim}}
                          onPress={() => handleSignIn(randomNum())}>
          <Text style={{color: COLORS.white, ...FONTS.h3}}>Confirm</Text>
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
          {renderHeader()}
          {renderLogo()}
          {renderForm()}
          {renderButton()}
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

export default Password;
