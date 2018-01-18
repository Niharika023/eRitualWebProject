import axios from 'axios';

export const FETCH_MESSAGE_LIST = 'FETCH_MESSAGE_LIST';
export const DELETE_MESSAGE_BY_ID = 'DELETE_MESSAGE_BY_ID';
export const FETCH_SEARCHED_MESSAGE_LIST='export const';

export function setMessageData(messageData) {
	  return {
	    type: FETCH_MESSAGE_LIST,
	    searchMessage
	  };
	}

export function messageRenderList(searchByTitle,searchData,pageSize,pageNumber) {
	let concatStr="?";
	if(searchByTitle !=""){
		concatStr=concatStr+"searchByTitle="+ searchByTitle+"&";
	}
	else
		{
		concatStr = concatStr + "searchByTitle=&";
		}
	if(searchData.searchByMessage !=""){
		concatStr=concatStr+"searchByMessage="+ searchData.searchByMessage+"&";
	}
	else{
		concatStr = concatStr + "searchByMessage=&";
	}
	if(searchData.tag !=""){
		concatStr=concatStr+"searchByTag="+ searchData.tag+"&";
	}
	else{
		concatStr = concatStr + "searchByTag=&";
	}
	if(searchData.orderByTitle !=""){
		concatStr=concatStr+"orderByTitle="+ searchData.orderByTitle+"&";
	}
	else{
		concatStr = concatStr + "orderByTitle=&";
	}
	if(searchData.orderByUpdatedTS !=""){
		concatStr=concatStr+"orderByUpdatedTS="+ searchData.orderByUpdatedTS+"&";
	}
	else{
		concatStr = concatStr + "orderByUpdatedTS=&";
	}
	if(searchData.creationDateGreaterThan !=null){
		concatStr=concatStr+"creationDateGreaterThan="+ searchData.creationDateGreaterThan+"&";
	}
	else{
		concatStr = concatStr + "creationDateGreaterThan=&";
	}
	if(searchData.creationDateLesserThan !=null){
		concatStr=concatStr+"creationDateLesserThan="+ searchData.creationDateLesserThan+"&";
	}
	else{
		concatStr = concatStr + "creationDateLesserThan=&";
	}
	concatStr=concatStr+"pageSize="+ pageSize+"&";
	concatStr=concatStr+"pageNumber="+pageNumber+"&";
	const request = axios.get("http://localhost:8080/ERitual/er/message/list "+concatStr);
  return {
    type    : FETCH_MESSAGE_LIST,
    payload : request
  }
	
}

export function deleteMessage(messageId,itemIndex) {
	const request = axios.get("http://localhost:8080/ERitual/er/message/delete"+"?messageId="+ messageId);
  return {
    type    : DELETE_MESSAGE_BY_ID,
    payload : request
  }
	
}


