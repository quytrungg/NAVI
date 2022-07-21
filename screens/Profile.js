import React, {useState} from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { COLORS, SIZES, FONTS, images } from "../constants";
import {Avatar} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import { SafeAreaView, View, ScrollView, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { TextInput } from "react-native-gesture-handler";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";
import UserAvatar from 'react-native-user-avatar'

const Profile = ({navigation}) => { 

    const styles = StyleSheet.create({
        avatar: {
          marginBottom: 10
        },

        avatarBox: {
            alignItems:'center',
            justifyContent: 'center',
            borderWidth:2,
            borderColor:COLORS.blueback,
            borderRadius: SIZES.radius /1.5,
            marginTop:30,
            marginHorizontal:10,
            paddingVertical:10,
            marginTop: 10
        },

        nameText: {
            ...FONTS.h1
        },

        inforText: {
            ...FONTS.h4
        },

        editProfileButton: {
            alignItems: 'center',
            justifyContent:'center',
            backgroundColor:COLORS.white,
            borderColor:COLORS.blueprim,
            borderWidth:1,
            width: 150,
            height: 50,
            borderRadius:10,
            marginTop:20,
            margin: 5,
        },

        editProfileText: {
            color:COLORS.bluetext, 
            ...FONTS.h4
        },

        logoutButton: {
            borderColor:COLORS.blueprim,
            backgroundColor:COLORS.bluesec,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent:'center',
            borderWidth:1,
            width: 180,
            height: 60,
            borderRadius:SIZES.radius / 1.5,
            bottom: 30,
            marginTop: 30,
        },

        logoutText: {
            ...FONTS.h2, 
            color:COLORS.white
        }
    });

    function renderHeader() {
      return (
          <View style={{backgroundColor: COLORS.white, borderRadius:10, height: 60, width: 350, alignSelf: 'center', marginTop: 10}}>
              <View   style={{flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center'}}>
                  <Text style={{...FONTS.h1, color: COLORS.blueprim}}>Profile</Text>
              </View>
          </View>
      )
  }

    function renderAvatar() {
        return (
            <View style={styles.avatarBox}>
                <Avatar.Image rounded source={images.avatar} size={160} style = {styles.avatar}/>
                <Text style = {styles.nameText}>Name Here</Text>
                <Text style = {styles.inforText}>User ID Here</Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style = {styles.editProfileButton}>
                      <Text style = {styles.editProfileText}>Edit Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style = {styles.editProfileButton}>
                      <Text style = {styles.editProfileText}>Add Account</Text>
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
              onPress: () => {
                  signOut();
              },
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
          {renderHeader()}
          <ScrollView>
            {renderAvatar()}
          </ScrollView>
          {renderButton()}
        </SafeAreaView>
    )
}

export default Profile;