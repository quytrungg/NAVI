import React, {useState} from "react";
import {View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView, Platform, SafeAreaView, StatusBar, Alert} from "react-native";
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, SIZES, FONTS, icons, images } from "../constants"

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const SignUp = ({ navigation }) => {
  var state = {
    fakeEmail: "",
    password: "",
    email: "",
    phoneNumber: "",
    name: "",
    dob: "",
    balance: 500000,
    role: "",
  };

  const [showPassword, setShowPassword] = useState(false);

  function renderHeader(){
    return (
      <TouchableOpacity style={{flexDirection: 'row', 
                                alignItems: "center", 
                                marginTop: SIZES.padding * 1,
                                paddingHorizontal: SIZES.padding * 2}} 
                        onPress={() => navigation.navigate("SignIn")}>
        <Image  source={icons.back} 
                resizeMode="contain" 
                style={{width: 15, 
                        height: 15, 
                        tintColor: COLORS.black}}/>
        <Text style={{marginLeft: SIZES.padding / 2, 
                      color: COLORS.black, 
                      ...FONTS.h4}}>Sign In</Text>
        </TouchableOpacity>
    );
  }

  function renderLogo(){
    return (
      <View style={{marginTop: SIZES.padding * 5, 
                    height: 90, 
                    alignItems: 'center', 
                    justifyContent: 'center'}}>
        <Image  source={images.navilogo} 
                resizeMode="contain" 
                style={{width: "60%"}}/>
      </View>
    );
  }

  function handleEmailInput(text){
    
  }

  function handlePasswordInput(text){
    
  }

  function handleName (){
    
  }

  function handlePhoneNumber(phoneNumber) {
    state.phoneNumber = phoneNumber;
    state.fakeEmail = phoneNumber + "@gmail.com";
  }

  function renderForm(){
    return (
      <View style={{marginTop: SIZES.padding * 3, 
                    marginHorizontal: SIZES.padding * 3}}>
        {/* Full Name */}
        <View style={{ marginTop: SIZES.padding * 3 }}>
          <Text style={{color: COLORS.black, ...FONTS.body3 }}>Full Name</Text>
          <TextInput  style={{marginVertical: SIZES.padding, 
                            borderBottomColor: COLORS.black, 
                            borderBottomWidth: 1, height: 40, 
                            color: COLORS.black, 
                            ...FONTS.body3}} 
                      placeholder="Enter Full Name" 
                      placeholderTextColor={COLORS.gray} 
                      selectionColor={COLORS.black}
                      onChangeText={(name) => (state.name = name)}/>
        </View>
        {/* Phone Number */}
        <View style={{marginTop: SIZES.padding * 2}}>
          <Text style={{color: COLORS.black, ...FONTS.body3 }}>Phone Number</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput  style={{flex: 1,
                                marginVertical: SIZES.padding,
                                borderBottomColor: COLORS.black,
                                borderBottomWidth: 1,
                                height: 40,
                                color: COLORS.black,
                                ...FONTS.body3}}
                        keyboardType="number-pad"
                        maxLength={11}
                        placeholder="Enter Phone Number"
                        placeholderTextColor={COLORS.gray}
                        selectionColor={COLORS.black}
                        onChangeText={(phoneNumber) => (state.phoneNumber = phoneNumber)}/>
          </View>
        </View>
        {/* Email */}
        <View style={{marginTop: SIZES.padding * 2}}>
          <Text style={{ color: COLORS.black, ...FONTS.body3 }}>Email</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput  style={{flex: 1,
                                marginVertical: SIZES.padding,
                                borderBottomColor: COLORS.black,
                                borderBottomWidth: 1,
                                height: 40,
                                color: COLORS.black,
                                ...FONTS.body3}}
                        placeholder="Enter Email"
                        placeholderTextColor={COLORS.gray}
                        selectionColor={COLORS.black}
                        onChangeText={(email) => (state.email = email)}/>
          </View>
        </View>
        {/* Password */}
        <View style={{ marginTop: SIZES.padding * 2 }}>
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

  function handleSignUp(){
    const {
      password,
      email,
      phoneNumber,
      name,
      dob,
      balance,
      role,
    } = state;
    console.log(email);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("user")
          .doc(firebase.auth().currentUser.uid)
          .set({
            email,
            phoneNumber,
            name,
            balance,
          });
        console.log(result);
        console.log(firebase.auth().currentUser.uid);
        navigation.navigate("BankAccount");
      })
      .catch((error) => {
        console.log(error);
        if(state.email == "" || state.phoneNumber == "" || state.name == "" || state.password == ""){
          Alert.alert(
            "Error",
            "Some of the information is empty. Please try again",
            [
              {
                text: "Retry",
                onPress: () => {
                    handleSignUp();
                },
              },
              {
                text: "OK",
              },
            ]
          );
        }
        else{
          Alert.alert(
            "Error",
            "There are errors while signing up. Please try again",
            [
              {
                text: "Try again",
                onPress: () => {
                    handleSignUp();
                },
              },
              {
                text: "OK",
              },
            ]
          );
          }
      });
  };

  function renderButton() {
    return(
      <View style={{margin: SIZES.padding * 2}}>
        <TouchableOpacity style={{height: 60,
                                  width: 180,
                                  alignSelf: "center",
                                  backgroundColor: COLORS.bluesec,
                                  borderRadius: SIZES.radius / 1.5,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderColor: COLORS.blueprim}}
                          onPress={() => handleSignUp()}>
          <Text style={{color: COLORS.white, ...FONTS.h3}}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
                          style={{flex: 1}}>
      <LinearGradient colors={[COLORS.blueback, COLORS.blueback]} 
                      style={{flex: 1}}>
        <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
        <SafeAreaView>
          {renderHeader()}
        </SafeAreaView>
        <ScrollView>
          {renderLogo()}
          {renderForm()}
          {renderButton()}
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

export default SignUp;
