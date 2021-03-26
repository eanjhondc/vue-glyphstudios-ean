import axios from 'axios';

class Signup {
  constructor() {
    this.http = axios.create({
      baseURL: process.env.VUE_APP_API_BASE_URL
    });
  }
  createUser(data){
    return this.http.post(`/signup`, data);
  }
}

export default new Signup();