import { FETCH_NAKSHATRA } from '../actions/sevaFormAction';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_NAKSHATRA:
      return {
    	data: JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')))
      }
      break;
    default:
      return state;
  }
}