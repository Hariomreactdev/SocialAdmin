import { Interceptor } from './';
import store from '@/store/Store';

// const base64Encode = (value: object): string =>
//   btoa(unescape(encodeURIComponent(JSON.stringify(value))));

// const queryString = (obj: Record<string, any>): string =>
//   Object.entries(obj)
//     .filter(([_, value]) => value !== null)
//     .map(([key, value]) => {
//       const encodedValue = typeof value === 'object' ? base64Encode(value) : value;
//       return `${encodeURIComponent(key)}=${encodeURIComponent(encodedValue)}`;
//     })
//     .join('&');

type QueryParams = Record<string, string | number | boolean>;

function queryString(params: QueryParams): string {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

interface ApiModule {
  method?: HttpMethod;
  url?: string;
  responseType?: 'json' | 'blob' | 'arraybuffer' | string;
  timeout?: number;
}

interface Config {
  ContentType?: string;
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
}

const Http = async (
  apiModule: ApiModule | string,
  data: Record<string, any> = {},
  config: Config = {},
) => {
  const method: HttpMethod =
    typeof apiModule === 'object' && apiModule.method
      ? (apiModule.method.toLowerCase() as HttpMethod)
      : 'get';

  const url: string =
    typeof apiModule === 'object' && apiModule.url ? apiModule.url : (apiModule as string);

  const responseType = (typeof apiModule === 'object' && apiModule.responseType) || undefined;
  const timeout = (typeof apiModule === 'object' && apiModule.timeout) || undefined;

  const axiosObject: any = {
    method,
    url,
    headers: {
      'Content-Type': config?.ContentType || 'application/json',
    },
  };

  if (['post', 'put', 'patch'].includes(method)) {
    axiosObject.data = data;
  } else if (method === 'get' && data && Object.keys(data).length > 0) {
    //  axiosObject.url = `${url}?${queryString(data)}`;
    axiosObject.params = data;
  }

  // if (responseType) axiosObject.responseType = responseType;
  // if (timeout) axiosObject.timeout = timeout;
  // if (config.onUploadProgress) axiosObject.onUploadProgress = config.onUploadProgress;
  const { token } = store.getState().authReducer;
  if (token) {
    axiosObject.headers['Authorization'] = `Bearer ${token}`;
  }
  // console.log('axiosObject', axiosObject);

  return Interceptor(axiosObject);
};

export default Http;
