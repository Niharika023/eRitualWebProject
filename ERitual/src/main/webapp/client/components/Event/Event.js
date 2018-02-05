import React,{Component} from 'react';
import EventListForm from '../../containers/EventContainer/EventListForm';
import EditEventForm from '../../containers/EventContainer/EditEventContainer';
import { Link } from 'react-router';
import {LargeLogo} from '../common/Logos';

const Event = ({eventRenderList,deleteEvent}) => {
	if(eventRenderList.length == 0 ) {
		return <tbody><tr><td>Loading</td></tr></tbody>
	}
	const  eventList = eventRenderList.eventData.map((item,index) => {
		if(item.available ==true || item.available=="true")
		{
			item.available="true";
		}
		else{
			item.available="false";

		}
		let time,timeArr,hours,minutes,selectedHour;

		if(item.name) {
			if(item.time){
				timeArr= item.time.split(":");
				hours=timeArr[0];
				minutes=timeArr[1];
				selectedHour = hours%12;
				if(selectedHour==0){
					selectedHour=12;
				}
				time=`${(selectedHour < 10) ? "0" + selectedHour : selectedHour}:${minutes} ${(hours < 12)?'AM':'PM'}`;
			}
			return ( 

					<tr className="font-color p-ver-70" key={index}>
					<td className="col-sm-2" ><Link to={{ pathname: '/ERitual/eventDetails/'+item.id}}  className=" link-secondary  active ">{item.name}</Link> </td>
					<td className="col-sm-2" > {item.description}</td>
					<td className="col-sm-1" > {item.date}</td>
					<td className="col-sm-1" > {item.city}</td>
					<td className="col-sm-2" > Rs.{item.amount}</td>
					<td className="col-sm-1" > {item.available}</td>
					<td className="col-sm-3" > <tr>
					<td>
					<ul className="nav navbar-nav row ">
					<u><li className="col-sm-4 "><Link to={{ pathname: '/ERitual/editEvent/'+item.id}}  className=" link-secondary  active ">Edit</Link> </li></u>
					<u><li className="col-sm-4 "><Link to=""  onClick={(event)=> {deleteEvent(event,item.id,index)}} className=" link-secondary  active ">Delete</Link> </li></u>
					</ul>
					</td>
					</tr></td>
					</tr> 

			);
		}

	})

	return <tbody>{eventList}</tbody>;
}

export default Event;