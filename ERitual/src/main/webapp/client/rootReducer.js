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
import messageFormReducer from './reducers/MessageFormReducer';
import donationReducer from './reducers/DonationReducer';
import orderReducer from './reducers/OrderReducer';
import changePasswordReducer from './reducers/ChangePasswordReducer';
import donationFormReducer from './reducers/DonationFormReducer';
import eventFormReducer from './reducers/EventFormReducer';
import resetPasswordReducer from './reducers/ResetPasswordReducer';
import tagConfigFormReducer from './reducers/TagConfigFormReducer';
import tagList from './reducers/tagListReducer';
import valueList from './reducers/valueListReducer';
import tagConfigReducer from './reducers/TagConfigReducer';

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
  eventFormReducer,
  orderReducer,
  donationFormReducer,
  changePasswordReducer,
  resetPasswordReducer,
  messageReducer,
  messageFormReducer,
  tagConfigFormReducer,
  tagList,
  valueList,
  tagConfigReducer,
});
