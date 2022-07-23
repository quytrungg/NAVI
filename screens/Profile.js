import React, {useState} from "react";
import { SafeAreaView, Image, View, Text, TouchableOpacity, StyleSheet, Alert, StatusBar } from "react-native";
import { COLORS, SIZES, FONTS, images } from "../constants";
import {Avatar} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';

const Profile = ({navigation}) => { 

    const styles = StyleSheet.create({
        header: {
            backgroundColor: COLORS.white, 
            borderRadius:10, 
            height: 60, 
            width: '95%',
            alignSelf: 'center', 
            marginTop: 10,
        },

        avatar: {
            marginBottom: 10,
            backgroundColor: 'white',
            justifyContent: 'center', 
            width: 170,
            height: 170,
            borderWidth: 1,
            borderColor: COLORS.bluesec,
            borderRadius: 150,
        },

        avatarBox: {
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: COLORS.bluesec,
            borderRadius: 10,
            backgroundColor: COLORS.white,
            marginHorizontal: 10,
            paddingVertical: 10,
            marginTop: 10,
        },

        nameText: {
            ...FONTS.h1
        },

        inforText: {
            ...FONTS.h4
        },

        editButton: {
            alignItems: 'center',
            justifyContent:'center',
            backgroundColor: COLORS.bluesec,
            borderColor: COLORS.blueprim,
            borderWidth: 1,
            width: 150,
            height: 50,
            borderRadius: 10,
            marginTop: 20,
            margin: 5,
        },

        editText: {
            color: COLORS.white, 
            ...FONTS.h4
        },

        logoutButton: {
            borderColor: COLORS.blueprim,
            backgroundColor: COLORS.bluesec,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            width: 180,
            height: 60,
            borderRadius: SIZES.radius / 1.5,
            bottom: 30,
            marginTop: 30,
        },

        logoutText: {
            ...FONTS.h2, 
            color: COLORS.white
        }
    });

    function renderHeader() {
        return (
            <View style={styles.header}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{...FONTS.h1, color: COLORS.blueprim}}>Profile</Text>
                </View>
            </View>
      )
  }

    function renderAvatar() {
        return (
            <View style={styles.avatarBox}>
                <Image source={images.avatar} style = {styles.avatar}/>
                <Text style = {styles.nameText}>Name Here</Text>
                <Text style = {styles.inforText}>User ID Here</Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style = {styles.editButton}>
                        <Text style = {styles.editText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.editButton}>
                        <Text style = {styles.editText}>Add Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function signOut(){
      navigation.navigate("SignIn");
    }
  
    function handleSignOut(){
        return Alert.alert(
            "Log out",
            "Are you sure you want to sign out?",
            [
                {
                    text: "No",
                },
                {
                    text: "Yes",
                    onPress: () => { signOut(); },
                },
            ]
        );
    }

    function renderButton() {
        return (
            <View>
                <TouchableOpacity style = {styles.logoutButton} onPress={() => handleSignOut()}>
                    <Text style = {styles.logoutText}>Logout</Text>
                </TouchableOpacity>  
            </View> 
        );
    }

    return (
        <SafeAreaView style={{flexGrow: 1, backgroundColor: COLORS.blueback}}>
            <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
            {renderHeader()}
            <ScrollView>
                {renderAvatar()}
            </ScrollView>
            {renderButton()}
        </SafeAreaView>
    )
}

export default Profile;