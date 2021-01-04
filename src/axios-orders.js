import axios from 'axios';

const instance = axios.create({
  baseURL: "https://burguer-builder-9c311-default-rtdb.firebaseio.com/"
})

export default instance;