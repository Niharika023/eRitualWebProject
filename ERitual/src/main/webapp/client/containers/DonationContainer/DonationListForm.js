import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Donation from '../../components/Donation/Donation';
import {donationRenderList} from '../../actions/donationAction';
import {deleteDonation} from '../../actions/donationAction';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import { Link } from 'react-router';
import {FontAwesome} from 'react-fontawesome';
import Datetime from 'react-datetime';
import {addToast, deleteToast} from '../../actions/Toasts';

class DonationListForm extends Component {
	constructor(){
		super();
		this.state = {
				activePage: 0,
				pageNum:0,
				itemsPerPage:10,
				search: '',
				errors:{},
				isLoading:false,
				firstTimeFormSubmit:false,
				index:0,
				orderByName:'',
				orderByAmount:'',
				orderByTime:'',
				orderByUpdatedTS:'',
				amountGreaterThan:null,
				amountLesserThan:null,
				selectedIndex:null,
                triggerDelete:false,
                confirmDelete:false,
                deleteEventId:'',
                eventIndex:null

		}
		this.onCancel=this.onCancel.bind(this);
		this.onAdd=this.onAdd.bind(this);
		this.handlePageClick = this.handlePageClick.bind(this);
		this.onChange = this.onChange.bind(this);//bind(this) is needed here, otherwise, this will point to the donation
		this.onSubmit = this.onSubmit.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.changeSort=this.changeSort.bind(this);
		this.scrollPage=this.scrollPage.bind(this);
		this.confirmedDeletion = this.confirmedDeletion.bind(this);
        this.closeModal = this.closeModal.bind(this);
	}

	onChange(donation) {
		this.setState({ [donation.target.name]:donation.target.value}, function() {
			if(this.state.firstTimeFormSubmit) {
				this.isValid();
			}
		});
	}
	
	scrollPage(){
		let elmnt = document.querySelector('.site-container');
		elmnt.scrollIntoView();
	}
	
	componentWillUpdate(){
		this.scrollPage();
	}
	onAdd(){
		this.context.router.push('/ERitual/donationForm');
	}
	onSearch(donation)
	{
		/*this.setState({activePage:0});
		 */         
		this.state.activePage = 0;
		this.onSubmit(donation,this.state.itemsPerPage,this.state.activePage);

	}

	onStatus(event){
		this.state.available=event.target.value;
	}

	changeSort(donation){
		let sortBy=donation.target.name;
		let sortByValue=donation.target.value;
		if(sortBy=="orderByName"){
			this.state.orderByName=sortByValue
		}
		if(sortBy=="orderByAmount"){
			this.state.orderByAmount=sortByValue
		}
		if(sortBy=="orderByUpdatedTS"){
			this.state.orderByUpdatedTS=sortByValue
		}
		this.onSubmit();
	}

	//For delete event by id
	closeModal() {
      this.setState({
        triggerDelete:false,
      });

    }
    confirmedDeletion(event)
    {
            event.preventDefault();
            this.props.deleteDonation.deleteDonation(this.state.deleteDonationId,this.state.donationIndex).then(
                    (res) => {
                    	if(!res.payload.response && res.payload.status==600) {
                    		this.props.addToast.addToast({  type:'error', 
            					text:`Sorry,you are not authorized to delete donation, please contact to your  admin`, 
            					toastType:'auto'  });
            				this.context.router.push('/ERitual/donation');
    	               		}
                        let donationFormData= res.payload.data;
                        if(res.payload.data!= true) {
                            this.setState({ errors : { "form" : "Sorry not able to delete!" }, isLoading : false })
                        }
                          else {
                            this.onSubmit();
                              this.props.addToast.addToast({  type:'success', 
                                text:`Donation deleted successfully`, 
                                toastType:'auto'  });
                              this.context.router.push('/ERitual/donation');
                            
                        }
                    },
            );
     this.setState({deleteDonationId:'',donationIndex:null});
      this.closeModal();

    }
    //For delete event by id
    deleteDonation(e,donationId,itemIndex){
      this.setState({deleteDonationId:donationId});
      this.setState({donationIndex:itemIndex});
      this.setState({triggerDelete:true});
      
    }

	onCancel(donation)
	{
		this.setState({ search :''});
		this.state.search = "";
		this.state.searchByCity = "";
		this.state.searchByLocality = "";
		this.state.amountGreaterThan = "";
		this.state.amountLesserThan = "";
		this.onSubmit(donation,this.state.itemsPerPage,this.state.activePage);

	}
	onSubmit(donation) {
		//donation.prdonationDefault();
		this.setState({ firstTimeFormSubmit : true })
		let search=this.state.search;
		let searchData=this.state;
		this.props.donationRenderList.donationRenderList(search,searchData,this.state.itemsPerPage,this.state.activePage).then(
				(res) => {
					res.payload.data=JSON.parse(decodeURIComponent(res.payload.data.replace(/\+/g,'%20')));
					let searchdata= res.payload.data;
					if(searchdata.message!= null) {
						this.setState({ errors : { "form" : searchdata.message }, isLoading : false })
					}
					else {
						this.context.router.push('/ERitual/donation');
					}
				}
		);
	}

	handlePageClick(index){
		this.state.activePage=index.selected;
		this.onSubmit(donation,this.state.itemsPerPage,this.state.activePage);
		this.scrollPage();
	}

	componentDidMount(){
		let pageSize=this.state.itemsPerPage;
		let pageNumber=this.state.activePage;
		let search =this.state.search;
		this.props.donationRenderList.donationRenderList(search,this.state,pageSize,pageNumber);
		//this.props.deleteDonation.deleteDonation();
	}

	componentWillReceiveProps(nextProps) {
		// if we changed routes...
		if ((
				nextProps.location.key !== this.props.location.key &&
				nextProps.location.state &&
				nextProps.location.state.modal
		)) {
			// save the old children
			this.previousChildren = this.props.children
		}
	}

	render() {

		const {donationList,deleteDonation,location,addToast}=this.props;
		if(donationList.donationData!=undefined){
			if(donationList.donationData.length!=0){
				this.state.pageNum=Math.ceil(donationList.numItems / this.state.itemsPerPage);
				this.state.startIndex=donationList.startIndex;
			}
		}
		if(!this.props.donationList || this.props.donationList.length==0)
			return <div>Loading</div>
			else if(this.props.donationList ){
				if(this.props.donationList.donationData.length==0){
					return(
							<div className="p30 " >
							<div className="row">
							<div className="col-md-2">
							<TextFieldGroup
							label="Name "
								onChange={this.onChange}
							field="search"
								value = {this.state.search}
							name="searchByName"
								asterisk=""
									/>
									</div>
							<div className="col-md-2">
							<TextFieldGroup
							onChange={this.onChange}
							label="Max Amount"
							field="amountGreaterThan"
								value = {this.state.amountGreaterThan}
							asterisk=""
								/>
								</div>
							<div className="col-md-2">
							<TextFieldGroup
							onChange={this.onChange}
							label="Min Amount"
							field="amountLesserThan"
								value = {this.state.amountLesserThan}
							asterisk=""
								/>
								</div>
							<div className="col-md-1">
							<button  className="btn btn-lg btn-primary mt15" onClick={this.onSearch}>
							<i className="kp-up-down blue mr_5"></i>
							Search
							</button>
							</div>
							<div className="col-md-1">
							<button  className="btn btn-lg btn-primary mt15" onClick={this.onCancel}>
							Clear
							</button>
							</div>
							<div className="col-md-1 col-md-offset-2">
							<button  className="btn btn-lg  sector-division btn-primary mb15 mt15" onClick={this.onAdd}>
							Add Donation
							</button>
							</div>
							</div>
							<div className="mt10per ml45per">Sorry No data found !!</div>
							</div>
					)
				}
				else
					return (
							<div className="p30 " >
							<div className="row">
							<div className="col-md-2 ">
							<TextFieldGroup
							label="Name "
								onChange={this.onChange}
							field="search"
								value = {this.state.search}
							name="searchByName"
								asterisk=""    
									/>
									</div>

							<div className="col-md-2">
							<TextFieldGroup
							onChange={this.onChange}
							label="Max Amount"
							field="amountGreaterThan"
								value = {this.state.amountGreaterThan}
							asterisk=""
								/>
								</div>
							<div className="col-md-2">
							<TextFieldGroup
							onChange={this.onChange}
							label="Min Amount"
							field="amountLesserThan"
								value = {this.state.amountLesserThan}
							asterisk=""
								/>
								</div>
							<div className="col-md-1">
							<button  className="btn btn-lg btn-primary mt15" onClick={this.onSearch}>
							<i className="kp-up-down blue mr_5"></i>
							Search
							</button>
							</div>
							<div className="col-md-1">
							<button  className="btn btn-lg btn-primary mt15" onClick={this.onCancel}>
							Clear
							</button>
							</div>
							<div className="col-md-1 col-md-offset-2">
							<button  className="btn btn-lg  sector-division btn-primary mb15 mt15" onClick={this.onAdd}>
							Add Donation
							</button>
							</div>
							</div>
							<div className="row mt40">
							<div className="col-md-3 filter-container">
							<h2> Sort By Relevance</h2>
							<select name="orderByName" className=" form-control  font-color mb10" onChange={this.changeSort}>
							<option value="">Sort By Name</option>
							<option value="asc">Ascending</option>
							<option value="desc">Descending</option>
							</select>
							<select name="orderByAmount" className=" form-control  font-color mb10" onChange={this.changeSort}>
							<option value="">Sort By Amount</option>
							<option value="asc">Ascending</option>
							<option value="desc">Descending</option>
							</select>
							<select name="orderByUpdatedTS" className=" form-control  font-color mb10" onChange={this.changeSort}>
							<option value="">Sort By UpdatedTS</option>
							<option value="asc">Ascending</option>
							<option value="desc">Descending</option>
							</select>
							</div>
							<div className="col-md-9"> 
							<table className="table table-bordered table-striped">
							<thead>
							<tr className="font-color ">
							<th className="tabel-header">Name</th>
							<th className="tabel-header">Description</th>
							<th className="tabel-header">Amount</th>
							<th className="tabel-header">Actions</th>
							</tr>
							</thead>
							<Donation donationRenderList ={donationList} deleteDonation={this.deleteDonation.bind(this)}/>
							</table>
							</div>
							</div>
							<div className="pull-left coursor-pointer">
							<ReactPaginate previousLabel={"previous"}
							nextLabel={"next"}
							breakLabel={<a href="">...</a>}
							breakClassName={"break-me"}
							pageCount={this.state.pageNum}
							marginPagesDisplayed={2}
							pageRangeDisplayed={2}
							onPageChange={this.handlePageClick}
							containerClassName={"pagination"}
							subContainerClassName={"pages pagination"}
							activeClassName={"active"} />
							</div>
							 {this.state.triggerDelete && <div className="modal-bg"><div className="delete-container">
				             <button className = 'close-modal' onClick = {this.closeModal}>x</button>
				             <div className="delete-btn-container">
				           	 <label> <h2>  Are you sure you want to delete the Donation?</h2></label>
				             <button ref="chooseBtn" className="btn btn-primary mr20 col-md-4 " onClick={this.confirmedDeletion}>Delete</button>
				             <button ref="uploadBtn" className="btn btn-primary pull-right col-md-4 " onClick={this.closeModal}>Cancel</button>
				             </div>
				             </div></div>}
							</div>

					)
			}
	}
}


//It's a good practice to have propTypes for components. It becomes easy to track bugs where the developer
//doesn't pass all the required props.


DonationListForm.contextTypes = {
		router:React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
		donationList:state.donationReducer ,

	}
}
function mapDispatchToProps(dispatch) {
	return {
		donationRenderList: bindActionCreators({donationRenderList}, dispatch),
		deleteDonation: bindActionCreators({deleteDonation}, dispatch),
		 addToast:bindActionCreators({ addToast }, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps )(DonationListForm)