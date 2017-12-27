import { FETCH_TAG } from '../actions/tagConfigFormAction';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_TAG:
      return {
    	data: JSON.parse(decodeURIComponent(action.payload.data.replace(/\+/g,'%20')))
      }
      break;
    default:
      return state;
  }
}