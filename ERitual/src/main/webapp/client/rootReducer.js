import { combineReducers } from 'redux';
import toasts from './reducers/Toasts';
import auth from './reducers/Auth';
import ActiveTabReducer from './reducers/selectedTab';
import registrationReducer from './reducers/RegistrationReducer';
import sevaReducer from './reducers/SevaReducer';
import sevaFormReducer from './reducers/SevaFormReducer';
import rashiList from './reducers/RashiListReducer';
import nakshtraList from './reducers/NakshtraListReducer';
import eventReducer from './reducers/EventReducer';
import messageReducer from './reducers/MessageReducer';
import editMessageReducer from './reducers/EditMessageReducer';
import messageFormReducer from './reducers/MessageFormReducer';
import donationReducer from './reducers/DonationReducer';
import editFormReducer from './reducers/EditFormReducer';
import orderReducer from './reducers/OrderReducer';
import changePasswordReducer from './reducers/ChangePasswordReducer';
import donationFormReducer from './reducers/DonationFormReducer';
import editEventReducer from './reducers/EditEventReducer';
import editDonationReducer from './reducers/EditDonationReducer';
import resetPasswordReducer from './reducers/ResetPasswordReducer';

export default combineReducers({
  toasts,
  auth,
  registrationReducer,
  sevaReducer,
  sevaFormReducer,
  rashiList,
  nakshtraList,
  eventReducer,
  donationReducer,
  editFormReducer,
  editEventReducer,
  orderReducer,
  donationFormReducer,
  changePasswordReducer,
  editDonationReducer,
  resetPasswordReducer,
  messageReducer,
  editMessageReducer,
  messageFormReducer
});
