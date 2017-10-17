import axios from 'axios';

export const FETCH_EVENT_LIST = 'FETCH_EVENT_LIST';
export const DELETE_EVENT_BY_ID = 'DELETE_EVENT_BY_ID';
export const FETCH_SEARCHED_EVENT_LIST='export const';

export function setEventData(eventData) {
	  return {
	    type: FETCH_EVENT_LIST,
	    searchEvent
	  };
	}

export function eventRenderList(search,searchData,pageSize,pageNumber) {
	let concatStr="?";
	let searchEventParameter="";
	if(search !=""){
		concatStr=concatStr+"search="+ search+"&";
	}
	else
		{
		concatStr = concatStr + "search=&";
		}
	if(searchData.searchByCity !=""){
		concatStr=concatStr+"searchByCity="+ searchData.searchByCity+"&";
	}
	else{
		concatStr = concatStr + "searchByCity=&";
	}
	if(searchData.searchByLocality !=""){
		concatStr=concatStr+"searchByLocality="+ searchData.searchByLocality+"&";
	}
	else{
		concatStr = concatStr + "searchByLocality=&";
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
	if(searchData.orderByCity !=""){
		concatStr=concatStr+"orderByCity="+ searchData.orderByCity+"&";
	}
	else{
		concatStr = concatStr + "orderByCity=&";
	}
	if(searchData.orderByDate !=""){
		concatStr=concatStr+"orderByDate="+ searchData.orderByDate+"&";
	}
	else{
		concatStr = concatStr + "orderByDate=&";
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
	if(searchData.dateLesserThan !=null){
		concatStr=concatStr+"dateLesserThan="+ searchData.dateLesserThan+"&";
	}
	else{
		concatStr = concatStr + "dateLesserThan=&";
	}
	if(searchData.dateGreaterThan !=null){
		concatStr=concatStr+"dateGreaterThan="+ searchData.dateGreaterThan+"&";
	}
	else{
		concatStr = concatStr + "dateGreaterThan=&";
	}
	if(searchData.available !=null){
		concatStr=concatStr+"available="+ searchData.available+"&";
	}
	else{
		concatStr = concatStr + "available=&";
	}
	
	concatStr=concatStr+"pageSize="+ pageSize+"&";
	concatStr=concatStr+"pageNumber="+pageNumber+"&";
	console.log("searchEventParameter","http://localhost:8080/ERitual/er/event/list "+concatStr );
	const request = axios.get("http://localhost:8080/ERitual/er/event/list "+concatStr);
  return {
    type    : FETCH_EVENT_LIST,
    payload : request
  }
	
}

export function deleteEvent(eventId,itemIndex) {
	const request = axios.get("http://localhost:8080/ERitual/er/event/delete"+"?eventId="+ eventId);
  return {
    type    : DELETE_EVENT_BY_ID,
    payload : request
  }
	
}


