import React, {useState} from "react";
import { SafeAreaView, View, ScrollView, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { COLORS, SIZES, FONTS, icons, images } from "../constants";
import {Avatar, Colors} from 'react-native-paper'

const Profile = ({navigation}) => { 

    const styles = StyleSheet.create({
        avatar: {
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:100,
            marginVertical:5,
            marginLeft:20,
            padding:5,
            borderWidth:5,
            borderColor:COLORS.blueprim,
        },

        avatarBox: {
            flexDirection:'row', 
            alignItems:'center',
            borderWidth:1,
            marginTop:30,
            marginHorizontal:10,
            paddingVertical:10,
            borderColor:COLORS.blueprim,
        },

        nameText: {
            ...FONTS.h1,
            padding:10,
            marginLeft:5,
            marginTop: -10,
        },

        inforText: {
            ...FONTS.h3,
            padding:10,
            marginTop:-20,
            marginLeft: 5,
        },

        editProfileButton: {
            alignSelf:'center',
            flexDirection:'row',
            justifyContent:'center',
            backgroundColor:COLORS.white,
            borderColor:COLORS.blueprim,
            borderWidth:1,
            width: '50%',
            paddingVertical:15,
            borderRadius:10,
            marginTop:20,
        },

        editProfileText: {
            color:COLORS.bluetext, 
            ...FONTS.h4, 
            fontWeight:'bold', 
        },

        addAccountButton: {
            alignSelf:'center',
            flexDirection:'row',
            justifyContent:'center',
            backgroundColor:COLORS.white,
            borderColor:COLORS.blueprim,
            borderWidth:1,
            width: '50%',
            paddingVertical:15,
            borderRadius:10,
            marginTop:20,
        },

        addAccountText: {
            color:COLORS.bluetext, 
            ...FONTS.h4, 
            fontWeight:'bold', 
        },

        logoutButton: {
            alignSelf:'center',
            flexDirection:'row',
            justifyContent:'center',
            borderWidth:1,
            borderColor:COLORS.blueprim,
            backgroundColor:COLORS.bluesec,
            width: '70%',
            paddingVertical:15,
            borderRadius: SIZES.radius / 1.5,
            marginTop: 180,
        },

        logoutText: {
            alignItems:'center',
            ...FONTS.h2, 
            color:COLORS.white,
        },
    });

    // function renderHeader(){
    //     return(
    //         <View style={styles.header}>
    //             <View style = {{height: 20, marginTop: 25, alignItems: 'center', justifyContent: 'center'}}>
    //                 <Image source = {images.navilogo} style = {{width: '20%', resizeMode:'contain'}}></Image>
    //             </View>
    //         </View>
    //     );
    // }

    function renderAvatar() {
        return (
            <View style={styles.avatarBox}>
                <Avatar.Image medium rounded source={images.avatar} size={160} containerStyle={{borderWidth:2, borderColor:'black'}}
                                avatarStyle={{borderWidth:2, borderColor: 'black'}}
 style = {styles.avatar}/>

                <View>
                    <Text style = {styles.nameText}>
                        Name Here
                    </Text>
                    <Text style = {styles.inforText}>
                        User ID Here
                    </Text>
                </View>
            </View>
        );
    }

    function renderButton() {
        return (
            <View>
                <TouchableOpacity style = {styles.editProfileButton}>
                    <Text style = {styles.editProfileText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.addAccountButton}>
                    <Text style = {styles.addAccountText}>Add Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.logoutButton}>
                    <Text style = {styles.logoutText}>Logout</Text>
                </TouchableOpacity>  
            </View> 
        );
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.blueback}}>
            {/*renderHeader()*/}
            {renderAvatar()}
            {renderButton()}
        </SafeAreaView>
    )
}

export default Profile;