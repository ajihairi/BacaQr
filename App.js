'use strict';

import React, { Component } from 'react';

import {Dimensions, StyleSheet, Text, Alert, View, Button, ScrollView, TouchableOpacity
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Icons from 'react-native-vector-icons/Ionicons'

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

console.disableYellowBox = true;

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataqr: '',
      status: 'Ready',
      userData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      }
    };
  }
  onSuccess(e) {
    const [firstName, lastName, email, phone] = e.data.split(';');  // filtering if there's a dataset object besides, the data will be splitted if found ';'
    this.setState({
      dataqr:this.state.dataqr+', '+e.data,
      status: 'Coba Lagi'
    })
    if (email !== undefined) {
      this.setState({userData:{
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone
      }})
      Alert.alert(
      'QR Code',
      'target email : '+email,
      [
        {text: 'OK', onPress: ()  => this.setState({userData:{firstName:''}, dataqr: ''})},
      ],
      { cancelable: false }
    )
    } else {
    Alert.alert(
          'QR Code',
          'Code : '+e.data,
          [
            {text: 'OK', onPress: ()  => console.warn('OK Pressed')},
          ],
          { cancelable: false }
        )
    }
  }

  render() {
    const {userData} = this.state;
    const {
      firstName,
      lastName,
      email,
      phone,
    } = userData;

    return (
      <View style={styles.conMain}>
      {/* <View style={styles.conHeader}>
          <Text style={styles.textHeader}>Contoh QR Code yang ke 129123x</Text>
      </View> */}
      <View style={styles.conQR}>
        <QRCodeScanner
        showMarker
        cameraStyle={{ alignItems: 'center', justifyContent:'center', flex: 1 }}
        customMarker={
          <View>
          <View style={{paddingTop: 20, flexDirection:'row'}}>
          <TouchableOpacity onPress={() => Alert.alert('Button Pressed!')} style={{flexDirection:'row', paddingLeft: 15}}>
                  <Icons name="ios-arrow-back" size={25} color="orange"/>
                  <Text style={styles.centerText}>QR Scanner</Text>

          </TouchableOpacity>
              </View>
                <View style={styles.rectangleContainer}>
                  <View style={styles.topOverlay}>
                    <Text style={{ fontSize: 12, color: "white" }}>
                     Scan QR Code here
                   </Text>
                  </View>

                <View style={{ flexDirection: "row", alignItems:'center' }}>
                  {/* <View style={styles.leftAndRightOverlay} /> */}

                   <View style={styles.rectangle} />

                  {/* <View style={styles.leftAndRightOverlay} /> */}
                  </View>

                  {/* <View style={styles.bottomOverlay} /> */}
                  </View>
                  </View>
        }
        onRead={(e) => this.onSuccess(e)}
            ref={(node) => { this.scanner = node }}
        />
      </View>
      <View style={{flex: 1, backgroundColor:'white', padding: 15}}>
                    <Text style={{alignSelf:'center', textAlign: 'center'}}>Pencet tombol 'Coba Lagi' jika ingin menscan kembali</Text>
                    <Button title={this.state.status}
                      onPress={() => {
                    this.scanner.reactivate ();
                    this.setState ({status: 'Ready'});
                  }}
                    />
                      <Text style={{fontSize: 12, fontWeight: 'bold'}}>Code</Text>
                    <ScrollView>
                    {
                      firstName === '' ? (<Text>{this.state.dataqr}</Text>)
                      : (<View>
                        <Text>{firstName}</Text>
                        <Text>{email}</Text>
                        <Text>{phone}</Text>
                      </View>)
                    }
                    </ScrollView>
                  </View>
      </View>
    );
  }
}

const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.5; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "red";

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#22ff00";



const styles = StyleSheet.create({
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  conMain : {
    flex:1,
    height: SCREEN_HEIGHT
  },
  conHeader : {

    backgroundColor: '#6200EE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textHeader : {
    fontSize: 18,
    color :'white'
  },
  conQR : {
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  centerText: {
    marginLeft: 15,
    fontSize: 20,
    color:'orange'
  },
  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  topOverlay: {
    // height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    // backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center"
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  }
});