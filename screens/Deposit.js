import React, {useState} from "react";
import { SafeAreaView, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, StatusBar, ScrollView, Alert, TextInput, TouchableHighlight } from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";
import { LinearGradient } from 'expo-linear-gradient';
import CurrencyInput from 'react-native-currency-input';

const Deposit = ({navigation}) => {

    var balance = '500.000';

    function renderHeader(){
        return (
        <TouchableOpacity style={{flexDirection: 'row', 
                                    alignItems: "center", 
                                    marginTop: SIZES.padding * 1,
                                    paddingHorizontal: SIZES.padding * 2}} 
                            onPress={() => navigation.navigate("SignIn")}>
            <Image  source={icons.back} 
                    resizeMode="contain" 
                    style={{width: 15, 
                            height: 15, 
                            tintColor: COLORS.black}}/>
            <Text style={{marginLeft: SIZES.padding / 2, 
                        color: COLORS.black, 
                        ...FONTS.h4}}>Home</Text>
            </TouchableOpacity>
        );
    }

    function renderLogo(){
        return (
            <View style={{flexDirection: 'row', marginVertical: SIZES.padding * 2}}>
                <View   style={{flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'}}>
                    <Text style={{...FONTS.h1, color: COLORS.blueprim}}>Deposit Money</Text>
                </View>
            </View>
        )
    }

    const [value, setValue] = useState(0); 

    function renderForm(){

        return (
            <View style={{  borderWidth: 1,
                            borderColor: COLORS.blueprim,
                            borderRadius: 10,
                            backgroundColor: COLORS.white,
                            marginHorizontal: 10,
                            paddingVertical: 10,
                            marginTop: 10}}>
                <View style={{marginTop: SIZES.padding * 1, marginHorizontal: SIZES.padding * 3}}>
                    <View style={{ flexDirection: 'row', backgroundColor: "#DDDDDD", flex: 1,
                                                borderRadius: 10,
                                                height: 60 }}>
                        <Image  source={images.navilogo}
                                resizeMode="contain" 
                                style={{width: 45,
                                        height: 45,
                                        tintColor: COLORS.blueprim,
                                        alignSelf: 'center',
                                        marginLeft: 10}}/>
                        <Text style={{color: COLORS.black, ...FONTS.body3, 
                                    alignSelf: 'center', marginLeft: 10}}>Balance: </Text>
                        <TextInput style={{...FONTS.body3, bottom: 0.5}}
                                        editable={false} 
                                        value={balance + " VND"}/>
                    </View>
                    <View style={{marginTop: SIZES.padding * 2}}>
                        <Text style={{color: COLORS.black, ...FONTS.body3}}>Deposit Amount</Text>
                        <View style={{ flexDirection: 'row', marginTop: SIZES.padding / 2}}>
                            <CurrencyInput  style={{flex: 1,
                                                marginBottom: SIZES.padding / 1,
                                                paddingHorizontal: SIZES.padding,
                                                borderColor: COLORS.black,
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                height: 50,
                                                ...FONTS.body2}}
                                        keyboardType="number-pad"
                                        placeholder = "e.g 500.000 VND"
                                        placeholderTextColor={COLORS.gray}
                                        value = {value}
                                        onChangeValue = {setValue}
                                        separator = "."
                                        suffix = " VND"
                                        precision = {value >= 1000 && 0}/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    function renderSource(){
        return(
            <View>
                <View style={{flexDirection: 'row', marginTop: SIZES.padding * 3,
                            paddingHorizontal: SIZES.padding * 2}}>
                    <View style={{flex: 1}}>
                        <Text style={{...FONTS.h3}}>Source Money</Text>
                    </View>
                    <TouchableOpacity onPress={() => console.log("View All")}>
                        <Text style={{color: COLORS.gray, ...FONTS.body4}}>View All</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderBank(){
        const arr = [
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
        }];
        return(
        <View>
            {arr.map(data =>{
                return(
                    <View   key={data.id} 
                            style={{borderWidth: 1,
                                    borderColor: COLORS.blueprim,
                                    borderRadius: 10,
                                    backgroundColor: COLORS.white,
                                    marginHorizontal: 10,
                                    marginTop: 10}}>

                        <TouchableHighlight onPress={() => console.log("pressed")}
                                            style={{borderRadius: 10}}
                                            underlayColor="#DDDDDD">
                            <View style={{flexDirection: 'row', paddingVertical: 10}}>
                                <Image  source={data.icon}
                                                resizeMode="contain" 
                                                style={{width: 50,
                                                        height: 50,
                                                        marginLeft: 20, alignSelf: 'center'}}/>
                                <View style={{flexDirection: 'column', alignSelf: 'center', marginLeft: 20}}>
                                    <Text style={{color: COLORS.black, ...FONTS.h4, 
                                                alignSelf: 'center'}}>{data.description}</Text>
                                    <Text style={{color: COLORS.black, ...FONTS.body4}}>Free charge</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
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
        else{
            navigation.navigate("Verification");
        }
    }

    function renderButton() {
        return(
            <View style={{margin: SIZES.padding * 0.5}}>
                <TouchableOpacity style={{height: 60,
                                        width: 180,
                                        alignSelf: "center",
                                        backgroundColor: COLORS.bluesec,
                                        borderRadius: SIZES.radius / 1.5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderColor: COLORS.blueprim}}
                                onPress={() => handleDeposit()}>
                <Text style={{color: COLORS.white, ...FONTS.h3}}>Deposit</Text>
                </TouchableOpacity>
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
                {renderLogo()}
                {renderForm()}
                {renderSource()}
                {renderBank()}
                
            </ScrollView>
            <SafeAreaView>
                {renderButton()}
            </SafeAreaView>
        </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default Deposit;