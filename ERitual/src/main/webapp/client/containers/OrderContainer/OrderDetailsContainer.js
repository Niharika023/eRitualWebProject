import React,{Component} from 'react';
import classnames from 'classnames';
import map from 'lodash';
import { Link } from 'react-router';
import jwt from 'jsonwebtoken';
import Dropdown from 'react-dropdown';
import Datetime from 'react-datetime';
import validateInput from '../../validations/sevaValidation';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import setAuthToken from '../../utils/setAuthToken';

class OrderDetailsContainer extends Component {
	constructor(props){
		super(props);
		// We will be using the state to control the input. This will ensure
		// that the state will always hold the lastest
		this.state = {
				orderId:null,
				targetType:"",
				creatorEmail:"",
				amount:null,
				name:"",
				bookedDate:null,
				executionDate:null,
				formData:"",
				personDetails:"",
				orderListArr:"",
				bookedDate:null,
				day:null,
				month:null,
				year:null,
				selectDate:null,
				time:null,
				minutes:null,
				hours:null
		}

	}



	componentDidMount() {
		let userName=[];
		let userNameArr="";
		let orderData=JSON.parse(this.props.params.items);
		this.setState({
			targetType:orderData.targetType,
			orderId:orderData.id,
			creatorEmail:orderData.creatorEmail,
			amount:orderData.amount,
			executionDate:orderData.executionDate,
		})
		let bookedDate=new Date(orderData.createdTS);
			let formattedDate=bookedDate.getFullYear() + '-' + (bookedDate.getMonth()+1) + '-' + bookedDate.getDate();
			this.state.bookedDate=formattedDate;
		if(orderData.event){
			 let timeArr= (orderData.event.time).split(":");
		    	for(var i=0;i<timeArr.length;i++){
		    		this.state.hours=timeArr[0];
		    		this.state.minutes=timeArr[1];
		    	}
		    	let selectedHour = this.state.hours%12;
		    	this.state.time=`${(selectedHour < 10) ? "0" + selectedHour : selectedHour}:${this.state.minutes} ${(this.state.hours < 12)?'AM':'PM'}`;
		    	if(this.state.time=='00:00 AM'){
					this.state.time='12:00 AM'
				}
				else if(this.state.time =='00:00 PM'){
					this.state.time='12:00 PM'
				}
			this.setState({
				name:orderData.event.name,
				
			})
		}
		if(orderData.seva){
			 let timeArr= (orderData.seva.time).split(":");
		    	for(var i=0;i<timeArr.length;i++){
		    		this.state.hours=timeArr[0];
		    		this.state.minutes=timeArr[1];
		    	}
		    	let selectedHour = this.state.hours%12;
		    	this.state.time=`${(selectedHour < 10) ? "0" + selectedHour : selectedHour}:${this.state.minutes} ${(this.state.hours < 12)?'AM':'PM'}`;
			if(this.state.time=='00:00 AM'){
				this.state.time='12:00 AM'
			}
			else if(this.state.time =='00:00 PM'){
				this.state.time='12:00 PM'
			}
		    	this.setState({
				name:orderData.seva.name,
			})
		}
		if(orderData.donation){
			this.setState({
				name:orderData.donation.name,
			})
		}
		
		let peopleEnrolled=JSON.parse(orderData.formData);
		const  orderListArr = peopleEnrolled.map((item) => {
			return ( 

					<tr className="font-color p-ver-70" key={item.name}>
					<td className="col-sm-2" > {item.name}</td>
					<td className="col-sm-2" > {item.gotra}</td>
					<td className="col-sm-2" > {item.rashi}</td>
					<td className="col-sm-2" > {item.nakshatra}</td>
					</tr>

			);
		});
		this.setState({
			orderListArr
		})
		for(let i=0;i<peopleEnrolled.length;i++){
			for(let j=0;j<peopleEnrolled[i].length;j++){

			}
			let userNameArr=peopleEnrolled[i].name;
		}
	}


	render() {
		const {orderId,targetType,creatorName,amount,orderListArr} = this.state;
		return (
				<div>
				<form className=" p20 container user-entry-forms details-form mt80" >
					<h1 className="text-center">{this.state.targetType}</h1>
					<table className="table table-bordered table-striped mt30 ">
						<tbody>
						<tr className="row">
							<th className="col-md-2">
							<tr ><h3>Name(Seva/Event/Donation)</h3></tr>
							</th>
							<tr className="col-md-10 mt20">
							<tr >{this.state.name}</tr>
							</tr>
						</tr>
						<tr className="row">
						<th className="col-md-2">
						<tr ><h3>Booked Date</h3></tr>
						</th>
						<tr className="col-md-10 mt20">
						<tr >{this.state.bookedDate}</tr>
						</tr>
					</tr>
					{!(this.state.targetType=='DONATION') &&
						<tr className="row">
							<th className="col-md-2">
							<tr ><h3>Time(Seva/Event)</h3></tr>
							</th>
							<tr className="col-md-10 mt20">
							<tr >{this.state.time}</tr>
							</tr>
						</tr>}
						<tr className="row">
							<th className="col-md-2">
							<tr ><h3>Created By</h3></tr>
							</th>
							<tr className="col-md-10 mt20">
							<tr >{this.state.creatorEmail}</tr>
							</tr>
						</tr>
		
						<tr className="row">
							<th className="col-md-2 ">
							<tr ><h3>Scheduled Date</h3></tr>
							</th>
							<tr className="col-md-10 mt20">
							<tr >{this.state.executionDate}</tr>
							</tr>
						</tr>
						<tr className="row">
							<th className="col-md-2 ">
							<tr ><h3>Amount</h3></tr>
							</th>
							<tr className="col-md-10 mt20">
							<tr >{this.state.amount}</tr>
							</tr>
						</tr>
						</tbody>
					</table>
					
					
					{!(this.state.targetType=='DONATION') && <div>
						<h2 className="mt30">Person Enrollment</h2>
					<table className="table table-bordered table-striped  ">
					<thead>
					 <tr className="font-color ">
						<th className="tabel-header">Name</th>
						<th className="tabel-header">Gotra</th>
						<th className="tabel-header">Rashi</th>
						<th className="tabel-header">Nakshatra</th>
	 				</tr>
					</thead>
					
					<tbody>
					{this.state.orderListArr}
					</tbody>
					</table>
					</div>}

				</form>
				
				</div>
		);
	}
}



OrderDetailsContainer.contextTypes = {
		router:React.PropTypes.object.isRequired
}

export default OrderDetailsContainer;