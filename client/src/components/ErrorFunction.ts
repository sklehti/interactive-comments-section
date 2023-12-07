import { AxiosError } from "axios";

export const parseError = (error: AxiosError) => {
  if (error.response) {
    return `Data: ${error.response.data}\n${error.response.status}`;
  } else if (error.request) {
    console.log(error.request);

    return `Error: Request error`;
  } else {
    return `Error: ${error.message}`;
  }
};
