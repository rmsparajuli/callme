import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'


export default class Calendar extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <View>
        <TouchableOpacity>
          <Text>
             This is calender 
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
