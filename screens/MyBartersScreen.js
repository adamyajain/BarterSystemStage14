import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class MyBartersScreen extends Component {
  static navigationOptions = { header: null };

   constructor(){
     super()
     this.state = {
       userId : firebase.auth().currentUser.email,
       allBarters : [],
       allNotifications : []
     }
     this.requestRef= null
   }


   getAllBarters =()=>{
     this.requestRef = db.collection("all_Barters").where("donor_id" ,'==', this.state.userId)
     .onSnapshot((snapshot)=>{
       var allBarters = snapshot.docs.map(document => document.data());
       this.setState({
         allBarters : allBarters,
       });
     })
   }
   getNotifications = () => {
     this.requestRef = db.collection("all_notifications")
     .where("notification_status" , "==" , "unread")
     .where("targeted_user_id" , "==" , this.state.userId)
     .onSnapshot((snapshot) => {
       var allNotifications = []
       snapshot.docs.map((doc) => {
         var notification = doc.data()
         notification["doc_id"] = doc.id
         allNotifications.push(notification)
       });
       this.setState({
         allNotifications : allNotifications
       });
     })
   }


   keyExtractor = (item, index) => index.toString()

   renderItem = ( {item, i} ) =>(
     <ListItem
       key={i}
       title={item.item_name}
       subtitle={"Requested By : " + item.requested_by +"\nStatus : " + item.request_status}
       leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
       titleStyle={{ color: 'black', fontWeight: 'bold' }}
       rightElement={
           <TouchableOpacity style={styles.button}>
             <Text style={{color:'#ffff'}}>Exchange</Text>
           </TouchableOpacity>
         }
       bottomDivider
     />
   )


   componentDidMount(){
     this.getAllBarters()
   }

   componentWillUnmount(){
     this.requestRef();
   }

   render(){
     return(
       <View style = {{flex : 1}}>
         <View style = {{flex : 0.1}}>
           <MyHeader title = {"Notifications"} navigation = {this.props.navigation} />
         </View>
         <View style = {{flex : 0.9}}>
           {
             this.state.allNotifications.length === 0
             ?(
               <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                 <Text style = {{fontSize : 25}}>You Have No Notifications</Text>
               </View>
             )
             :(
               <FlatList 
                keyExtractor = {this.keyExtractor}
                data = {this.state.allNotifications}
                renderItem = {this.renderItem}
              />
             )
           }
         </View>
       </View>
     )
   }
   }


const styles = StyleSheet.create({
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
     },
    elevation : 16
  },
  subtitle :{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  }
})