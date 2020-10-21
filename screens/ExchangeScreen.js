import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    KeyboardAvoidingView
    } from 'react-native';

import db from '../config';
import firebase from 'firebase'

export default class ExchangeScreen extends Component{
    constructor(){
        super()
        this.state = {
            itemName : '',
            itemDes : '',
            username : firebase.auth().currentUser.email
        }
    }

    addItem = (itemName, itemDes) => {
        var userName = this.state.username
        db.collection("exchange_requests").add({
            "username" : userName,
            "item_name" : itemName,
            description : itemDes
        })
        this.setState({
            itemName : '',
            itemDes : ''
        })

        return Alert.alert(
            'Item Ready to Exchange',
            '',
            [
                {text: 'OK', onPress: () => {
                    this.props.navigation.navigate('HomeScreen')
                }}
            ]
        );
    }

    

    render(){
        return(
            <View style={{flex : 1}}>
                <KeyboardAvoidingView style={styles.keyboardStyle}>
                    <TextInput
                     style = {styles.textInput}
                     placeholder = {"Name Of Item"}
                     onChangeText = {(text)=>{
                         this.setState({
                            itemName : text 
                         })
                     }}
                     value = {this.state.itemName}
                     />
                     <TextInput
                     style = {styles.textInput}
                     placeholder = {"Brief Description"}
                     multiline = {true}
                     numberOfLines = {7}
                     onChangeText = {(text)=>{
                         this.setState({
                            itemDes : text 
                         })
                     }}
                     value = {this.state.itemDes}
                     />
                     <TouchableOpacity
                     styel={[styles.button,{marginTop:10}]}
                     onPress = {()=>{this.addItem(this.state.itemName, this.state.itemDes)}}
                     >
                      <Text style={{color:'#ffff', fontSize:18, fontWeight:'bold'}}>Add Item</Text>   
                     </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}