import {ADD_TOAST_MESSAGE} from '../actions/typeConstants';
import {DELETE_TOAST_MESSAGE} from '../actions/typeConstants';
import {DELETE_ALL_TOASTS} from '../actions/typeConstants';
import findIndex from 'lodash/findIndex';
import shortid from 'shortid';

export default (state=[],action={}) => {
	console.log("action ", action);
	switch (action.type) {
    case ADD_TOAST_MESSAGE:
      return [
        ...state,
        {
          id: shortid.generate(),
          type:action.message.type,
          text:action.message.text,
          toastType:action.message.toastType
        }
      ];
      case DELETE_TOAST_MESSAGE:
        const index = findIndex(state, {id:action.id});
        if( index >=0 ) {
          return [
            ...state.slice(0,index),
            ...state.slice(index+1)
          ]
        }
        return state;
      case DELETE_ALL_TOASTS:
        return [];
    default: return state;
  }

}
