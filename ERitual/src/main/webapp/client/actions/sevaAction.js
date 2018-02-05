import axios from 'axios';

export const FETCH_SEVA_LIST = 'FETCH_SEVA_LIST';
export const FETCH_SEVA_LIST_BY_ID = 'FETCH_SEVA_LIST_BY_ID';
export const SEARCH_SEVA_LIST = 'SEARCH_SEVA_LIST';
export const FETCH_SEARCHED_SEVA_LIST='export const';
export const DELETE_SEVA_BY_ID='DELETE_SEVA_BY_ID';

export function setSevaData(sevaData) {
	return {
		type: FETCH_SEVA_LIST,
		searchSeva
	};
}

export function sevaRenderList(search,searchData,pageSize,pageNumber) {
	let concatStr="?";
	let searchSevaParameter="";
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
	if(searchData.tag !=""){
		concatStr=concatStr+"searchByTag="+ searchData.tag+"&";
	}
	else{
		concatStr = concatStr + "searchByTag=&";
	}
	if(searchData.orderByAmount !=""){
		concatStr=concatStr+"orderByAmount="+ searchData.orderByAmount+"&";
	}
	else{
		concatStr = concatStr + "orderByAmount=&";
	}
	if(searchData.orderByTime !=""){
		concatStr=concatStr+"orderByTime="+ searchData.orderByTime+"&";
	}
	else{
		concatStr = concatStr + "orderByTime=&";
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
	if(searchData.timeLesserThan !=null){
		concatStr=concatStr+"timeLesserThan="+ searchData.timeLesserThan+"&";
	}
	else{
		concatStr = concatStr + "timeLesserThan=&";
	}
	if(searchData.timeGreaterThan !=null){
		concatStr=concatStr+"timeGreaterThan="+ searchData.timeGreaterThan+"&";
	}
	else{
		concatStr = concatStr + "timeGreaterThan=&";
	}
	if(searchData.available !=null){
		concatStr=concatStr+"available="+ searchData.available+"&";
	}
	else{
		concatStr = concatStr + "available=&";
	}
	concatStr=concatStr+"pageSize="+ pageSize+"&";
	concatStr=concatStr+"pageNumber="+pageNumber+"&";
	const request = axios.get("http://localhost:8080/ERitual/er/seva/list "+concatStr);
	return {
		type    : FETCH_SEVA_LIST,
		payload : request
	}

}

export function editSevaRenderList() {
	const request = axios.get("http://localhost:8080/ERitual/er/seva/get/id");
	return {
		type    : FETCH_SEVA_LIST_BY_ID,
		payload : request
	}

}

export function deleteSeva(sevaId,itemIndex) {
	const request = axios.get("http://localhost:8080/ERitual/er/seva/delete"+"?sevaId="+ sevaId);
	return {
		type    : DELETE_SEVA_BY_ID,
		payload : request
	}

}


