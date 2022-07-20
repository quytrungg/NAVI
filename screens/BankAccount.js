import React, {useState} from "react";
import {View, Text, TouchableOpacity, Image, FlatList, Alert, SafeAreaView, TouchableHighlight} from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const BankAccount = ({navigation}) => {
  const bankData = [
        {   id: 1,
            icon: icons.bill,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "MB Bank",
        },
        {   id: 2,
            icon: icons.bill,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "Vietcombank",
        },
        {   id: 3,
            icon: icons.bill,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "TP Bank",
        },
        {   id: 4,
            icon: icons.bill,
            color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "VP Bank",
        },
        {   id: 5,
            icon: icons.bill,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "BIDV",
        },
        {   id: 6,
            icon: icons.bill,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "Techcombank",
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
                        navigation.navigate("Home");
                    },
                },
            ]
        );
    }

    function renderTop(){
        return(
          <TouchableOpacity style={{flexDirection: 'row', 
                                    alignItems: "center", 
                                    margin: SIZES.padding / 2,
                                    marginLeft: -7}} 
                            onPress={() => handleBackToHome()}>
            <Image  source={icons.back} 
                    resizeMode="contain" 
                    style={{width: 15, 
                            height: 15, 
                            tintColor: COLORS.black}}/>
            <Text style={{marginLeft: SIZES.padding / 2,
                          color: COLORS.black, 
                          ...FONTS.h4 }} 
                  onPress={() => handleBackToHome()}>Home</Text>
          </TouchableOpacity>
        )
      }

    function renderHeader() {
        return (
            <View style={{flexDirection: 'row', marginVertical: SIZES.padding * 4}}>
                <View   style={{flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'}}>
                    <Text style={{...FONTS.h1}}>Bank Linking</Text>
                </View>
            </View>
        )
    }

    function renderBanner() {
        return (
            <View style={{height: 120, borderRadius: 10}}>
                <View style={{ marginBottom: SIZES.padding * 2 }}>
                  <Text style={{...FONTS.h3}}>An account can connect to 1 or many bank accounts.</Text>
                </View>
                <Text style={{...FONTS.h3, color: COLORS.gray}}>Choose one of the banks below to link with your account.</Text>
            </View>
        )
    }

    function handleBank(item){
        Alert.alert("Warning", "Bank is closed");
    }

    function renderFeatures() {
        const Header = () => (
            <View style={{marginBottom: SIZES.padding * 2, marginTop: SIZES.padding * 3}}>
                <Text style={{...FONTS.h3}}>Banks</Text>
            </View>
        )
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
            <View style={{margin: SIZES.padding * 2}}>
                <TouchableOpacity   style={{height: 60,
                                            width: 180,
                                            alignSelf: "center",
                                            backgroundColor: COLORS.bluesec,
                                            borderRadius: SIZES.radius / 1.5,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderColor: COLORS.blueprim,}}
                                    onPress = {() => navigation.push("BankDescription")}>
                    <Text style={{color: COLORS.white, ...FONTS.h3}}>Confirm</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderBank(){
        const HeaderComponent = () => (
            <View style={{backgroundColor: COLORS.blueback}}>
                {renderTop()}
                {renderHeader()}
                {renderBanner()}
                {renderFeatures()}
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
        {renderBank()}
        {renderButton()}
      </SafeAreaView>
    )
}

export default BankAccount;