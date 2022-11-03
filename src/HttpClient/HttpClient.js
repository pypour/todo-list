import Axios from 'axios';
import showToast from '../Toast/Toast';
import config from '../Config/config.json';

export const tokenKey = 'token';

export const requestConfig = {
  transformRequest: [
    function (data, headers) {
      if (data) {
        data = JSON.stringify(data);
      }
      headers.setContentType('application/json');
      var token = localStorage.getItem(tokenKey);
      if (token) {
        headers['Authorization'] = token;
      }
      if (data && headers.hasContentLength()) {
        headers['Content-Length'] = data.length;
        delete axios.defaults.headers.common['Content-Length'];
      }
      return data;
    },
  ],
};

const axios = Axios.create({
  baseURL: 'https://api-nodejs-todolist.herokuapp.com/',
});

axios.interceptors.response.use((res) => {
  if (res.status == 401) {
    showToast('Login failed!', 'error');
  } else if (res.status == 404) {
    showToast('Task not found!', 'error');
  } else if (res.status >= 400) {
    showToast('An error has been occured!', 'error');
  }
  return res;
});

export default axios;

export const Login = () => axios.post('user/login', { email: config.email, password: config.password }, requestConfig);
export const GetTasks = () => axios.get(`/task`, requestConfig);
export const AddNewTask = (task) => axios.post('task', task, requestConfig);
export const UpdateTask = (id, completed) =>
  axios.put(`task/${id}`, { completed }, requestConfig);
export const DeleteTask = (id) => axios.delete(`task/${id}`, requestConfig);
