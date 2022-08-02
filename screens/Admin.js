import React, {useState} from "react";
import { SafeAreaView, View, Text, Image, FlatList, TouchableOpacity, Alert, StatusBar } from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const Admin = ({navigation}) => {
    const featuresData = [
        {   id: 1,
            icon: images.modify,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "Modify"
        },
        {   id: 2,
            icon: images.view,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "View"
        },
        {   id: 3,
            icon: images.add,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "Add Bank"
        },
        {   id: 4,
            icon: images.remove,
            color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "Remove Bank"
        }
    ]

    const [features, setFeatures] = useState(featuresData);

    function handelNotification(){
      return(
        Alert.alert("Notifications", "No notifications")
      )
    }

    function renderHeader(){
        return(
            <View style={{flexDirection: 'row', marginVertical: SIZES.padding * 2}}>
                <View style={{flex: 1}}>
                    <Text style={{ ...FONTS.h1 }}>Welcome Back!</Text>
                    <Text style={{ ...FONTS.body2, color: COLORS.gray }}>administrator</Text>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity   style={{height: 40,
                                                width: 40,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: COLORS.blueback,
                                                borderColor: COLORS.bluetext,
                                                borderWidth: 1.5}}
                                        onPress = {() => handelNotification()}>
                        <Image  source={icons.bell}
                                style={{width: 20,
                                        height: 20,
                                        tintColor: COLORS.bluetext}}/>
                        <View   style={{position: 'absolute',
                                        top: -5,
                                        right: -5,
                                        height: 10,
                                        width: 10,
                                        backgroundColor: COLORS.red,
                                        borderRadius: 5}}>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderBanner(){
        return (
            <View style={{height: 120, borderRadius: 10}}>
                <Image  source={icons.barcode}
                        resizeMode="cover"
                        style={{width: "100%",
                                height: "80%",
                                alignSelf: "center",
                                borderRadius: 20}}/>
            </View>
        )
    }

    function handleFeature(item){
        if(item.description == 'Modify'){
            navigation.navigate("Search", {
                flag: false,
            });
        }
        else if(item.description == 'View'){
            navigation.navigate("View");
        }
        else if(item.description == 'Add Bank'){
            console.log(item.description);
        }
        else if(item.description == 'Remove Bank'){
            console.log(item.description);
        }
    }

    function renderFeatures(){
        const Header = () => (
            <View style={{marginBottom: SIZES.padding * 2}}>
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
                data={features}
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
            <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
            {renderHomeView()}
        </SafeAreaView>
    )
}

export default Admin;