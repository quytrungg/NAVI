import React, {useState} from "react";
import { SafeAreaView, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, StatusBar, ScrollView, Alert, TextInput } from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import { LinearGradient } from 'expo-linear-gradient';
import CurrencyInput from 'react-native-currency-input';

const Modify = ({navigation, route}) => {

    var balance = 500000;

  function renderHeader(){
      return (
      <TouchableOpacity style={{flexDirection: 'row', 
                                  alignItems: "center", 
                                  marginTop: SIZES.padding * 1,
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
          <View style={{flexDirection: 'row', marginVertical: SIZES.padding * 2}}>
              <View   style={{flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center'}}>
                  <Text style={{...FONTS.h1, color: COLORS.blueprim}}>Modify Balance</Text>
              </View>
          </View>
      )
  }

  const [value, setValue] = useState(0); 

  function renderForm(){

      return (
              <View style={{marginTop: SIZES.padding * 1, marginHorizontal: SIZES.padding * 3}}>
                  
                    <View style={{marginTop: SIZES.padding * 3, paddingHorizontal: SIZES.padding * 1}}>
                        <View style={{ marginTop: SIZES.padding / 2}}>
                            <CurrencyInput  style={{flex: 1,
                                                marginBottom: SIZES.padding / 1,
                                                borderBottomColor: COLORS.blueprim,
                                                borderBottomWidth: 1,
                                                height: 50,
                                                ...FONTS.h1,
                                                color: COLORS.gray, textAlign: 'center'}}
                                        keyboardType="number-pad"
                                        placeholder = "0 VND"
                                        placeholderTextColor={COLORS.gray}
                                        value = {value}
                                        onChangeValue = {setValue}
                                        separator = "."
                                        suffix = " VND"
                                        precision = {value >= 1000 && 0}/>
                        </View>
                    </View>
                    {renderButton()}
                    <View style={{marginTop: SIZES.padding * 3}}>
                        <Text style={{color: COLORS.black, ...FONTS.body3}}>Message</Text>
                        <View style={{marginTop: SIZES.padding}}>
                            <TextInput  style={{paddingHorizontal: SIZES.padding * 1,
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                height: 190,
                                                ...FONTS.body2,
                                                borderColor: COLORS.blueprim,
                                                backgroundColor: COLORS.white}}
                                        placeholder = "Enter message"
                                        multiline={true}
                                        placeholderTextColor={COLORS.gray}/>
                        </View>
                    </View>
              </View>
      )
  }

  function renderBank(){
      const arr = [
      { password: "",
        email: "",
        phoneNumber: "route.params.recipientPhoneNumber",
        name: "route.params.recipientUsername",
        balance: 0,
      }];
      return(
      <View>
          {arr.map(data =>{
              return(
                  <View   key={data.phoneNumber} 
                          style={{borderWidth: 1,
                                  borderRadius: 10,
                                  borderColor: COLORS.blueprim,
                                  backgroundColor: COLORS.white,
                                  marginHorizontal: 15, marginTop: 10}}>
                          <View style={{flexDirection: 'row', paddingVertical: 10}}>
                              <Image  source={images.avatar}
                                              resizeMode="contain" 
                                              style={{width: 50,
                                                      height: 50,
                                                      marginLeft: 20, alignSelf: 'center'}}/>
                              <View style={{flexDirection: 'column', alignSelf: 'center', marginLeft: 20}}>
                                  <Text style={{color: COLORS.black, ...FONTS.h4, alignSelf: 'center'}}>{data.name}</Text>
                                  <Text style={{color: COLORS.black, ...FONTS.body4}}>{data.balance}</Text>
                              </View>
                          </View>
                  </View>
              )
          })}
      </View>
      )
  }

  function handleModify(value){
      if(value <= 0){
        Alert.alert(
            "Warning",
            "Modify amount cannot be 0!",
            [
                {
                    text: "OK",
                },
            ]
        );
      }
      else if(value > balance){
        Alert.alert(
            "Warning",
            "Modify amount larger than user balance",
            [
                {
                    text: "OK",
                },
            ]
        );
      }
      else{
        setTimeout(() => {
            navigation.push("HomeAdmin");
            Alert.alert(
                "Notification",
                "Modify successful",
                [
                    {
                        text: "OK",
                    },
                ]
            );
        }, 1000);
      }
  }

  function renderButton() {
      return(
          <View style={{marginTop: SIZES.padding * 5, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: SIZES.padding * 1.5}}>
              <TouchableOpacity style={{height: 60,
                                      width: 120,
                                      alignSelf: "center",
                                      backgroundColor: COLORS.white,
                                      borderRadius: 10,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      borderColor: COLORS.blueprim, borderWidth: 1}}
                              onPress={() => handleModify(-1 * value)}>
                <Image source={images.down} style={{height: 30, width: 30, tintColor: COLORS.blueprim}}/>
              </TouchableOpacity>
              <TouchableOpacity style={{height: 60,
                                      width: 120,
                                      alignSelf: "center",
                                      backgroundColor: COLORS.white,
                                      borderRadius: 10,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      borderColor: COLORS.blueprim, borderWidth: 1}}
                              onPress={() => handleModify(value)}>
                <Image source={images.up} style={{height: 30, width: 30, tintColor: COLORS.blueprim}}/>
              </TouchableOpacity>
          </View>
      )
  }

  return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{flex: 1}}>
      <LinearGradient colors={[COLORS.blueback, COLORS.blueback]} style={{flex: 1}}>
          <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
          <SafeAreaView>
              {renderHeader()}
          </SafeAreaView>
          <ScrollView>
              {renderLogo()}
              {renderBank()}
              {renderForm()} 
          </ScrollView>
          <SafeAreaView>
          </SafeAreaView>
      </LinearGradient>
      </KeyboardAvoidingView>
  )
}

export default Modify;