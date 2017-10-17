import axios from 'axios';

export const FETCH_DONATION_LIST = 'FETCH_DONATION_LIST';
export const DELETE_DONATION_BY_ID = 'DELETE_DONATION_BY_ID';
export const FETCH_SEARCHED_DONATION_LIST='export const';

export function setDonationData(donationData) {
	  return {
	    type: FETCH_DONATION_LIST,
	    searchDonation
	  };
	}

export function donationRenderList(search,searchData,pageSize,pageNumber) {
	let concatStr="?";
	if(search !=""){
		concatStr=concatStr+"search="+ search+"&";
	}
	else
		{
		concatStr = concatStr + "search=&";
		}
	if(searchData.orderByName !=""){
		concatStr=concatStr+"orderByName="+ searchData.orderByName+"&";
	}
	else{
		concatStr = concatStr + "orderByName=&";
	}
	if(searchData.orderByAmount !=""){
		concatStr=concatStr+"orderByAmount="+ searchData.orderByAmount+"&";
	}
	else{
		concatStr = concatStr + "orderByAmount=&";
	}
	if(searchData.orderByUpdatedTS !=""){
		concatStr=concatStr+"orderByUpdatedTS="+ searchData.orderByUpdatedTS+"&";
	}
	else{
		concatStr = concatStr + "orderByUpdatedTS=&";
	}
	if(searchData.amountGreaterThan !=null){
		concatStr=concatStr+"amountGreaterThan="+ searchData.amountGreaterThan+"&";
	}
	else{
		concatStr = concatStr + "amountGreaterThan=&";
	}
	if(searchData.amountLesserThan !=null){
		concatStr=concatStr+"amountLesserThan="+ searchData.amountLesserThan+"&";
	}
	else{
		concatStr = concatStr + "amountLesserThan=&";
	}
	concatStr=concatStr+"pageSize="+ pageSize+"&";
	concatStr=concatStr+"pageNumber="+pageNumber+"&";
	console.log("searchDonationParameter","http://localhost:8080/ERitual/er/donation/list "+concatStr );
	const request = axios.get("http://localhost:8080/ERitual/er/donation/list "+concatStr);
  return {
    type    : FETCH_DONATION_LIST,
    payload : request
  }
	
}

export function deleteDonation(donationId,itemIndex) {
	const request = axios.get("http://localhost:8080/ERitual/er/donation/delete"+"?donationId="+ donationId);
  return {
    type    : DELETE_DONATION_BY_ID,
    payload : request
  }
	
}


