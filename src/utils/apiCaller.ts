import axios, { AxiosError, AxiosResponse } from "axios";

/**
 * Sends a request to a specified endpoint.
 *
 * @param {string} endpoint - The API endpoint to which the request should be made.
 * @param {string} method - The HTTP method for the request (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {object} [headers={}] - An object containing custom headers for the request. Default is an empty object.
 * @param {object} [params={}] - An object containing URL parameters for the request. Default is an empty object.
 * @param {object} [body={}] - An object containing the request body. Default is an empty object.
 * @returns {Promise} - A Promise that resolves to the response of the HTTP request.
 */
export const callApi = async <T>(
  endpoint: string,
  method: string,
  headers: object = {},
  params: object = {},
  body: object = {},
): Promise<
  { data: T; error: null } | { data: null; error: AxiosError }
> => {
  try {
    const response = await axios({
      url: process.env.NEXT_PUBLIC_API_URL + endpoint,
      method: method,
      headers: headers,
      params: params,
      data: body,
    });

    return { data: response.data.data as T, error: null };
  } catch (err) {
    const error = err as AxiosError;

    console.error(`API ERROR: ${error.message}`);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error(error.request);
    }

    return { data: null, error };
  }
};
