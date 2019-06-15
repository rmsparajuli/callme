// Api  concept

// make state

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image, } from 'react-native';

export default class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: []
        };
    }

    getUserFromApi = () => {
        return fetch('https://randomuser.me/api/?results=50')
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    isLoading: false,
                    dataSource: this.state.dataSource.concat(responseJson.results)
                });
            })
            .catch(error => console.log(error))
    };

    // optional , can be use in flatlist:
    _keyExtractor = (datasource, index) => datasource.email;

    componentDidMount() {
        this.getUserFromApi();
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                    <ActivityIndicator size='large' color="red" />
                </View>
            )

        }
        return (
            <View style={{ flex: 1 }}>
                <View style={{ justifyContent: "center", alignItems: "center", }}>
                    <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                        API CONCEPT
                </Text>
                </View>

                <FlatList
                    data={this.state.dataSource}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: 10, borderWidth: 1 }}>
                            <View style={{padding:5}}>
                                <Image
                                    source={{ uri: item.picture.large }}
                                    style={{ height: 150, width: 150 }}
                                />
                            </View>
                            <View style={{paddingVertical:4}}>
                                <Text>
                                    Name: {item.name.title} {item.name.first} {item.name.last}
                                </Text>
                                <Text>Email: {item.email}</Text>
                                <Text>City: {item.location.city}</Text>
                                <Text>Phone: {item.phone}</Text>
                                <Text> </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}
