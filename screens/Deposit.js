import React, {useState} from "react";
import { SafeAreaView, View, Text, Image, FlatList, TouchableOpacity, Alert } from "react-native"
import { TextInput } from "react-native-gesture-handler";
import { COLORS, SIZES, FONTS, icons, images } from "../constants"

const Deposit = ({navigation}) => {
    const featuresData = [
        {   id: 1,
            icon: icons.reload,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "Bank Account"
        }
    ]

    const [features, setFeatures] = useState(featuresData);

    function renderHeader(){
        return(
            <View   style={{flexDirection: 'row', marginVertical: SIZES.padding * 2}}>
                <TouchableOpacity style={{flexDirection: 'row', 
                                alignItems: "center", 
                                marginTop: SIZES.padding * 6,
                                paddingHorizontal: SIZES.padding * 2}} 
                        onPress={() => navigation.goBack("Home")}>
                    <Image  source={icons.back} 
                resizeMode="contain" 
                style={{width: 15, 
                        height: 15, 
                        tintColor: COLORS.black}}/>
                </TouchableOpacity>
                <View style={{flex: 1, 
                            justifyContent: 'center',
                            alignItems: 'center'}}>
                    <Text style={{ ...FONTS.h1 }}>Deposit Money</Text>
                    <Text style={{ ...FONTS.body2, color: COLORS.gray }}>quytrungg</Text>
                </View>
            </View>
        )
    }

    // Phần đầu của rút tiền

    function renderBanner(){
        return (
            <View style={{height: 120, borderRadius: 10, backgroundColor: COLORS.bluesec}}>
                
                <View>
                    <Image  source={images.navilogo}
                            style={{height: 22, width: 22}}/>
                    <Text>Balance: $1200.65</Text>
                </View>
                <View>
                    <Text style={{color: COLORS.black, ...FONTS.body3 }}>Withdraw amount</Text>
                    <TextInput  style={{marginVertical: SIZES.padding, 
                                        borderBottomColor: COLORS.black, 
                                        borderBottomWidth: 1, height: 40, 
                                        color: COLORS.black, 
                                        ...FONTS.body3}} 
                                placeholder="Enter Deposit Amount" 
                                placeholderTextColor={COLORS.gray} 
                                selectionColor={COLORS.black}/>
                </View>
            </View>
        )
    }

    function renderWithdrawSource(){
        const Header = () => (
            <View style={{marginBottom: SIZES.padding * 2}}>
                <Text style={{...FONTS.h3}}>Features</Text>
            </View>
        )
        const renderItem = ({item}) => (
            <TouchableOpacity   style={{marginBottom: SIZES.padding * 2, 
                                        width: 60, alignItems: 'center'}}
                                onPress={() => console.log(item.description)}>
                <View style={{  height: 50,
                                width: 50,
                                marginBottom: 5,
                                borderRadius: 20,
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
                numColumns={2}
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
                {renderWithdrawSource()}
                {renderPromoHeader()}
            </View>
        )
        const renderPromoHeader = () => (
            <View style={{flexDirection: 'row', marginBottom: SIZES.padding}}>
                <View style={{flex: 1}}>
                    <Text style={{...FONTS.h3}}>Special Promos</Text>
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
                //pay attention to this
                ListFooterComponent={
                    <View style={{marginBottom: 80}}>
                    </View>
                }
            />
        )
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.blueback}}>
            {renderHomeView()}
        </SafeAreaView>
    )
}

export default Deposit;