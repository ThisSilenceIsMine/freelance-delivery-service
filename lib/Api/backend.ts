import axios from "axios";

export const api = axios.create({
  baseURL: 'https://spring5-delivery-service.herokuapp.com/api/v1/',
});