import React, {Component} from 'react';
import {View, Text } from 'react-native';
import {Card} from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';

function RenderAddress(props){
    const address = props.address;
    return(
            <Card
                title = "Contact Information"
            >
                <Text style = {{margin: 10, fontSize: 15}}>
                    {address}
                </Text>
            </Card>

            
    );
}

class Contact extends Component{
    constructor(props){
        super(props);
        this.state = { 
            address: "121, Clear Water Bay Road\n\nClear Water Bay, Kowloon\n\nHONG KONG\n\nTel: +852 1234 5678\n\nFax: +852 8765 4321\n\nEmail:confusion@food.net"
        };
    }

    static navigationOptions = {
        title: 'Contact Us'
    }

    render(){
        return (<RenderAddress address = {this.state.address}  />);
    }
}

export default Contact;