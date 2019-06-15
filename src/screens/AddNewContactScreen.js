import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, Alert, Keyboard, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
//Look documentation for this
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from '../screens/Components'
export default class AddNewContactScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <View style={{ alignItems: 'center', marginLeft: 10, flexDirection: 'row' }}>
        <View style={{ marginRight: 10 }}>
          <Icon name="person-add" size={28} color="#2C3335" />
        </View>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>
          Add Contact
        </Text>
      </View>,
      headerRight: (
        <TouchableOpacity style={{ marginRight: 20 }} onPress={() => { Alert.alert("Features will be added") }}>
          <Icon name="more" size={29} />
        </TouchableOpacity>
      ),

      headerStyle: {
        backgroundColor: '#AE1438',
      },
    }
  }
  constructor(props) {

    super(props);
    this.state = {
      fname: '',
      lname: '',
      phone: '',
      email: '',
      address: '',
      password:'',
      hidePassword: true
    };
  }

  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  clearPassword = () => {
    this.setState({fname: '' });
    // Alert.alert("hey you")
  }
  saveContact = async () => {
    if (this.state.fname !== '' &&
      this.state.lname !== '' &&
      this.state.phone !== '' &&
      this.state.email !== '' &&
      this.state.address !== '') {

      var contact = {
        fname: this.state.fname,
        lname: this.state.lname,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address
      }

      await AsyncStorage.setItem(Date.now().toString(),
        JSON.stringify(contact))
        .then(() => {
          this.props.navigation.goBack();
          // this.props.navigation.navigate('viewcontact')
        })
        .catch(error => {
          console.log(error)
        })

    }
    else {
      Alert.alert("All field are required")
    }
  }

  render() {
    return (
      // <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss }}>
      <View style={{ flex: 1 }}>

        <ScrollView keyboardDismissMode="on-drag" >
          <View style={styles.container}>
            <Text style={styles.inputText}>
              Create an Account
            </Text>

            <TextInput
              style={styles.text}
              allowFontScaling={false}
              placeholder="First Name"
              underlineColorAndroid="transparent"
              placeholderTextColor="#666"
              keyboardType="default"
              clearButtonMode="always"
              onChangeText={name => this.setState({ fname:name })}
            />
            {/* <TouchableOpacity onPress={console.log("hell yeah")} style={{marginTop:20}}>
              <Text>
                clear name
              </Text>
            </TouchableOpacity> */}
            <TextInput
              style={styles.text}
              allowFontScaling={false}
              placeholder="Last Name"
              underlineColorAndroid="transparent"
              placeholderTextColor="#666"
              keyboardType="default"
              onChangeText={lname => this.setState({ lname })}
            />
            <TextInput
              style={styles.text}
              allowFontScaling={false}
              placeholder="Phone"
              underlineColorAndroid="transparent"
              placeholderTextColor="#666"
              keyboardType="numeric"
              onChangeText={phone => this.setState({ phone })}
            />
            <TextInput
              style={styles.text}
              allowFontScaling={false}
              placeholder="Address"
              underlineColorAndroid="transparent"
              placeholderTextColor="#666"
              keyboardType="default"
              onChangeText={address => this.setState({ address })}
            />
            <TextInput
              style={styles.text}
              allowFontScaling={false}
              placeholder="Email"
              underlineColorAndroid="transparent"
              placeholderTextColor="#666"
              keyboardType="email-address"
              onChangeText={email => this.setState({ email })}
            />

            <TouchableOpacity
              onPress={() => {
                // saveContact() : Promise <void>
                this.saveContact();
              }}
              style={styles._signup}>
              <Text style={{ color: '#FFF' }}>
                Submit
                      </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
     
        {/* <View style={{bottom:0, alignSelf:'auto', marginTop: 20, alignItems: 'center', justifyContent: 'center' }} >
          <Text>
            This is Optional
          </Text>
          <TextInput
            style={styles.text}
            allowFontScaling={false}
            placeholder="password"
            underlineColorAndroid="transparent"
            placeholderTextColor="#666"
            secureTextEntry = { this.state.hidePassword }
            onChangeText={password => this.setState({ password })}
          />
          <View>
          <TouchableOpacity onPress={this.managePasswordVisibility}
            style={{ height: 25, justifyContent: 'center', alignItems: "center", backgroundColor:'red', marginVertical:10 }} >
            <Text>
             Show password
              </Text>
          </TouchableOpacity>
          </View>
        
      </View> */}

      </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50
  },
  text: {
    paddingHorizontal: 10,
    color: '#333',
    fontSize: 14,
    fontWeight: '300',
    paddingVertical: 10,
    borderWidth: 1,
    width: 250,
    height: 45,
    borderRadius: 5,
    marginTop: 15,
    flexDirection: 'row',
  },
  inputText: {
    fontSize: 20,
    color: 'red',
    alignItems: 'center',
  },
  _signup: {
    backgroundColor: "red",
    marginRight: 20,
    marginTop: 20,
    borderRadius: 5,
    width: 130,
    padding: 5,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  _termsCondition: {

  },
  _linkText: {
    color: 'red'
  }
})