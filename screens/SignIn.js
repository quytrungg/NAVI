import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, TouchableWithoutFeedback, Image, TextInput, Modal, FlatList, KeyboardAvoidingView, ScrollView, Platform, Alert} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, FONTS, icons, images } from "../constants";
const SignIn = ({ navigation }) => {

  const [showPassword, setShowPassword] = useState(false);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

    function renderHeader() {
      return (
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center", marginTop: SIZES.padding * 6,
paddingHorizontal: SIZES.padding * 2}} onPress={() => navigation.navigate("StartUp")}>
          <Image source={icons.back} resizeMode="contain" style={{ width: 15, height: 15, tintColor: COLORS.black}}/>
          <Text style={{ marginLeft: SIZES.padding, color: COLORS.black, ...FONTS.h4 }} onPress={() => navigation.navigate("StartUp")}>Sign In</Text>
        </TouchableOpacity>
      )
    }

    function renderLogo() {
      return (
        <View style={{marginTop: SIZES.padding * 7, height: 90, alignItems: 'center', justifyContent: 'center'}}>
          <Image source={images.navilogo} resizeMode="contain" style={{width: "60%"}}/>
        </View>
      )
    }

    function renderForm() {
      return (
        <View style={{marginTop: SIZES.padding * 7, marginHorizontal: SIZES.padding * 3,}}>
          {/* Phone Number */}
          <View style={{ marginTop: SIZES.padding * 2 }}>
            <Text style={{ color: COLORS.black, ...FONTS.body3 }}>Phone Number</Text>
            <View style={{ flexDirection: 'row' }}>
              <TextInput style={{
                                flex: 1,
                                marginVertical: SIZES.padding,
                                borderBottomColor: COLORS.black,
                                borderBottomWidth: 1,
                                height: 40,
                                color: COLORS.black,
                                ...FONTS.body3
                            }}
                            keyboardType="number-pad"
                            placeholder="Enter Phone Number"
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
                        placeholderTextColor={COLORS.gray}
                        selectionColor={COLORS.black}
                        secureTextEntry={!showPassword}/>
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

    function handleForgetPassword(){
      return (
        Alert.alert('Warning','50k please! ( ͡° ͜ʖ ͡°)', 'OK')
      );
    }

    const handleSignIn = () => {
      navigation.navigate("Home");
    }

    function renderButton() {
        return (
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
                    onPress={() => handleSignIn()}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Sign In</Text>
                </TouchableOpacity>
                <View style={{ margin: SIZES.padding*2, alignSelf: "center" }}>
                  <TouchableOpacity onPress = {() => handleForgetPassword()}>
                    <Text style={{ color: COLORS.bluetext, ...FONTS.h4body, 
                    textDecorationLine: 'underline'}}>Forget password?</Text>
                  </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}>
            <LinearGradient
                colors={[COLORS.blueback]}
                style={{ flex: 1 }}>
                <ScrollView style={{backgroundColor: COLORS.blueback}}>
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