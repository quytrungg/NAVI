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
        text: {
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

        sub: {
            marginBottom: SIZES.padding * 2,
        },
        text: {
            ...FONTS.h3,

            sub: {
                ...FONTS.h3, color: COLORS.gray,
            },
        },
    },
    features: {
        header: {
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
        description: {
            textAlign: "center",
            flexWrap: "wrap",
            ...FONTS.body4,
        },
        flatlist: {
            marginTop: SIZES.padding * 2,

            wrapper: {
                justifyContent: "space-between",
            }
        }
    },
    bank: {
        header: {
            backgroundColor: COLORS.blueback,
        },
        flatlist: {
            container: {
                paddingHorizontal: SIZES.padding * 3,
            },
            wrapper: {
                justifyContent: "space-between",
            },
            footer: {
                marginBottom: 80,
            }
        },
    },
    safe_area_view: {
        flex: 1,
        backgroundColor: COLORS.blueback,

        sub: {
            paddingHorizontal: SIZES.padding * 2,
        },
    },

})

export default styles;