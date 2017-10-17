import axios from 'axios';

export function setAuthToken(token) {
  console.log("token is " , token);
  if(token) {
    axios.defaults.headers.common['X-token'] = token;
  }
  else {
    delete axios.defaults.headers.common['X-token'];
  }
}

export function setDefaultToken() {
  //axios.defaults.headers.common["content-type"] = 'application/x-www-form-urlencoded';
}
