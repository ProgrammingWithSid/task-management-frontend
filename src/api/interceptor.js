import { getLocalStorage } from "../utility/storageutility";
import { accessTokenKey } from "../constants/storageconstants";
import { setApiCallLoadingAct } from "../store/globaldata/globalslicer";
import store from "../store";
const apiCallSet = new Set();

export function requestInterceptor(request) {
    const { url, tokenNotRequired = false } = request || {};
    if (!request.hideLoader) {
        apiCallSet.add(url);
    }
    
    // Check if the request URL is not for signup, and then add the JWT header
    if (!tokenNotRequired) {
        const tokenKey = getLocalStorage(accessTokenKey);
        if (!url.includes("/auth/users/") && tokenKey) {
            request.headers["Authorization"] = `JWT ${tokenKey}`;
        }
    }

    if (apiCallSet.size === 1) {
        store.dispatch(setApiCallLoadingAct(true));
    }
    return request;
}

export function responseInterceptorSuccess(response) {
    const { config } = response;
    apiCallSet.delete(config.url);
    if (apiCallSet.size === 0) {
        setTimeout(() => {
            if (apiCallSet.size === 0) {
                store.dispatch(setApiCallLoadingAct(false));
            }
        }, 500);
    }
    return response;
}

export function responseInterceptor(error) {
    apiCallSet.clear();
    store.dispatch(setApiCallLoadingAct(false));
    return error.isAxiosError ? Promise.reject(error) : error;
}