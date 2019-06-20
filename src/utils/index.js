import axios from 'axios'

const fetch = axios.create({
  // baseURL: 'http://192.168.43.55'
  baseURL: process.env.BASE_URL
})

fetch.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
})

fetch.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
})

export {fetch}
