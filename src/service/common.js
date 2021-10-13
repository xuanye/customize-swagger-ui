import * as fetch from '../libs/fetch';
import Utility from '@/libs/utility';

export default class CommonService {
    static request(schema, data, type, token) {
        //console.log(schema);
        const method = schema.method.toLowerCase();
        let action = method === 'delete' ? fetch['del'] : fetch[method];
        if (!action) {
            throw new Error(`$method:{method}  is invalid`);
        }

        const headers = { Accept: 'application/json' };

        if (schema.produces) {
            headers.Accept = schema.produces.join(';');
        }
        if (schema.consumes) {
            //not get
            headers['Content-Type'] =
                type == 1 ? 'application/x-www-form-urlencoded' : 'application/json';
        }
        if (!!token) {
            headers['Authorization'] = token;
        }

        let path = '';
        if (type == 2) {
            if (method == 'get') {
                action = fetch['post'];
            }
            path = schema.path;
            return this.requestJsonBody(action, path, data, headers);
        } else if (method == 'get') {
            path = Utility.format(schema.path, data);
            return action(path, data, headers);
        } else {
            path = Utility.format(schema.path, data);
            return action(path, data, {}, headers);
        }
    }

    static requestJsonBody(action, path, data, headers) {
        if (/\{[\w]+\}/gi.test(path)) {
            throw new Error(`path:${path} is invalid`);
        }
        return action(path, data, {}, headers);
        //fetch.post()
    }
}
