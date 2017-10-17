import React,{Component} from 'react';
import SevaListForm from '../../containers/SevaListForm';
import EditSevaForm from '../../containers/EditSevaContainer';
import { Link } from 'react-router';
import {LargeLogo} from '../common/Logos';

const Seva = ({sevaRenderList,deleteSeva}) => {
	if(sevaRenderList.length == 0 ) {
		return <tbody><tr><td>Loading</td></tr></tbody>
	}
	const  sevaList = sevaRenderList.sevaData.map((item,index) => {
		if(item.available ==true)
		{
			item.available="true";
		}
		if(item.available =="true")
		{
			item.available="true";
		}
		else{
			item.available="false";
		
		}
		if(item.name!=null){
		 let timeArr= item.time.split(":");
	    		let hours=timeArr[0];
	    		let minutes=timeArr[1];
	    	let selectedHour = hours%12;
	    	if(selectedHour==0){
	    		selectedHour=12;
	    		}
	    	let time=`${(selectedHour < 10) ? "0" + selectedHour : selectedHour}:${minutes} ${(hours < 12)?'AM':'PM'}`;
      return ( 
    		  
    		  <tr className="font-color p-ver-70" key={index}>
              <td className="col-sm-2" > {item.name}</td>
              <td className="col-sm-2" > {item.description}</td>
              <td className="col-sm-2" > {item.amount}</td>
              <td className="col-sm-2" > {time}</td>
              <td className="col-sm-2" > {item.available}</td>
              <td className="col-sm-2" > <tr>
            	<td>
          		<ul className="nav navbar-nav row ">
          		<u><li className="col-sm-4"><Link to={{ pathname: '/ERitual/editSeva/'+item.id}}  className=" link-secondary  active ">Edit</Link> </li></u>
          		<u><li className="col-sm-4"><Link to=""  onClick={(event)=> {deleteSeva(event,item.id,index)}} className=" link-secondary  active ">Delete</Link> </li></u>
          	</ul>
          </td>
          	</tr></td>
            </tr> 
      
        );
		}
    })
  return <tbody>{sevaList}</tbody>;
}

export default Seva;