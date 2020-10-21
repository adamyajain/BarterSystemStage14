import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native'

import db from '../config';
import firebase from 'firebase';

export default class HomeScreen extends Component {
    constructor(){
        super();
        this.state = {
            allRequests : []
        }
        this.requestRef = null
    }
    getallRequests =()=>{
        this.Ref = db.collection("Items")
        .onSnapshot((snapshot)=>{
            var allRequests = snapshot.docs.map(document => document.data());
            this.setState({
                allRequests : allRequests 
            });
        })
    }

    componentDidMount(){
        this.getallRequests()
    }

    componentWillUnmount(){
        this.requestRef()
    }

    keyExtractor = (item, index) => index.toString()


    renderItem = ( {item, i} ) =>{
        console.log(item.item_name);
        return (
            <ListItem
            key={i}
            title={item.item_name}
            subtitle={item.description}
            titleStyle={{color: 'black', fontWeight: 'bold' }}
            rightElement={
                <TouchableOpacity style={styles.button}>
                    <Text style={{color : '#ffff'}}> Exchange </Text>
                </TouchableOpacity>
            }
            bottomDivider
            />
        )
    }

    render(){
        return(
          <View style={{flex:1}}>
            <MyHeader title="Donate Books"/>
            <View style={{flex:1}}>
              {
                this.state.allRequests.length === 0
                ?(
                  <View style={styles.subContainer}>
                    <Text style={{ fontSize: 20}}>List Of All Requested Books</Text>
                  </View>
                )
                :(
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allRequests}
                    renderItem={this.renderItem}
                  />
                )
              }
            </View>
          </View>
        )
      }
    }
    
    const styles = StyleSheet.create({
      subContainer:{
        flex:1,
        fontSize: 20,
        justifyContent:'center',
        alignItems:'center'
      },
      button:{
        width:100,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8
         }
      }
    })