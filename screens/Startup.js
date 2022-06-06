import * as React from 'react';
import { Button, TouchableOpacity, TextInput, Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';

import logo from './assets/Navi_Logo.png'


const startup = () => {
  
  const signUpPressed = () => {
    //Unfinished
    //Check and stuff
  }

  const loginPressed = () => {
    //Unfinished
    //Check and stuff
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}> 
        <Image style={styles.logo} source={logo} alt="Logo" /> 
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.headerText}>Username</Text>
        <TextInput style={styles.input} placeholder='Phone number'/>
      </View>

      <View style={styles.buttonWrapper}>
        <View style={styles.signUpButton}>
          <TouchableOpacity onPress={signUpPressed}>
            //Event
            <Text style={styles.signUpText}>Sign up</Text>

          </TouchableOpacity>
        </View>

        <View style={styles.loginButton}>
          <TouchableOpacity onPress={loginPressed}>
            //Event
            <Text style={styles.loginText}>Login</Text>

          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#EAF4FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
    height: 128,
    width: 128,
    resizeMode: 'contain',
  },
  headerText: {
    paddingTop: 20,
    fontSize: 15,
    color: '#024A9F',
  },
  inputWrapper: {
    marginLeft: '15%',
    marginRight: '15%',

  },
  input:{
    length: 150,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  buttonWrapper: {
      paddingTop: 10,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
  },
  signUpButton: {
    width: 70,
    marginRight: 15,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#5B87D0',
    borderColor: '#024A9F',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 12,
    color: '#FFF',
  },
  loginText: {
    fontSize: 12,
    color: '#024A9F',
  },
  loginButton: {
    width: 70,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#FFF',
    borderColor: '#024A9F',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',

  }

});
