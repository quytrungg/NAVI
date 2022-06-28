import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, TouchableWithoutFeedback, Image, TextInput, Modal, FlatList, KeyboardAvoidingView, ScrollView, Platform, Alert, SafeAreaView, TouchableHighlight} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, FONTS, icons, images } from "../constants";
import { FontAwesome } from '@expo/vector-icons'; 

const BankAccount = ({navigation}) => {
  const bankData = [
        {
            id: 1,
            icon: icons.bill,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "MB"
        },
        {
            id: 2,
            icon: icons.bill,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "VCB"
        },
        {
            id: 3,
            icon: icons.bill,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "TP"
        },
        {
            id: 4,
            icon: icons.bill,
            color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "VP"
        },
        {
            id: 5,
            icon: icons.bill,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "BIDV"
        },
        {
            id: 6,
            icon: icons.bill,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "TCB"
        },
        {
            id: 7,
            icon: icons.bill,
            color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "AB"
        },
        {
            id: 8,
            icon: icons.bill,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "More"
        },
    ]

    const [bank, setBank] = useState(bankData);

    const handelNotification = () =>{
      return(
        Alert.alert("Notifications", "There is no notifications at the moment")
      )
    }

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', marginVertical: SIZES.padding * 5 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h1 }}>Congratulations!</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                </View>
            </View>
        )
    }

    function renderBanner() {
        return (
            <View style={{ height: 120, borderRadius: 10}}>
                <View style={{ marginBottom: SIZES.padding }}>
                  <Text style={{ ...FONTS.h3 }}>You have successfully created an account.</Text>
                </View>
                <Text style={{ ...FONTS.h3, color: COLORS.gray }}>Choose one of the banks below to link with your account.</Text>
            </View>
        )
    }

    function renderFeatures() {
        const Header = () => (
            <View style={{ marginBottom: SIZES.padding * 2, marginTop: SIZES.padding * 5 }}>
                <Text style={{ ...FONTS.h3 }}>Banks</Text>
            </View>
        )
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2, width: 111, alignItems: 'center' }}
                onPress={() => Alert.alert("Warning", "Bank is not opened yet")}
            >
                <View
                    style={{
                        height: 50,
                        width: 100,
                        marginBottom: 5,
                        borderRadius: 20,
                        backgroundColor: item.backgroundColor,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={item.icon}
                        resizeMode="contain"
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: item.color
                        }}
                    />
                </View>
                <Text style={{ textAlign: 'center', flexWrap: 'wrap', ...FONTS.body4 }}>{item.description}</Text>
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
                style={{ marginTop: SIZES.padding * 2 }}
          />
        )
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
                    onPress = {() => navigation.push("BankDescription")}
                    >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Choose</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderBank() {
        const HeaderComponent = () => (
            <View style={{backgroundColor: COLORS.blueback}}>
                {renderHeader()}
                {renderBanner()}
                {renderFeatures()}
            </View>
        )
        return (
            <FlatList
                ListHeaderComponent={HeaderComponent}
                contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
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
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blueback }}>
        {renderBank()}
        {renderButton()}
      </SafeAreaView>
    )
}

export default BankAccount;