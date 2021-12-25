import * as React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ImageBackground} from 'react-native' 
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'
import db from '../config'

const bgImg = require('../assets/background2.png')
const appIcon = require('../assets/appIcon.png')
const appName = require('../assets/appName.png')

export default class TransactionScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            domState:'normal',
            hasCameraPermissions:null,
            scanned:false,
            bookId:'',
            studentId:''
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
        const {domState} = this.state
        if(domState === 'bookId'){
            this.setState({
                scanned:true,
                bookId:data,
                domState:'normal'
            })
         }else{
            this.setState({
                scanned:true,
                studentId:data,
                domState:'normal'
            })
        }
    }
        
    handleTransaction =()=> {
        var {bookId}=this.state
        db.collection('books').doc(book_ID).get().then(doc =>{
            var book = doc.data()
            if(book.is_book_available){
                this.initiateBookIssue()
            }else{
                this.initiateBookReturn()
            }
        })
    }
    
    initiateBookIssue=()=>{
        console.log('Book Issued To The Student')
    }

    initiateBookReturn=()=>{
        console.log('Book Returned To The Library')
    }

    render(){
        const {domState, hasCameraPermissions, scanned, bookId, studentId} = this.state
    
        if(domState !== 'normal'){
            return(
                <BarCodeScanner
                    onBarCodeScanned = {scanned? undefined:this.handleBarcodeScanned}
                    style = {StyleSheet.absoluteFillObject}
                />
            )
        }
        return(
            <View style = {styles.container}>
                <ImageBackground style = {styles.bgImage} source = {bgImg}>
                    <View style = {styles.upperContainer}>
                        <Image  style = {styles.appIcon} source = {appIcon}/>
                        <Image  style = {styles.appName} source = {appName}/>
                    </View>
                    <View style = {styles.lowerContainer}>
                        <TextInput
                            style = {style.textinput}
                            placeholder={'bookId'}
                            placeholderTextColor = 'grey'
                            value = 'bookId'
                        />
                        <TouchableOpacity style = {styles.scanButton} onPress = {()=> {
                            this.getCameraPermissions('bookId')
                        }}>
                            <Text style = {styles.scanbuttonText}>
                                scan
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {[styles.lowerContainer, {marginTop:15}]}>
                        <TextInput
                            style = {style.textinput}
                            placeholder={'studentId'}
                            placeholderTextColor = 'grey'
                            value = 'studentId'
                        />
                        <TouchableOpacity style = {styles.scanButton} onPress = {()=> {
                            this.getCameraPermissions('studentId')
                        }}>
                            <Text style = {styles.scanbuttonText}>
                                scan
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style = {styles.submitButton} 
                                          onPress={()=>this.handleTransaction()}>
                            <Text style = {styles.buttonText}>
                                Submit
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF"
    },
    bgImage: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    upperContainer: {
      flex: 0.5,
      justifyContent: "center",
      alignItems: "center"
    },
    appIcon: {
      width: 200,
      height: 200,
      resizeMode: "contain",
      marginTop: 80
    },
    appName: {
      width: 80,
      height: 80,
      resizeMode: "contain"
    },
    lowerContainer: {
      flex: 0.5,
      alignItems: "center"
    },
    textinputContainer: {
      borderWidth: 2,
      borderRadius: 10,
      flexDirection: "row",
      backgroundColor: "#9DFD24",
      borderColor: "#FFFFFF"
    },
    textinput: {
      width: "57%",
      height: 50,
      padding: 10,
      borderColor: "#FFFFFF",
      borderRadius: 10,
      borderWidth: 3,
      fontSize: 18,
      backgroundColor: "#5653D4",
      fontFamily: "Rajdhani_600SemiBold",
      color: "#FFFFFF"
    },
    scanbutton: {
      width: 100,
      height: 50,
      backgroundColor: "#9DFD24",
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      justifyContent: "center",
      alignItems: "center"
    },
    scanbuttonText: {
      fontSize: 24,
      color: "#0A0101",
      fontFamily: "Rajdhani_600SemiBold"
    },
    submitButton:{
        width:'50%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'blue',
        borderRadius:15
    },
    buttonText:{
        fontSize:25,
        color:'white',
        fontFamily:'cursive'
    }
    
  });