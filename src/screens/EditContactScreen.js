import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  TextInput,
  Alert
} from "react-native";
import { Form, Item, Input, Label, Button } from "native-base";
import AsyncStorage from '@react-native-community/async-storage'
export default class EditContactScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      phone: "",
      email: "",
      address: "",
      key: ""
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      var key = this.props.navigation.getParam("key", "");
      this.getContact(key);
    });
  }

  getContact = async key => {
    await AsyncStorage.getItem(key)
      .then(contactJsonString => {
        var contact = JSON.parse(contactJsonString);
        //set key in this object
        contact["key"] = key;
        //set state
        this.setState(contact);
      })
      .catch(error => {
        console.log(error);
      });
  };

  updateContact = async key => {
    if (
      this.state.fname !== "" &&
      this.state.lname !== "" &&
      this.state.phone !== "" &&
      this.state.email !== "" &&
      this.state.address !== ""
    ) {
      var contact = {
        fname: this.state.fname,
        lname: this.state.lname,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address
      };
      await AsyncStorage.mergeItem(key, JSON.stringify(contact))
        .then(() => {
          this.props.navigation.goBack();
        })
        .catch(eror => {
          console.log(error);
        });
    }
  };

  static navigationOptions = {
    title: "Edit contact"
  };

  render() {
    return (
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
            onChangeText={fname => this.setState({ fname })}
            value={this.state.fname}
          />
          <TextInput
            style={styles.text}
            allowFontScaling={false}
            placeholder="Last Name"
            underlineColorAndroid="transparent"
            placeholderTextColor="#666"
            keyboardType="default"
            onChangeText={lname => this.setState({ lname })}
            value={this.state.lname}
          />
          <TextInput
            style={styles.text}
            allowFontScaling={false}
            placeholder="Phone"
            underlineColorAndroid="transparent"
            placeholderTextColor="#666"
            keyboardType="numeric"
            onChangeText={phone => this.setState({ phone })}
            value={this.state.phone}
          />
          <TextInput
            style={styles.text}
            allowFontScaling={false}
            placeholder="Address"
            underlineColorAndroid="transparent"
            placeholderTextColor="#666"
            keyboardType="default"
            onChangeText={address => this.setState({ address })}
            value={this.state.address}
          />
          <TextInput
            style={styles.text}
            allowFontScaling={false}
            placeholder="Email"
            underlineColorAndroid="transparent"
            placeholderTextColor="#666"
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />

          <TouchableOpacity
            onPress={() => {
              this.updateContact(this.state.key)
            }}
            style={styles._signup}>
            <Text style={{ color: '#FFF' }}>
              Update
                  </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
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
    marginTop: 15
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
    alignItems: 'center'
  },
  _termsCondition: {

  },
  _linkText: {
    color: 'red'
  }
})