import axios from "axios";
const baseUrl = ""
const authToken = ""



export function postApi(url, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(baseUrl + url, data, {
          headers: {
            Authorization: 'Bearer ' + authToken
          }
        }
        )
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
          console.log(url, 'url POST');
        });
    });
  }

export function getApi(url) {
    console.log(url,"url from getApi");
    return new Promise((resolve, reject) => {
      axios
        .get(baseUrl + url, {
          headers: {
            Authorization: 'Bearer ' + authToken
          }
        }
        )
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
          console.log(url, 'url GET');
        });
    });
  }
  