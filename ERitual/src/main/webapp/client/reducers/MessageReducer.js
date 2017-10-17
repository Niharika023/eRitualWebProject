import { FETCH_MESSAGE_LIST } from '../actions/messageAction';
import { DELETE_MESSAGE_BY_ID } from '../actions/messageAction';
import { FETCH_MESSAGE_LIST_BY_ID } from '../actions/messageAction';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_MESSAGE_LIST:
    	let decodedData = JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')));
    	return {
	    	messageData:   decodedData.items,
	    	numItems:   decodedData.numItems,
	    	startIndex: decodedData.startIndex
    	}
      break;
    case DELETE_MESSAGE_BY_ID:
        	return state;
        break;
    case FETCH_MESSAGE_LIST_BY_ID:
    	return{
		 messageDataForEdit: JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')))
    	}
      break;
    default:
      return state;
  }
}