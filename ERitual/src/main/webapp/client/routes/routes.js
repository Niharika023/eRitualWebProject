import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../App';
import Login from '../components/Login/Login';
import Home from '../components/Home';
import Seva from '../containers/SevaContainer/SevaListForm';
import OrderListForm from '../containers/OrderContainer/OrderListForm';
import Registration from '../components/Registration/Registration';
import SevaForm from '../components/Seva/SevaForm';
import EventForm from '../components/Event/EventForm';
import DonationForm from '../components/Donation/DonationForm';
import MessageForm from '../components/Message/MessageForm';
import Event from '../containers/EventContainer/EventListForm';
import Message from '../containers/MessageContainer/MessageListForm';
import Donation from '../containers/DonationContainer/DonationListForm';
import EditSeva from '../components/Seva/EditSevaForm';
import EditEvent from '../components/Event/EditEventForm';
import EditDonation from '../components/Donation/EditDonationForm';
import EditMessage from '../components/Message/EditMessageForm';
import Order from '../containers/OrderContainer/OrderListForm';
import OrderDetail from '../containers/OrderContainer/OrderDetailsContainer';
import ChangePassword from '../components/Login/ChangePassword';
import ResetPassword from '../components/Login/ResetPassword';
import otpVerification from '../components/Login/OtpVerification';
import MessageDetail from '../components/Message/MessageDetails';
import TagConfigForm from '../components/TagConfig/TagConfigForm';
import TagConfig from '../containers/TagConfigContainer/TagConfigListForm';
import AboutUs from '../components/AboutUs/aboutUsForm';
import SevaDetails from  '../components/Seva/SevaDetailsComponents';
/*import Otp from '../components/login/Otp';
*/


import requireAuth from '../utils/requireAuth';

export default (
  <Route path = "/ERitual" component={App}>
    <IndexRoute component={Login} />
    <Route path= "registration" component={Registration} />
    <Route path= "changePassword" component={ChangePassword} />
    <Route path= "resetPassword" component={ResetPassword} />
    <Route path= "otpVerification" component={otpVerification} />
    <Route path= "home" component={Home} />
    <Route path= "seva" component={Seva} />
    <Route path= "donation" component={Donation} />
    <Route path= "orders" component={Order} />
    <Route path= "orderdetails/:items" component={OrderDetail} />
    <Route path= "messageDetail/:id" component={MessageDetail} />
    <Route path= "sevaForm" component={SevaForm} />
    <Route path= "eventForm" component={EventForm} />
    <Route path= "donationForm" component={DonationForm} />
    <Route path= "event" component={Event} />
    <Route path= "editSeva/:id" component={EditSeva} />
    <Route path= "editEvent/:id" component={EditEvent} />
    <Route path= "editDonation/:id" component={EditDonation} />
    <Route path= "editMessage/:id" component={EditMessage} />
    <Route path= "messageForm" component={MessageForm} />
    <Route path= "message" component={Message} />
    <Route path= "tagConfigForm" component={TagConfigForm} />
    <Route path= "tagConfig" component={TagConfig} />
    <Route path= "aboutUs" component={AboutUs} />
    <Route path= "sevaDetails/:id" component={SevaDetails} />
  </Route>
)
