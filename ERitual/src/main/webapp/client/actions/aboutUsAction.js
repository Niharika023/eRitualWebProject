import axios from 'axios';
import jwt from 'jsonwebtoken';

export const CREATE_ABOUT_US = 'CREATE_ABOUT_US';

export function setAboutUs(aboutUsData) {
	  return {
	    type: CREATE_ABOUT_US,
	    payload :request
	  };
	}

