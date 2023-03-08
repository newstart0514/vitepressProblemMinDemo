# :cupid:Promise

## 准备
### 函数对象与实例对象
1. 函数对象: 将函数作为对象使用时, 简称为函数对象
2. 实例对象: new 函数产生的对象, 简称为对象

### 回调函数的分类
1. 同步回调: 
    理解: 立即执行, 完全执行完了才结束, 不会放入回调队列中
    例子: 数组遍历相关的回调函数 / Promise的excutor函数
2. 异步回调: 
    理解: 不会立即执行, 会放入回调队列中将来执行
    例子: 定时器回调 / ajax回调 / Promise的成功|失败的回调

### JS中的Error
1. 错误的类型
    Error: 所有错误的父类型
    ReferenceError: 引用的变量不存在
    TypeError: 数据类型不正确的错误
    RangeError: 数据值不在其所允许的范围内
    SyntaxError: 语法错误
2. 错误处理
    捕获错误: try ... catch
    抛出错误: throw error
3. 错误对象
    message属性: 错误相关信息
    stack属性: 函数调用栈记录信息

## 理解

Promise 是 JS 中进行异步编程的新的解决方案(旧的是谁?单纯的回调函数)

具体表达: 

(1) 从语法上来说: Promise 是一个构造函数

 (2) 从功能上来说: promise 对象用来封装一个异步操作并可以获取其结果

> 异步编程：fs文件操作、数据库操作、AJAX、定时器

## 为什么要用promise？

- 指定回调函数的方式更加灵活
- 支持`链式调用`, 可以解决回调地狱问题
  - 解决方案：promise 链式调用 
  - 终极解决方案： async/await

## 初体验

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div class="container">
      <h2 class="page-header">promise 初体验</h2>
      <button class="btn btn-primary" id="btn">点击抽奖</button>
    </div>
    <script>
      // 生成随机数
      function rand(m, n) {
        return Math.ceil(Math.random() * (n - m + 1)) + m - 1;
      }
      // 获取元素对象
      const btn = document.querySelector("#btn");
      // 绑定单击事件
      btn.addEventListener("click", function () {
        // 定时器
        // setTimeout(() => {
        //   // 30%中奖概率
        //   // 获取从1~100的一个随机数
        //   let n = rand(1, 100);
        //   // 判断
        //   if (n <= 30) {
        //     alert("恭喜您获得宝马5RMB优惠券!您的中奖数字为：");
        //   } else {
        //     alert("再接再厉!您的号码为：");
        //   }
        // }, 1000);

        // promise形式实现 必须要接受的参数要是函数类型的值
        // resolve 解决  函数类型的数据
        // reject 拒绝  函数类型的数据
        const p = new Promise((resolve, reject) => {
          setTimeout(() => {
            // 30%中奖概率
            // 获取从1~100的一个随机数
            let n = rand(1, 100);
            // 判断
            if (n <= 30) {
              resolve(n); // 将promise对象的状态设置为成功
            } else {
              reject(n); // 将promise对象的状态设置为失败
            }
          }, 1000);
        });

        // 调用then方法   要接受的参数都是函数类型的值
        // value、reason在这里是默认的规则；可以替换为其他名字
        p.then(
          (value) => {
            // 成功执行的函数
            alert("恭喜您获得宝马5RMB优惠券!您的中奖数字为：" + value);
          },
          (reason) => {
            // 失败执行的函数
            alert("再接再厉!您的号码为：" + reason);
          }
        );
      });
    </script>
  </body>
</html>
```

### 封装fs读取文件操作

```js
/**
 * 封装一个函数 mineReadFile 读取文件内容
 * 参数：path 文件路径
 * 回调：promise 对象
 */
function mineReadFile(path){
    return new Promise((resolve, reject) => {
        // 读取文件
        require('fs').readFile(path, (err, data) => {
            // 判断
            if(err) reject();
            // 成功
            resolve();
        })
    })
}

mineReadFile('./resource/fs.txt')
.then(value=>{
    // 输出文件内容
    console.log(value.toString());
}, reason=>{
    console.log(reason);
});
```

### promisify

将代码进行promise风格转化

```js
/**
 * until.promisify 方法
 */
// 引入util模块
const util = require('util');
// 引入fs模块
const fs = require('fs');
// 返回一个新的函数
let mineReadFile = util.promisify(fs.readFile);

mineReadFile('./resource/main.txt').then(value=>{
    console.log(value.toString());
});
```

### ajax封装

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>promise封装ajax操作</title>
  </head>
  <body>
    <script>
      /**
       * 封装一个函数 sendAJAX 发送 GET AJAX请求
       * 参数 url
       * 返回结果 promise对象
       */
      function sendAJAX(url) {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = "json";
          xhr.open("GET", url);
          xhr.send();
          // 处理结果
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              // 状态码判断
              if (xhr.status >= 200 && xhr.status < 300) {
                // 成功的结果
                resolve(xhr.response);
              } else {
                // 失败的结果
                reject(xhr.status);
              }
            }
          };
        });
      }

      sendAJAX("https://api.apiopen.top/getJoke").then(
        (value) => {
          console.log(value);
        },
        (reason) => {
          console.log(reason);
        }
      );
    </script>
  </body>
</html>
```

## Promise状态

实例对象中的一个属性 [PromiseState]

* pending  未决定的
* resolved / fullfilled  成功
* rejected  失败

状态改变只有两种：pending   -->   resolved          pending   -->   rejected；并且只能改变一次,无论成功或者失败都会有一个结果数据；成功数据一般为value，失败的结果数据一般为reason

## Promise对象的值

实例对象中的一个属性 [PromiseResult]

存储对象成功/失败的结果，可以在以下函数中进行值修改：

- resolve
- reject

## 如何使用Promise？

### API

1. Promise 构造函数: Promise (excutor) {} 

   (1) excutor 函数: 执行器 (resolve, reject) => {} 

   (2) resolve 函数: 内部定义成功时我们调用的函数 value => {} 

   (3) reject 函数: 内部定义失败时我们调用的函数 reason => {} 

   说明: excutor 会在 Promise 内部立即同步回调,异步操作在执行器中执行

2. Promise.prototype.then 方法: (onResolved, onRejected) => {}

   (1) onResolved 函数: 成功的回调函数 (value) => {} 

   (2) onRejected 函数: 失败的回调函数 (reason) => {} 

   说明: 指定用于得到成功 value 的成功回调和用于得到失败 reason 的失败回调 返回一个新的 promise 对象

3.  Promise.prototype.catch方法: (onRejected) => {}
     onRejected函数: 失败的回调函数 (reason) => {}
    说明: then()的语法糖, 相当于: then(undefined, onRejected)

4. Promise.resolve方法: (value) => {}
   value: 成功的数据或promise对象
   说明: 返回一个成功/失败的promise对象

5. Promise.reject方法: (reason) => {}
   reason: 失败的原因
   说明: 返回一个失败的promise对象

6. Promise.all方法: (promises) => {}
   promises: 包含n个promise的数组
   说明: 返回一个新的promise, 只有所有的promise都成功才成功, 只要有一个失败了就直接失败

7. Promise.race方法: (promises) => {}
   promises: 包含n个promise的数组
   说明: 返回一个新的promise, 第一个完成的promise的结果状态就是最终的结果状态

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>06_Promise的API</title>
  </head>
  <body>
    <script>
      let p = new Promise((reslove, reject) => {
        // 同步调用
        // console.log(111);
        // 修改 promise 对象的状态
        reject("error");
      });
      //   console.log(222);
      p.catch((reason) => {
        console.log(reason);
      });
      //
      let p1 = Promise.resolve(521);
      // 如果传入的参数为非promise类型的对象，则返回的结果为成功promise对象
      // 如果传入的参数为promise类型的对象，则参数的结果决定了 resolve 的结果
      let p2 = Promise.resolve(
        new Promise((reslove, reject) => {
          //   reslove("ok");
          reject("Error");
        })
      );
      // 对打印p2时出现：Uncaught (in promise) Error 的解决方法  失败promise没有对应的回调函数
      p2.catch((reason) => {
        console.log(reason);
      });
      // 无论传入的参数是否为任何类型，返回的状态都是失败的状态，失败的值为传入的值
      let p3 = Promise.reject(521);
      // all方法：若全部为成功的promise对象，则会返回成功的promise对象（属性值为全部成功对象的属性值）；
      // 如果有一个失败则会返回该失败的对象（属性值为失败对象的属性值），类似于逻辑与的功能
      let p4 = new Promise((resolve, reject) => {
        resolve("ok");
      });
      let p5 = new Promise.resolve("Success");
      let p6 = new Promise.resolve("oh yeah");
      const result = Promise.all([p4, p5, p6]);
      // race方法：返回第一个成功promise对象的属性值
      let p7 = new Promise((resolve, reject) => {
        resolve("ok");
      });
      let p8 = new Promise.resolve("Success");
      let p9 = new Promise.resolve("oh yeah");
      const result1 = Promise.race([p7, p8, p9]);

      console.log(p1);
      console.log(p2);
      console.log(p3);
      console.log(result);
      console.log(result1);
      /* 
    1. Promise构造函数: Promise (excutor) {}
        excutor函数: 同步执行  (resolve, reject) => {}
        resolve函数: 内部定义成功时我们调用的函数 value => {}
        reject函数: 内部定义失败时我们调用的函数 reason => {}
        说明: excutor会在Promise内部立即同步回调,异步操作在执行器中执行

    2. Promise.prototype.then方法: (onResolved, onRejected) => {}
        onResolved函数: 成功的回调函数  (value) => {}
        onRejected函数: 失败的回调函数 (reason) => {}
        说明: 指定用于得到成功value的成功回调和用于得到失败reason的失败回调
              返回一个新的promise对象

    3. Promise.prototype.catch方法: (onRejected) => {}
        onRejected函数: 失败的回调函数 (reason) => {}
        说明: then()的语法糖, 相当于: then(undefined, onRejected)

    4. Promise.resolve方法: (value) => {}
        value: 成功的数据或promise对象
        说明: 返回一个成功/失败的promise对象

    5. Promise.reject方法: (reason) => {}
        reason: 失败的原因
        说明: 返回一个失败的promise对象

    6. Promise.all方法: (promises) => {}
        promises: 包含n个promise的数组
        说明: 返回一个新的promise, 只有所有的promise都成功才成功, 只要有一个失败了就直接失败
    7. Promise.race方法: (promises) => {}
        promises: 包含n个promise的数组
        说明: 返回一个新的promise, 第一个完成的promise的结果状态就是最终的结果状态
  */
    </script>
  </body>
</html>
```

### 几个关键问题

1. 如何改变 promise 的状态? 

   (1) resolve(value): 如果当前是 pendding 就会变为 resolved 

   (2) reject(reason): 如果当前是 pendding 就会变为 rejected 

   (3) 抛出异常: 如果当前是 pendding 就会变为 rejected 

2. 一个 promise 指定多个成功/失败回调函数, 都会调用吗? 

   当 promise 改变为对应状态时都会调用  

3. 改变 promise 状态和指定回调函数谁先谁后? 

   (1) 都有可能, 正常情况下是先指定回调再改变状态, 但也可以先改状态再指定回调

   (2) 如何先改状态再指定回调? 

   1. 在执行器中直接调用 resolve()/reject() 
   2. 延迟更长时间才调用 then()

   (3) 什么时候才能得到数据?

   1. 如果先指定的回调, 那当状态发生改变时, 回调函数就会调用, 得到数据 
   2. 如果先改变的状态, 那当指定回调时, 回调函数就会调用, 得到数据 

4. promise.then()返回的新 promise 的结果状态由什么决定? 

   (1) 简单表达: 由 then()指定的回调函数执行的结果决定

   (2) 详细表达: 

   1. 如果抛出异常, 新 promise 变为 rejected, reason 为抛出的异常
   2. 如果返回的是非 promise 的任意值, 新 promise 变为 resolved, value 为返回的值
   3. 如果返回的是另一个新 promise, 此 promise 的结果就会成为新 promise 的结果

5.  promise 如何串连多个操作任务?

    (1) promise 的 then()返回一个新的 promise, 可以开成 then()的链式调用

    (2) 通过 then 的链式调用串连多个同步/异步任务

6. promise 异常传透? 

   (1) 当使用 promise 的 then 链式调用时, 可以在最后指定失败的回调, 

   (2) 前面任何操作出了异常, 都会传到最后失败的回调中处理 

7. 中断 promise 链? 

   (1) 当使用 promise 的 then 链式调用时, 在中间中断, 不再调用后面的回调函数 

   (2) 办法: 在回调函数中返回一个 pendding 状态的 promise 对象

1、2：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>promise的几个关键问题</title>
  </head>
  <body>
    <script>
      /* 
    1.	如何改变promise的状态?
      (1)resolve(value): 如果当前是pendding就会变为resolved
      (2)reject(reason): 如果当前是pendding就会变为rejected
      (3)抛出异常: 如果当前是pendding就会变为rejected
    
    2.	一个promise指定多个成功/失败回调函数, 都会调用吗?
      当promise改变为对应状态时都会调用
    */
      let p = new Promise((resolve, reject) => {
        // 调用resolve函数
        resolve("ok"); // pending   -->   resolved
        // 调用reject函数
        // reject("Error"); // pending   -->   rejected
        // throw "出问题了！";
      });
      // 指定回调 - 1
      p.then((value) => {
        console.log(value);
      });
      // 指定回调 - 2
      p.then((value) => {
        alert(value);
      });

      console.log(p);
    </script>
  </body>
</html>
```

3：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>promise的几个关键问题</title>
  </head>
  <body>
    <script>
      /* 
    3.改变promise状态和指定回调函数谁先谁后?
      (1)都有可能, 正常情况下是先指定回调再改变状态, 但也可以先改状态再指定回调
      (2)如何先改状态再指定回调?
        ①在执行器中直接调用resolve()/reject()
        ②延迟更长时间才调用then()
      (3)什么时候才能得到数据?
        ①如果先指定的回调, 那当状态发生改变时, 回调函数就会调用, 得到数据
        ②如果先改变的状态, 那当指定回调时, 回调函数就会调用, 得到数据
    */
      let p = new Promise((resolve, reject) => {
        // resolve('ok');
        setTimeout(() => {
          resolve("ok");
        }, 1000);
      });
      p.then(
        (value) => {
          console.log(value);
        },
        (reason) => {}
      );
    </script>
  </body>
</html>
```

4：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>promise的几个关键问题</title>
  </head>
  <body>
    <script>
      /* 
    4.	promise.then()返回的新promise的结果状态由什么决定?
      (1)简单表达: 由then()指定的回调函数执行的结果决定
      (2)详细表达:
          ①如果抛出异常, 新promise变为rejected, reason为抛出的异常
          ②如果返回的是非promise的任意值, 新promise变为resolved, value为返回的值
          ③如果返回的是另一个新promise, 此promise的结果就会成为新promise的结果 
    */
      let p = new Promise((resolve, reject) => {
        resolve("ok");
      });
      // 执行then方法
      let result = p.then(
        (value) => {
          // console.log(value);
          // 抛出错误  状态为失败
          // throw "出了问题！";
          // 返回结果是一个非promise类型的对象 状态为成功
          // return 123;
          // 返回的结果是一个promise类型对象  状态取决于promise对象的状态
          return new Promise((resolve, reject) => {
            // resolve("success");
            reject("error");
          });
        },
        (reason) => {
          console.log(reason);
        }
      );
      console.log(result);
    </script>
  </body>
</html>
```

5：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>promise的几个关键问题</title>
  </head>
  <body>
    <script>
      /* 
    5.promise如何串连多个操作任务?
      (1)promise的then()返回一个新的promise, 可以开成then()的链式调用
      (2)通过then的链式调用串连多个同步/异步任务
    */
      let p = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("ok");
        }, 1000);
      });
      p.then((value) => {
        return new Promise((resolve, reject) => {
          resolve("success");
        });
      })
        .then((value) => {
          console.log(value);
        })
        .then((value) => {
          // 因为上一个then没有返回值，所以这里打印是undefinded
          console.log(value);
        });
    </script>
  </body>
</html>
```

6、7：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>promise的几个关键问题</title>
  </head>
  <body>
    <script>
      /* 
    6.promise异常传透?
      (1)当使用promise的then链式调用时, 可以在最后指定失败的回调, 
      (2)前面任何操作出了异常, 都会传到最后失败的回调中处理
    7.中断promise链?
      (1)当使用promise的then链式调用时, 在中间中断, 不再调用后面的回调函数
      (2)办法: 在回调函数中返回一个pendding状态的promise对象
    */
      let p = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("ok");
          // reject("Error!");
        }, 1000);
      });
      p.then((value) => {
        console.log(111);
        // throw "出错啦！";
        // 中断promise链 有且只有一种方式
        // return new Promise(() => {});
      })
        .then((value) => {
          console.log(222);
        })
        .then((value) => {
          console.log(333);
        })
        .catch((reason) => {
          console.warn(reason);
        });
    </script>
  </body>
</html>
```

## 自定义（手写）Promise

> 资料：
>
> [try...catch - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch)
>
> [this - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)

### 整体框架

```js
/**
 * 自定义Promise函数模块：IIFE
 */
(function (window) {
  const PENDING = 'pending'
  const RESOLVED = 'fulfilled'
  const REJECTED = 'rejected'

  /**
   * Promise构造函数
   * @param {function} executor 执行器函数（同步执行）(resolve, reject) => {}
   */
  function Promise(executor) {
  
  }

  /**
   * Promise原型对象then方法 
   * 指定成功和失败的回调函数
   * @param {function} onResolved 成功的回调函数(value) => {}
   * @param {function} onRejected 失败的回调函数(reason) => {}
   * @returns 一个新的promise对象结果由onResolved/onRejected执行的结果决定
   */
  Promise.prototype.then = function (onResolved, onRejected) {
    
  }

  /**
   * Promise原型对象catch方法
   * 指定失败的回调函数
   * @param {function} onRejected 失败的回调函数(reason) => {}
   * @returns 一个新的promise对象
   */
  Promise.prototype.catch = function (onRejected) {
    
  }

  /**
   * Promise函数对象resolve方法
   * @param {*} value 成功的值
   * @returns 一个成功/失败的promise
   */
   Promise.resolve = function (value) {

  }

  /**
   * Promise函数对象reject方法
   * @param {*} resaon 失败的原因
   * @returns 一个失败的promise
   */
  Promise.reject = function (resaon) {

  }

  /**
   * Promise函数对象all方法
   * @param {Array<Promise>} promises 
   * @returns 一个promise，只有当所有promise都成功时才成功，否则只要有一个失败就失败
   */
  Promise.all = function (promises) {

  }

  /**
   *Promise函数对象race方法
   * @param {Array<Promise>} promises 
   * @returns 返回 一个promise，其结果由第一个完成的promise决定
   */
  Promise.race = function (promises) {

  }


  // 向外暴露Promise函数
  window.Promise = Promise
})(window)
```

### 手写(有bug)

```js
class Promise{
    // 构造方法
    constructor(executor){
        // 声明构造函数
        function Promise(executor){
            // 保存实例对象的this值
            const self = this;     
            // 添加属性并设置属性的初始值
            self.PromiseState = 'pending';
            self.PromiseResult = null;
            // 声明属性 创建一个属性数组来存储多个异步的任务
            self.callbacks = [];
            // 这里的 self 常量名可以使用self、_this、that（潜规则），也可以使用其他
            // resolve 函数
            function resolve(data){
                // 判断状态
                if(self.PromiseState !== 'pending') return
                // 修改状态(promiseState) 设置结果值(promiseResult)
                self.PromiseState = 'fullfilled';
                self.PromiseResult = data;
                // 调用成功的回调函数（异步） 
                // 使用遍历将callbacks里面的所有属性调出来作为参数执行方法
                if(self.callbacks.length > 0) {
                    setTimeout(() => {
                        self.callbacks.forEach(item => {
                            item.onResolved(data);
                        });
                    }, 0)
                }
                // if(self.callbacks.onResolved){
                //     self.callbacks.onResolved(data);
                // }
            };
            // reject函数
            function reject(data){
                // 判断状态
                if(self.PromiseState !== 'pending') return
                // 修改状态(promiseState) 设置结果值(promiseResult)
                self.PromiseState = 'rejected';
                self.PromiseResult = data;
                // 调用成功的回调函数（异步） 
                // 使用遍历将callbacks里面的所有属性调出来作为参数执行方法
                // 如果有待执行的callback函数，立即【异步】执行回调函数onRejected
                if(self.callbacks.length > 0) {
                    setTimeout(() => {
                        self.callbacks.forEach(item => {
                            item.onRejected(data);
                        })
                    }, 0);
                }
                
                // if(self.callbacks.onResolved){
                //     self.callbacks.onResolved(data);
                // }
            };
            // 同步调用 执行器函数
            try {
                executor(resolve, reject);
            } catch (e) {
                // 修改 promise 对象状态为 失败
                reject(e);
            }
        }
    }
    // then 方法封装 错误，无法实现！
    then(onResolved,onRejected){
        const self = this;
        // 判断回调函数参数
        if(typeof onRejected !== 'function'){
            onRejected = reason => {
                throw reason;
            }
        }
        if(typeof onResolved !== 'function'){
            onResolved = value => value;
            // 这是简写形式，相当于：value => {return value};
        }
        return new Promise((resolve, reject) => {
            // 封装函数
            function callback(type){
                try {
                    // 获取回调函数的执行结果
                    const result = type(self.PromiseResult);
                    // 判断 result 是否是 promise 类型的对象
                    if(result instanceof Promise){
                        result.then(v => {
                            resolve(v);
                        }, r => {
                            reject(r);
                        })
                    }else{
                        // 结果对象为【成功】
                        resolve(result);
                    };
                } catch (e) {
                    reject(e);
                }
            }
            // 调用回调函数
            if(self.PromiseState === 'fulfilled'){
                // 加定时器来实现异步
                setTimeout(()=>{
                    callback(onResolved);
                })
            };
            if(self.PromiseState === 'rejected'){
                // 加定时器来实现异步
                setTimeout(()=>{
                    callback(onRejected);
                });
            };
            // 判断pending状态
            if(self.PromiseState === 'pending'){
                // 保存回调函数
                self.callbacks.push({
                    // onResolved: onResolved,
                    // onRejected: onRejected
                        onResolved: function(){
                            callback(onResolved);
                        },
                        onRejected: function(){
                            callback(onRejected);
                        },
                });
            };
        })
    }
    // catch 方法
    catch(onRejected){
        return this.then(undefined, onRejected);
    }
    //resolve方法
    static resolve(value){
        // 返回promise对象
        return new Promise((resolve, reject) => {
            if(value instanceof Promise){
                value.then(v=>{
                    resolve(v);
                }, r=>{
                    reject(r);
                })
            }else{
                // 状态设置为成功
                resolve(value);
            }
        })
    }
    // 添加 reject 方法
    static reject(reason){
        return new Promise((resolve, reject)=>{
            reject(reason);
        })
    }
    // 添加all方法
    static all(promises){
        // 声明变量
        let count = 0;
        let arr = [];
        // 返回结果为promise对象
        return new Promise((resolve,reject) => {
            // 遍历
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(v => {
                    // 得知对象的状态是成功 每个promise对象都成功
                    count++;
                    // 将当前promise对象成功的结果存入数组
                    arr[i] = v;
                    // 判断
                    if(count === promises.length){
                        // 修改状态
                        resolve(arr);
                    }
                },r => {
                    reject(r);
                });
            }
        })
    }
    // 添加race方法
    static race(promises){
        return new Promise((resolve, reject)=> {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(v => {
                    // 修改对象的状态为成功
                    resolve(v);
                },r=>{
                    // 修改对象的状态为失败
                    reject(r);
                });
            }
        })
    }
}
```

## async

1. 函数的返回值为 promise 对象 
2. promise 对象的结果由 async 函数执行的返回值决定

```js
// 和then类似
async function main() {
  // 1.如果返回值是一个非promise类型的数据,状态为成功，结果值就是return的值
  // return 521;
  // 2.如果返回是一个promise类型的数据，状态由对象的状态决定，结果值是函数里参数
  // return new Promise((resolve, reject) => {
  //   // resolve("ok");
  //   reject(error)
  // });
  // 3.抛出异常 状态为失败，结果为抛出异常的值
  throw "oh!!!";
}
let result = main();
console.log(result);
```

## await

1. await 右侧的表达式一般为 promise 对象, 但也可以是其它的值
2. 如果表达式是 promise 对象, await 返回的是 promise 成功的值
3. 如果表达式是其它值, 直接将此值作为 await 的返回值

### 注意

1. await 必须写在 async 函数中, 但 async 函数中可以没有 await 
2. 如果 await 的 promise 失败了, 就会抛出异常, 需要通过 try...catch 捕获处理

```js
async function main() {
  let p = new Promise((resolve, reject) => {
    // resolve("ok");
    reject("error");
  });
  // 1.右侧为promise的情况
  // let res = await p;
  // 2.右侧为其它类型的数据
  let res2 = await 20;
  // 3.1情况将resolve改为reject情况
  try {
    let res3 = await p;
  } catch (e) {
    console.log(e);
  }
  console.log(res);
  console.log(res2);
}
main();
```

### async和await结合实践

```js
/**
 * 读取，resource目录下的1.html,2.html,3.html文件的内容
 */
const fs = require('fs');
const util = require('util');
// util的一个方法，将api转换为promise对象
const mineReadFile = util.promisify(fs.readFile);
// 回调函数的方式
// fs.readFile('./resource/1.html', (err, data1) => {
//     if(err) throw err;
//     fs.readFile('./resource/2.html', (err, data2) => {
//         if(err) throw err;
//         fs.readFile('./resource/3.html', (err, data3) => {
//             if(err) throw err;
//         });
//     });
// });
// async await 方式
async function main(){
    try {
        // 读取文件的内容
        let data1 = await mineReadFile('./resource/1.html');
        let data2 = await mineReadFile('./resource/2.html');
        let data3 = await mineReadFile('./resource/3.html');
        console.log(data1 + data2 + data3);
    } catch (e) {
        console.log(e);
    }
    
}
main();
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>11_async与await</title>
  </head>
  <body>
    <button id="btn">点击获取段子</button>
    <script>
      // axios
      function sendAJAX(url) {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = "json";
          xhr.open("GET", url);
          xhr.send();
          // 处理结果
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              // 状态码判断
              if (xhr.status >= 200 && xhr.status < 300) {
                // 成功的结果
                resolve(xhr.response);
              } else {
                // 失败的结果
                reject(xhr.status);
              }
            }
          };
        });
      }
      let btn = document.querySelector("#btn");
      btn.addEventListener("click", async function () {
        // 获取段子信息
        let duanzi = await await sendAJAX("https://api.apiopen.top/getJoke");
        console.log(duanzi);
      });
    </script>
  </body>
</html>
```

> 文档资料:[Promise - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
