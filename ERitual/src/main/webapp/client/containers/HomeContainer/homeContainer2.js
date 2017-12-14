import { Link } from 'react-router'
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const homeContainer2 = ({orderRenderList,date}) => {
     let status=false;
    let finalStauts= true;
if(orderRenderList.length<=0)
{
    return <tbody>Loading..</tbody>;

}
var order=[] ;

const orderDate = function(a, b) {  
  var date1 = a.createdTS;
  var date2 = b.createdTS;
  if(date1>date2) {return -1}
    if(date2>date1) {return 1}
      return 0;
}

const orderSelected = orderRenderList.orderData.map((item,index)=>{
if(item.targetType=='EVENT' && item.event!=null  ){
  order.push(item);
}
})

 const orderlistnull = <tr className = "text center">
<td colSpan={3}>No data to display.</td>  </tr>

if(order.length<=0)
{
 return <tbody>
               
              {orderlistnull}
          </tbody>;
}

order = order.sort(orderDate);
  const  orderList =order.map((item,index) => {

      return ( 
       <tr className="font-color p-ver-70" key={index}>
             {index<=4 &&  <td > <Link to={{ pathname: '/ERitual/orderdetails/'+JSON.stringify(item)}}  className=" link-secondary  active "><label className="coursor-pointer">{item.event.name}</label></Link></td>}
            {index<=4 &&  <td  > {item.executionDate}</td>}
             {index<=4 &&  <td  > {item.amount}</td>}
              </tr>
        );
     }
    )

 
  return <tbody>
            
              {orderList}
               
          </tbody>;
 
}

export default homeContainer2;