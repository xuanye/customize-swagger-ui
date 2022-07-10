import { http } from '@/libs/http';
import { useEffect, useState } from 'react';
import { useQuery } from './useQuery';

const getSwaggerJson = (path: string) => {
  return http.get<SwaggerV2.SwaggerV2>(path);
};

export default function useSwaggerQuery(path: string) {
  const { isLoading, error, data } = useQuery(() => getSwaggerJson(path));
  const [version, setVersion] = useState<string>('2.0');
  const [info, setInfo] = useState<SwaggerJson.Info>({
    description: '',
    version: '',
    title: '',
    termsOfService: '',
    contact: {
      email: '',
    },
  });
  const [services, setServices] = useState<SwaggerJson.ApiService[]>([]);

  const [currentId, setCurrentId] = useState('');

  const [definitions, setDefinitions] = useState<Record<string, SwaggerJson.Schema>>({});

  useEffect(() => {
    if (data) {
      const rspData = data.data;
      var cacheData: SwaggerJson.ApiService[] = [];
      var cacheIndex: Record<string, number> = {};

      setVersion(rspData.swagger);
      setInfo(rspData.info);

      if (rspData.tags) {
        rspData.tags.map(({ name, description }, index) => {
          // "name": "pet",
          //"description": "Everything about your Pets",
          const service: SwaggerJson.ApiService = {
            name,
            description,
            methods: [],
            methodIndex: {},
          };

          cacheData.push(service);
          cacheIndex[service.name] = index;
        });
      }

      if (rspData.paths) {
        for (var p in rspData.paths) {
          if (rspData.paths.hasOwnProperty(p)) {
            const group = rspData.paths[p];
            extractRequest(p, group, cacheData, cacheIndex);
          }
        }
      }
      setServices(cacheData);

      if (rspData.definitions) {
        setDefinitions(rspData.definitions);
      }
      setCurrentId('0.0');
    }
  }, [data]);

  return {
    isLoading,
    error,
    currentId,
    setCurrentId,
    swaggerJson: {
      version,
      info,
      services,
      definitions,
    },
  };
}

function extractRequest(
  path: string,
  group: Record<string, SwaggerV2.Request>,
  services: SwaggerJson.ApiService[],
  index: Record<string, number>,
) {
  for (var methodName in group) {
    if (group.hasOwnProperty(methodName)) {
      const method = group[methodName];
      const tag = method.tags[0];
      if (index[tag] != 0 && !index[tag]) {
        services.push({
          name: tag,
          description: '',
          methods: [],
          methodIndex: {},
        });
        index[tag] = services.length - 1;
      }
      const request: SwaggerJson.ApiMethod = {
        ...method,
        method: methodName,
        path: path,
        id: index[tag] + '.' + services[index[tag]].methods.length,
      };

      services[index[tag]].methods.push(request);
    }
  }
}
