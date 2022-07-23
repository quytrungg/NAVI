import React, {useState} from "react";
import { SafeAreaView, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, StatusBar, ScrollView, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { COLORS, SIZES, FONTS, icons } from "../constants"
import { LinearGradient } from 'expo-linear-gradient';
import CurrencyInput from 'react-native-currency-input';

const Deposit = ({navigation}) => {

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
                      ...FONTS.h4}}>Home</Text>
        </TouchableOpacity>
    );
  }

  function renderLogo(){
    return (
        <View style={{flexDirection: 'row', marginVertical: SIZES.padding * 2}}>
            <View   style={{flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'}}>
                <Text style={{...FONTS.h1, color: COLORS.blueprim}}>Deposit Money</Text>
            </View>
        </View>
    )
  }

  const [value, setValue] = useState(0); 

  function renderForm(){

    return (
        <View style={{  borderWidth: 1,
                        borderColor: COLORS.blueprim,
                        borderRadius: 10,
                        backgroundColor: COLORS.white,
                        marginHorizontal: 10,
                        paddingVertical: 10,
                        marginTop: 10}}>
            <View style={{marginTop: SIZES.padding * 3, 
                            marginHorizontal: SIZES.padding * 3}}>
                <View style={{marginTop: SIZES.padding * 1}}>
                <Text style={{color: COLORS.black, ...FONTS.body3}}>Deposit Amount</Text>
                <View style={{ flexDirection: 'row' }}>
                    <CurrencyInput  style={{flex: 1,
                                        marginVertical: SIZES.padding,
                                        paddingHorizontal: SIZES.padding,
                                        borderColor: COLORS.black,
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        height: 50,
                                        ...FONTS.body3}}
                                keyboardType="number-pad"
                                maxLength={15}
                                placeholder = "e.g 500.000 VND"
                                placeholderTextColor={COLORS.gray}
                                value = {value}
                                onChangeValue = {setValue}
                                separator = "."
                                suffix = " VND"
                                precision = {value >= 1000 && 0}/>
                </View>
                </View>
            </View>
        </View>
    )
  }

    function handleDeposit(){
        if(value <= 0){
            Alert.alert(
                "Warning",
                "Withdraw amount cannot be 0!",
                [
                    {
                        text: "OK",
                    },
                ]
            );
        }
        else{
            navigation.navigate("Verification");
        }
    }

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
                          onPress={() => handleDeposit()}>
          <Text style={{color: COLORS.white, ...FONTS.h3}}>Deposit</Text>
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

export default Deposit;