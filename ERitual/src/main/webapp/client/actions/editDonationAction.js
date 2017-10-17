import axios from 'axios';

export const GET_DONATION_BY_ID = 'GET_DONATION_BY_ID';
export const UPDATE_DONATION='UPDATE_DONATION';
export const CLEAR_DONATION = 'CLEAR_DONATION';
export function setDonationData(donationData) {
	  return {
	    type: UPDATE_DONATION,
	    donationData
	  };
	}

export function userEditDonationsRequest(donationIdForEdit) {
	console.log("action");
	const request = axios.get('http://localhost:8080/ERitual/er/donation/get/byId'+"?donationId="+ donationIdForEdit);
	  return {
	    type    : GET_DONATION_BY_ID,
	    payload : request
	  }
}

export function clearDonationData() {
	return {
	    type    : CLEAR_DONATION,
	    payload:'clear'
	 } 
}

export function userDonationFormsRequest(donationData) {
	let donation= {
			"name":donationData.name,
			"description":donationData.description,
			"formFields":donationData.formFields,
			"available":donationData.available,
			"amount":donationData.amount,
			"imageId":donationData.imageId,
			"time":donationData.time,
			"id":donationData.id
	}
	const request = axios.post('http://localhost:8080/ERitual/er/donation/update',donation);
	  return {
	    type    : UPDATE_DONATION,
	    payload : request
	  }
}




