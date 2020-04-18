import * as ActionTypes from './ActionTypes';

export const promotions = (state = {
        isLoading: true,
        errMess: null,
        promotions: []
    }, action) => {
        switch(action.type){
            case ActionTypes.ADD_PROMOS:
                return {...state, isLoading: false,errorMess: null, promotions: action.payload}
            case ActionTypes.PROMOS_LOADING:
                return {...state, isLoading: true,errorMess: null, promotions: []}
            case ActionTypes.PROMOS_FAILED:
                return {...state, isLoading: false,errorMess: action.payload, promotions: []}
            default:
                return state;
        }
    }