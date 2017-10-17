import { FETCH_DONATION_LIST } from '../actions/donationAction';
import { DELETE_DONATION_BY_ID } from '../actions/donationAction';
import { FETCH_DONATION_LIST_BY_ID } from '../actions/donationAction';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_DONATION_LIST:
    	let decodedData = JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')));
    	return {
	    	donationData:   decodedData.items,
	    	numItems:   decodedData.numItems,
	    	startIndex: decodedData.startIndex
    	}
      break;
    case DELETE_DONATION_BY_ID:
        	return state;
        break;
    case FETCH_DONATION_LIST_BY_ID:
    	return{
		 donationDataForEdit: JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')))
    	}
      break;
    default:
      return state;
  }
}