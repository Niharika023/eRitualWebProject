import React,{Component} from 'react';
import DonationListForm from '../../containers/DonationContainer/DonationListForm';
import EditDonationForm from '../../containers/DonationContainer/EditDonationContainer';
import { Link } from 'react-router';
import {LargeLogo} from '../common/Logos';

const Donation = ({donationRenderList,deleteDonation}) => {
	if(donationRenderList.length == 0 ) {
		return <tbody><tr><td>Loading</td></tr></tbody>
	}
	const  donationList = donationRenderList.donationData.map((item,index) => {
      return ( 
    		  
    		  <tr className="font-color p-ver-70" key={index}>
              <td className="col-sm-2" > {item.name}</td>
              <td className="col-sm-2" > {item.description}</td>
              <td className="col-sm-2" > {item.amount}</td>
              <td className="col-sm-2" > <tr>
            	<td>
          		<ul className="nav navbar-nav row ">
          		<u><li className="col-sm-4"><Link to={{ pathname: '/ERitual/editDonation/'+item.id}}  className=" link-secondary  active ">Edit</Link> </li></u>
          		<u><li className="col-sm-4"><Link to=""  onClick={(event)=> {deleteDonation(event,item.id,index)}} className=" link-secondary  active ">Delete</Link> </li></u>
          	</ul>
          </td>
          	</tr></td>
            </tr> 
      
        );
    })
 
  return <tbody>{donationList}</tbody>;
}

export default Donation;