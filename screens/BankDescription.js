import React, {useState} from "react";
import {View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView, Platform, Alert, StatusBar} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, FONTS, icons } from "../constants";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const BankDescription = ({navigation, route}) => {
  var state = {
    bankName: "default",
    bankID: "",
    ownerName: "",
    publishDate: "",
  };

  const [showPassword, setShowPassword] = useState(false);

  function renderHeader(){
    return (
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
                      ...FONTS.h4}}>Back</Text>
        </TouchableOpacity>
    );
  }

  function renderLogo(){
    return (
      <View style={{flexDirection: 'row', marginVertical: SIZES.padding * 3}}>
          <View   style={{flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center'}}>
              <Text style={{...FONTS.h1, color: COLORS.blueprim}}>Bank Information</Text>
          </View>
      </View>
    )
  }

  function renderForm(){
    return (
      <View style={{marginTop: SIZES.padding, 
                    marginHorizontal: SIZES.padding * 3}}>
        {/* Bank Name */}
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <Text style={{color: COLORS.black, ...FONTS.body3 }}>Bank Name</Text>
          <TextInput  style={{marginVertical: SIZES.padding, 
                            borderBottomColor: COLORS.black, 
                            borderBottomWidth: 1, height: 40, 
                            color: COLORS.black, 
                            ...FONTS.body3}} 
                      placeholder="Enter Bank Name" 
                      placeholderTextColor={COLORS.gray} 
                      selectionColor={COLORS.black}
                      value={route.params.bankName}/>
        </View>
        {/* STK */}
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <Text style={{ color: COLORS.black, ...FONTS.body3 }}>Bank ID</Text>
          <TextInput  style={{marginVertical: SIZES.padding,
                              borderBottomColor: COLORS.black,
                              borderBottomWidth: 1,
                              height: 40,
                              color: COLORS.black,
                              ...FONTS.body3}}
                      placeholder="Enter Bank ID"
                      keyboardType="number-pad"
                      placeholderTextColor={COLORS.gray}
                      selectionColor={COLORS.black}
                      secureTextEntry={!showPassword}
                      onChangeText={(bankID) => (state.bankID = bankID)}/>
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
        {/* Name */}
        <View style={{marginTop: SIZES.padding * 2}}>
          <Text style={{ color: COLORS.black, ...FONTS.body3 }}>Owner Name</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput  style={{flex: 1,
                                marginVertical: SIZES.padding,
                                borderBottomColor: COLORS.black,
                                borderBottomWidth: 1,
                                height: 40,
                                color: COLORS.black,
                                ...FONTS.body3}}
                        placeholder="Enter Name"
                        placeholderTextColor={COLORS.gray}
                        selectionColor={COLORS.black}
                        onChangeText={(ownerName) => (state.ownerName = ownerName)}/>
          </View>
        </View>
        {/* Date */}
        <View style={{marginTop: SIZES.padding * 2}}>
          <Text style={{color: COLORS.black, ...FONTS.body3 }}>Published Date</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput  style={{flex: 1,
                                marginVertical: SIZES.padding,
                                borderBottomColor: COLORS.black,
                                borderBottomWidth: 1,
                                height: 40,
                                color: COLORS.black,
                                ...FONTS.body3}}
                        maxLength={5}
                        placeholder="e.g. 03/21"
                        placeholderTextColor={COLORS.gray}
                        selectionColor={COLORS.black}
                        onChangeText={(publishDate) => (state.publishDate = publishDate)}/>
          </View>
        </View>
      </View>
    )
  }

  function handleBankLinking(){

    const {
      bankName,
      bankID,
      ownerName,
      publishDate,
    } = state;

    if (bankName == "") {
        Alert.alert(
          "Error",
          "Bank name cannot be empty. Please try again",
          [
            {
              text: "OK"
            },
          ]
        );
    }

    firebase
      .firestore()
      .collection("user")
      .doc(route.params.phoneNumber)
      .collection("bank")
      .doc(bankName)
      .get()
      .then((snapshot) => {
        console.log("Path valid!")
        if (snapshot.data() == undefined) {
          firebase
            .firestore()
            .collection("user")
            .doc(route.params.phoneNumber)
            .collection("bank")
            .doc(bankName)
            .set({
              bankName,
              bankID,
              ownerName,
              publishDate,
              balance: 10000000,
            }).then(() => {
              navigation.navigate("Home", {
                username: route.params.username,
                phoneNumber: route.params.phoneNumber,
              });
            })
        } else {
          Alert.alert(
            "Error",
            "Bank is already registered.",
            [
              {
                text: "OK",
                onPress: () => {
                  navigation.navigate("BankAccount");
              },
              },
            ]
          );
        }
      })
      .catch((error) => {
        console.log(error)
      })
  };

  function renderButton() {
    return(
      <View style={{margin: SIZES.padding * 5}}>
        <TouchableOpacity style={{height: 60,
                                  width: 180,
                                  alignSelf: "center",
                                  backgroundColor: COLORS.bluesec,
                                  borderRadius: SIZES.radius / 1.5,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderColor: COLORS.blueprim}}
                          onPress={() => handleBankLinking()}>
          <Text style={{color: COLORS.white, ...FONTS.h3}}>Confirm</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{flex: 1}}>
      <LinearGradient colors={[COLORS.blueback, COLORS.blueback]} style={{flex: 1}}>
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

export default BankDescription;