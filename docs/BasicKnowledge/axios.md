# axios

> 资料：
>
> json-server地址：[typicode/json-server: Get a full fake REST API with zero coding in less than 30 seconds (seriously) (github.com)](https://github.com/typicode/json-server)
>
> axios地址：[axios/axios: Promise based HTTP client for the browser and node.js (github.com)](https://github.com/axios/axios)、[Axios (axios-http.com)](https://axios-http.com/)
>
> 文档：[起步 | Axios Docs (axios-http.com)](https://axios-http.com/zh/docs/intro)

## 基本使用

使用之前，确保打开了json-server

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>axios基本使用</title>
    <link
      crossorigin="anonymous"
      href="https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js"></script>
  </head>
  <body>
    <div class="container">
      <h2 class="page-header">基本使用</h2>
      <button class="btn btn-primary">发送GET请求</button>
      <button class="btn btn-warning">发送POST请求</button>
      <button class="btn btn-success">发送 PUT 请求</button>
      <button class="btn btn-danger">发送 DELETE 请求</button>
    </div>
    <script>
      //获取按钮
      const btns = document.querySelectorAll("button");

      //第一个
      btns[0].onclick = function () {
        //发送 AJAX 请求
        axios({
          //请求类型
          method: "GET",
          //URL 请求json-server里post的id为2的数据
          url: "http://localhost:3000/posts/2",
        }).then((response) => {
          console.log(response);
        });
      };

      //添加一篇新的文章
      btns[1].onclick = function () {
        //发送 AJAX 请求
        axios({
          //请求类型
          method: "POST",
          //URL
          url: "http://localhost:3000/posts",
          //设置请求体 添加数据存储在json-server
          data: {
            title: "今天天气不错, 还挺风和日丽的",
            author: "张三",
          },
        }).then((response) => {
          console.log(response);
        });
      };

      //更新数据
      btns[2].onclick = function () {
        //发送 AJAX 请求
        axios({
          //请求类型
          method: "PUT",
          //URL 通过id（这里为3来匹配数据）
          url: "http://localhost:3000/posts/3",
          //设置请求体
          data: {
            title: "今天天气不错, 还挺风和日丽的",
            author: "李四",
          },
        }).then((response) => {
          console.log(response);
        });
      };

      //删除数据
      btns[3].onclick = function () {
        //发送 AJAX 请求
        axios({
          //请求类型
          method: "delete",
          //URL
          url: "http://localhost:3000/posts/3",
        }).then((response) => {
          console.log(response);
        });
      };
    </script>
  </body>
</html>
```

## 其他方式发送请求

这里仅举例post方法,更多查看：[axios/axios: Promise based HTTP client for the browser and node.js (github.com)](https://github.com/axios/axios#features)里的Request method aliases部分

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>axios基本使用</title>
    <link
      crossorigin="anonymous"
      href="https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js"></script>
  </head>
  <body>
    <div class="container">
      <h2 class="page-header">基本使用</h2>
      <button class="btn btn-primary">发送GET请求</button>
      <button class="btn btn-warning">发送POST请求</button>
      <button class="btn btn-success">发送 PUT 请求</button>
      <button class="btn btn-danger">发送 DELETE 请求</button>
    </div>
    <script>
      //获取按钮
      const btns = document.querySelectorAll("button");

      // 发送get请求
      btns[0].onclick = function () {
        // axios()
        axios
          .request({
            method: "GET",
            url: "http://localhost:3000/comments",
          })
          .then((response) => {
            console.log(response);
          });
      };
      // 发送post请求
      btns[1].onclick = function () {
        // axios()
        axios
          .post("http://localhost:3000/comments", {
            body: "好消息",
            postId: 2,
          })
          .then((response) => {
            console.log(response);
          });
      };
    </script>
  </body>
</html>
```

## 请求配置

```js
{
  // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // 默认值

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据  y
  // 它只能用于 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 数组中最后一个函数必须返回一个字符串， 一个Buffer实例，ArrayBuffer，FormData，或 Stream
  // 你可以修改请求头。
  transformRequest: [function (data, headers) {
    // 对发送的 data 进行任意转换处理

    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对接收的 data 进行任意转换处理

    return data;
  }],

  // 自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是与请求一起发送的 URL 参数
  // 必须是一个简单对象或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `paramsSerializer`是可选方法，主要用于序列化`params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求体被发送的数据
  // 仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
  // 在没有设置 `transformRequest` 时，则必须是以下类型之一:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属: FormData, File, Blob
  // - Node 专属: Stream, Buffer
  data: {
    firstName: 'Fred'
  },
  
  // 发送请求体数据的可选语法
  // 请求方式 post
  // 只有 value 会被发送，key 则不会
  data: 'Country=Brasil&City=Belo Horizonte',

  // `timeout` 指定请求超时的毫秒数。
  // 如果请求时间超过 `timeout` 的值，则请求会被中断
  timeout: 1000, // 默认值是 `0` (永不超时)

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

  // `adapter` 允许自定义处理请求，这使测试更加容易。
  // 返回一个 promise 并提供一个有效的响应 （参见 lib/adapters/README.md）。
  adapter: function (config) {
    /* ... */
  },

  // `auth` HTTP Basic Auth
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` 表示浏览器将要响应的数据类型
  // 选项包括: 'arraybuffer', 'document', 'json', 'text', 'stream'
  // 浏览器专属：'blob'
  responseType: 'json', // 默认值

  // `responseEncoding` 表示用于解码响应的编码 (Node.js 专属)
  // 注意：忽略 `responseType` 的值为 'stream'，或者是客户端请求
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // 默认值

  // `xsrfCookieName` 是 xsrf token 的值，被用作 cookie 的名称
  xsrfCookieName: 'XSRF-TOKEN', // 默认值

  // `xsrfHeaderName` 是带有 xsrf token 值的http 请求头名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // 默认值

  // `onUploadProgress` 允许为上传处理进度事件
  // 浏览器专属
  onUploadProgress: function (progressEvent) {
    // 处理原生进度事件
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  // 浏览器专属
  onDownloadProgress: function (progressEvent) {
    // 处理原生进度事件
  },

  // `maxContentLength` 定义了node.js中允许的HTTP响应内容的最大字节数
  maxContentLength: 2000,

  // `maxBodyLength`（仅Node）定义允许的http请求内容的最大字节数
  maxBodyLength: 2000,

  // `validateStatus` 定义了对于给定的 HTTP状态码是 resolve 还是 reject promise。
  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，
  // 则promise 将会 resolved，否则是 rejected。
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认值
  },

  // `maxRedirects` 定义了在node.js中要遵循的最大重定向数。
  // 如果设置为0，则不会进行重定向
  maxRedirects: 5, // 默认值

  // `socketPath` 定义了在node.js中使用的UNIX套接字。
  // e.g. '/var/run/docker.sock' 发送请求到 docker 守护进程。
  // 只能指定 `socketPath` 或 `proxy` 。
  // 若都指定，这使用 `socketPath` 。
  socketPath: null, // default

  // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
  // and https requests, respectively, in node.js. This allows options to be added like
  // `keepAlive` that are not enabled by default.
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // `proxy` 定义了代理服务器的主机名，端口和协议。
  // 您可以使用常规的`http_proxy` 和 `https_proxy` 环境变量。
  // 使用 `false` 可以禁用代理功能，同时环境变量也会被忽略。
  // `auth`表示应使用HTTP Basic auth连接到代理，并且提供凭据。
  // 这将设置一个 `Proxy-Authorization` 请求头，它会覆盖 `headers` 中已存在的自定义 `Proxy-Authorization` 请求头。
  // 如果代理服务器使用 HTTPS，则必须设置 protocol 为`https`
  proxy: {
    protocol: 'https',
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // see https://axios-http.com/zh/docs/cancellation
  cancelToken: new CancelToken(function (cancel) {
  }),

  // `decompress` indicates whether or not the response body should be decompressed 
  // automatically. If set to `true` will also remove the 'content-encoding' header 
  // from the responses objects of all decompressed responses
  // - Node only (XHR cannot turn off decompression)
  decompress: true // 默认值

}
```

### 应用

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>axios基本使用</title>
    <link
      crossorigin="anonymous"
      href="https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js"></script>
  </head>
  <body>
    <div class="container">
      <h2 class="page-header">基本使用</h2>
      <button class="btn btn-primary">发送GET请求</button>
      <button class="btn btn-warning">发送POST请求</button>
      <button class="btn btn-success">发送 PUT 请求</button>
      <button class="btn btn-danger">发送 DELETE 请求</button>
    </div>
    <script>
      //获取按钮
      const btns = document.querySelectorAll("button");
      // 默认配置
      axios.defaults.method = "GET";
      axios.defaults.baseURL = "http://localhost:3000";
      axios.defaults.params = { id: 100 };
      axios.defaults.timeout = 3000;
      btns[0].onclick = function () {
        axios({
          url: "/posts",
        }).then((response) => {
          console.log(response);
        });
      };
    </script>
  </body>
</html>
```

## 创建实例化对象请求

```js
 //获取按钮
const btns = document.querySelectorAll("button");
// 创建实例对象
const duanzi = axios.create({
  baseURL: "http://api.apiopen.top",
  timeout: 2000,
});
// 多个服务器请求
const another = axios.create({
  baseURL: "http://b.com",
  timeout: 2000,
});
// 这里的duanzi和axios对象的功能几近是一样的
// duanzi({
//   url: "/getJoke",
// }).then((response) => {
//   console.log(response);
// });
duanzi.get("/getJoke").then((response) => {
  console.log(response.data);
});
```

## 拦截器

```js
//获取按钮
const btns = document.querySelectorAll("button");
//2.声明全局变量
let cancel = null;
//发送请求
btns[0].onclick = function () {
  //检测上一次的请求是否已经完成
  if (cancel !== null) {
    //取消上一次的请求 防抖思想
    cancel();
  }
  axios({
    method: "GET",
    url: "http://localhost:3000/posts",
    //1. 添加配置对象的属性
    cancelToken: new axios.CancelToken(function (c) {
      //3. 将 c 的值赋值给 cancel 相当于令牌
      cancel = c;
    }),
  }).then((response) => {
    console.log(response);
    //将 cancel 的值初始化
    cancel = null;
  });
};

//绑定第二个事件取消请求
btns[1].onclick = function () {
  cancel();
};
```

## ---------- 源码分析 ----------

## 源码结构

├── /dist/ # 项目输出目录 

├── /lib/ # 项目源码目录 

│ ├── /adapters/ # 定义请求的适配器 xhr、http 

│ │ ├── http.js # 实现 http 适配器(包装 http 包) 

│ │ └── xhr.js # 实现 xhr 适配器(包装 xhr 对象) 

│ ├── /cancel/ # 定义取消功能 

│ ├── /core/ # 一些核心功能

 │ │ ├── Axios.js # axios 的核心主类 

│ │ ├── dispatchRequest.js # 用来调用 http 请求适配器方法发送请求的函数

 │ │ ├── InterceptorManager.js # 拦截器的管理器 

│ │ └── settle.js # 根据 http 响应状态，改变 Promise 的状态 

│ ├── /helpers/ # 一些辅助方法 

│ ├── axios.js # 对外暴露接口 

│ ├── defaults.js # axios 的默认配置 

│ └── utils.js # 公用工具 

├── package.json # 项目信息 

├── index.d.ts # 配置 TypeScript 的声明文件 

└── index.js # 入口文件

## 对象创建过程模拟实现

```js
// 构造函数
function Axios(config) {
  this.defaults = config;
  this.intercepters = {
    request: {},
    response: {},
  };
}
// 原型添加相关的方法
Axios.prototype.request = function (config) {
  console.log("发送AJAX请求，请求类型为：" + config.method);
};
Axios.prototype.get = function (config) {
  // console.log("发送AJAX请求");
  return this.request({ method: "GET" });
};
Axios.prototype.post = function (config) {
  // console.log("发送AJAX请求");
  return this.request({ method: "POST" });
};

// 声明函数
function createInstance(config) {
  // 实例化一个对象
  let context = new Axios(config); // 可以使用context.get()、context.post()；但是不能当作函数使用 context();
  // 创建请求函数
  let instance = Axios.prototype.request.bind(context); // instance是一个函数了，并且可以 instance({}) 此时它不能使用instance.get()等方法
  // 将Axios.prototype 对象中的方法添加到instance函数对象中
  Object.keys(Axios.prototype).forEach((key) => {
    //   console.log(key);
    instance[key] = Axios.prototype[key].bind(context); // 这里使用bind将方法绑定在context上
  });
  // 为instance 函数对象添加属性 defalut 与 interceptors
  Object.keys(context).forEach((key) => {
    //   console.log(key);
    instance[key] = context[key];
  });
  // console.dir(instance);
  return instance;
}
let axios = createInstance();
// 发送请求
//   axios({ method: "POST" });
axios.get({});
axios.post({});
```

