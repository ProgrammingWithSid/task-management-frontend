import {
    authApiUrl, AddView, DetailsView, ListView, Signupurl
  } from "./apiurl";
  const apiUrlKeys = Object.assign({}, authApiUrl, ListView,DetailsView,AddView, Signupurl);
  
  export function generateApiUrl(apiKey, payload) {
    const apiUrl = apiUrlKeys[apiKey];
    return typeof apiUrl === "function" ? apiUrl(payload || {}) : apiUrl;
  }
  