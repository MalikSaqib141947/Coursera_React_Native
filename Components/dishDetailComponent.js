import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList, StyleSheet,Modal, Button, Alert, PanResponder } from 'react-native';
import {Card, Icon, Rating, Input} from 'react-native-elements';
// import {DISHES} from '../Shared/dishes';
// import {COMMENTS} from '../Shared/comments';
import { createStackNavigator } from 'react-navigation';
import {connect} from 'react-redux';
import {baseURL} from '../Shared/baseURL';
import {postFavorite} from '../redux/ActionCreators';
import {postComment} from '../redux/ActionCreators'
import * as Animatable from 'react-native-animatable';
const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderDish(props){
    const dish = props.dish;

    handleViewRef = ref => this.view = ref; 

    const recognizeDrag = ({moveX, moveY, dx, dy}) => {
        if(dx < -200){
            return true;
        }
        else
            return false;
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
                .then(endState => console.log(endState.finished? 'finished' : 'cancelled'))
        },
        onPanResponderEnd: (e, gestureState) => {
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add to Favorites?',
                    'Are you sure you wish to add ' + dish.name + ' to your favorites?',
                    [
                        {
                            text: 'cancel',
                            onPress: () => console.log('Cancel Pressed!'),
                            style: 'cancel'
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ? console.log('Already Favorite') : props.onPressOnFavorite()
                        }
                    ],
                    {cancelable: false}
                )
            return true;
        }
    });

    if(dish != null){
        return(
            
            <Animatable.View animation = 'fadeInDown' duration = {2000} delay = {1000}
                ref = {this.handleViewRef}
                {...panResponder.panHandlers}
            >
                <Card
                    featuredTitle = {dish.name}
                    image = {{uri: baseURL + dish.image}}
                >
                    <Text style = {{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style = {{flex: 1, flexDirection: 'row', alignItem: 'center', justifyContent: 'center'}}>
                    <Icon
                        raised
                        reverse
                        name = {props.favorite ? 'heart' : 'heart-o'}
                        type = 'font-awesome'
                        color = '#f50'
                        onPress = {() => props.favorite ? console.log('Already Favorite') : props.onPressOnFavorite()} />
                    <Icon
                        raised
                        reverse
                        name = {'pencil'}
                        type = 'font-awesome'
                        color = '#512DA8'
                        onPress = {() => props.onPressOnComment()} />
                    
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    else{
        return(<View></View>)
    }
}

function RenderComments(props){
    const comments = props.comments;
    const renderCommentItem = ({item, index}) => {
        return(
            <View key = {index} style = {{margin: 10}}>
                <Text style = {{fontSize: 14}}>{item.comment}</Text>
                <Text style = {{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style = {{fontSize: 12}}>{'--' + item.comment + ', ' + item.date}</Text>
            </View>
        );
    }
    return(
        <Animatable.View animation = 'fadeInUp' duration = {2000} delay = {1000}>
            <Card title = "Comments">
                <FlatList
                    data = {comments}
                    renderItem = {renderCommentItem}
                    keyExtractor = {item => item.id.toString()}
                    />
            </Card>
        </Animatable.View>
    );
}

class DishDetail extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            author: '',
            comment: '',
            rating: 1
        }
    }

    toggleModal(){
        this.setState({showModal: !this.state.showModal})
    }

    markFavorite(dishId){
        this.props.postFavorite(dishId);
    }

    addComment(dishId){
        this.props.postComment(dishId,this.state.rating,this.state.author,this.state.comment);
    }

    static navigationOptions = {
        title: 'DishDetails'
    }

    render(){
        const dishId = this.props.navigation.getParam('dishId','');
        return (
        <ScrollView>
            <RenderDish dish = {this.props.dishes.dishes[+dishId]} 
                favorite = {this.props.favorites.some(el => el === dishId)}
                onPressOnFavorite = {() => {this.markFavorite(dishId);}}
                onPressOnComment = {() => {this.toggleModal()}}
            />
            <RenderComments comments = {this.props.comments.comments.filter((comment) => comment.dishId === dishId)}/>
            <Modal
                        animationType = {'slide'}
                        transparent = {false}
                        visible = {this.state.showModal}
                        onDismiss = {() => {this.toggleModal()}}
                        onRequestClose = {() => {this.toggleModal()}}
                        onPress = {() => {this.toggleModal()}}
                >
                    <View style = {styles.modal}>
                                <Text style = {styles.modalTitle}>Your Review</Text>
                                <Rating 
                                    type = 'heart' 
                                    ratingCount = {5}
                                    ratingBackgroundColor = '#512DA8'
                                    showRating 
                                    style = {{paddingVertical: 10, alignItem: 'center', justifyContent: 'center'}}
                                    onFinishRating = {(rating) => {this.setState({rating: rating})}}
                                />
                                <Input 
                                    placeholder = 'Author'
                                    leftIcon = {{type: 'font-awesome', name: 'user'}}
                                    containerStyle = {{marginTop: 10}}
                                    leftIconContainerStyle = {{marginRight: 10}}
                                    onChangeText = {(text) => {this.setState({author: text})}}
                                />
                                <Input 
                                    placeholder = 'Comment'
                                    leftIcon = {{type: 'font-awesome', name: 'comment'}}
                                    containerStyle = {{marginTop: 10, marginBottom: 20}}
                                    leftIconContainerStyle = {{marginRight: 10}}
                                    onChangeText = {(text) => {this.setState({comment: text})}}
                                />
                                <View style = {{marginTop: 20}}>
                                    <Button
                                        onPress = {() => {this.addComment(dishId); this.toggleModal()}}
                                        color = '#512DA8'
                                        title = 'SUBMIT'
                                    />
                                </View>
                                <View style = {{marginTop: 10}}>
                                    <Button
                                        onPress = {() => {this.toggleModal()}}
                                        color = '#A9A9A9'
                                        title = 'CANCEL'
                                    />
                                </View>
                                
                    </View>
                    
                </Modal>
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal:{
        justifyContent: 'center',
        margin: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);