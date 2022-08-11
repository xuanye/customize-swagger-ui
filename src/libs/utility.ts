export default {
  getTypeName(parameter: any) {
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
          typeName = parameter.type;
          break;
      }
      if (parameter.format) {
        typeName += `(format:${parameter.format})`;
      }
    } else if (parameter.schema) {
      if (parameter.schema.items) {
        typeName = `Array[${getInnerItemType(parameter.schema.items)}]`;
      } else if (parameter.schema['$ref']) {
        typeName = parameter.schema['$ref'].split('/').pop();
      }
    } else if (parameter['$ref']) {
      typeName = parameter['$ref'].split('/').pop();
    }
    return typeName;
  },
  format(temp: string, data: Record<string, any>) {
    return temp.replace(/\{([\w]+)\}/g, function (s1, s2) {
      var s = data[s2];
      if (typeof s != 'undefined') {
        if (s instanceof Date) {
          return s.getTimezoneOffset().toString();
        } else {
          return encodeURIComponent(s);
        }
      } else {
        return '';
      }
    });
  },
};

function getInnerItemType(item: any) {
  if (!item) {
    return 'unknown';
  }

  if (Array.isArray(item) && item.length > 0) {
    item = item[0];
  }

  if (item.type) {
    return item.type;
  } else if (item['$ref']) {
    return item['$ref'].split('/').pop();
  }

  return 'unknown';
}
