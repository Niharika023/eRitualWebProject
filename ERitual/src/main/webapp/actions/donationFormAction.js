import axios from 'axios';

export const GET_DONATION_BY_ID = 'GET_DONATION_BY_ID';
export const UPDATE_DONATION='UPDATE_DONATION';
export const CLEAR_DONATION = 'CLEAR_DONATION';
export const CREATE_DONATION = 'CREATE_DONATION';
export function setDonationData(donationData) {
	  return {
	    type: CREATE_DONATION,
	    donationData
	  };
	}

export function userDonationFormsRequest(donation) {
	const request = axios.post('http://localhost:8080/ERitual/er/donation/create',donation);
	  return {
	    type    : CREATE_DONATION,
	    payload : request
	  }
}
export function userEditDonationsRequest(donationIdForEdit) {
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

export function userDonationUpdateFormsRequest(donation) {
	const request = axios.post('http://localhost:8080/ERitual/er/donation/update',donation);
	  return {
	    type    : UPDATE_DONATION,
	    payload : request
	  }
}



