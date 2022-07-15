import React from "react";
import {View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView, Platform, Alert} from "react-native";
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, SIZES, FONTS, icons, images } from "../constants"

const BankDescription = ({navigation}) => {

  function renderHeader() {
    return (
        <TouchableOpacity   style={{flexDirection: 'row', 
                                    alignItems: "center", 
                                    marginTop: SIZES.padding * 6,
                                    paddingHorizontal: SIZES.padding * 2}} 
                            onPress={() => navigation.navigate("Admin")}>
          <Image source={icons.back} resizeMode="contain" style={{ width: 15, height: 15, tintColor: COLORS.black}}/>
          <Text style={{ marginLeft: SIZES.padding, color: COLORS.black, ...FONTS.h4 }} onPress={() => navigation.navigate("Admin")}>Back </Text>
        </TouchableOpacity>
    );
  }

  function renderLogo() {
    return (
        <View style={{marginTop: SIZES.padding * 5, height: 90, alignItems: 'center', justifyContent: 'center'}}>
          <Image source={images.navilogo} resizeMode="contain" style={{width: "60%"}}/>
        </View>
    );
  }

  const handleEmailInput = (text) => {
    return (
      Alert.alert("Notification", "finished")
    )
  }

  const handlePasswordInput = (text) => {
    return (
      Alert.alert("Notification", "finished")
    )
  }

  function handleName () {
    return(
      Alert.alert("Notification", "finished")
    );
  }

    function renderForm() {
      return (
        <View style={{marginTop: SIZES.padding * 3, marginHorizontal: SIZES.padding * 3,}}>
          {/* Full Name */}
          <View style={{ marginTop: SIZES.padding * 3 }}>
            <Text style={{ color: COLORS.black, ...FONTS.body3 }}>Full Name</Text>
              <TextInput style={{marginVertical: SIZES.padding, borderBottomColor: COLORS.black, borderBottomWidth: 1, height: 40, color: COLORS.black, ...FONTS.body3}} placeholder="Enter Full Name" placeholderTextColor={COLORS.gray} selectionColor={COLORS.black}
              onBlur = {() => handleName()}/>
          </View>
          <View style={{ marginTop: SIZES.padding * 2 }}>
            <Text style={{ color: COLORS.black, ...FONTS.body3 }}>Phone Number</Text>
            <View style={{ flexDirection: 'row' }}>
                        {/* Phone Number */}
                        <TextInput
                            style={{
                                flex: 1,
                                marginVertical: SIZES.padding,
                                borderBottomColor: COLORS.black,
                                borderBottomWidth: 1,
                                height: 40,
                                color: COLORS.black,
                                ...FONTS.body3
                            }}
                            keyboardType="number-pad"
                            maxLength={11}
                            placeholder="Enter Phone Number"
                            placeholderTextColor={COLORS.gray}
                            selectionColor={COLORS.black}
                        />
                    </View>
          </View>
          <View style={{ marginTop: SIZES.padding * 2 }}>
            <Text style={{ color: COLORS.black, ...FONTS.body3 }}>Email</Text>
            <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            style={{
                                flex: 1,
                                marginVertical: SIZES.padding,
                                borderBottomColor: COLORS.black,
                                borderBottomWidth: 1,
                                height: 40,
                                color: COLORS.black,
                                ...FONTS.body3
                            }}
                            placeholder="Enter Email"
                            onBlur = {(text) => handleEmailInput(text)}
                            placeholderTextColor={COLORS.gray}
                            selectionColor={COLORS.black}
                        />
                    </View>
          </View>
                {/* Password */}
                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.black, ...FONTS.body3 }}>Password</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.black,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.black,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Password"
                        onBlur = {(text) => handlePasswordInput(text)}
                        placeholderTextColor={COLORS.gray}
                        selectionColor={COLORS.black}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 10,
                            height: 30,
                            width: 30
                        }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={showPassword ? icons.disable_eye : icons.eye}
                            style={{
                                height: 22,
                                width: 22,
                                tintColor: COLORS.black
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function handleBankAccount(){
      navigation.navigate("Home")
    }

    function renderButton() {
        return (
            <View style={{ margin: SIZES.padding * 6 }}>
              <View style={{ margin: SIZES.padding * 2 }}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        width: 180,
                        alignSelf: "center",
                        backgroundColor: COLORS.bluesec,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: COLORS.blueprim,
                    }}
                    onPress={() => navigation.navigate("StartUp")}>
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Sign Out</Text>
                </TouchableOpacity>
              </View>
              <View style={{ margin: SIZES.padding * 1 }}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        width: 180,
                        alignSelf: "center",
                        backgroundColor: COLORS.bluesec,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: COLORS.blueprim,
                    }}
                    onPress={() => handleBankAccount()}>
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Finish</Text>
                </TouchableOpacity>
              </View>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}>
            <LinearGradient colors={[COLORS.blueback]} style={{ flex: 1 }}>
                <ScrollView style = {{backgroundColor: COLORS.blueback}}>
                    {renderHeader()}
                    {renderLogo()}
                    {renderButton()}
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default BankDescription;