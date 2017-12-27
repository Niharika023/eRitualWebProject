import React,{Component} from 'react';
import TagConfigListForm from '../../containers/TagConfigContainer/TagConfigListForm';
//import EditTagConfigForm from '../../containers/TagConfigContainer/EditTagConfigContainer';
import { Link } from 'react-router';
import {LargeLogo} from '../common/Logos';

const TagConfig = ({tagConfigRenderList,deleteTagConfig}) => {
	if(tagConfigRenderList.length == 0 ) {
		return <tbody><tr><td>Loading</td></tr></tbody>
	}
	const  tagConfigList = tagConfigRenderList.tagConfigData.map((item,index) => {
      return ( 
    		  
    		  <tr className="font-color p-ver-70" key={index}>
              <td className="col-sm-2" > {item.key}</td>
              <td className="col-sm-2" > {item.value}</td>
              <td className="col-sm-2" > <tr>
            	<td>
          		<ul className="nav navbar-nav row ">
          		<u><li className="col-sm-4"><Link to={{ pathname: '/ERitual/editTagConfig/'+item.id}}  className=" link-secondary  active ">Edit</Link> </li></u>
          		<u><li className="col-sm-4"><Link to=""  onClick={(event)=> {deleteTagConfig(event,item.id,index)}} className=" link-secondary  active ">Delete</Link> </li></u>
          	</ul>
          </td>
          	</tr></td>
            </tr> 
      
        );
    })
 
  return <tbody>{tagConfigList}</tbody>;
}

export default TagConfig;