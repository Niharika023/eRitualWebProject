import {ADD_TOAST_MESSAGE} from './typeConstants';
import {DELETE_TOAST_MESSAGE} from './typeConstants';
import {DELETE_ALL_TOASTS} from './typeConstants';

export function addToast(message) {
  console.log("message ", message);
  return {
    type:ADD_TOAST_MESSAGE,
    message
  }
}

export function deleteToast(id) {
  return {
    type:DELETE_TOAST_MESSAGE,
    id
  }
}

export function deleteAllToasts() {
  return {
    type:DELETE_ALL_TOASTS,
  }
}
