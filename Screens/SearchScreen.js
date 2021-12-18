import * as React from 'react'
import {Text, StyleSheet, View} from 'react-native'

export default class SearchScreen extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>
                    Search
                </Text>
            </View>
        )
    }
}
const styles=styleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#565304'
    },
    text:{
        color:'#FFFFFF',
        fontSize:30
    },
})