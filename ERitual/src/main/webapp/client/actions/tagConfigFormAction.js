import axios from 'axios';

export const GET_TAGCONFIG_BY_ID = 'GET_TAGCONFIG_BY_ID';
export const UPDATE_TAGCONFIG='UPDATE_TAGCONFIG';
export const CLEAR_TAGCONFIG = 'CLEAR_TAGCONFIG';
export const CREATE_TAGCONFIG = 'CREATE_TAGCONFIG';
export const FETCH_TAG ='FETCH_TAG';
export const FETCH_VALUE ='FETCH_VALUE';
export const GET_ABOUTUS_BY_ID='GET_ABOUTUS_BY_ID';

export function setTagConfigData(tagConfigData) {
	  return {
	    type: CREATE_TAGCONFIG,
	    tagConfigData
	  };
	}

export function userTagConfigFormsRequest(tagConfig) {
	const request = axios.post('http://localhost:8080/ERitual/er/tagConfig/create',tagConfig);
	  return {
	    type    : CREATE_TAGCONFIG,
	    payload : request
	  }
}
export function userEditTagConfigsRequest(tagConfigIdForEdit) {
	const request = axios.get('http://localhost:8080/ERitual/er/tagConfig/get/byId'+"?tagConfigId="+ tagConfigIdForEdit);
	  return {
	    type    : GET_TAGCONFIG_BY_ID,
	    payload : request
	  }
}

export function clearTagConfigData() {
	return {
	    type    : CLEAR_TAGCONFIG,
	    payload:'clear'
	 } 
}

export function getAboutUsByKeyRequest(key) {
	const request = axios.get('http://localhost:8080/ERitual/er/tagConfig/get/byKey'+"?key="+ key);
	  return {
	    type    :  GET_ABOUTUS_BY_ID,
	    payload : request
	  }
}

export function valueRequest() {
	const request = axios.get('http://localhost:8080/ERitual/er/tagConfig/list');
	  return {
	    type    : FETCH_VALUE,
	    payload : request
	  }
}

export function userTagConfigUpdateFormsRequest(tagConfig) {
	const request = axios.post('http://localhost:8080/ERitual/er/tagConfig/update',tagConfig);
	  return {
	    type    : UPDATE_TAGCONFIG,
	    payload : request
	  }
}



