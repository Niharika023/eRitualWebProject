import { FETCH_SEVA_LIST } from '../actions/sevaAction';
import { SEARCH_SEVA_LIST } from '../actions/sevaAction';
import { DELETE_SEVA_BY_ID } from '../actions/sevaAction';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SEVA_LIST:
    	if(!action.payload.message){
    	let decodedData = JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')));
    	return {
	    	sevaData:   decodedData.items,
	    	numItems:   decodedData.numItems,
	    	startIndex: decodedData.startIndex
    	}}
    	else{
    		return state;
    	}
      break;
    case DELETE_SEVA_BY_ID:
        return state;
    	
    	/*if(!state.sevaData) {
        	return state;
        }
        return {
    		...state,
    		sevaData: [...state.sevaData.slice(0,action.additionalData),...state.sevaData.slice(action.additionalData+1)]
        }*/
        break;
    default:
      return state;
  }
}

