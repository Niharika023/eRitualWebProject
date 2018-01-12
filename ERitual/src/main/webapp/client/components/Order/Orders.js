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
		console.log("item",item);
		let bookedDate=new Date(item.createdTS);
		let formattedDate=bookedDate.getFullYear() + '-' + (bookedDate.getMonth()+1) + '-' + bookedDate.getDate();
		let name='';
		let showSeva='';
		let showDonation='';
		let showEvent='';
		if(item.seva!=null){
			name=item.seva.name;
			
			}
		if(item.donation!=null){
			name=item.donation.name;
			}
		if(item.event!=null){name=item.event.name}
		else{name=""}
      return ( 
    		  
    		  <tr className="font-color p-ver-70" key={index}>
    		  <td className="" > {item.transactionId}</td>
    		  <td className="" > {formattedDate}</td>
    		  <td className=""><Link to={{ pathname: '/ERitual/orderdetails/'+JSON.stringify(item)}}  className=" link-secondary  active ">{item.targetType}
    		  </Link>
    		  </td>
    		  <td className="" > {item.tags}</td>
    		  <td className="col-sm-2"><Link to={{ pathname: '/ERitual/messageDetail/'+item.id}}  className=" link-secondary  active ">{name}
    		  </Link>
    		  </td>
    		  <td className="" > Rs.{item.amount}</td>
    		  <td className="" > {item.creatorEmail}</td>
    		  
    		  <td className="" > {item.creatorPhone}</td>
              
            </tr>
      
        );
    })
 
  return <tbody>{orderList}</tbody>;
}

export default Order;