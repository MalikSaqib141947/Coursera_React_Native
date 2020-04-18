import * as ActionTypes from './ActionTypes';

export const comments = (state = {
        errMess: null,
        comments: []
    }, action) => {
        switch(action.type){
            case ActionTypes.ADD_COMMENTS:
                return {...state,errorMess: null, comments: action.payload}
                case ActionTypes.COMMENTS_FAILED:
                    return {...state,errorMess: action.payload, comments: []}
            default:
                return state;
        }
    }