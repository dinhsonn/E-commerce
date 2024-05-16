import axios from "axios";

const httpAxios = axios.create({
    baseURL: 'http://localhost:8384/api/',
    timeout:10000,
    headers:{'X-Custom-Header':'foobar'},
   
})
export default httpAxios;