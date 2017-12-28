import axios from 'axios';

export const FETCH_TAGCONFIG_LIST = 'FETCH_TAGCONFIG_LIST';
export const DELETE_TAGCONFIG_BY_ID = 'DELETE_TAGCONFIG_BY_ID';
export const FETCH_SEARCHED_TAGCONFIG_LIST='export const';

export function setTagConfigData(tagConfigData) {
	  return {
	    type: FETCH_TAGCONFIG_LIST,
	    searchTagConfig
	  };
	}

export function tagConfigRenderList(search,searchData,pageSize,pageNumber) {
	let concatStr="?";
	if(search !=""){
		concatStr=concatStr+"search="+ search+"&";
	}
	else
		{
		concatStr = concatStr + "search=&";
		}
	if(searchData && searchData.orderByName !=""){
		concatStr=concatStr+"orderByKey="+ searchData.orderByName+"&";
	}
	else{
		concatStr = concatStr + "orderByKey=&";
	}
	if(searchData && searchData.orderByAmount !=""){
		concatStr=concatStr+"orderByAmount="+ searchData.orderByAmount+"&";
	}
	else{
		concatStr = concatStr + "orderByAmount=&";
	}
	if(searchData && searchData.orderByUpdatedTS !=""){
		concatStr=concatStr+"orderByUpdatedTS="+ searchData.orderByUpdatedTS+"&";
	}
	else{
		concatStr = concatStr + "orderByUpdatedTS=&";
	}
	if(pageSize) concatStr=concatStr+"pageSize="+ pageSize+"&";
	if(pageNumber) concatStr=concatStr+"pageNumber="+pageNumber+"&";
	const request = axios.get("http://localhost:8080/ERitual/er/tagConfig/list"+concatStr);
	  return {
	    type    : FETCH_TAGCONFIG_LIST,
	    payload : request
	  }
	
}

export function deleteTagConfig(tagConfigId,itemIndex) {
	const request = axios.get("http://localhost:8080/ERitual/er/tagConfig/delete"+"?tagConfigId="+ tagConfigId);
  return {
    type    : DELETE_TAGCONFIG_BY_ID,
    payload : request
  }
	
}


