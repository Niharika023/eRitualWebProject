import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Order from '../containers/HomeContainer';
import EventOrder from '../containers/homeContainer2';

import DonationOrder from '../containers/homeContainer3';

import {orderRenderList,clearOrderList} from '../actions/orderAction';
import TextFieldGroup from '../components/common/TextFieldGroup';
import { Link } from 'react-router';
import {FontAwesome} from 'react-fontawesome';

class OrderListForm extends Component {
  constructor(){
    super();
    this.state = {
        activePage: 0,
        pageNum:0,
        itemsPerPage:0,
        search: '',
        date:'',
            errors:{},
            isLoading:false,
            firstTimeFormSubmit:false,
            index:0,
            targetType:"",
        clickedStatus:false,
                clickedStatusEvent:false,
                        clickedStatusDonation:false,


    }
          
  }
  
  componentWillUnmount()
  {
	  console.log("rende");
    this.props.clearOrderList();
  }
  

  componentDidMount(){
        let pageSize=this.state.itemsPerPage;
        let pageNumber=this.state.activePage;
        let search =this.state.search;
        this.dateToday();
        this.props.orderRenderList(search,this.state.targetType,pageSize,pageNumber);

    //this.props.deleteOrder.deleteOrder();
  }

  
  dateToday()
  {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    var today = yyyy+'-'+mm+'-'+dd;
    this.state.date = today;
  }
  

  render() {
     
     const {orderList,deleteOrder,location,clearOrderList}=this.props;
     if(orderList==-1)  
     {
         return <div><div className = "col-md-10 col-md-offset-2 mt70  "><h3> Sorry, you are not authorized to view the orders, please contact to your admin.</h3></div></div>;

     }
     if(orderList.orderData==undefined)
     {
         return <tbody><div><i className = "fa fa-spinner fa-spin text-center spinner"></i></div></tbody>;

     }

     if(orderList.orderData!=undefined){
     if(orderList.orderData.length!=0){
     this.state.pageNum=Math.ceil(orderList.numItems / this.state.itemsPerPage);
     this.state.startIndex=orderList.startIndex;
     }
     }
    
         return (
          <div ><div className = "col-md-4 col-md-offset-4  "><label className="heading-color "><h1>Kukke Subramanya Temple</h1></label></div>
          <div className = "row p30  p30 ">
            <div className = "col-md-6">
           
                <h2><lable>Seva</lable></h2>
                <table className="table table-bordered table-striped">
                           <thead>
                                <tr className="font-color ">
                               <th className="tabel-header">Name</th>
                              <th className="tabel-header">Date</th>
                              <th className="tabel-header">Amount</th>
                             
                            </tr>
                        </thead>
                     <Order orderRenderList ={orderList} clearOrderList={clearOrderList} date={this.state.date} />
                     </table>
               </div>


            <div className = "col-md-6">
           
                <h2><lable>Event</lable></h2>
                <table className="table table-bordered table-striped">
                           <thead>
                                <tr className="font-color ">
                               <th className="tabel-header">Name</th>
                              <th className="tabel-header">Date</th>
                              <th className="tabel-header">Amount</th>
                             
                            </tr>
                        </thead>
                    <EventOrder orderRenderList ={orderList} clearOrderList={clearOrderList} date={this.state.date}  />
                     </table>
               </div>
             </div>



          <div className = "row p30  p30 ">
 <div className = "col-md-6">
           
                <h2><lable>Donation</lable></h2>
 <table className="table table-bordered table-striped">
                           <thead>
                                <tr className="font-color ">
                               <th className="tabel-header">Name</th>
                              <th className="tabel-header">Amount</th>
                              <th className="tabel-header">Donator</th>
                             
                            </tr>
                        </thead>
<DonationOrder orderRenderList ={orderList} clearOrderList={clearOrderList} date={this.state.date} />                     </table>
               </div>

          
</div>      </div>      )
        }
        }



//It's a good practice to have propTypes for components. It becomes easy to track bugs where the developer
//doesn't pass all the required props.


OrderListForm.contextTypes = {
  router:React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    orderList:state.orderReducer ,
    
    }
  }
function mapDispatchToProps(dispatch) {
  return {
    orderRenderList: bindActionCreators({orderRenderList}, dispatch),
   clearOrderList: bindActionCreators({ clearOrderList }, dispatch),

    };
  }

export default connect(mapStateToProps, {orderRenderList,clearOrderList} )(OrderListForm)
