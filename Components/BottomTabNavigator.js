import * as React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'
import SearchScreen from '../Screens/SearchScreen'
import TransactionScreen from '../Screens/TransactionScreen'

const Tab = createBottomTabNavigator()

export default class BottomTabNavigator extends React.Component{
    render(){
        return(
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name='Transaction' component={TransactionScreen}/>
                    <Tab.Screen name='Search' component={SearchScreen}/>

                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}
