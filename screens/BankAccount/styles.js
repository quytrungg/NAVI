import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants';

const styles = StyleSheet.create({
    top: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: widthScreen * 0.05,

        image: {
            width: 15, 
            height: 15, 
            tintColor: COLORS.black,
        },
        text:{
            marginLeft: SIZES.padding / 2,
            color: COLORS.black,
            ...FONTS.h4,
        },
    },
    header: {
        flexDirection: "row", 
        marginVertical: SIZES.padding * 2,

        sub: {
            flex: 1, 
            justifyContent: "center", 
            alignItems: "center",
        },
        text: {
            ...FONTS.h1, 
            color: COLORS.blueprim,
        },
    },
    banner: {
        height: 120, 
        borderRadius: 10,

        sub:{
            marginBottom: SIZES.padding * 2,
        },
        text:{
            ...FONTS.h3,
            
            sub:{
                ...FONTS.h3, color: COLORS.gray,
            },
        },
    },
    features: {
        header:{
            marginBottom: SIZES.padding * 2,
            marginTop: SIZES.padding * 1,
        },
        text: {
            ...FONTS.h3,
        },
        items: {
            marginBottom: SIZES.padding * 1.5,
            width: 111,
            alignItems: "center",
        },
        description:{
            textAlign: "center", 
            flexWrap: "wrap", 
            ...FONTS.body4,
        },
        flatlist:{
            marginTop: SIZES.padding * 2,
            
            wrapper:{
                justifyContent: "space-between",
            }
        }
    },
    homeview: {
        backgroundColor: COLORS.blueback,

        flatlist: {
            marginBottom: 80,

            container: {
                paddingHorizontal: SIZES.padding * 3,
            },
            wrapper: {
                justifyContent: "space-between",
            }
        },
    },
    promo: {
        header: {
            flexDirection: "row",
            marginBottom: SIZES.padding,

            sub: {
                flex: 1,
            },
        },

        text: {
            ...FONTS.h3,
        },
        subtext: {
            color: COLORS.gray,
            ...FONTS.body4,
        },
    },
    safe_area_view: {
        flex: 1,
        backgroundColor: COLORS.blueback,
    },

})

export default styles;