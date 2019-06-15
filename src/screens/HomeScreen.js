import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  PanResponder,
  Animated,
  FlatList,
  SwipeableListView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from './Components'
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [

      ]
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <View style={{ alignItems: 'center', marginLeft: 10 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>
          Home
        </Text>
      </View>,
      headerRight: (
        <TouchableOpacity style={{ marginRight: 5, paddingHorizontal: 20, }} onPress={() => { Alert.alert("Features will be added") }}>
          <Icon name="more" size={29} />
        </TouchableOpacity>
      ),
      // headerLeft: (
      //   <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.toggleDrawer()} >
      //     <Icon name="menu" size={29} />
      //   </TouchableOpacity>
      // ),
      headerStyle: {
        backgroundColor: '#AE1438',
      },
    }
  }

  componentWillMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      this.getAllContact();
    })
  }

  getAllContact = async () => {
    await AsyncStorage.getAllKeys()
      .then(keys => {
        return AsyncStorage.multiGet(keys)
          .then(
            result => {
              this.setState({
                data: result.sort(function (a, b) {
                  if (JSON.parse(a[1]).fname < JSON.parse(b[1]).fname) {
                    return -1
                  }
                  if (JSON.parse(a[1]).fname > JSON.parse(b[1]).fname) {
                    return 1;
                  }
                  return 0;
                })
              })
            }
          )
          .catch(error => {
            console.log(error)
          })
      }
      )
      .catch(error => {
        console.log(error)
      });
    console.log(this.state.data)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <FlatList
          data={this.state.data}
          horizontal={false}
          renderItem={({ item }) => {
            contact = JSON.parse(item[1]);
            return (
              <TouchableOpacity style={{ borderBottomWidth: 1, marginVertical: 2 }}
                onPress={() => {
                  this.props.navigation.navigate("viewcontact", { key: item[0].toString() })
                }}>
                <View style={styles.listItem}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.contactIcon}>
                      {contact.fname.charAt(0).toUpperCase()}
                      {contact.lname.charAt(0).toUpperCase()}

                    </Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={[styles.infoText, { fontWeight: 'bold', fontSize: 18, }]}>
                      {contact.fname} {contact.lname}
                    </Text>
                    <Text style={styles.infoText}>
                      {contact.phone}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }
          }
          keyExtractor={(item, index) => item[0].toString()}
        />
        <TouchableOpacity style={styles.floatButton}
          onPress={() => { this.props.navigation.navigate('addcontact') }} >
          <Text style={styles._forText}>
            +
        </Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  listItem: {
    flexDirection: "row",
    padding: 20
  },
  iconContainer: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B83227",
    borderRadius: 100
  },
  contactIcon: {
    fontSize: 28,
    color: "#fff"
  },
  infoContainer: {
    flexDirection: "column"
  },
  infoText: {
    fontWeight: '400',
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 2
  },
  floatButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 60,
    backgroundColor: "#B83227",
    borderRadius: 100
  },
  _forText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
})