import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Order from '../../components/Order/Orders';
import {orderRenderList} from '../../actions/orderAction';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import { Link } from 'react-router';
import {FontAwesome} from 'react-fontawesome';

class OrderListForm extends Component {
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
                targetType:"",
                istargetType:"",


               
        }
        this.onCancel=this.onCancel.bind(this);
        this.onAdd=this.onAdd.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
         this.onChange = this.onChange.bind(this);//bind(this) is needed here, otherwise, this will point to the event
          this.onSubmit = this.onSubmit.bind(this);
          this.changePage = this.changePage.bind(this);
          this.onSearch = this.onSearch.bind(this);
    }
    
     onChange(event) {
          
          this.setState({ [event.target.name]:event.target.value}, function() {
            if(this.state.firstTimeFormSubmit) {
              this.isValid();
            }
          });
        }
     onAdd(){
         this.context.router.push('/ERitual/orderForm');
     }
       onSearch(event)
     {
/*this.setState({activePage:0});
*/         
this.state.activePage = 0;
this.onSubmit(event,this.state.itemsPerPage,this.state.activePage);

     }

     changePage(event){
        this.state.targetType=event.target.value;
        this.state.istargetType=event.target.value;

     }
     
     
     
     onCancel(event)
     {
         
         this.setState({ search :''});
        this.state.search = "";
        this.state.targetType = "";
        this.state.istargetType="";
         this.onSubmit(event,this.state.itemsPerPage,this.state.activePage,this.state.istargetType);
     }
     
     onSubmit(event) {
          event.preventDefault();
          this.setState({ firstTimeFormSubmit : true })
          let search=this.state.search;
          let searchData=this.state.targetType;
            this.props.orderRenderList.orderRenderList(search,searchData,this.state.itemsPerPage,this.state.activePage).then(
             (res) => {
                 res.payload.data=JSON.parse(decodeURIComponent(res.payload.data.replace(/\+/g,'%20')));
                 let searchdata= res.payload.data;
                    if(searchdata.message!= null) {
                        this.setState({ errors : { "form" : searchdata.message }, isLoading : false })
                        }
                    else {
                        this.context.router.push('/ERitual/order');
                    }
                }
             );
          }
     
    handlePageClick(index){
        this.state.activePage=index.selected;
        this.onSubmit(event,this.state.itemsPerPage,this.state.activePage);
    }
    
    componentDidMount(){
          let pageSize=this.state.itemsPerPage;
          let pageNumber=this.state.activePage;
          let search =this.state.search;
        this.props.orderRenderList.orderRenderList(search,this.state.targetType,pageSize,pageNumber);
        //this.props.deleteOrder.deleteOrder();
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
         
         const {orderList,deleteOrder,location}=this.props;
  if(orderList==-1)  
 {
         return <div><div className = "col-md-10 col-md-offset-2 mt70  "><h3> Sorry, you are not authorized to view the orders, please contact to your admin.</h3></div></div>;

     }
         if(orderList.orderData!=undefined){
         if(orderList.orderData.length!=0){
         this.state.pageNum=Math.ceil(orderList.numItems / this.state.itemsPerPage);
         this.state.startIndex=orderList.startIndex;
         }
         }
        
         if(this.props.orderList==undefined || this.props.orderList.length==0)
             return <div>Loading</div>
             else if(this.props.orderList){
                 if(this.props.orderList.orderData==undefined || this.props.orderList.orderData.length==0){
                     return(
                             <div className="p30 "  >
                             <div className="row">
	 							<div className="col-md-offset-5">
	 							<h1 className="mt0 mb20 ">Order List</h1>
	 							</div>
	 						</div>
                                 <div className="row">
                                    <div className="col-md-4 ">
                                        <TextFieldGroup
                                        label="Creator Name "
                                        onChange={this.onChange}
                                        field="search"
                                        value = {this.state.search}
                                        asterisk=""
                                        />
                                    </div>
                                        <div className="sector-division col-md-3  ">
                                        <span className="col-md-4"><label>Target Type</label></span>
                                        <h4><i className="kp-up-down blue "></i></h4>
                                        <select className=" form-control"  onChange={this.changePage} field = "targetType">
                                            <option value="" selected = {this.state.istargetType===""} >--- Select Target Type --- </option>
                                            <option value={this.state.istargetType='SEVA'}  >Seva  </option>
                                            <option value={this.state.istargetType='EVENT'} >Event</option>
                                        </select>
                                        
                                    </div>
                                    <div className="col-md-1">
                                        <button  className="btn btn-lg btn-primary " onClick={this.onSearch}>
                                        Search
                                        </button>
                                    </div>
                                    <div className="col-md-1">
                                        <button  className="btn btn-lg btn-primary " onClick={this.onCancel}>
                                        Clear
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
							<div className="col-md-offset-5">
							<h1 className="mt0 mb20 ">Order List</h1>
							</div>
						</div>
                            <div className="row">
                                <div className="col-md-4 ">
                                <TextFieldGroup
                                label="Creator Name"
                                onChange={this.onChange}
                                field="search"
                                asterick=""
                                value = {this.state.search}
                                asterisk=""
                                />
                                </div>
                                        <div className="sector-division col-md-3  ">
                                        <span className="col-md-6"><label>Target Type</label></span>
                                        <h4><i className="kp-up-down blue "></i></h4>
                                        <select className=" form-control"  onChange={this.changePage} field = "targetType">
                                            <option value="" selected = {this.state.istargetType===""} >--- Select Target Type ---</option>
                                            <option value={this.state.istargetType='SEVA'}  >Seva  </option>
                                            <option value={this.state.istargetType='EVENT'} >Event</option>
                                        </select>
                                        
                                    </div>
                                <div className="col-md-1">
                                    <button  className="btn btn-lg btn-primary mt20" onClick={this.onSearch}>
                                    Search
                                    </button>
                                </div>
                                <div className="col-md-1">
                                    <button  className="btn btn-lg btn-primary mt20" onClick={this.onCancel}>
                                    Clear
                                    </button>
                                </div>
                            </div>

                            <div className="row">
                            
                          </div>
                        <table className="table table-bordered table-striped mt30">
                               <thead>
                                    <tr className="font-color ">
                                    <th className="tabel-header">Transaction Id</th>
                                    <th className="tabel-header">Booked Date</th>
                                   <th className="tabel-header">Entity</th>
                                   <th className="tabel-header">Tags</th>
                                   <th className="tabel-header">Title</th>
                                   <th className="tabel-header">Amount</th>
                                 <th className="tabel-header">Email Id</th>
                                 <th className="tabel-header">Phone No.</th>
                                </tr>
                            </thead>
                              <Order orderRenderList ={orderList} />
                         </table>
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
             </div>
            
                  )
                }
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
      };
    }

export default connect(mapStateToProps, mapDispatchToProps )(OrderListForm)
