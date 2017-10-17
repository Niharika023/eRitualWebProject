import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Seva from '../components/Seva/Seva';
import {sevaRenderList} from '../actions/sevaAction';
import {deleteSeva} from '../actions/sevaAction';
import TextFieldGroup from '../components/common/TextFieldGroup';
import { Link } from 'react-router';
import {FontAwesome} from 'react-fontawesome';
import Datetime from 'react-datetime';
import {addToast, deleteToast} from '../actions/Toasts';
class SevaListForm extends Component {
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
                searchByCity:'',
                searchByLocality:'',
                orderByName:'',
                orderByAmount:'',
                orderByTime:'',
                orderByUpdatedTS:'',
                amountGreaterThan:null,
                amountLesserThan:null,
                timeGreaterThan:null,
                timeLesserThan:null,
                selectDate:null,
                month:null,
                year:null,
                day:null,
                available:null,
                selectedTimeGreater:null,
                selectedTimeLesser:null,
                hours:null,
                minutes:null,
                isAvailable:"",
                selectedIndex:null,
                triggerDelete:false,
                confirmDelete:false,
                deleteSevaId:'',
                sevaIndex:null

        }
        this.onCancel=this.onCancel.bind(this);
        this.onAdd=this.onAdd.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.onChange = this.onChange.bind(this);//bind(this) is needed here, otherwise, this will point to the seva
        this.onSubmit = this.onSubmit.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.changeSort=this.changeSort.bind(this);
        this.handleTimeGreaterThanSelect=this.handleTimeGreaterThanSelect.bind(this);
        this.handleTimeLesserThanSelect=this.handleTimeLesserThanSelect.bind(this);
        this.onStatus=this.onStatus.bind(this);
        this.scrollPage=this.scrollPage.bind(this);
        this.confirmedDeletion = this.confirmedDeletion.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    onChange(seva) {
        this.setState({ [seva.target.name]:seva.target.value}, function() {
            if(this.state.firstTimeFormSubmit) {
                this.isValid();
            }
        });
    }
    onAdd(){
        this.context.router.push('/ERitual/sevaForm');
    }
  
    onSearch(seva)
    {
        this.state.activePage = 0;
        this.onSubmit(event,this.state.itemsPerPage,this.state.activePage);

    }
    scrollPage(){
        let elmnt = document.querySelector('.site-container');
        elmnt.scrollIntoView();
    }
    
    componentWillUpdate(){
        this.scrollPage();
    }
    onStatus(event){
        event.preventDefault();
        this.state.selectedIndex=event.target.selectedIndex;
        this.state.isAvailable=event.target.value;
        this.state.available = event.target.value;


    }

    changeSort(seva){
        let sortBy=seva.target.name;
        let sortByValue=seva.target.value;
        if(sortBy=="orderByName"){
            this.state.orderByName=sortByValue
        }
        if(sortBy=="orderByAmount"){
            this.state.orderByAmount=sortByValue
        }
        if(sortBy=="orderByTime"){
            this.state.orderByTime=sortByValue
        }
        if(sortBy=="orderByUpdatedTS"){
            this.state.orderByUpdatedTS=sortByValue
        }
        console.log("orderBy",this.state);
        this.onSubmit();
    }

    closeModal() {
      this.setState({
        triggerDelete:false,
      });

    }
    confirmedDeletion(event)
    {
            event.preventDefault();
            this.props.deleteSeva.deleteSeva(this.state.deleteSevaId,this.state.sevaIndex).then(
                    (res) => {
                    	if(!res.payload.response && res.payload.status==600) {
                    		this.props.addToast.addToast({  type:'error', 
            					text:`Sorry,you are not authorized to delete seva, please contact to your  admin`, 
            					toastType:'auto'  });
            				this.context.router.push('/ERitual/seva');
    	               		}
                        let sevaFormData= res.payload.data;
                        if(res.payload.data!= true) {
                            this.setState({ errors : { "form" : "Sorry not able to delete!" }, isLoading : false })
                        }
                          else {
                            this.onSubmit();
                              this.props.addToast.addToast({  type:'success', 
                                text:`Seva deleted successfully`, 
                                toastType:'auto'  });
                              this.context.router.push('/ERitual/seva');
                            
                        }
                    },
            );
     this.setState({deleteSevaId:'',sevaIndex:null});
      this.closeModal();

    }
    //For delete event by id
    deleteSeva(e,sevaId,itemIndex){
      this.setState({deleteSevaId:sevaId});
      this.setState({sevaIndex:itemIndex});
      console.log("deleting the seva");
      this.setState({triggerDelete:true});
      
    }

    onCancel(event)
    {
        this.setState({ search :''});
        this.state.search = "";
        this.state.searchByCity = "";
        this.state.searchByLocality = "";
        this.state.amountGreaterThan = "";
        this.state.amountLesserThan = "";
        this.state.timeGreaterThan = "";
        this.state.timeLesserThan = "";
        this.state.selectedTimeGreater="";
        this.state.selectedTimeLesser="";
        this.state.isAvailable="";
        this.state.available="";
        this.state.selectedIndex=0;

        this.onSubmit(event,this.state.itemsPerPage,this.state.activePage);

    }


    onSubmit(seva) {
        //seva.prsevaDefault();
        this.setState({ firstTimeFormSubmit : true })
        let search=this.state.search;
        let searchData=this.state;
        console.log("this.state.isAvailable",this.state.isAvailable);
        this.props.sevaRenderList.sevaRenderList(search,searchData,this.state.itemsPerPage,this.state.activePage).then(
                (res) => {
                    res.payload.data=JSON.parse(decodeURIComponent(res.payload.data.replace(/\+/g,'%20')));
                    let searchdata= res.payload.data;
                    console.log("this.state.isAvailable afte",this.state.isAvailable);
                    if(searchdata.message!= null) {
                        this.setState({ errors : { "form" : searchdata.message }, isLoading : false })
                    }
                    else {
                        this.context.router.push('/ERitual/seva');
                    }
                }
        );
    }

    handlePageClick(index){
        this.state.activePage=index.selected;
        this.onSubmit(event,this.state.itemsPerPage,this.state.activePage);
        this.scrollPage();
    }

    handleTimeGreaterThanSelect(selectedDate) {
        let hoursFormat=null;
        let minutesFormat=null;
        this.state.hours=new Date(selectedDate._d).getHours();
        this.state.minutes=new Date(selectedDate._d).getMinutes();
        hoursFormat=new Date(selectedDate._d).getHours();
        minutesFormat=new Date(selectedDate._d).getMinutes();
        let selectedHour = hoursFormat%12;
        this.setState({
            timeGreaterThan:`${(this.state.hours < 10) ? "0" + this.state.hours : this.state.hours}:${(this.state.minutes < 10)? "0"+this.state.minutes : this.state.minutes}`,
            selectedTimeGreater:`${(selectedHour < 10) ? "0" + selectedHour : selectedHour}:${(minutesFormat < 10)? "0"+minutesFormat : minutesFormat} ${(hoursFormat < 12)?'AM':'PM'}`
        })
    }

    handleTimeLesserThanSelect(selectedDate) {
        let hoursFormat=null;
        let minutesFormat=null;
        this.state.hours=new Date(selectedDate._d).getHours();
        this.state.minutes=new Date(selectedDate._d).getMinutes();
        hoursFormat=new Date(selectedDate._d).getHours();
        minutesFormat=new Date(selectedDate._d).getMinutes();
        let selectedHour = hoursFormat%12;
        this.setState({
            timeLesserThan:`${(selectedHour < 10) ? "0" + selectedHour : selectedHour}:${(minutesFormat < 10)? "0"+minutesFormat : minutesFormat}`,
            selectedTimeLesser:`${(selectedHour < 10) ? "0" + selectedHour : selectedHour}:${(minutesFormat < 10)? "0"+minutesFormat : minutesFormat} ${(hoursFormat < 12)?'AM':'PM'}`
        })
    }


    componentDidMount(){
        let pageSize=this.state.itemsPerPage;
        let pageNumber=this.state.activePage;
        let search =this.state.search;
        this.props.sevaRenderList.sevaRenderList(search,this.state,pageSize,pageNumber);
        //this.props.deleteSeva.deleteSeva();
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
         const {sevaList,deleteSeva,location,addToast}=this.props;
         if(sevaList.sevaData!=undefined){
         if(sevaList.sevaData.length!=0){
         this.state.pageNum=Math.ceil(sevaList.numItems / this.state.itemsPerPage);
         this.state.startIndex=sevaList.startIndex;
         }
         }
         if(!this.props.sevaList || this.props.sevaList.length==0)
             return <div>Loading........</div>
             else if(this.props.sevaList ){
                 if(this.props.sevaList.sevaData==undefined || this.props.sevaList.sevaData.length==0){
                     return(
                             <div className="p30 " >
                             <div className="row">
                             <div className="col-md-4 col-md-offset-2">
                                 <TextFieldGroup
                                 label="Name "
                                 onChange={this.onChange}
                                 field="search"
                                 value = {this.state.search}
                                 name="searchByName"
                                 asterisk=""
                                     
                                 />
                             </div>
                                 <span className="col-md-4"><label>Available</label></span>

                                 <div className="sector-division col-md-3 mtNeg10 ">
                                 <h4><i className="kp-up-down blue"></i></h4>
                                        <select className=" form-control "  onChange={this.onStatus}  field = "available">
                                      <option value="" selected={this.state.isAvailable === ""} >--- Select Availability ---</option>
                                      <option value={this.state.isAvailable=true}  >True    </option>
                                      <option value={this.state.isAvailable =false}  >False    </option>
                                      </select>
                                 </div>
                             <div className="col-md-1">
                                 <button  className="btn btn-lg btn-primary " onClick={this.onSearch}>
                                 <i className="kp-up-down blue mr_5"></i>
                                 Search
                                 </button>
                             </div>
                             <div className="col-md-1">
                                 <button  className="btn btn-lg btn-primary " onClick={this.onCancel}>
                                 Clear
                                 </button>
                             </div>
                         </div>
                                <div className="row">
                                    <div className="col-md-9">
                                        <button  className="btn btn-lg  sector-division btn-primary mb15 mt15" onClick={this.onAdd}>
                                        Add Seva
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
                                <div className="col-md-4 col-md-offset-2">
                                    <TextFieldGroup
                                    label="Name "
                                    onChange={this.onChange}
                                    field="search"
                                    value = {this.state.search}
                                    name="searchByName"
                                    asterisk=""
                                        
                                    />
                                </div>
                                    <span className="col-md-4"><label>Available</label></span>

                                    <div className="sector-division col-md-3 mtNeg10 ">
                                    <h4><i className="kp-up-down blue"></i></h4>
                                           <select className=" form-control "  onChange={this.onStatus}  field = "available">
                                         <option value="" selected={this.state.isAvailable === ""} >--- Select Availability ---</option>
     
                                         <option value={this.state.isAvailable=true}  >True    </option>
                                         <option value={this.state.isAvailable =false}  >False    </option>
                                         </select>
                                    </div>
                                <div className="col-md-1">
                                    <button  className="btn btn-lg btn-primary " onClick={this.onSearch}>
                                    <i className="kp-up-down blue mr_5"></i>
                                    Search
                                    </button>
                                </div>
                                <div className="col-md-1">
                                    <button  className="btn btn-lg btn-primary " onClick={this.onCancel}>
                                    Clear
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-9">
                                    <button  className="btn btn-lg  sector-division btn-primary mb15 mt15" onClick={this.onAdd}>
                                    Add Seva
                                    </button>
                                </div>
                                
                          </div>
                          <div className="row">
                          <div className="col-md-3 filter-container">
                          <h2> Sort By Relevance</h2>
                          <select name="orderByName" className=" form-control  font-color mb10" onChange={this.changeSort}>
                              <option value="">Sort By Name</option>
                              <option value="asc">Ascending</option>
                              <option value="desc">Descending</option>
                          </select>
                          <select name="orderByTime" className=" form-control  font-color mb10" onChange={this.changeSort}>
                              <option value="">Sort By Time</option>
                              <option value="asc">Ascending</option>
                              <option value="desc">Descending</option>
                          </select>
                          <select name="orderByAmount" className=" form-control  font-color mb10" onChange={this.changeSort}>
                          <option value="">Sort By Amount</option>
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
                              <th className="tabel-header">Time</th>
                              <th className="tabel-header">Available</th>
                              <th className="tabel-header">Actions</th>
                            </tr>
                        </thead>
              <Seva sevaRenderList ={sevaList} deleteSeva={this.deleteSeva.bind(this)}/>
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
           <label> <h2>  Are you sure you want to delete the seva?</h2></label>
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

SevaListForm.contextTypes = {
        router:React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        sevaList:state.sevaReducer ,

    }
}
function mapDispatchToProps(dispatch) {
    return {
        sevaRenderList: bindActionCreators({sevaRenderList}, dispatch),
        deleteSeva: bindActionCreators({deleteSeva}, dispatch),
        addToast:bindActionCreators({ addToast }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SevaListForm)