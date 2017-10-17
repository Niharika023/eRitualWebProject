import { FETCH_EVENT_LIST } from '../actions/eventAction';
import { SEARCH_EVENT_LIST } from '../actions/eventAction';
import { DELETE_EVENT_BY_ID } from '../actions/eventAction';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_EVENT_LIST:
    	let decodedData = JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')));
    	return {
	    	eventData:   decodedData.items,
	    	numItems:   decodedData.numItems,
	    	startIndex: decodedData.startIndex
    	}
      break;
    case DELETE_EVENT_BY_ID:
        return state;
    	/*if(!state.eventData) {
        	return state;
        }
        return {
    		...state,
    		eventData: [...state.eventData.slice(0,action.additionalData),...state.eventData.slice(action.additionalData+1)]
        }*/
        break;
    default:
      return state;
  }
}