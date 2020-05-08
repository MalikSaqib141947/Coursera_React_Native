import React, {Component} from 'react';
import {View, Text } from 'react-native';
import {Card, Button, Icon} from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

function RenderAddress(props){
    const address = props.address;
    return(
        <Animatable.View animation = 'fadeInDown' duration = {2000} delay = {1000}>
            <Card
                title = "Contact Information"
            >
                <Text style = {{margin: 10, fontSize: 15}}>
                    {address}
                </Text>
                <Button
                    title = "Send Email"
                    buttonStyle = {{backgroundColor: '#512DA8'}}
                    icon = {<Icon name = 'envelope-o' type = 'font-awesome' color = 'white'/>}
                    onPress = {() => props.onPress()}
                    titleStyle = {{marginLeft: 10 }}
                />
            </Card>
        </Animatable.View>
            
    );
}

class Contact extends Component{
    constructor(props){
        super(props);
        this.state = { 
            address: "121, Clear Water Bay Road\n\nClear Water Bay, Kowloon\n\nHONG KONG\n\nTel: +852 1234 5678\n\nFax: +852 8765 4321\n\nEmail:confusion@food.net"
        };
    }

    sendMail(){
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        });
    }

    static navigationOptions = {
        title: 'Contact Us'
    }

    render(){
        return (
            <RenderAddress 
                address = {this.state.address}  
                onPress = {this.sendMail}
            />
            );
    }
}

export default Contact;