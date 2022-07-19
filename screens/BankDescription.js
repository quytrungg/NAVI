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
                            onPress={() => navigation.navigate("HomeAdmin")}>
          <Image source={icons.back} resizeMode="contain" style={{ width: 15, height: 15, tintColor: COLORS.black}}/>
          <Text style={{ marginLeft: SIZES.padding, color: COLORS.black, ...FONTS.h4 }} onPress={() => navigation.navigate("HomeAdmin")}>Back </Text>
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

  function handleSignOut(){
    return Alert.alert(
        "Warning",
        "Are you sure you want to sign out?",
        [
          {
            text: "No",
          },
          {
            text: "Yes",
            onPress: () => {
                navigation.navigate("StartUp");
            },
          },
        ]
      );
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
                    onPress={() => handleSignOut()}>
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
            <LinearGradient colors={[COLORS.blueback, COLORS.blueback]} style={{ flex: 1 }}>
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