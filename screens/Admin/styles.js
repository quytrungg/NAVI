import {StyleSheet} from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants';

const styles = StyleSheet.create({
    header:{
      flexDirection: "row", 
      marginVertical: SIZES.padding * 2,
  
      sub:{
        flex: 1,
      },
      text:{
        ...FONTS.h1,
      },
      username:{
        ...FONTS.body2, 
        color: COLORS.gray,
      },
    },
    notification:{
      alignItems: "center", 
      justifyContent: "center",
  
      button:{
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderColor: COLORS.blueprim,
        borderWidth: 1.5,
      },
      bell:{ 
        width: 20, 
        height: 20, 
        tintColor: COLORS.blueprim 
      },
      reddot:{
        position: "absolute",
        top: -5,
        right: -5,
        height: 10,
        width: 10,
        backgroundColor: COLORS.red,
        borderRadius: 5,
      },
    },
    banner:{
      height: 120, 
      borderRadius: 10,
    },
    barcode:{
      width: "100%",
      height: "80%",
      alignSelf: "center",
      borderRadius: 20,
    },
    feature:{
      marginBottom: SIZES.padding * 2,
  
      text:{
        ...FONTS.h3,
      },
      items:{
        marginBottom: SIZES.padding * 2,
        width: 60,
        alignItems: "center",
      },
      button:{
        height: 50,
        width: 50,
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: item.backgroundColor,
        alignItems: "center",
        justifyContent: "center",
      },
      image:{
        height: 20, 
        width: 20, 
        tintColor: item.color,
      },
      description:{
        textAlign: "center", 
        flexWrap: "wrap", 
        ...FONTS.body4,
      },
      flatlist:{
        marginTop: SIZES.padding * 2,
      },
    },
    homeview:{
      backgroundColor: COLORS.blueback,
  
      flatlist:{
        marginBottom: 80,
      },
    },
    promo:{
      header:{
        flexDirection: "row", 
        marginBottom: SIZES.padding,
  
        sub:{
          flex: 1,
        },
      },
      
      text:{
        ...FONTS.h3,
      },
      subtext:{ 
        color: COLORS.gray, 
        ...FONTS.body4,
      },
    },
    safe_area_view:{
      flex: 1, 
      backgroundColor: COLORS.blueback,
    },
  
  })

  export default styles;