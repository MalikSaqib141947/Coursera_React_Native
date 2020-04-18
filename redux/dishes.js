import * as ActionTypes from './ActionTypes';

export const dishes = (state = {
        isLoading: true,
        errMess: null,
        dishes: []
    }, action) => {
        switch(action.type){
            case ActionTypes.ADD_DISHES:
                return {...state, isLoading: false,errorMess: null, dishes: action.payload}
            case ActionTypes.DISHES_LOADING:
                return {...state, isLoading: true,errorMess: null, dishes: []}
            case ActionTypes.DISHES_FAILED:
                return {...state, isLoading: false,errorMess: action.payload, dishes: []}
            default:
                return state;
        }
    }