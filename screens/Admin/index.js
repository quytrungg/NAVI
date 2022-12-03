import React, { useState } from "react";
import {SafeAreaView, View, Text, Image, FlatList, TouchableOpacity, Alert, StatusBar} from "react-native";
import { COLORS, SIZES, icons, images } from "../../constants";
import styles from "./styles";

const featuresData = [
  {
    id: 1,
    icon: images.modify,
    color: COLORS.purple,
    backgroundColor: COLORS.lightpurple,
    description: "Modify",
  },
  {
    id: 2,
    icon: images.view,
    color: COLORS.yellow,
    backgroundColor: COLORS.lightyellow,
    description: "View",
  },
  {
    id: 3,
    icon: images.add,
    color: COLORS.primary,
    backgroundColor: COLORS.lightGreen,
    description: "Add Bank",
  },
  {
    id: 4,
    icon: images.remove,
    color: COLORS.red,
    backgroundColor: COLORS.lightRed,
    description: "Remove Bank",
  },
];

const Admin = ({ navigation, route }) => {

  function handelNotification() {
    Alert.alert("Notifications", "No notifications");
  }

  function renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.header.sub}>
          <Text style={styles.header.text}>Welcome Back!</Text>
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
    if (item.description == "Modify") {
      navigation.navigate("Search", {
        flag: false,
      });
    } else if (item.description == "View") {
      navigation.navigate("ViewAdmin");
    } else {
      // console.log(item.description);
    }
  }

  function renderFeatures() {
    const Header = () => (
      <View style={styles.features}>
        <Text style={styles.features.text}>Features</Text>
      </View>
    );

    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.features.items} onPress={() => handleFeature(item)}>
        <View style={styles.features.button}>
          <Image source={item.icon} resizeMode="contain" style={styles.features.image}/>
        </View>
        <Text style={styles.features.description}>{item.description}</Text>
      </TouchableOpacity>
    );

    return (
      <FlatList
        ListHeaderComponent={Header}
        data={featuresData}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
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
          <Text style={styles.promo.text}>What's New</Text>
        </View>
        <TouchableOpacity onPress={() => console.log("View All")}>
          <Text style={styles.promo.subtext}>View All</Text>
        </TouchableOpacity>
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
