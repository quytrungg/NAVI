import React from "react";
import { SafeAreaView, Image, View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions, ScrollView } from "react-native";
import { COLORS, SIZES, FONTS, images, icons } from "../constants";
import moment from "moment";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('screen').width;

const Bill = ({navigation, route}) => {
    var UISenderText, UIReceiverText;
    var transactionDetail = {
        ID: 0,
        type: route.params.transactionType,
        date: moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss'),
        balanceChange: route.params.balanceChange,
        senderName: "",
        senderID: "",
        recipientName: "",
        recipientID: "",
        message: route.params.transcMessage,
    }

    if (transactionDetail.type == "Withdraw") {
        UISenderText = "Bank",
        UIReceiverText = "User",
        transactionDetail.senderName = route.params.username,
        transactionDetail.senderID = route.params.phoneNumber,
        transactionDetail.recipientName = route.params.bankName,
        transactionDetail.recipientID = route.params.bankID
    }
    else if (transactionDetail.type == "Deposit") {
        UISenderText = "User",
        UIReceiverText = "Bank",
        transactionDetail.senderName = route.params.username,
        transactionDetail.senderID = route.params.phoneNumber,
        transactionDetail.recipientName = route.params.bankName,
        transactionDetail.recipientID = route.params.bankID
    }
    else {
        UISenderText = "Sender",
        UIReceiverText = "Receiver",
        transactionDetail.senderName = route.params.username,
        transactionDetail.senderID = route.params.phoneNumber,
        transactionDetail.recipientName = route.params.recipientUsername,
        transactionDetail.recipientID = route.params.recipientPhoneNumber
    }
    if (route.params.flag == true) {
        firebase
        .firestore()
        .collection("transaction-history")
        .orderBy("ID", "desc")
        .limit(1)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot != undefined) {
                console.log("Fetch successfully")
                querySnapshot.forEach((doc) => {
                    transactionDetail.ID = doc.data().ID + 1
                })
            }
        })
        .then(() => {
            firebase
                .firestore()
                .collection("transaction-history")
                .doc(String(transactionDetail.ID))
                .set(transactionDetail)
        })
        .then(() => {
            if (transactionDetail.type == "Transfer") {
                firebase
                    .firestore()
                    .collection("user")
                    .doc(transactionDetail.recipientID)
                    .get()
                    .then((snapshot) => {
                        firebase
                            .firestore()
                            .collection("user")
                            .doc(transactionDetail.recipientID)
                            .update({
                                notifCount: snapshot.data().notifCount + 1,
                            })
                    })
            }
        })
    }

    const styles = StyleSheet.create({
        buttonText: {
            marginLeft: SIZES.padding / 2,
            color: COLORS.black,
            ...FONTS.h4,
        },
        banner: {
            height: 60,
            alignSelf: 'center',
            marginTop: SIZES.padding * 2,
        },
        logo: {
            resizeMode: 'contain',
            width: widthScreen * 0.15,
            height: widthScreen * 0.15,
            marginLeft: widthScreen * 0.045,
        },
        topBox: {
            flex: 1,
            alignSelf: 'center',
            borderWidth: 1,
            borderColor: COLORS.blueprim,
            borderRadius: 5,
            backgroundColor: COLORS.white,
            width: widthScreen - 20,
            marginTop: 10,
        },
        middleBox: {
            flex: 1,
            alignSelf: 'center',
            borderWidth: 1,
            borderColor: COLORS.blueprim,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            backgroundColor: COLORS.white,
            width: widthScreen - 20,
            marginTop: 5,
            borderStyle: 'dashed',
        },
        bottomBox: {
            flex: 1,
            alignSelf: 'center',
            borderWidth: 1,
            borderColor: COLORS.blueprim,
            backgroundColor: COLORS.white,
            width: widthScreen - 20,
            borderStyle: 'dashed',
        },
        messageBox: {
            borderWidth: 1,
            borderColor: COLORS.blueprim,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            backgroundColor: COLORS.white,
            marginHorizontal: 10,
            borderStyle: 'dashed',
        },
        confirmButton: {
            borderColor: COLORS.blueprim,
            backgroundColor: COLORS.bluesec,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            width: 180,
            height: 60,
            borderRadius: SIZES.radius / 1.5,
        },
        confirmText: {
            ...FONTS.h2, 
            color: COLORS.white
        },
        text1: {
            ...FONTS.h2,
            color: '#2B7A0B',
            fontSize: 24,
            alignSelf: 'center',
            textAlign: 'right',
            marginLeft: widthScreen * 0.035,
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
            marginLeft: widthScreen - 245,
        },
        text5: {
            color: COLORS.black,
            ...FONTS.body3,
            marginBottom: 5,
            textAlign: 'right',
            marginLeft: widthScreen - 230,
        },
        text6: {
            color: '#355764',
            ...FONTS.body3,
            marginTop: 10,
            marginBottom: 5,
            marginLeft: 15,
        },
        text7: {
            flex: 1,
            color: COLORS.black,
            ...FONTS.body3,
            marginBottom: 5,
            marginLeft: 15,
        },
    });

    function renderBanner() {
        return (
            <View style = {styles.banner}>
                <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{...FONTS.h1, color: COLORS.blueprim}}>Transaction Details</Text>
                </View>
            </View>
        )
    }

    function balanceDisplay(text){
        var temp = String(Math.abs(parseInt(text, 10)))
        for (var i = temp.length; i > 0; i -= 3){
            if(i == temp.length){
                continue;
            }
            temp = temp.substring(0, i) + "." + temp.substring(i, temp.length);
        }
        return temp + " VND";
    }

    function handleDisplay(){
        return (transactionDetail.type == "Withdraw" ? "-" : (transactionDetail.type == "Transfer" ? "-" : "+")) + balanceDisplay((String(transactionDetail.balanceChange)))
    }

    function renderTop() {
        return (
            <View style = {styles.topBox}>
                <View style = {{flexDirection: 'row', paddingVertical: 10}}>
                    <Image  source = {images.navilogo} style = {styles.logo}/>
                    <View style = {{flexDirection: 'column', alignSelf: 'center'}}>
                        <Text style = {styles.text1}>Successful Transaction</Text>
                        <Text style = {styles.text2}>{handleDisplay()}</Text>
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
                    <View style = {{flexDirection: 'column', alignSelf: 'center'}}>
                        <Text style = {styles.text4}>{transactionDetail.type}</Text>
                        <Text style = {styles.text4}>{transactionDetail.date}</Text>
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
                    <View style = {{alignSelf: 'center', marginLeft: 15}}>
                        <Text style = {styles.text3}>{UISenderText}</Text>
                        <Text style = {styles.text3}>{UISenderText} ID</Text>
                        <Text style = {styles.text3}>{UIReceiverText}</Text>
                        <Text style = {styles.text3}>{UIReceiverText} ID</Text>
                    </View>
                    <View style = {{alignSelf: 'center'}}>
                        <Text style = {styles.text5}>{transactionDetail.type == "Withdraw" ? transactionDetail.recipientName : transactionDetail.senderName}</Text>
                        <Text style = {styles.text5}>{transactionDetail.type == "Withdraw" ? transactionDetail.recipientID : transactionDetail.senderID}</Text>
                        <Text style = {styles.text5}>{transactionDetail.type == "Withdraw" ? transactionDetail.senderName : transactionDetail.recipientName}</Text>
                        <Text style = {styles.text5}>{transactionDetail.type == "Withdraw" ? transactionDetail.senderID : transactionDetail.recipientID}</Text>
                    </View>
                </View>
        </View>
        );
    }

    function messageBox() {
        return (
            <View style = {styles.messageBox}>
                <View>
                    <Text style = {styles.text6}>Message</Text>
                </View>
                <View style={{flexGrow: 1, flexDirection: 'row'}}>
                    <Text style={styles.text7}>{transactionDetail.message}</Text>
                </View>
        </View>
        );
    }

    function renderButton() {
        return (
            <View style = {{marginTop: 120}}>
                <TouchableOpacity style = {styles.confirmButton} onPress={() => {console.log(route.params.username); navigation.push('Home', {
                                        username: route.params.username,
                                        phoneNumber: route.params.phoneNumber})}}>
                    <Text style = {styles.confirmText}>Back To Home</Text>
                </TouchableOpacity> 
            </View>
        )
    }

    return (
        <SafeAreaView style={{flexGrow: 1, backgroundColor: COLORS.blueback}}>
            <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
                <ScrollView>
                    {renderBanner()}
                    {renderTop()}
                    {renderMiddle()}
                    {renderBottom()}
                    {messageBox()}
                    {renderButton()}
                </ScrollView>
        </SafeAreaView>
    )
}

export default Bill;