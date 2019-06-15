import React, { Component } from 'react';
import {
    createAppContainer,
    createStackNavigator,
    createDrawerNavigator
} from 'react-navigation'
import {Icon } from './screens/Components'
import { Dimensions } from 'react-native'
import AddNewContactScreen from './screens/AddNewContactScreen';
import EditContactScreen from './screens/EditContactScreen';
import HomeScreen from './screens/HomeScreen';
import ViewContactScreen from './screens/ViewContactScreen';

const WIDTH = Dimensions.get('window').width;
// This is unnecessary but we can create like this and call only DrawerConfig
const DrawerConfig = {
    drawerWidth: WIDTH * 0.7,
    contentComponent: ({ navigation }) => {
        return (<HomeSwitchNav navigation={navigation} />)
    }
}
const HomeSwitchNav = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        addcontact: { screen: AddNewContactScreen },
        editcontact: { screen: EditContactScreen },
        viewcontact: { screen: ViewContactScreen },
    },
    
    { initialRouteName: 'Home' },
)


export default createAppContainer(HomeSwitchNav)