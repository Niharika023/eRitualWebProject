import axios from 'axios';

export const CREATE_DONATION = 'CREATE_DONATION';
export function setDonationData(donationData) {
	  return {
	    type: CREATE_DONATION,
	    donationData
	  };
	}

export function userDonationFormsRequest(donationData) {
	let donation= {
			"name":donationData.name,
			"description":donationData.description,
			"amount":donationData.amount,
	}
	const request = axios.post('http://localhost:8080/ERitual/er/donation/create',donation);
	  return {
	    type    : CREATE_DONATION,
	    payload : request
	  }
}



