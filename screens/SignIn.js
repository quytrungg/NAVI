import React, {useState} from "react";
import {View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView, Platform, Alert, StatusBar} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const SignIn = ({ navigation }) => {
  var state = {
    phoneNumber: "",
    password: "",
  };

  const [showPassword, setShowPassword] = useState(false);

  function renderHeader(){
    return(
      <TouchableOpacity style={{flexDirection: 'row', 
                                alignItems: "center", 
                                marginTop: SIZES.padding * 6,
                                paddingHorizontal: SIZES.padding * 2}}>
        <Image  source={icons.back} 
                resizeMode="contain" 
                style={{width: 15, 
                        height: 15, 
                        tintColor: COLORS.blueback}}/>
        <Text style={{marginLeft: SIZES.padding,
                      color: COLORS.blueback, 
                      ...FONTS.h4 }}>Sign In</Text>
      </TouchableOpacity>
    )
  }

  function renderLogo(){
    return(
      <View style={{marginTop: SIZES.padding * 5, 
                    height: 90, 
                    alignItems: 'center', 
                    justifyContent: 'center'}}>
        <Image  source={images.navilogo} 
                resizeMode="contain" 
                style={{width: "60%"}}/>
      </View>
    )
  }

  function renderForm(){
    return (
      <View style={{marginTop: SIZES.padding * 7, 
                    marginHorizontal: SIZES.padding * 3}}>
        {/* Phone Number */}
        <View style={{marginTop: SIZES.padding * 2}}>
          <Text style={{ color: COLORS.black, ...FONTS.body3 }}>Phone Number</Text>
          <View style={{ flexDirection: 'row' }}>
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
                        maxLength={11}
                        selectionColor={COLORS.black}
                        onChangeText={(phoneNumber) => (state.phoneNumber = phoneNumber)}/>
          </View>
        </View>
        {/* Password */}
        <View style={{marginTop: SIZES.padding * 2}}>
          <Text style={{ color: COLORS.black, ...FONTS.body3 }}>Password</Text>
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
                      onChangeText={(password) => (state.password = password)}/>
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

  function handleForgetPassword(){
    navigation.navigate("Password")
  }

  function randomNum(){
    return Math.floor(Math.random() * 100) + 1;
  }

  function handleSignIn(num) {
    const { phoneNumber, password } = state;
    var wholedata = []
    firebase
      .firestore()
      .collection("user")
      .get()
      .then((collectionSnapshot) => {
        if (collectionSnapshot != undefined) {
          console.log("Data exists!")
          collectionSnapshot.forEach((doc) => {
            wholedata.push(doc.data())
          }) 
          for (let i = 0; i < wholedata.length; i++) {
            console.log(wholedata[i].phoneNumber)
            console.log(phoneNumber)
            if (wholedata[i].phoneNumber == phoneNumber) {
              console.log("User exists!")
              console.log(i)
              let email = wholedata[i].email;
              firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((result) => {
                  if(num % 2 == 0){
                    navigation.navigate("Loading");
                  }
                  else{
                    navigation.navigate("HomeAdmin");
                  }
                })
                .catch((error) => {
                  console.log(error);
                  Alert.alert(
                    "Error",
                    "The email or password you entered does not exist. Please try again",
                    [
                      {
                        text: "Try again",
                        onPress: () => {
                            handleSignIn(randomNum());
                        },
                      },
                      {
                        text: "OK",
                      },
                    ]
                  );
                });
            } else {
              console.log("User does not exist!")
            }
          }
        } else {
          console.log("Data does not exist!")
        }
      })
  }
  
  function renderButton(){
    return(
      <View style={{ margin: SIZES.padding * 5 }}>
        <TouchableOpacity style={{height: 60,
                                  width: 180,
                                  alignSelf: "center",
                                  backgroundColor: COLORS.bluesec,
                                  borderRadius: SIZES.radius / 1.5,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderColor: COLORS.blueprim}}
                          onPress={() => handleSignIn(randomNum())}>
          <Text style={{color: COLORS.white, ...FONTS.h3}}>Sign In</Text>
        </TouchableOpacity>
        <View style={{marginTop: SIZES.padding / 1.5,
                      marginBottom: SIZES.padding * 5, 
                      alignSelf: "center"}}>
          <TouchableOpacity onPress = {() => handleForgetPassword()}>
            <Text style={{color: COLORS.bluetext, 
                          ...FONTS.h4body, 
                          textDecorationLine: 'underline'}}>Forget password?</Text>
          </TouchableOpacity>
        </View>
        <View style={{margin: SIZES.padding / 2, flexDirection: 'row', alignSelf: "center"}}>
          <View style={{alignSelf: "center"}}>
            <Text style={{color: COLORS.bluetext, ...FONTS.h4body}}>Don't have an account? </Text>
          </View>
          <TouchableOpacity onPress = {() => navigation.navigate("SignUp")}>
            <Text style={{color: COLORS.bluesec, 
                          ...FONTS.h4, 
                          textDecorationLine: 'underline'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return(
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
                          style={{flex: 1}}>
      <LinearGradient colors={[COLORS.blueback, COLORS.blueback]}
                      style={{flex: 1}}>
        <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
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

export default SignIn;
