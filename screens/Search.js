import React, {useState, useEffect} from "react";
import { SafeAreaView, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, TouchableHighlight, StatusBar, ScrollView, Alert, TextInput } from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import { LinearGradient } from 'expo-linear-gradient';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const Search = ({navigation, route}) => {

    const [balance, getBalance] = useState(0);
    const [userList, getUserList] = useState([]);
    useEffect(() => {
        const getBalance_ = async () => {
            await firebase
                .firestore()
                .collection("user")
                .doc(route.params.phoneNumber)
                .get()
                .then((snapshot) => {
                    if (snapshot.data() != undefined) {
                        getBalance(snapshot.data().balance);
                    } else {
                        console.log("does not exist");
                    }
                });
        }
        const getUserList_ = async () => {
            await firebase
                .firestore()
                .collection("user")
                .where("phoneNumber", "!=", route.params.phoneNumber)
                .get()
                .then((snapshot) => {
                    if (snapshot != undefined) {
                        var list = [], i = 1
                        snapshot.forEach((doc) => {
                            var element = {}
                            element.name = doc.data().name;
                            element.phoneNumber = doc.data().phoneNumber;
                            list.push(element)
                        })
                        getUserList(list)
                    } else {
                        console.log("does not exist");
                    }
                })
        }
        getBalance_()
        getUserList_()
    }, []);

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

  function renderUsers(){
        return(
        <View>
            {userList.map(data =>{
                return(
                    <TouchableOpacity key={data.phoneNumber} onPress={() => {console.log(route.params.username,  route.params.phoneNumber); navigation.navigate("Transfer", {
                        username: route.params.username,
                        phoneNumber: route.params.phoneNumber,
                        recipientUsername: data.name,
                        recipientPhoneNumber: data.phoneNumber,
                    })}}>
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
                                                }}>{data.name}</Text>
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
              {renderUsers()}
          </ScrollView>
          <SafeAreaView>
              
          </SafeAreaView>
      </LinearGradient>
      </KeyboardAvoidingView>
  )
}

export default Search;