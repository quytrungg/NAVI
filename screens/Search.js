import React, {useState} from "react";
import { SafeAreaView, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, TouchableHighlight, StatusBar, ScrollView, Alert, TextInput } from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import { LinearGradient } from 'expo-linear-gradient';
import CurrencyInput from 'react-native-currency-input';

const Search = ({navigation}) => {

  var balance = 500000;

  function renderHeader(){
      return (
        <View style={{flexDirection: 'row', marginTop: SIZES.padding * 2}}>
            <TouchableOpacity style={{marginTop: SIZES.padding * 1,
                                    marginLeft: SIZES.padding * 1.5}} 
                          onPress={() => navigation.goBack()}>
                <Image  source={icons.back} 
                        resizeMode="contain" 
                        style={{width: 20, 
                                height: 20, 
                                tintColor: COLORS.black}}/>
            </TouchableOpacity>
            <View>
                <TextInput  style={{paddingHorizontal: SIZES.padding * 3.5,
                                    backgroundColor: COLORS.white,
                                    marginLeft: SIZES.padding * 1.5,
                                    borderColor: COLORS.black,
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    height: 40,
                                    width: 310,
                                    ...FONTS.bdoy3}}
                            placeholder ="Search by phone number"
                            placeholderTextColor={COLORS.gray}/>
            </View>
            <TouchableOpacity onPress={() => console.log("Search")}>
            <Image  source={icons.search}
                    resizeMode="contain"
                    style={{width: 20, height: 20, tintColor: COLORS.gray, marginTop: SIZES.padding * 1, marginLeft: -300}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Scan")}>
            <Image  source={icons.scan}
                    resizeMode="contain"
                    style={{width: 20, height: 20, tintColor: COLORS.bluesec, marginTop: SIZES.padding * 1, marginLeft: -30}}
                    onPress={() => navigation.navigate("Scan")}/>
            </TouchableOpacity>
        </View>
      );
  }

  function renderSource(){
      return(
          <View>
              <View style={{flexDirection: 'row', marginTop: SIZES.padding * 5,
                          paddingHorizontal: SIZES.padding * 2}}>
                  <View style={{flex: 1}}>
                      <Text style={{...FONTS.h3}}>Results</Text>
                  </View>
                  <TouchableOpacity onPress={() => console.log("View All")}>
                      <Text style={{color: COLORS.gray, ...FONTS.body4}}>View All</Text>
                  </TouchableOpacity>
              </View>
          </View>
      )
  }

  function renderBank(){
        const arr = [
        { password: "",
        email: "",
        phoneNumber: "0935915203",
        name: "quytrungg",
        },
        { password: "",
        email: "",
        phoneNumber: "0935915204",
        name: "quytrungg",
        },
        { password: "",
        email: "",
        phoneNumber: "0935915205",
        name: "quytrungg",
        },
        { password: "",
        email: "",
        phoneNumber: "0935915206",
        name: "quytrungg",
        },
        { password: "",
        email: "",
        phoneNumber: "0935915207",
        name: "quytrungg",
        },];
        return(
        <View>
            {arr.map(data =>{
                return(
                    <TouchableOpacity key={data.phoneNumber} onPress={() => navigation.navigate("Transfer")}>
                        <View   style={{borderWidth: 1,
                                    borderColor: COLORS.blueprim,
                                    borderRadius: 10,
                                    backgroundColor: COLORS.white,
                                    marginHorizontal: 20,
                                    marginTop: 10}}>
                            <View style={{flexDirection: 'row', paddingVertical: 10}}>
                                <Image  source={images.avatar}
                                                resizeMode="contain" 
                                                style={{width: 50,
                                                        height: 50,
                                                        marginLeft: 20, alignSelf: 'center'}}/>
                                <View style={{flexDirection: 'column', alignSelf: 'center', marginLeft: 20}}>
                                    <Text style={{color: COLORS.black, ...FONTS.h3, 
                                                alignSelf: 'center'}}>{data.name}</Text>
                                    <Text style={{color: COLORS.black, ...FONTS.body4}}>{data.phoneNumber}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            })}
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
      else if(value > balance){
        Alert.alert(
          "Warning",
          "Withdraw amount is larger than balance!",
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

  return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{flex: 1}}>
      <LinearGradient colors={[COLORS.blueback, COLORS.blueback]} style={{flex: 1}}>
          <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
          <SafeAreaView>
              {renderHeader()}
          </SafeAreaView>
          <ScrollView>
              {renderSource()}
              {renderBank()}
          </ScrollView>
          <SafeAreaView>
              
          </SafeAreaView>
      </LinearGradient>
      </KeyboardAvoidingView>
  )
}

export default Search;