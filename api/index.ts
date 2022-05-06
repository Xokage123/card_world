import axios, { AxiosResponse, AxiosError } from "axios";
import { BASE_API_URL } from "./const";

const handleResponseSuccess = (response: AxiosResponse) => {

  return response
}

const handleResponseError = (error: AxiosError) => {
  return Promise.reject(error); 
}

const instance = axios.create({
  baseURL: BASE_API_URL
})

instance.interceptors.response.use(handleResponseSuccess, handleResponseError)

export default instance