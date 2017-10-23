import { CREATE_DONATION } from '../actions/donationFormAction';
import { GET_DONATION_BY_ID } from '../actions/donationFormAction';
import { UPDATE_DONATION } from '../actions/donationFormAction';
import { CLEAR_DONATION } from '../actions/donationFormAction';

export default function(state = [], action) {
	switch (action.type) {
	 case CREATE_DONATION:
		 if(action.payload.donationData){
	      return {
		 donationData: action.payload.donationData
	      }}
		 else{
			 return state;
		 }
	      break;
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
