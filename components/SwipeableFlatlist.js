import React , { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Animated,
    StyleSheet
} from 'react-native'
import {
    ListItem,
    Icon
} from 'react-native-elements'
import { SwipeListView } from 'react-native-swipe=list-view'

export default class SwipableFlatlist extends Component {
    constructor(props){
        super(props)
        this.state = {
            allNotifications : this.props.allNotifications
        }
    }

    updateMarkAsRead = (notification) => {
        db.collection("all_notifications").doc(notification.doc_id).update({
            "notificatoion_status" : "read"
        })
    }

    onSwpeChangeValue = swipeData => {
        var allNotifications = this.state.allNotifications
        const{key, value} = swipeData

        if(value < Dimensions.get('window').width){
            const newData = [...allNotifications];
            const prevIndex = allNotifications.findIndex(item => item.key === key);
            this.updateMarkAsRead(allNotifications[prevIndex]);
            newData(prevIndex, 1);
            this.setState({allNotifications : newData})
        }
    }

    renderItem = data => {
        <ListItem
          title = {data.item.item_name}
          titleStyle = {{color : 'black' , fontWeight : 'bold'}}
          subtitle = {data.item_message}
          bottomDivider />
    };

    renderHiddenItem = () => {
        <View style = {styles.rowBack}>
            <View style = {[styles.backrightBtn, styles.RightBtnRight]}>
                <Text styel = {styles.backTextWhite}></Text>
            </View>
        </View>
    };

    render(){
        return(
            <View style = {styles.container}>
                <SwipeListView
                 disableRightSwipe
                 data = {this.state.allNotifications}
                 renderItem = {this.renderItem}
                 renderHiddenItem = {this.renderHiddenItem}
                 rigthOpenValue = {-Dimensions.get('window').width}
                 previewRowKey = {'0'}
                 previewOpenValue = {-40}
                 previewOpenDelay = {3600}
                 onSwipeValueChange = {this.onSwpeChangeValue} ></SwipeListView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#FFF',
        flex  : 1
    },
    backTextWhite : {
        color : '#FFF',
        fontWeight : 'bold',
        fontSize : 15
    },
    rowBack : {
        alipnItems : 'center',
        backgroundColor : '#29B6F6',
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingLeft  :15
    },
    backRightBtn : {
        alignItems : 'center',
        bottom : 0,
        justifyContent : 'space-between',
        paddingLeft : 15
    },
    backRightBtn : {
        alignItems : 'center',
        bottom : 0,
        justifyContent : 'center',
        position : 'absolute',
        top : 0,
        width : 100,
    },
    backRightBtnRight : {
        backgroundColor : '#29B6F6',
        right : 0
    }
})