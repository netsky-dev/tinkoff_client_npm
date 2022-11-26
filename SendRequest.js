import fetch from 'node-fetch';

class HTTPResponseError extends Error {
 constructor(response) {
  super(`HTTP Error Response: ${response.status} ${response.statusText}`);
  this.response = response;
 }
}

const checkStatus = response => {
 if (response.ok) {
  return response;
 } else {
  throw new HTTPResponseError(response);
 }
}

const TinkoffClient = {
 SendRequest: {

  async request({ path, keys }) {
   let url = this.url + path;
   let payload = this.init_params(keys);

   try {
    const response = await fetch(url, {
     method: 'post',
     body: JSON.stringify(payload),
     headers: { 'Content-Type': 'application/json' }
    });

    try {
     checkStatus(response);
    } catch (error) {

     const errorBody = await error.response.text();
     return (`Error: ${errorBody}`);
    }

    const data = await response.json();
    return data
   } catch (error) {
    return error
   }
  }
 }
}

export default TinkoffClient.SendRequest