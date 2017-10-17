import { CREATE_DONATION } from '../actions/donationFormAction';

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
	    default:
	      return state;
	}
}
