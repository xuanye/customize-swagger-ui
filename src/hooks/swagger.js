import { useState } from 'react';
import { createModel } from 'hox';

function useSwagger() {
    const [version, setVersion] = useState('2.0');
    const [info, setInfo] = useState({
        description: '',
        version: '',
        title: '',
        termsOfService: '',
        contact: {
            email: '',
        },
    });
    const [service, setService] = useState([]);

    const [currentId, setCurrentId] = useState('0.0');

    const [definitions, setDefinitions] = useState(null);

    const buildService = data => {
        var cacheData = [];
        var cacheIndex = {};

        if (data.tags) {
            data.tags.map((item, index) => {
                // "name": "pet",
                //"description": "Everything about your Pets",
                item.methods = [];
                item.methodIndex = {};
                cacheData.push(item);
                cacheIndex[item.name] = index;
            });
        }
        if (data.paths) {
            for (var p in data.paths) {
                if (data.paths.hasOwnProperty(p)) {
                    const group = data.paths[p];
                    extractRequest(p, group, cacheData, cacheIndex);
                }
            }
        }
        setService(cacheData);

        if (data.definitions) {
            setDefinitions(data.definitions);
        }
    };

    return {
        version,
        info,
        setVersion,
        setInfo,
        service,
        buildService,
        currentId,
        setCurrentId,
        definitions,
    };
}

function extractRequest(path, methods, container, index) {
    for (var methodName in methods) {
        if (methods.hasOwnProperty(methodName)) {
            const method = methods[methodName];
            const tag = method.tags[0];
            var request = Object.assign({}, method);
            request.method = methodName;
            request.path = path;
            request.id = index[tag] + '.' + container[index[tag]].methods.length;
            container[index[tag]].methods.push(request);
        }
    }
}

export default createModel(useSwagger);
