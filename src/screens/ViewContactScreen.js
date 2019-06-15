import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  Linking
} from 'react-native';
import { Card, CardItem } from "native-base";
import AsyncStorage from '@react-native-community/async-storage'
import { Icon } from './Components'
import { bold } from 'ansi-colors';
export default class ViewContactScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <View style={{ alignItems: 'center', marginLeft: 10 }}>
        <Text style={{ color: '#FFFF', fontSize: 28, fontWeight: 'bold' }}>
          View Contact
        </Text>
      </View>,
   

      headerStyle: {
        backgroundColor: '#AE1438',
      },
    }
  }


  constructor(props) {
    super(props);
    this.state = {
      fname: 'DummyText',
      lname: 'DummyText',
      phone: 'DummyText',
      email: 'DummyText',
      address: 'DummyText',
      key: 'DummyText'
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      var key = this.props.navigation.getParam("key", "");
      // Call a method to use key
      this.getContact(key)
    })
  }

  getContact = async key => {
    await AsyncStorage.getItem(key)
      .then(contactjsonString => {
        var contact = JSON.parse(contactjsonString);
        contact["key"] = key;
        this.setState(contact)
      })
      .catch(error => {
        console.log(error)
      })
  }

  callAction = phone => {
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telpromt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert("Phone number is not available")
        } else {
          return Linking.openURL(phoneNumber)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  smsAction = phone => {
    let phoneNumber = phone;
    phoneNumber = `sms:${phone}`
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert("Phone number is not available")
        } else {
          return Linking.openURL(phoneNumber)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  editContact = (key) => {
    this.props.navigation.navigate("editcontact", { key: key })
  }

  deleteContact = key => {
    Alert.alert("Delete Contact ?", `${this.state.fname} ${this.state.lname}`, [
      {
        text: "Cancel",
        onPress: () => console.log("cancel tapped")
      },
      {
        text: "OK",
        onPress: async () => {
          await AsyncStorage.removeItem(key)
            .then(() => {
              this.props.navigation.goBack();
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    ]);
  };


  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.contactIconContainer}>
          <Text style={styles.contactIcon}>
            {this.state.fname[0].toUpperCase()}{this.state.lname[0].toUpperCase()}
          </Text>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {this.state.fname} {this.state.lname}
            </Text>
          </View>
        </View>
        <Card style={styles.actionContainer}>
          <CardItem style={styles.actionButton} bordered>
            <TouchableOpacity
              onPress={() => {
                this.smsAction(this.state.phone);
              }}
            >
              <Icon name="text" size={30} color="#B83227" />
            </TouchableOpacity>
          </CardItem>

          <CardItem style={styles.actionButton} bordered>
            <TouchableOpacity
              onPress={() => {
                this.callAction(this.state.phone);
              }}
            >
              <Icon name="call" size={30} color="#B83227" />
            </TouchableOpacity>
          </CardItem>
        </Card>

        <View style={styles.infoContainer}>
          <Card>
            <CardItem >
              <Text style={styles.infoText}>Phone</Text>
            </CardItem>
            <CardItem >
              <Text style={styles.infoText}>{this.state.phone}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem bordered>
              <Text style={styles.infoText}>email</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.email}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem bordered>
              <Text style={styles.infoText}>Address</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.address}</Text>
            </CardItem>
          </Card>
        </View>

        

        <Card style={styles.actionContainer}>
          <CardItem style={styles.actionButton} bordered>
            <TouchableOpacity
              onPress={() => {
                this.editContact(this.state.key);
              }}
            >
              <Icon name="create" size={30} color="#B83227" />
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>
          </CardItem>

          <CardItem style={styles.actionButton} bordered>
            <TouchableOpacity
              onPress={() => {
                this.deleteContact(this.state.key);
              }}
            >
              <Icon name="trash" size={30} color="#B83227" />
            </TouchableOpacity>
          </CardItem>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contactIconContainer: {
    height: 200,
    backgroundColor: "#B83227",
    alignItems: "center",
    justifyContent: "center"
  },
  contactIcon: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#DAE0E2"
  },
  nameContainer: {
    width: "100%",
    height: 50,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  },
  name: {
    fontSize: 24,
    color: "#000",
    fontWeight: "900"
  },
  infoText: {
    fontWeight:bold ,
    fontSize: 18,
    fontWeight: "300"
  },
  actionContainer: {
    flexDirection: "row"
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  actionText: {
    color: "#B83227",
    fontWeight: "900"
  },
  infoContainer: {
    flexDirection: "column"
  }
});