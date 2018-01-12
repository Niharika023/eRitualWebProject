import { FETCH_TAGCONFIG_LIST } from '../actions/tagConfigAction';
import { DELETE_TAGCONFIG_BY_ID } from '../actions/tagConfigAction';
import { FETCH_TAGCONFIG_LIST_BY_ID } from '../actions/tagConfigAction';
import { CLEAR_TAGCONFIG } from '../actions/tagConfigAction';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_TAGCONFIG_LIST:
    	let decodedData = JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')));
    	return {
	    	tagConfigData:   decodedData.items,
	    	numItems:   decodedData.numItems,
	    	startIndex: decodedData.startIndex
    	}
      break;
    case DELETE_TAGCONFIG_BY_ID:
        	return state;
        break;
    case FETCH_TAGCONFIG_LIST_BY_ID:
    	return{
		 tagConfigDataForEdit: JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')))
    	}
      break;
    case CLEAR_TAGCONFIG:
   	 return {
   		 state:[]
   	 }
    default:
      return state;
  }
}