import { getLocalStorageValue } from 'helpers/local_storage';
import axios, { AxiosResponse, AxiosError } from "axios";
import { BASE_API_URL, LocalKeys } from "./const";

const handleResponseSuccess = (response: AxiosResponse) => {

  return response
}

const handleResponseError = (error: AxiosError) => {
  return Promise.reject(error); 
}

const instance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Auth': `Bearer ${getLocalStorageValue<string>(LocalKeys.user_token)}`
  }
})

const auth_instance = axios.create({
  baseURL: BASE_API_URL,
})

instance.interceptors.response.use(handleResponseSuccess, handleResponseError)

export { instance, auth_instance }