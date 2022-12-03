import React, {useState, useEffect} from "react";
import { SafeAreaView, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, StatusBar, ScrollView, TextInput, Dimensions } from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../../constants"
import { LinearGradient } from 'expo-linear-gradient';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const widthScreen = Dimensions.get('window').width;

const Search = ({navigation, route}) => {
    const [userList, getUserList] = useState([]);
    if (route.params.flag == true) {
        useEffect(() => {
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
                                list.push({
                                    name: doc.data().name,
                                    phoneNumber: doc.data().phoneNumber
                                })
                            })
                            getUserList(list)
                        } else {
                            console.log("does not exist");
                        }
                    })
            }
            getUserList_()
        }, []);
    }
    
    function refreshSearchUser(text) {
        firebase
            .firestore()
            .collection("user")
            .get()
            .then((snapshot) => {
                if (snapshot != undefined) {
                    var list = [], i = 1
                    snapshot.forEach((doc) => {
                        var temp = doc.data().phoneNumber
                        if (temp.substring(0, text.length) == text && (route.params.flag == false || temp != route.params.phoneNumber)) {
                            list.push({
                                name: doc.data().name,
                                phoneNumber: doc.data().phoneNumber,
                                balance: doc.data().balance
                            })
                        }
                    })
                    getUserList(list)
                } else {
                    console.log("does not exist");
                }
            })
    }

  function renderHeader(){
      return (
        <View style={{flexDirection: 'row', marginTop: widthScreen * 0.06}}>
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
                                    ...FONTS.body3}}
                            placeholder ="Search by phone number"
                            placeholderTextColor={COLORS.gray}
                            onChangeText = {(text) => refreshSearchUser(text)} />

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

  function handleNavigateUser(data){
    if(route.params.flag){
        navigation.navigate("Transfer", {
            username: route.params.username,
            phoneNumber: route.params.phoneNumber,
            recipientUsername: data.name,
            recipientPhoneNumber: data.phoneNumber,
        })
    }
    else{
        navigation.navigate("Modify", {
            recipientUsername: data.name,
            recipientPhoneNumber: data.phoneNumber,
            recipientBalance: data.balance,
        })
    }
  }

  function renderUsers(){
        return(
        <View>
            {userList.map(data =>{
                return(
                    <TouchableOpacity key={data.phoneNumber} onPress={() => handleNavigateUser(data)}>
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
                                    <Text style={{color: COLORS.black, ...FONTS.h3,}}>{data.name}</Text>
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