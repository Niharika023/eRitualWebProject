import { FETCH_ORDER_LIST } from '../actions/orderAction';
import { SEARCH_ORDER_LIST } from '../actions/orderAction';
import { DELETE_ORDER_BY_ID } from '../actions/orderAction';
import { FETCH_ORDER_LIST_BY_ID } from '../actions/orderAction';
import {CLEAR_ORDER_LIST} from '../actions/orderAction';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_ORDER_LIST:

if(action.payload.data!=undefined && action.payload.data.length!=0){
   	let decodedData = JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')));
    	return {
	    	orderData:   decodedData.items,
	    	numItems:   decodedData.numItems,
	    	startIndex: decodedData.startIndex
    	}}
      else
        if(action.payload.status==600)
              return -1;

  if(action.payload.status==10006)
      return state=[];

      break;
    case DELETE_ORDER_BY_ID:
        if(!state.orderData) {
        	return state;
        }
        return {
    		...state,
    		orderData: [...state.orderData.slice(0,action.additionalData),...state.orderData.slice(action.additionalData+1)]
        }
        break;
    case FETCH_ORDER_LIST_BY_ID:
    	return{
		 orderDataForEdit: JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')))
    	}
      break;
    case CLEAR_ORDER_LIST:
      return '';
    default:
      return state;
  }
}