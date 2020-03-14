import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-builder-648b3.firebaseio.com/"
});

export default instance;
