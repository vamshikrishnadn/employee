import axios from 'axios';
import { getConfig } from '../../config/config';

const { queryUrl } = getConfig();

export const queryTaskOneService = () => axios.get(`${queryUrl}/employee/department`);
export const queryTaskTwoService = () => axios.get(`${queryUrl}/employee/sales`);
