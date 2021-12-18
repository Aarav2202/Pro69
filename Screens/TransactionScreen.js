import * as React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native' 
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class TransactionScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            domState:'normal',
            hasCameraPermissions:null,
            scanned:false,
            scannedData:''
        }
    }

    getCameraPermissions = async(domState)=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)

        this.setState({
            hasCameraPermissions:status === 'granted',
            domState:domState,
            scanned:false
        })
    }

    handleBarcodeScanned = async({type, data}) => {
        this.setState({
            scanned:true,
            scannedData:data,
            domState:'normal'
        })
    }
    render(){
        const {domState, hasCameraPermissions, scanned, scannedData} = this.state
    
        if(domState === 'scanner'){
            return(
                <BarCodeScanner
                    onBarCodeScanned = {scanned? undefined:this.handleBarcodeScanned}
                    style = {StyleSheet.absoluteFillObject}
                />
            )
        }
        return(
            <View style = {styles.container}>
                <Text style = {styles.displayText}>
                    {hasCameraPermissions?scannedData:'Request For Camera Permissions'}
                </Text>
                <TouchableOpacity 
                    style = {styles.scanButton}
                    onPress = {
                        () => this.getCameraPermissions('scanner')
                    }
                >
                    <Text style = {styles.buttonText}>
                        scan QR-Code
                    </Text>
                </TouchableOpacity>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    }
  });