import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, Alert, SafeAreaView, StatusBar, Dimensions, } from "react-native";
import { COLORS, SIZES, FONTS, icons } from "../../constants";
import bankData from "./data";
import styles from "./styles";
import defineMessages from "./messages";

const widthScreen = Dimensions.get("window").width;

const BankAccount = ({ navigation, route }) => {

  function handleBackToHome() {
    return Alert.alert("Warning", defineMessages.warning.defaultMessage,
      [
        {
          text: defineMessages.no.defaultMessage,
        },
        {
          text: defineMessages.yes.defaultMessage,
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
        <Image source={icons.back} resizeMode="contain" style={styles.top.image} />
        <Text style={styles.top.text}>{defineMesaages.home.defaultMessage}</Text>
      </TouchableOpacity>
    );
  }

  function renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.header.sub}>
          <Text style={styles.header.text}>{defineMesaages.bankLinking.defaultMessage}</Text>
        </View>
      </View>
    );
  }

  function renderBanner() {
    return (
      <View style={styles.banner}>
        <View style={styles.banner.sub}>
          <Text style={styles.banner.text}>{defineMessages.bannerTextMain.defaultMessage}</Text>
        </View>
        <Text style={styles.banner.text.sub}>{defineMessages.bannerTextSub.defaultMessage}</Text>
      </View>
    );
  }

  function renderFeatures() {
    const Header = () => (
      <View style={styles.features.header}>
        <Text style={styles.features.text}>{defineMessages.banks.defaultMessage}</Text>
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
      return (
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
      return (
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
          <Image source={item.icon} resizeMode="contain" style={imageStyle(item)} />
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

  function renderBank() {
    const HeaderComponent = () => (
      <View style={styles.bank.header}>
        {renderHeader()}
        {renderBanner()}
        {renderFeatures()}
      </View>
    );
    return (
      <FlatList
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={styles.bank.flatlist.container}
        numColumns={2}
        columnWrapperStyle={styles.bank.flatlist.wrapper}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={styles.bank.flatlist.footer}></View>}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safe_area_view}>
      <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
      <SafeAreaView style={styles.safe_area_view.sub}>
        {renderTop()}
      </SafeAreaView>
      {renderBank()}
    </SafeAreaView>
  );
};

export default BankAccount;
