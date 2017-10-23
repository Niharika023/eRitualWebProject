import React,{Component} from 'react';
import OrderListForm from '../../containers/OrderContainer/OrderListForm';
import OrderDetailsForm from '../Order/OrderDetailsForm';
import { Link } from 'react-router';
import {LargeLogo} from '../common/Logos';

const Order = ({orderRenderList,orderDetails}) => {
	if(orderRenderList.length == 0 ) {
		return <tbody><tr><td>Loading</td></tr></tbody>
	}
	const  orderList = orderRenderList.orderData.map((item,index) => {
		let bookedDate=new Date(item.createdTS);
		let formattedDate=bookedDate.getFullYear() + '-' + (bookedDate.getMonth()+1) + '-' + bookedDate.getDate();
      return ( 
    		  
    		  <tr className="font-color p-ver-70" key={index}>
    		  <td className="col-sm-2"><Link to={{ pathname: '/ERitual/orderdetails/'+JSON.stringify(item)}}  className=" link-secondary  active ">{item.targetType}
    		  </Link>
    		  </td>
    		  <td className="col-sm-2" > {item.creatorEmail}</td>
    		  <td className="col-sm-2" > {formattedDate}</td>
    		  <td className="col-sm-2" > {item.executionDate}</td>
              <td className="col-sm-2" > {item.amount}</td>
            </tr>
      
        );
    })
 
  return <tbody>{orderList}</tbody>;
}

export default Order;