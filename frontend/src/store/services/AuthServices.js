import axios from 'axios';
import { getConfig } from '../../config/config';

const { authUrl } = getConfig();

export const signupService = formValues => axios.post(`${authUrl}/register`, formValues);
export const signinService = formValues => axios.post(`${authUrl}/login`, formValues);
