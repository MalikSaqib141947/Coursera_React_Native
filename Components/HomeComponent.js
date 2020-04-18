import React, {Component} from 'react';
import {ScrollView, Text, View } from 'react-native';
import {Card} from 'react-native-elements';
// import {DISHES} from '../Shared/dishes';
// import {PROMOTIONS} from '../Shared/promotions';
// import {LEADERS} from '../Shared/leaders';
import { createStackNavigator } from 'react-navigation';
import {connect} from 'react-redux';
import {baseURL} from '../Shared/baseURL';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

function RenderItem(props){
    const item = props.item;
    if (item != null){
        return(
            <Card
                featuredTitle = {item.name}
                featuredSubtitle = {item.designation}
                image = {{uri: baseURL + item.image}}
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

    static navigationOptions = {
        title: 'Home'
    };

    render(){
        return(
            <ScrollView>
                <RenderItem item = {this.props.dishes.dishes[0]} />
                <RenderItem item = {this.props.promotions.promotions[0]} />
                <RenderItem item = {this.props.leaders.leaders[3]} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);