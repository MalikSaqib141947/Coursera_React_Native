import * as ActionTypes from './ActionTypes';

export const comments = (state = { errMess: null, comments:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {...state, errMess: null, comments: action.payload};

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMess: action.payload};
      
    case ActionTypes.ADD_COMMENT:
      var x = state.comments.length;
      var newComment = [{id: x, dishId: action.dishId, rating: action.rating, author: action.author, comment: action.comment, date: action.date}];
      return {...state, errMess: null, comments: state.comments.concat(newComment)};

    default:
      return state;
  }
};