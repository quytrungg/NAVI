import React, { useState } from "react";
import {View, Text, TouchableOpacity, Image, FlatList, Alert, SafeAreaView, StatusBar, Dimensions,} from "react-native";
import { COLORS, SIZES, FONTS, icons } from "../../constants";
import bankData from "./data";
import styles from "./styles";
import messages from "./messages";

const widthScreen = Dimensions.get("window").width;

const BankAccount = ({ navigation, route }) => {

  function handleBackToHome() {
    return Alert.alert(
      "Warning",
      "Are you sure you want to go to Home screen?",
      [
        {
          text: "No",
        },
        {
          text: "Yes",
          onPress: () => {
            navigation.navigate("Home", {
              username: route.params.username,
              phoneNumber: route.params.phoneNumber,
            });
          },
        },
      ]
    );
  }

  function renderTop() {
    return (
      <TouchableOpacity style={styles.top} onPress={() => handleBackToHome()}>
        <Image source={icons.back} resizeMode="contain" style={styles.top.image}/>
        <Text style={styles.top.text}>Home</Text>
      </TouchableOpacity>
    );
  }

  function renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.header.sub}>
          <Text style={styles.header.text}>Bank Linking</Text>
        </View>
      </View>
    );
  }

  function renderBanner() {
    return (
      <View style={styles.banner}>
        <View style={styles.banner.sub}>
          <Text style={styles.banner.text}>An account must at least connect to 1 bank account.</Text>
        </View>
        <Text style={styles.banner.text.sub}>This is a list of banks that are able to connect to the account.</Text>
      </View>
    );
  }

  function renderFeatures() {
    const Header = () => (
      <View style={styles.features.header}>
        <Text style={styles.features.text}>Banks</Text>
      </View>
    );

    function handleBank(item) {
      navigation.navigate("BankDescription", {
        bankName: item.description,
        username: route.params.username,
        phoneNumber: route.params.phoneNumber,
      });
    }

    const buttonStyle = (item) => {
      return(
        StyleSheet.create({
          height: 50,
          width: 100,
          marginBottom: 5,
          borderRadius: 10,
          borderColor: COLORS.black,
          backgroundColor: item.backgroundColor,
          alignItems: "center",
          justifyContent: "center",
        })
      )
    }

    const imageStyle = (item) => {
      return(
        StyleSheet.create({
          height: 55, 
          width: 55, 
          tintColor: item.color,
        })
      )
    }

    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.features.items} onPress={() => handleBank(item)}>
        <View style={buttonStyle(item)}>
          <Image source={item.icon} resizeMode="contain" style={imageStyle(item)}/>
        </View>
        <Text style={styles.features.description}>{item.description}</Text>
      </TouchableOpacity>
    );

    return (
      <FlatList
        ListHeaderComponent={Header}
        data={bankData}
        numColumns={2}
        columnWrapperStyle={styles.features.flatlist.wrapper}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        style={styles.features.flatlist}
      />
    );
  }

  debugger

  function renderBank() {
    const HeaderComponent = () => (
      <View style={{ backgroundColor: COLORS.blueback }}>
        {renderHeader()}
        {renderBanner()}
        {renderFeatures()}
      </View>
    );
    return (
      <FlatList
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ marginBottom: 80 }}></View>}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blueback }}>
      <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
      <SafeAreaView style={{ paddingHorizontal: SIZES.padding * 2 }}>
        {renderTop()}
      </SafeAreaView>
      {renderBank()}
    </SafeAreaView>
  );
};

export default BankAccount;
