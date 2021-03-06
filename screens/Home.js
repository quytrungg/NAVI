import React, {useState, useEffect} from "react";
import { SafeAreaView, View, Text, Image, FlatList, TouchableOpacity, Alert, TextInput, StatusBar, Modal } from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { ScrollView } from "react-native-gesture-handler";

const Home = ({navigation, route}) => {

    const [modalVisible, setModalVisible] = useState(false);

    const [balance, getBalance] = useState(0);

    const [showNoti, setShowNoti] = useState(true);

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
        getBalance_()
    })

    const featuresData = [
        {   id: 1,
            icon: images.withdraw,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "Withdraw"
        },
        {   id: 2,
            icon: images.deposit,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "Deposit"
        },
        {   id: 3,
            icon: images.transfer,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "Transfer"
        },
        {   id: 4,
            icon: images.bank,
            color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "Bank Account"
        }
    ]

    function handelNotification(){
        setModalVisible(true);
        setShowNoti(false);
    }

    function renderHeader(){

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
        function refreshBalance() {
            setShowPassword(!showPassword)
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
            getBalance_()
        }

        return (
            <>
                <View style={{flexDirection: 'row', marginVertical: SIZES.padding * 2, marginBottom: SIZES.padding * 3}}>
                    <View style={{flex: 1}}>
                        <Text style={{ ...FONTS.h1, color: COLORS.blueprim }}>Welcome Back!</Text>
                        <Text style={{ ...FONTS.body2, color: COLORS.gray }}>{route.params.username}</Text>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity   style={{height: 40,
                                                    width: 40,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: COLORS.white,
                                                    borderColor: COLORS.blueprim,
                                                    borderWidth: 1.5}}
                                            onPress = {() => handelNotification()}>
                            <Image  source={icons.bell}
                                    style={{width: 20,
                                            height: 20,
                                            tintColor: COLORS.blueprim}}/>
                            {showNoti && <View   style={{position: 'absolute',
                                            top: -5,
                                            right: -5,
                                            height: 10,
                                            width: 10,
                                            backgroundColor: COLORS.red,
                                            borderRadius: 5}}></View>}
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
                                        onPress={() => refreshBalance()}>
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

    function handleFeature(item){
        if(item.description == 'Withdraw'){
            navigation.navigate("Withdraw", {
                username: route.params.username,
                phoneNumber: route.params.phoneNumber,
            });
        }
        else if(item.description == 'Deposit'){
            navigation.navigate("Deposit", {
                username: route.params.username,
                phoneNumber: route.params.phoneNumber,
            });
        }
        else if(item.description == 'Bank Account'){
            navigation.push("BankAccount", {
                username: route.params.username,
                phoneNumber: route.params.phoneNumber,
            });
        }
        else if(item.description == 'Transfer'){
            navigation.navigate("Search", {
                username: route.params.username,
                phoneNumber: route.params.phoneNumber,
                flag: true,
            });
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
                    <Text style={{...FONTS.h3}}>What's New</Text>
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
                ListFooterComponent={
                    <View style={{marginBottom: 80}}>
                    </View>
                }
            />
        )
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.blueback}}>

            <Modal visible={modalVisible} transparent={true} animationType={'slide'}>
                <View style={{marginHorizontal: '5%', marginTop: "30%", marginBottom: "30%", backgroundColor: COLORS.blueback, borderColor: COLORS.bluesec, borderRadius: 20, borderWidth: 2, flex: 1}}>
                    <View style={{alignItems: 'center', paddingVertical: "3%", backgroundColor: COLORS.bluesec, width: '100%', borderTopLeftRadius: 18, borderTopRightRadius: 18}}>
                        <Text style={{color:COLORS.blueback, ...FONTS.h2}}>Notifications</Text>
                    </View>

                    <View style={{padding:'5%', marginBottom: '20%'}} >
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={[
                                {key: '1', header: 'Noti 1 header', body: 'Noti 1 content'},
                                {key: '2', header: 'Noti 2 header', body: 'Noti 2 content'},
                                {key: '3', header: 'Noti 3 header', body: 'Noti 3 content'},
                                {key: '4', header: 'Noti 4 header', body: 'Noti 4 content'},
                                {key: '5', header: 'Noti 5 header', body: 'Noti 5 content'},
                                {key: '6', header: 'Noti 6 header', body: 'Noti 6 content'},
                                {key: '7', header: 'Noti 7 header', body: 'Noti 7 content'},
                                {key: '8', header: 'Noti 8 header', body: 'Noti 8 content'},
                                {key: '9', header: 'Noti 9 header', body: 'Noti 9 content'},
                                {key: '10', header: 'Noti 10 header', body: 'Noti 10 content'},
                            ]}
                            renderItem={({item}) => {
                                return(
                                    <View style={{paddingVertical: 5}}>
                                        <View style={{backgroundColor: '#ffffff80',borderRadius: 5, paddingHorizontal: 15, borderWidth: 1, borderColor: COLORS.bluesec}}>
                                            <Text style={{...FONTS.h3, paddingTop: 10}}>{item.header}</Text>
                                            <Text style={{...FONTS.body3, paddingBottom: 10}}>{item.body}</Text>
                                        </View>
                                    </View>
                                )}
                            }/>
                    </View>
                    
                    <View style={{justifyContent:'center', alignItems: 'center', position: 'absolute', bottom: '2%', width: '100%'}}>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{justifyContent:'center', alignItems: 'center', width: 50, height: 50, borderRadius:25, backgroundColor: COLORS.bluesec}}>
                            <Image source={icons.close} style={{width: 20, height: 20, tintColor: COLORS.white}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
            {renderHomeView()}
        </SafeAreaView>

    )
    
}

export default Home;
