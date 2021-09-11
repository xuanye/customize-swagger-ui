export default {
    getTypeName(parameter) {
        let typeName = '';
        if (parameter.type) {
            switch (parameter.type) {
                case 'integer':
                case 'number':
                case 'string':
                case 'boolean':
                    typeName = parameter.type;
                    break;
                case 'array':
                    typeName = `Array[${getInnerItemType(parameter.items)}]`;
                    break;
                default:
                    typeName = 'string';
                    break;
            }
            if (parameter.format) {
                typeName += `(format:${parameter.format})`;
            }
        } else if (parameter.schema) {
            if (parameter.schema['$ref']) {
                typeName = parameter.schema['$ref'].split('/').pop();
            } else if (parameter.schema.type && parameter.schema.items) {
                typeName = `Array[${getInnerItemType(parameter.schema.items)}]`;
            }
        }
        return typeName;
    },
};

function getInnerItemType(item) {
    if (!item) {
        return 'unknown';
    }
    if (item.type) {
        return item.type;
    } else if (item['$ref']) {
        return item['$ref'].split('/').pop();
    }
    return 'unknown';
}
