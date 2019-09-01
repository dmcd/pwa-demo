import axios from 'axios';

const pwaDemoSession = () =>
  JSON.parse(localStorage.getItem('pwa-demo:session'));

export const createApiAxios = () => {
  const {
    authenticated: { identification, token }
  } = pwaDemoSession();

  return axios.create({
    headers: { 'X-User-Email': identification, 'X-User-Token': token }
  });
};

let apiAxiosSingleton = null;
export const apiAxios = () => {
  if (!apiAxiosSingleton) {
    apiAxiosSingleton = createApiAxios();
  }
  return apiAxiosSingleton;
};

const subscribeForWebPush = async subscription => {
  return apiAxios().post('/api/v1/webpush/subscribe', subscription);
};

const fetchTodos = async => {
  return apiAxios().get('/api/v1/todos');
};

const createTodo = async todo => {
  return apiAxios().post('/api/v1/todos', { todo: todo });
};

const deleteTodo = async id => {
  return apiAxios().delete(`/api/v1/todos/${id}`);
};

const updateTodo = async (id, todo) => {
  return apiAxios().put(`/api/v1/todos/${id}`, { todo: todo });
};

export default {
  subscribeForWebPush,
  fetchTodos,
  createTodo,
  deleteTodo,
  updateTodo
};
