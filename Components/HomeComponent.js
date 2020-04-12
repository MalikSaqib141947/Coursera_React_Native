import React, {Component} from 'react';
import {ScrollView, Text, View } from 'react-native';
import {Card} from 'react-native-elements';
import {DISHES} from '../Shared/dishes';
import {PROMOTIONS} from '../Shared/promotions';
import {LEADERS} from '../Shared/leaders';
import { createStackNavigator } from 'react-navigation';

function RenderItem(props){
    const item = props.item;
    if (item != null){
        return(
            <Card
                featuredTitle = {item.name}
                featuredSubtitle = {item.designation}
                image = {require('./images/uthappizza.png')}
            >
                <Text style = {{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        );
    }
    else{
        return(<View></View>);
    }
}
class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES,
            promotions: PROMOTIONS,
            leaders: LEADERS
        }
    }

    static navigationOptions = {
        title: 'Home'
    };

    render(){
        return(
            <ScrollView>
                <RenderItem item = {this.state.dishes[0]} />
                <RenderItem item = {this.state.promotions[0]} />
                <RenderItem item = {this.state.leaders[3]} />
            </ScrollView>
        );
    }
}

export default Home;