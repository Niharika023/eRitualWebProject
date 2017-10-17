import { GET_DONATION_BY_ID } from '../actions/editDonationAction';
import { UPDATE_DONATION } from '../actions/editDonationAction';
import { CLEAR_DONATION } from '../actions/editDonationAction';

export default function(state = [], action) {
	switch (action.type) {
	 case GET_DONATION_BY_ID:
		 
		 return {
		 	editDonation: JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')))
	      }
		 
	      break;
	 case UPDATE_DONATION:
	      return {
		 donationData: action.payload.donationData
	      }
	      break;
	 case CLEAR_DONATION:
		 return {
			 state:[]
		 }
	    default:
	      return state;
	}
}
