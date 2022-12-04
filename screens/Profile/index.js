import React from "react";
import { SafeAreaView, Image, View, Text, TouchableOpacity, StyleSheet, Alert, StatusBar, KeyboardAvoidingView, ScrollView } from "react-native";
import { COLORS, SIZES, FONTS, images } from "../../constants";
import QRCode from 'react-native-qrcode-svg';
import { CommonActions } from '@react-navigation/native';
import styles from "./styles";
import messages from "./messages";

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('screen').width;

const Profile = ({ navigation, route }) => {
    const styles = StyleSheet.create({
        header: {
            height: 60,
            width: '100%',
            alignSelf: 'center',
            marginTop: 10,
        },
        avatar: {
            marginBottom: 10,
            backgroundColor: 'white',
            justifyContent: 'center',
            width: 180,
            height: 180,
            borderWidth: 1,
            borderColor: COLORS.blueprim,
            borderRadius: 150,
        },
        avatarBox: {
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: COLORS.blueprim,
            borderRadius: 10,
            backgroundColor: COLORS.white,
            marginHorizontal: 10,
            paddingVertical: SIZES.padding,
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
            justifyContent: 'center',
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
        },
        logoutText: {
            ...FONTS.h2,
            color: COLORS.white
        }
    });

    function renderHeader() {

        return (
            <View style={styles.header}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ ...FONTS.h1, color: COLORS.blueprim }}>Profile</Text>
                </View>
            </View>
        )
    }

    function renderAvatar() {
        return (
            <View style={styles.avatarBox}>
                <Image source={images.avatar} style={styles.avatar} />
                <Text style={styles.nameText}>username: {route.params.username}</Text>
                <Text style={styles.inforText}>ID: {route.params.phoneNumber}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.editButton}
                        onPress={() => navigation.navigate("Password")}>
                        <Text style={styles.editText}>Edit Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ margin: SIZES.padding * 0.5 }}>
                    <QRCode
                        value={route.params.phoneNumber}
                        logo={images.navilogo}
                        logoBackgroundColor={COLORS.blueback}
                        logoSize={25}
                        size={150}
                    />
                </View>
            </View>
        );
    }

    function signOut() {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'SignIn' }
                ],
            })
        );
    }

    function handleSignOut() {
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
            <View style={{ marginTop: SIZES.padding * 2 }}>
                <TouchableOpacity style={styles.logoutButton} onPress={() => handleSignOut()}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1, backgroundColor: COLORS.blueback }}>
            <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
            <SafeAreaView>
                {renderHeader()}
            </SafeAreaView>
            <ScrollView>
                {renderAvatar()}
                {renderButton()}
            </ScrollView>

        </KeyboardAvoidingView>
    )
}

export default Profile;