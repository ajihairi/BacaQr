'use strict';

import React, { Component } from 'react';

import {AppRegistry, StyleSheet, Text, Alert, View, Button
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataqr: '',
      status: 'Ready'
    };
  }
  onSuccess(e) {
    this.setState({
      dataqr:this.state.dataqr+', '+e.data,
      status: 'Coba Lagi'
    })
    Alert.alert(
      'QR Code',
      'Code : '+e.data,
      [
        {text: 'OK', onPress: ()  => console.warn('OK Pressed')},
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <View style={styles.conMain}>
      <View style={styles.conHeader}>
          <Text style={styles.textHeader}>Contoh QR Code yang ke 129123x</Text>
      </View>
      <View style={styles.conQR}>
        <QRCodeScanner
        showMarker
         onRead={this.onSuccess.bind(this)}
            ref={(node) => { this.scanner = node }}
            topContent={
              <View>
                <Text style={styles.centerText}>
                Silakan klik Coba Lagi untuk scan ulang
                </Text>
                <Button
                  onPress={() => {
                    this.scanner.reactivate ();
                    this.setState ({status: 'Ready'});
                  }}
                  title={this.state.status}
                />
              </View>
                  }
                bottomContent={
                  <View>
                    <Text>Code {this.state.dataqr}</Text>
                  </View>
                    }
        />
      </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  conMain : {
    flex:1
  },
  conHeader : {
    flex:1,
    backgroundColor: '#6200EE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textHeader : {
    fontSize: 18,
    color :'white'
  },
  conQR : {
    flex:8,
    padding: 5
  },
  centerText: {
    fontSize: 12,
    color: '#777',
  }
});