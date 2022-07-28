import React from "react";
import { SafeAreaView, Image, View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView} from "react-native";
import { COLORS, SIZES, FONTS, images, icons } from "../constants";
import moment from "moment"

const Bill = ({navigation, route}) => { 

    const styles = StyleSheet.create({
        header: {
            flexDirection: 'row',
            alignItems: "center",
            marginTop: SIZES.padding * 1,
            paddingHorizontal: SIZES.padding * 2,
        },

        button: {
            width: 15,
            height: 15,
            tintColor: COLORS.black,
        },

        buttonText: {
            marginLeft: SIZES.padding / 2,
            color: COLORS.black,
            ...FONTS.h4,
        },
        
        banner: {
            height: 60,
            width: '100%',
            alignSelf: 'center',
            marginTop: 5,
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
            backgroundColor: COLORS.white,
            marginHorizontal: 10,
            marginTop: 1,
            borderStyle: 'dashed',
        },

        messageBox: {
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
            marginLeft: 170,
        },

        text5: {
            color: COLORS.black,
            ...FONTS.body3,
            marginBottom: 5,
            textAlign: 'right',
            marginLeft: 170,
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

    function renderHeader() {
        return (
            <TouchableOpacity  style={styles.header} 
                            onPress={() => navigation.push('Home', {
                                        username: route.params.username,
                                        phoneNumber: route.params.phoneNumber})}>
            <Image  source = {icons.back} 
                resizeMode = "contain" 
                style = {styles.button}/>
            <Text style = {styles.buttonText}>Home</Text>
            </TouchableOpacity>
        )
    }

    function renderBanner() {
        return (
            <View style = {styles.banner}>
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
                    <View style = {{flexDirection: 'column', alignSelf: 'center', marginLeft:5}}>
                        <Text style = {styles.text1}>Successful Transaction</Text>
                        <Text style = {styles.text2}>{route.params.balanceChange}</Text>
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
                        <Text style = {styles.text4}>{route.params.transactionType}</Text>
                        <Text style = {styles.text4}>{moment().utcOffset('+07:00').format('YYYY-MM-DD hh:mm:ss')}</Text>
                        <Text style = {styles.text4}>{route.params.balanceChange}</Text>
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
                        <Text style = {styles.text3}>Recipient</Text>
                        <Text style = {styles.text3}>Recipient ID</Text>
                        <Text style = {styles.text3}>Sender</Text>
                        <Text style = {styles.text3}>Sender ID</Text>
                    </View>
                    <View style = {{alignSelf: 'center'}}>
                        <Text style = {styles.text5}>Name</Text>
                        <Text style = {styles.text5}>ID</Text>
                        <Text style = {styles.text5}>Name</Text>
                        <Text style = {styles.text5}>ID</Text>
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
                    <Text style={styles.text7}>Message here</Text>
                </View>
        </View>
        );
    }

    return (
        <SafeAreaView style={{flexGrow: 1, backgroundColor: COLORS.blueback}}>
            <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
                {renderHeader()}
                <ScrollView>
                    {renderBanner()}
                    {renderTop()}
                    {renderMiddle()}
                    {renderBottom()}
                    {messageBox()}
                </ScrollView>
        </SafeAreaView>
    )
}

export default Bill;