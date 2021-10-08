import axios from 'axios';
import qs from 'qs';

const service = axios.create({
    baseURL: '/',
    timeout: 60000,
    withCredentials: true,
});

export function fetch(url, data, params, headers, method) {
    if (!params) {
        params = {};
    }
    params._t = new Date().getTime();
    let config = {
        method: method || 'post',
        url: url,
        params,
    };
    if (data) {
        if (
            headers &&
            (headers['Content-Type'] == 'multipart/form-data' ||
                headers['Content-Type'] == 'application/json')
        ) {
            config.data = data;
        } else {
            config.data = qs.stringify(data, { indices: false });
        }
    }
    if (headers) {
        config.headers = headers;
    }

    return service(config);
}

export function get(url, params, headers) {
    if (!params) {
        params = {};
    }
    params._t = new Date().getTime();
    let config = {
        method: 'get',
        url: url,
        params,
    };
    if (headers) {
        config.headers = headers;
    }
    return service(config);
}

export function post(url, data, params, headers) {
    return fetch(url, data, params, headers, 'post');
}
export function put(url, data, params, headers) {
    return fetch(url, data, params, headers, 'put');
}

export function patch(url, data, params, headers) {
    return fetch(url, data, params, headers, 'patch');
}

export function del(url, data, params, headers) {
    return fetch(url, data, params, headers, 'delete');
}

//export default service;
