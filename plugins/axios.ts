import axios from "axios";

export default defineNuxtPlugin(() => {
  const axiosInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
  });

  return {
    provide: {
      axios: axiosInstance,
    },
  };
});
