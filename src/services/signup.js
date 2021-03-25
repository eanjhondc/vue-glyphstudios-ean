import axios from 'axios';

class Signup {
  constructor() {
    this.http = axios.create({
      baseURL: process.env.VUE_APP_API_BASE_URL
    });
  }
  createUser() {
    return this.http.post(`/signup`);
  }
}

export default new Signup();