import React,{Component} from 'react';
import OrderListForm from '../../containers/OrderListForm';
import OrderDetailsContainer from '../../containers/OrderDetailsContainer';
import { Link } from 'react-router';
import {LargeLogo} from '../common/Logos';

const OrderDetailsForm = ({orderRenderList,orderDetails}) => {
	if(orderRenderList.length == 0 ) {
		return <tbody><tr><td>Loading</td></tr></tbody>
	}
	const  orderList = orderRenderList.orderData.map((item,index) => {
      return ( 
    		  
    		  <tr className="font-color p-ver-70" key={index}>
    		  <td className="col-sm-2" > {item.id}</td>
    		  <td className="col-sm-2" > {item.creatorEmail}</td>
              <td className="col-sm-2" > {item.amount}</td>
            </tr>
      
        );
    })
 
  return <tbody>{orderList}</tbody>;
}

export default OrderDetailsForm;