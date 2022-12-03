import React, { useState } from "react";
import {SafeAreaView, View, Text, Image, FlatList, TouchableOpacity, Alert, StatusBar, StyleSheet} from "react-native";
import styles from "./styles";
import { icons } from "../../constants";
import defineMesaages from './messages';
import featuresData from "./data";

const Admin = ({ navigation, route }) => {

  function handelNotification() {
    Alert.alert("Notifications", "No notifications");
  }

  function renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.header.sub}>
          <Text style={styles.header.text}>{defineMesaages.welcomeBack.defaultMessage}</Text>
          <Text style={styles.header.username}> {route.params.username}</Text>
        </View>
        <View style={styles.notification}>
          <TouchableOpacity style={styles.notification.button} onPress={() => handelNotification()}>
            <Image source={icons.bell} style={styles.notification.bell}/>
            <View style={styles.notification.reddot}></View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderBanner() {
    return (
      <View style={styles.banner}>
        <Image source={icons.barcode} resizeMode="cover" style={styles.barcode}/>
      </View>
    );
  }

  function handleFeature(item) {
    if (item.description === defineMesaages.modify.defaultMessage) {
      navigation.navigate("Search", {
        flag: false,
      });
    } else if (item.description === defineMesaages.view.defaultMessage) {
      navigation.navigate("ViewAdmin");
    } else {
      // console.log(item.description);
    }
  }

  function renderFeatures() {
    const Header = () => (
      <View style={styles.features}>
        <Text style={styles.features.text}>{defineMesaages.features.defaultMessage}</Text>
      </View>
    );

    const buttonStyle = (item) => {
      return(
        StyleSheet.create({
          height: 50,
          width: 50,
          marginBottom: 5,
          borderRadius: 10,
          backgroundColor: item.backgroundColor,
          alignItems: "center",
          justifyContent: "center",
        })
      )
    }

    const iconStyle = (item) => {
      return(
        StyleSheet.create({
          height: 20, 
          width: 20, 
          tintColor: item.color,
        })
      )
    }

    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.features.items} onPress={() => handleFeature(item)}>
        <View style={buttonStyle(item)}>
          <Image source={item.icon} resizeMode="contain" style={iconStyle(item)}/>
        </View>
        <Text style={styles.features.description}>{item.description}</Text>
      </TouchableOpacity>
    );

    return (
      <FlatList
        ListHeaderComponent={Header}
        data={featuresData}
        numColumns={4}
        columnWrapperStyle={styles.features.flatlist.wrapper}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        style={styles.features.flatlist}
      />
    );
  }

  function renderHomeView() {
    const HeaderComponent = () => (
      <View style={styles.homeview}>
        {renderHeader()}
        {renderBanner()}
        {renderFeatures()}
        {renderPromoHeader()}
      </View>
    );
    const renderPromoHeader = () => (
      <View style={styles.promo.header}>
        <View style={styles.promo.header.sub}>
          <Text style={styles.promo.text}>{defineMesaages.whatsNew.defaultMessage}</Text>
        </View>
        <TouchableOpacity onPress={() => console.log("View All")}>
          <Text style={styles.promo.subtext}>{defineMesaages.viewAll.defaultMessage}</Text>
        </TouchableOpacity>
      </View>
    );
    return (
      <FlatList
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={styles.homeview.container}
        numColumns={2}
        columnWrapperStyle={styles.homeview.wrapper}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={styles.homeview.flatlist}></View>}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safe_area_view}>
      <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
      {renderHomeView()}
    </SafeAreaView>
  );
};

export default Admin;
