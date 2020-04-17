import React, {Component} from 'react';
import {ScrollView, View, Text, FlatList} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import { LEADERS } from '../Shared/leaders';

function History(props){
    const history = props.history;
    const achievements = props.achievements;
    const head = props.head;
    const renderMenuItem = ({item, index}) => {
        return(
           
                <ListItem
                    key = {index}
                    title = {item.name}
                    subtitle = {item.description}
                    hideChevron = {true}
                    onPress = {() => navigate('DishDetail', {dishId: item.id})}
                    leftAvatar = {{source: require('./images/alberto.png')}}
                />
            
        );
    }
    return(
        <ScrollView>
            <Card
                title = "Our History"
            >
                <Text style = {{margin: 10}}>
                    {history}
                </Text>
                <Text style = {{margin: 10}}>
                    {achievements}
                </Text>
            </Card>

            <Card
                title = "Corporate Leadership"
            >
                <FlatList
                    data = {props.leaders}
                    renderItem = {renderMenuItem}
                    

                    //
                    keyExtactor = {item => item.id.toString()}
        
                />
            </Card>
        </ScrollView>

    );
}

class About extends Component{
    constructor(props){
        super(props);
        this.state = { 
            leaders: LEADERS,
            history: "Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.",
            achievements: "The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan."
        };
    }

    static navigationOptions = {
        title: 'About Us'
    }

    render(){
        return (<History history  = {this.state.history}  achievements = {this.state.achievements} leaders = {this.state.leaders} />);
    }
}

export default About;