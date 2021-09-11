import axios from 'redaxios';
import qs from 'qs';

const service = axios.create({
    baseURL: '',
    timeout: 60000,
    withCredentials: true,
});

export function post(url, data, params, headers) {
    if (!params) {
        params = {};
    }
    params._t = new Date().getTime();
    let config = {
        method: 'post',
        url: url,
        params,
    };
    if (data) {
        if (headers && headers['Content-Type'] == 'multipart/form-data') {
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

export default service;
