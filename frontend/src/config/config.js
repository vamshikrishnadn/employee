const endpoint = 'http://localhost:4000';
// const endpoint = 'https://employee-li4c.onrender.com';

export const getConfig = () => ({
  authUrl: `${endpoint}/v1/auth`,
  depUrl: `${endpoint}/v1/department`,
  queryUrl: `${endpoint}/v1/query/task`,
});
