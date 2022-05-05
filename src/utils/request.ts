/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { history } from 'umi';
import { notification } from 'antd';
// const baseurl = 'http://182.61.55.225:1601/';
const baseurl = 'api/';
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  0: '处理成功',
  1: '未知异常',
  2: '用户未登录',
  3: '用户未授权',
  4: '用户账号不可用',
  5: '密码错误',
  6: '用户不存在',
  7: '用户已存在',
  8: '参数为空',
  9: '参数错误',
  10: '调用失败',
  11: '远程调用失败',
  12: 'id生成失败',
  13: '数据保存异常',
  14: '数据查询异常',
  15: '数据删除异常',
  16: '数据更新异常',
  17: '数据不存在',
};
type mapCode =
  | 200
  | 201
  | 202
  | 204
  | 400
  | 401
  | 403
  | 404
  | 406
  | 410
  | 422
  | 500
  | 502
  | 503
  | 504
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17;

/**
 * 异常处理程序
 */
const errorHandler = (error) => {
  console.log('错误', error);
  if (error?.subCode) {
    if (
      error?.subCode === 2 ||
      error?.subCode === 3 ||
      error?.subCode === 4 ||
      error?.subCode === 6
    ) {
      //在这里对token过期或者没有登录时的情况跳转到登录页面
      history.replace({
        pathname: '/login',
        // search: stringify({
        //   redirect: window.location.hash.substring(1),//记录是从哪个页面跳转到登录页的，登录后直接跳转到对应的页面
        // }),
      });
      localStorage.clear(); //跳到登录页时需要将存储在本地的信息全部清除掉
    }

    notification.error({
      message: error?.message,
      // description: error?.message,
    });
  } else if (!error) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return error;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  // prefix: '/api/v1', // baseUrl前缀，统一设置 url 前缀
  // suffix: ".json", // 后缀，统一设置 url 后缀
  timeout: 20000,
  // 'useCache' 是否使用缓存，当值为 true 时，GET 请求在 ttl 毫秒内将被缓存，缓存策略唯一 key 为 url + params 组合
  // useCache: true, // default
  headers: {
    //requestType: 'form' 注意不要设置headers，umi-request会自己转换
    // 请求头
    // 'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Credentials': true
    // Authorization: getToken() ? `Bearer ${getToken()}` : null, // 携带token
    // Cookie: 'JSESSIONID=645B2157FF0AB5597E114D5C53474EE8'
  },
  // params: {
  //   // 即将于请求一起发送的 URL 参数，参数会自动 encode 后添加到 URL 中
  //   token: 'xxx', // 所有请求默认带上 token 参数
  // },
  errorHandler, // 默认错误处理
  mode: 'cors',
  credentials: 'include', // 默认请求是否带上cookie
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
  console.log('----url', url, options.requestType);
  url = baseurl + url;
  const token = localStorage.getItem('token'); //获取存储在本地的token
  const { headers = {} } = options || {};

  if (options.method?.toUpperCase() === 'GET') {
    options.params = options.data;
    console.log('----params', JSON.stringify(options));
  } else {
    //我们的请求参数和后端约定的是除了一些特殊情况使用formData 其他都使用json格式，因此默认是使用json格式
    options.requestType = options.requestType ? options.requestType : 'json';
  }

  if (token) {
    return {
      url,
      options: { ...options, headers },
    };
  }

  return {
    url,
    options: {
      ...options,
      // headers: {
      //   ...headers,
      //   Cookie: 'JSESSIONID=4B0B92A58BDB0AEB0CC89A79A4B6E515'
      //   // 'Access-Control-Allow-Origin': '*',
      //   // 'Content-Type': options.responseType == 'form' ? 'application/x-www-form-urlencoded;charset=UTF-8' : 'application/json'
      // }
    },
  };
});

// 添加拦截统一处理返回response
request.interceptors.response.use(async (response, options) => {
  console.log(
    '---response',
    response,
    options,
    response.headers.get('Set-Cookie'),
  );
  const data = await response.clone().json();
  if (data.code == 0) {
    // code只有0和1，代表成功和失败，subCode表示了具体的错误原因
    data.success = true;
    return data; //我们的项目是通过code来判断是否请求成功，具体情况看个人项目
  }
  return Promise.reject(data); //注意：需要reject出去才会在请求不成功或返回错误的code时调用errorHandler
});

export default request;
