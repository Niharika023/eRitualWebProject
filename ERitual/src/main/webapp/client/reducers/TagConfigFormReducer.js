import { CREATE_TAGCONFIG } from '../actions/tagConfigFormAction';
import { GET_TAGCONFIG_BY_ID } from '../actions/tagConfigFormAction';
import { UPDATE_TAGCONFIG } from '../actions/tagConfigFormAction';
import { CLEAR_TAGCONFIG } from '../actions/tagConfigFormAction';
import { GET_TAGCONFIG_BY_KEY } from '../actions/sevaFormAction';
export default function(state = [], action) {
	switch (action.type) {
	 case CREATE_TAGCONFIG:
		 if(action.payload.tagConfigData){
	      return {
		 tagConfigData: action.payload.tagConfigData
	      }}
		 else{
			 return state;
		 }
	      break;
case GET_TAGCONFIG_BY_ID:
		 return {
		 	editTagConfig: JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')))
	      }
	      break;
	      
case GET_TAGCONFIG_BY_KEY:
	 return {
	 	tagByKeyConfig: JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')))
     }
     break;
     
	 case UPDATE_TAGCONFIG:
	      return {
		 tagConfigData: action.payload.tagConfigData
	      }
	      break;
	 case CLEAR_TAGCONFIG:
		 return {
			 state:[]
		 }
	    default:
	      return state;
	}
}
