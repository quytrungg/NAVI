import React, {useState} from "react";
import { SafeAreaView, View, Text, Image, FlatList, TouchableOpacity, Alert, TextInput, StatusBar } from "react-native"
import { COLORS, SIZES, FONTS, icons } from "../constants"

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions/index";

const Home = ({navigation}) => {
  
  /*  var loaded = false;
  const userDocument = fetchUser(loaded);
  console.log("2.5");
  //while (loaded == false) continue;
  console.log("3");
  console.log(userDocument);*/

  var balance = 100000;
  var name = ' ';

  const featuresData = [
    {   id: 1,
        icon: icons.reload,
        color: COLORS.purple,
        backgroundColor: COLORS.lightpurple,
        description: "Withdraw"
    },
    {   id: 2,
        icon: icons.send,
        color: COLORS.yellow,
        backgroundColor: COLORS.lightyellow,
        description: "Deposit"
    },
    {   id: 3,
        icon: icons.internet,
        color: COLORS.primary,
        backgroundColor: COLORS.lightGreen,
        description: "Transfer"
    },
    {   id: 4,
        icon: icons.wallet,
        color: COLORS.red,
        backgroundColor: COLORS.lightRed,
        description: "Bank Account"
    }
]

    function handelNotification(){
      return(
        Alert.alert("Notifications", "No notifications")
      )
    }

    function renderHeader(){
        firebase
            .firestore()
            .collection("user")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.data() != undefined) {
                    name = snapshot.data().name;
                    balance = snapshot.data().balance;
                    console.log(name);
                } else {
                    console.log("does not exist");
                }
            })
    }

    function balanceDisplay(){
        var temp = balance.toString();
        for (var i = temp.length; i > 0; i -= 3){
            if(i == temp.length){
                continue;
            }
            temp = temp.substring(0, i) + "." + temp.substring(i, temp.length);
        }
        return temp + " VND";
    }

    function renderBanner(){
        const [showPassword, setShowPassword] = useState(false);
        return (
            <>
            <View style={{flexDirection: 'row', marginVertical: SIZES.padding * 2, marginBottom: SIZES.padding * 3}}>
                    <View style={{flex: 1}}>
                        <Text style={{ ...FONTS.h1, color: COLORS.blueprim }}>Welcome Back!</Text>
                        <Text style={{ ...FONTS.body2, color: COLORS.gray }}>{name}</Text>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity   style={{height: 40,
                                                    width: 40,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: COLORS.blueback,
                                                    borderColor: COLORS.bluetext,
                                                    borderWidth: 1.5}}
                                            onPress = {() => handelNotification()}>
                            <Image  source={icons.bell}
                                    style={{width: 20,
                                            height: 20,
                                            tintColor: COLORS.bluetext}}/>
                            <View   style={{position: 'absolute',
                                            top: -5,
                                            right: -5,
                                            height: 10,
                                            width: 10,
                                            backgroundColor: COLORS.red,
                                            borderRadius: 5}}>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            <View style={{ height: 120, borderRadius: 10}}>
                <View style={{flexDirection: 'row', marginBottom: SIZES.padding}}>
                    <Text style={{...FONTS.h3}}>Balance: </Text>
                    <View >
                        <TextInput style={{...FONTS.h3, marginTop: 3}}
                                    editable={false} 
                                    value={balanceDisplay()}
                                    underlineColorAndroid="transparent"
                                    secureTextEntry={!showPassword}/>
                    </View>
                    <TouchableOpacity style={{position: 'absolute',
                                            right: 0}}
                                    onPress={() => setShowPassword(!showPassword)}>
                        <Image  source={showPassword ? icons.disable_eye : icons.eye}
                                style={{height: 22,
                                        width: 22,
                                        tintColor: COLORS.black}}/>
                    </TouchableOpacity>
                </View>
                <Image  source={icons.barcode}
                        resizeMode="cover"
                        style={{width: "100%",
                                height: "80%",
                                alignSelf: "center",
                                borderRadius: 20}}/>
            </View>
            </>
        )
    }

    function randomNum(){
        return Math.floor(Math.random() * 100) + 1;
    }

    function handleFeature(item){
        //console.log(item.description)
        if(item.description == 'Withdraw'){
            navigation.navigate("Withdraw");
        }
        else if(item.description == 'Deposit'){
            navigation.navigate("Deposit");
        }
        else if(item.description == 'Bank Account'){
            navigation.navigate("BankAccount");
        }
        else if(item.description == 'Transfer'){
            var temp = randomNum();
            if(temp % 2 == 0){
                balance -= 1000000;
                //console.log(balance);
            }
            else{
                balance += 1000000;
                //console.log(balance);
            }
        }
    }

    function renderFeatures(){
        const Header = () => (
            <View style={{marginTop: SIZES.padding * 3, marginBottom: SIZES.padding * 2}}>
                <Text style={{...FONTS.h3}}>Features</Text>
            </View>
        )
        const renderItem = ({item}) => (
            <TouchableOpacity   style={{marginBottom: SIZES.padding * 2, 
                                        width: 60, alignItems: 'center'}}
                                onPress={() => handleFeature(item)}>
                <View style={{  height: 50,
                                width: 50,
                                marginBottom: 5,
                                borderRadius: 10,
                                backgroundColor: item.backgroundColor,
                                alignItems: 'center',
                                justifyContent: 'center'}}>
                    <Image  source={item.icon}
                            resizeMode="contain"
                            style={{height: 20,
                                    width: 20,
                                    tintColor: item.color}}/>
                </View>
                <Text   style={{textAlign: 'center', 
                                flexWrap: 'wrap', 
                                ...FONTS.body4 }}>{item.description}</Text>
            </TouchableOpacity>
        )

        return (
            <FlatList
                ListHeaderComponent={Header}
                data={featuresData}
                numColumns={4}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                style={{ marginTop: SIZES.padding * 2 }}
            />
        )
    }

    function renderHomeView(){
        const HeaderComponent = () => (
            <View style={{backgroundColor: COLORS.blueback}}>
                {renderHeader()}
                {renderBanner()}
                {renderFeatures()}
                {renderPromoHeader()}
            </View>
        )
        const renderPromoHeader = () => (
            <View style={{flexDirection: 'row', marginBottom: SIZES.padding}}>
                <View style={{flex: 1}}>
                    <Text style={{...FONTS.h3}}>Special Promos</Text>
                </View>
                <TouchableOpacity onPress={() => console.log("View All")}>
                    <Text style={{color: COLORS.gray, ...FONTS.body4}}>View All</Text>
                </TouchableOpacity>
            </View>

        )
        return (
            <FlatList
                ListHeaderComponent={HeaderComponent}
                contentContainerStyle={{paddingHorizontal: SIZES.padding * 3}}
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
                //pay attention to this
                ListFooterComponent={
                    <View style={{marginBottom: 80}}>
                    </View>
                }
            />
        )
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.blueback}}>
            <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
            {renderHomeView()}
        </SafeAreaView>
    )
}

export default Home;
