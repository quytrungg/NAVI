import React from "react";
import { SafeAreaView, Image, View, Text, TouchableOpacity, StyleSheet, Alert, StatusBar, KeyboardAvoidingView, ImageBackground } from "react-native";
import { COLORS, SIZES, FONTS, images } from "../constants";
import {ScrollView} from 'react-native-gesture-handler';

const Bill = ({navigation}) => { 

    const styles = StyleSheet.create({
        header: {
            height: 60, 
            width: '100%', 
            alignSelf: 'center', 
            marginTop: 10,
        },

        logo: {
            resizeMode: 'contain',
            width: 70,
            height: 70,
            marginLeft: 20,
        },

        topBox: {
            borderWidth: 1,
            borderColor: COLORS.blueprim,
            borderRadius: 5,
            backgroundColor: COLORS.white,
            marginHorizontal: 10,
            marginTop: 10,
        },

        middleBox: {
            borderWidth: 1,
            borderColor: COLORS.blueprim,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            backgroundColor: COLORS.white,
            marginHorizontal: 10,
            marginTop: 5,
            borderStyle: 'dashed',
        },

        bottomBox: {
            borderWidth: 1,
            borderColor: COLORS.blueprim,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            backgroundColor: COLORS.white,
            marginHorizontal: 10,
            marginTop: 1,
            borderStyle: 'dashed',
        },

        text1: {
            ...FONTS.h2,
            color: '#2B7A0B',
            fontSize: 24,
            alignSelf: 'center',
            textAlign: 'right',
        },

        text2: {
            color: COLORS.black,
            ...FONTS.body2,
            textAlign: 'right',
        },

        text3: {
            color: '#355764',
            ...FONTS.body3,
            marginBottom: 5,
        },

        text4: {
            color: COLORS.black,
            ...FONTS.body3,
            marginBottom: 5,
            textAlign: 'right',
            marginLeft: 130,
        },
    });

    function renderHeader() {
        return (
            <View style = {styles.header}>
                <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{...FONTS.h1, color: COLORS.blueprim}}>Transaction Details</Text>
                </View>
            </View>
      )
    }

    function renderTop() {
        return (
            <View style = {styles.topBox}>
                <View style = {{flexDirection: 'row', paddingVertical: 10}}>
                    <Image  source = {images.navilogo} style = {styles.logo}/>
                    <View style = {{flexDirection: 'column', alignSelf: 'center', marginLeft:20}}>
                        <Text style = {styles.text1}>Successful Transaction</Text>
                        <Text style = {styles.text2}>+500.000 VND</Text>
                    </View>
                </View>
        </View>
        );
    }

    function renderMiddle() {
        return (
            <View style = {styles.middleBox}>
                <View style = {{flexDirection: 'row', paddingVertical: 10}}>
                    <View style = {{flexDirection: 'column', alignSelf: 'center', marginLeft: 15}}>
                        <Text style = {styles.text3}>Type</Text>
                        <Text style = {styles.text3}>Date</Text>
                        <Text style = {styles.text3}>Fee</Text>
                    </View>
                    <View style = {{flexDirection: 'column', alignSelf: 'center', marginLeft: 40}}>
                        <Text style = {styles.text4}>Send/Receive Money</Text>
                        <Text style = {styles.text4}>DD/MM/YYYY</Text>
                        <Text style = {styles.text4}>0 VND</Text>
                    </View>
                </View>
        </View>
        );
    }

    function renderBottom() {
        return (
            <View style = {styles.bottomBox}>
                <View style = {{flexDirection: 'row', paddingVertical: 10}}>
                    <View style = {{flexDirection: 'column', alignSelf: 'center', marginLeft:15}}>
                        <Text style = {styles.text3}>Recipient</Text>
                        <Text style = {styles.text3}>Account ID</Text>
                        <Text style = {styles.text3}>Bank</Text>
                        <Text style = {styles.text3}>Message</Text>
                    </View>
                    <View style = {{flexDirection: 'column', alignSelf: 'center', marginLeft: 40}}>
                        <Text style = {styles.text4}>Name</Text>
                        <Text style = {styles.text4}>Phone Number</Text>
                        <Text style = {styles.text4}>Bank Name</Text>
                        <Text style = {styles.text4}>Message</Text>
                    </View>
                </View>
        </View>
        );
    }

    return (
        <SafeAreaView style={{flexGrow: 1, backgroundColor: COLORS.blueback}}>
            <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
                {renderHeader()}
                {renderTop()}
                {renderMiddle()}
                {renderBottom()}
        </SafeAreaView>
    )
}

export default Bill;