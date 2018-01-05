import React,{Component} from 'react';
import MessageListForm from '../../containers/MessageContainer/MessageListForm';
import EditMessageForm from '../../containers/MessageContainer/EditMessageContainer';
import { Link } from 'react-router';
import {LargeLogo} from '../common/Logos';

const Message = ({messageRenderList,deleteMessage}) => {
	if(messageRenderList.length == 0 ) {
		return <tbody><tr><td>Loading</td></tr></tbody>
	}
	const  messageList = messageRenderList.messageData.map((item,index) => {
		let createdDate=new Date(item.createdTS);
		let message="";
		let formattedDate=createdDate.getFullYear() + '/' + (createdDate.getMonth()+1) + '/' + createdDate.getDate();
		if(item.message!=null){
		if(item.message.length>5){
			message=item.message.slice(0, 5)+"...";
		}
		else{
			message=item.message;
		}}
      return ( 
    		  
    		  <tr className="font-color p-ver-70" key={index}>
    		  <td className="col-sm-2"><Link to={{ pathname: '/ERitual/messageDetail/'+item.id}}  className=" link-secondary  active ">{item.title}
    		  </Link>
    		  </td>
              <td className="col-sm-2" > {item.tags}</td>
              <td className="col-sm-2" > {formattedDate}</td>
              <td className="col-sm-2" > <tr>
            	<td>
          		<ul className="nav navbar-nav row ">
          		<u><li className="col-sm-4"><Link to={{ pathname: '/ERitual/editMessage/'+item.id}}  className=" link-secondary  active ">Edit</Link> </li></u>
          		<u><li className="col-sm-4"><Link to=""  onClick={(event)=> {deleteMessage(event,item.id,index)}} className=" link-secondary  active ">Delete</Link> </li></u>
          	</ul>
          </td>
          	</tr></td>
            </tr> 
      
        );
    })
 
  return <tbody>{messageList}</tbody>;
}

export default Message;