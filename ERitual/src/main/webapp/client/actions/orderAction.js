import axios from 'axios';

export const FETCH_ORDER_LIST = 'FETCH_ORDER_LIST';
export const CLEAR_ORDER_LIST = 'CLEAR_ORDER_LIST';

export function setOrderData(orderData) {
	  return {
	    type: FETCH_ORDER_LIST,
	    searchOrder
	  };
	}

	export function clearOrderList(orderData){
		return{
		type: CLEAR_ORDER_LIST,
		payload:''
		}
	}

export function orderRenderList(search,targetType,pageSize,pageNumber) {
	let concatStr="?";
	let searchOrderParameter="";
	if(search !=""){
		concatStr=concatStr+"search="+ search+"&";
	}
	else
		{
		concatStr = concatStr + "search=&";
		}
	if(targetType !=""){
			concatStr=concatStr+"targetType="+ targetType+"&";
		}
		else
			{
			concatStr = concatStr + "targetType=&";
			}

	concatStr=concatStr+"pageSize="+ pageSize+"&";
	concatStr=concatStr+"pageNumber="+pageNumber+"&";
	

	const request = axios.get("http://localhost:8080/ERitual/er/order/list "+concatStr);
  return {
    type    : FETCH_ORDER_LIST,
    payload : request
  }
	
}


