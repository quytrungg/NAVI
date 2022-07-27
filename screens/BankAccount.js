import React, {useState} from "react";
import {View, Text, TouchableOpacity, Image, FlatList, Alert, SafeAreaView, StatusBar} from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const BankAccount = ({navigation, route}) => {
  const bankData = [
        {   id: 1,
            icon: images.mb,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "MB Bank",
            choice: false
        },
        {   id: 2,
            icon: images.vcb,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "Vietcombank",
            choice: false
        },
        {   id: 3,
            icon: images.acb,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "ACB Bank",
            choice: false
        },
        {   id: 4,
            icon: images.vp,
            color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "VP Bank",
            choice: false
        },
        {   id: 5,
            icon: images.bidv,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "BIDV",
            choice: false
        },
        {   id: 6,
            icon: images.tech,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "Techcombank",
            choice: false
        }
    ]

    const [bank, setBank] = useState(bankData);

    function handleBackToHome(){
        return Alert.alert(
            "Warning",
            "Are you sure you want to go to Home screen?",
            [
                {
                    text: "No",
                },
                {
                    text: "Yes",
                    onPress: () => {
                        navigation.navigate("Home", {
                            username: route.params.username,
                            phoneNumber: route.params.phoneNumber,
                        });
                    },
                },
            ]
        );
    }

    function renderTop(){
        return(
          <TouchableOpacity style={{flexDirection: 'row', 
                                    alignItems: "center", 
                                    marginTop: SIZES.padding * 1}} 
                            onPress={() => handleBackToHome()}>
            <Image  source={icons.back} 
                    resizeMode="contain" 
                    style={{width: 15, 
                            height: 15, 
                            tintColor: COLORS.black}}/>
            <Text style={{marginLeft: SIZES.padding / 2,
                          color: COLORS.black, 
                          ...FONTS.h4 }}>Home</Text>
          </TouchableOpacity>
        )
      }

    function renderHeader() {
        return (
            <View style={{flexDirection: 'row', marginVertical: SIZES.padding * 2}}>
                <View   style={{flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'}}>
                    <Text style={{...FONTS.h1, color: COLORS.blueprim}}>Bank Linking</Text>
                </View>
            </View>
        )
    }

    function renderBanner() {
        return (
            <View style={{height: 120, borderRadius: 10}}>
                <View style={{ marginBottom: SIZES.padding * 2 }}>
                  <Text style={{...FONTS.h3}}>An account must at least connect to 1 bank account.</Text>
                </View>
                <Text style={{...FONTS.h3, color: COLORS.gray}}>This is a list of banks that are able to connect to the account.</Text>
            </View>
        )
    }

    function renderFeatures() {
        const Header = () => (
            <View style={{marginBottom: SIZES.padding * 2, marginTop: SIZES.padding * 1}}>
                <Text style={{...FONTS.h3}}>Banks</Text>
            </View>
        )

        function handleBank(){
            return Alert.alert(
                "Warning",
                "Select \"Next\" to link a bank account"
            );
        }

        const renderItem = ({item}) => (
            <TouchableOpacity   style={{marginBottom: SIZES.padding * 1.5, 
                                        width: 111, 
                                        alignItems: 'center' }}
                                onPress={() => handleBank(item)}>
                <View   style={{height: 50,
                                width: 100,
                                marginBottom: 5,
                                borderRadius: 10,
                                borderColor: COLORS.black,
                                backgroundColor: item.backgroundColor,
                                alignItems: 'center',
                                justifyContent: 'center'}}>
                    <Image  source={item.icon}
                            resizeMode="contain"
                            style={{height: 55,
                                    width: 55,
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
                data={bank}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                style={{marginTop: SIZES.padding * 2}}
          />
        )
    }
    function renderButton(){
        return(
            <View style={{margin: SIZES.padding * 1.5}}>
                <TouchableOpacity   style={{height: 60,
                                            width: 180,
                                            alignSelf: "center",
                                            backgroundColor: COLORS.bluesec,
                                            borderRadius: SIZES.radius / 1.5,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderColor: COLORS.blueprim,}}
                                    onPress = {() => navigation.push("BankDescription", {
                                        username: route.params.username,
                                        phoneNumber: route.params.phoneNumber,
                                    })}>
                    <Text style={{color: COLORS.white, ...FONTS.h3}}>Next</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderBank(){
        const HeaderComponent = () => (
            <View style={{backgroundColor: COLORS.blueback}}>
                {renderHeader()}
                {renderBanner()}
                {renderFeatures()}
                {renderButton()}
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
                ListFooterComponent={
                    <View style={{ marginBottom: 80 }}>
                    </View>
                }
            />
        )
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.blueback}}>
            <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
            <SafeAreaView style={{paddingHorizontal: SIZES.padding * 2}}>
                {renderTop()}
            </SafeAreaView>
            {renderBank()}
        </SafeAreaView>
    )
}

export default BankAccount;