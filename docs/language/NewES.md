# ES新特性

## ES6

### 兼容性

> [ECMAScript 6 compatibility table (kangax.github.io)](http://kangax.github.io/compat-table/es6/)

### let

语法：

```js
let 标识符 = 初始值, let 标识符 = 初始值......;
```

- 变量不能重复声明，var可以重复声明，但是重复声明会覆盖原有的值
- 块级作用域，在代码块里声明，只在代码块里有效
- 不存在变量提升，在声明之前使用该变量会显示未定义
- 不影响作用域链，使用该变量时会向上找该变量
- 可以不赋初始值

### const

语法：

```js
const 标识符 = 初始值；
```

- 一定要赋初始值
- 一般常量标识符用大写
- 初始值后续不能修改
- 块级作用域，在代码块里声明，只在代码块里有效
- 对于数组和对象的元素修改，不算作对常量的修改，不会报错

```js
const TEAM = ['UZI','MLXG','Letme'];
TEAM.push('xiaohu');
```

### 变量解构赋值

ES6允许按照一定模式从数组和对象中提取值，对变量进行赋值，这称为解构赋值

1. 数组的结构

```js
const F4 = ['小沈阳','刘能','赵四','宋小宝'];
let [xiao,liu,zhao,song] = F4;
console.log(xiao);
console.log(liu);
console.log(zhao);
console.log(song);  
// 会依次输出 小沈阳  刘能   赵四   宋小宝
```

2. 对象的结构

```js
const zhao ={
  name: '赵本山',
  age: 18,
  xiaopin: function(){
		console.log("我可以演小品");
  }
}
let {name,age,xiaopin} = zhao;
console.log(name);
console.log(age);
console.log(xiaopin);
// 会依次输出 
// 赵本山  
// 18   
// function(){
// 		console.log("我可以演小品");
// }
xiaopin();
// 可以直接调用，不用zhao.xiaopin();
```

### 模板字符串

语法：

```js
`字符串`
let str = `我也是个字符串`;
```

- 内容中可以使用换行符，' '和" "不能使用换行符
- 变量拼接

```js
let lover = '沈腾';
let out = `${lover}是我心目中最好的喜剧演员！`;
```

### 对象简化写法

ES6允许在大括号里面直接写入变量和函数，作为对象的属性和方法，这样书写更为简洁

```js
let name = 'es6';
let change = function(){
	console.log('666666');
}
const school = {
	name,
  change,
  improve(){   // 原来的：improve: function(){
			console.log('7777777');
  }
}
```

### 箭头函数

ES6允许使用箭头(=>)定义函数

```js
// 声明一个函数
let fn = funntion() {
	
}
或
let fn = () => {
  
}
```

- this是静态的，始终指向函数声明时所在作用域下的 this 的值

```js
function getName(){
  console.log(this.name);
}
let getName2 = () => {
	console.log(this.name);
}
window.name = '沈腾';
const school = {
  name: 'shenteng'
};
// 直接调用 结果一致，都为沈腾
getName();
getName2();

//call 方法调用
getName.call(school);      // 输出 shenteng
getName2.call(school);     // 输出 沈腾
```

- 不能作为构造实例化对象

```js
// 报错实例
let Person = (name, age) => {
  this.name = name;
  this.age = age;
}
let me = new Person('xiao',30);
```

- 不能使用 argument 变量

```js
// 报错实例
let fn () => {
  console.log(arguments);
}
fn(1,2,3);
```

- 箭头函数的简写
  - 省略小括号，当形参有且只有一个的时候
  - 省略花括号，当代码体只有一条语句的时候，此时return必须省略，语句执行结果就是函数的返回值

- 箭头函数适合与this无关的回调。如定时器，数组的方法回调；箭头函数不适合于this有关的回调。如事件回调，对象的方法，它会让this指向对象外的值

### 函数参数的默认值设置

ES6允许给函数参数赋初始值

1. 形参初始值，具有默认值的参数，一般位置要靠后（潜规则）

```js
function add(a,b,c=10){
	return a + b + c;
}
let result = add(1,2);  // c未传入值，默认为前面设定的初始值10
let result = add(1,2,3);   // c传入了值，则不会使用初始值10
```

2. 与解构赋值结合

```js
// 原来的写法
// function connect(options){
	// let host = option.host;
  // let ip = option.ip;
// }
function connect({host,ip,name='lbg'}){
	console.log(host);   
  console.log(ip);
  console.log(name);   // 如果没有值，则会使用默认值，如果有值，则不会使用默认值
}
connect({
  host: 'localhost',
  ip: '127.0.0.1'
})
```

### rest参数

ES6引入了rest参数，用于获取函数的实参，用来代替arguments

ES5获取实参的方式：

```js
function data(){
	console.log(arguments);
}
data('柏芝','阿娇','思慧');
```

rest方式：

```js
function data(a,b,...args){     // r参数必须要放在参数最后
  console.log(a);
  console.log(b);
	console.log(args);  // 参数是数组可以使用 filter some every map 等方法进行处理
}
data('柏芝','阿娇','思慧');
```

### 扩展运算符

... 能将数组转换为逗号分隔的参数序列

```js
const tf = ['赵三','李四','刘五'];
function look(){
	console.log(arguments);
}
look(...tf);    // 输出 ['赵三','李四','刘五']
```

- 注意和rest的区别

### 新的数据类型 symbol

​		表示独一无二的值，不能和其他数据（包括相同类型）进行运算，symbol定义的对象属性不能使用 for...in 循环遍历，但是可以使用Reflect.ownKeys来获取对象的所有键名。

```js
// 创建symbol  同属性值===会返回false
let s = symbol();
// symbol.for创建   同属性值===会返回true
let s2 = symbol.for();
// 创建方法
let youxi = {
	[symbol('say')]:function(){
    ...
  }
}
```

#### 向对象中添加方法

```js
// 这里以向game对象添加方法为例  可以安全地添加方法，不会影响原有的值（对象可能有name、age）
let method = {
  name: symbol(),
  age: symbol()
}
game[method.up] = function(){
}
game[method.down] = function(){
}
```

#### 内置值

​		除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。可以称这些方法为魔术方法，因为`它们会在特定的场景下自动执行。`

| 内置Symbol的值            | `调用时机`                                                   |
| ------------------------- | ------------------------------------------------------------ |
| Symbol.hasInstance        | 当其他对象使用 instanceof 运算符，判断是否为该对象的实例时，会调用这个方法 |
| Symbol.isConcatSpreadable | 对象的 Symbol.isConcatSpreadable 属性等于的是一个布尔值，表示该对象用于 Array.prototype.concat()时，是否可以展开。 |
| Symbol.species            | 创建衍生对象时，会使用该属性                                 |
| Symbol.match              | 当执行 str.match(myObject) 时，如果该属性存在，会调用它，返回该方法的返回值。 |
| Symbol.replace            | 当该对象被 str.replace(myObject)方法调用时，会返回该方法的返回值。 |
| Symbol.search             | 当该对象被 str. search (myObject)方法调用时，会返回该方法的返回值。 |
| Symbol.split              | 当该对象被 str. split (myObject)方法调用时，会返回该方法的返回值。 |
| Symbol.iterator           | 对象进行 for…of 循环时，会调用 Symbol.iterator 方法，返回该对象的默认遍历器 |
| Symbol.toPrimitive        | 该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。 |
| Symbol. toStringTag       | 在该对象上面调用 toString 方法时，返回该方法的返回值         |
| Symbol. unscopables       | 该对象指定了使用 with 关键字时，哪些属性会被 with环境排除。  |

​		特别的： Symbol内置值的使用，`都是作为某个对象类型的属性去使用`

> [详解Symbol（自定义值，内置值） - zygok - 博客园 (cnblogs.com)](https://www.cnblogs.com/zygll/p/14262826.html)

### 迭代器

​	一种接口，为各种不同的数据结构提供统一的访问机制，任何数据结构只要部署迭代器接口，就可以完成遍历操作

>  拓展：for...of用来遍历数组的值，for...in用来遍历数组的下标

### 生成器

​	ES6提供的一种异步编程(纯回调函数)解决方案，本质是一个特殊的函数

```js
function * gen(){
  console.log(111);
	yield '一致';          // 函数代码的分隔符
  console.log(222);   
  yield '直至';
  console.log(333); 
}
let iterator = gen();  
// 通过next方法来控制执行
iterator.next();    // 输出111
iterator.next();    // 输出222
iterator.next();    // 输出333
// for...of 会打印yield后面的' '中的内容
```

- 在当前yield使用next方法执行时，yield和上一个yield之间语句的执行结果会同时执行

> 回调地狱
>
> 多层回调，回调里套回调
>
> ```js
> setTimeout(() => {
>     console.log(111);
>     setTimeout(() =>{
>         console.log(222);
>         setTimeout(() =>{
>             console.log(333);
>         },3000)
>     },2000)
> },1000)
> ```
>
> 解决方法之一：生成器
>
> ```js
> function one() {
>     setTimeout(() => {
>       console.log(111);
>       iterator.next();
>     }, 1000);
>   }
>   function two() {
>     setTimeout(() => {
>       console.log(222);
>       iterator.next();
>     }, 2000);
>   }
>   function three() {
>     setTimeout(() => {
>       console.log(333);
>       iterator.next();
>     }, 3000);
>   }
>   function* gen() {
>     yield one();
>     yield two();
>     yield three();
>   }
>   let iterator = gen();
>   iterator.next();
> }
> ```

### promise

​		promise是ES6引入的异步编程的新解决方案，语法上promise是一个构造函数，用来封装异步操作并可以获取其成功或失败的结果。

![方法](C:\Users\lbg\Desktop\框架\笔记图片\屏幕截图 2022-03-12 091258.jpg)

```js
// 实例化promise对象
const p = new Promise(function (resolve, reject) => {
  setTimeout(function () {
    let data = "用户数据";
    resolve(data);
    let err = "数据读取失败";
    reject(err);
  }, 1000);
});
// 调用promise对象的then方法   成功的化调用value，失败调用reason
p.then(
  function (value) {
    console.log(value);
  },
  function (reason) {
      console.error(reason);
  }
);
```

- then方法的返回结果是promise，对象状态由回调函数的执行结果决定

  - 如果回调函数中返回的结果是 非promise类型 的属性，状态为成功，返回值为对象成功的值
  - 如果回调函数中返回的结果是promise类型的属性，若回调函数里使用resolve方法，则状态为成功，返回值为对象成功的值，如果回调函数里使用reject方法，则状态为失败，返回值为对象失败的值
  - 如果是throw new error方法或throw方法则也会是失败状态，并且返回对象失败的值

- 链式调用

  ```js
  p.then(value=>{},reason=>{}).then(value=>{},reason=>{});
  ```
#### catch方法

类似于then方法

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    // 设置p对象的状态为失败，并设置失败的值
    reject("出错啦！");
  }, 1000);
});

p.then(
  function () {},
  function (reason) {
    console.error(reason);
  }
);
// 类似于语法糖
p.catch(function (reason) {
  console.warn(reason);
});
```

### Set集合

#### 基本使用

```js
// 声明一个set
let s = new Set();
let s2 = new Set(["大事", "小事", "小事"]); // 会自动去重
// 元素个数
console.log(s2.size);
// 添加新元素
s2.add("好事儿");
// 删除元素
s2.delete("好事儿");
// 检测元素  返回布尔值
s2.has("好事儿");
// 清空集合
s2.clear();
// 遍历输出
for (let v of s2) {
    console.log(v);
}
```

#### 集合实现

```js
let arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];
// 数组去重
let result = [...new Set(arr)]; // [...]变成数组
// 交集
let arr2 = [4, 5, 6, 5, 6];
let result1 = [...new Set(arr)].filter((item) => {
  let s2 = new Set(arr2);
  if (s2.has(item)) {
    // 判断s2是否有相同的元素
    return true;
  } else {
    return false;
  }
});
// 简化写法
// let result1 = [...new Set(arr)].filter(item => new Set(arr2).has(item));
// 并集
let arr3 = [4, 5, 6, 5, 6];
let union = new Set([...arr, ...arr3]);
// 差集
let arr4 = [4, 5, 6, 5, 6];
let diff = [...new Set(arr)].filter((item) => !new Set(arr4).has(item));
```

### Map



#### 基本使用

```js
// 声明map
let m = new Map();
// 添加元素
m.set("name", "幽离");
m.set("change", function () {
  console.log("你好呀！");
});
let key = {
  school: "GPNU",
};
m.set(key, ["北京", "天津", "广州"]);
// 获取大小
console.log(m.size);
// 删除
m.delete("name");
// 获取
console.log(m.get("change"));
console.log(m.get(key));
// 清空
m.clear();
// 遍历
for (let v of m) {
  console.log(v); // 每个元素是数组 键值+值
}
```

### Class类



#### 初体验

```js
// ES5写法
// moblie phone
function Phone(brand, price) {
  // 初始化变量
  this.brand = brand;
  this.price = price;
}
// 添加方法
Phone.prototype.call = function () {
  console.log("我可以打电话！");
};
// 实例化对象
let xiaomi = new Phone("小米", 1999);
xiaomi.call();
console.log(xiaom1);
// ES6 class
class Phone {
  // 构造方法 命名不能修改 使用new会自动执行
  constructor(brand, price) {
    this.brand = brand;
    this.price = price;
  }
  // 方法必须使用该语法，不能使用ES5的对象完整形式
  call() {
      console.log("我可以打电话！");
  }
}
let oneplus = new Phone("1+",1999);
console.log(oneplus);
```

#### 静态成员

```js
function Phone() {}
Phone.name = "手机";
Phone.change = function () {
  console.log("我可以改变世界！");
};
let nokia = new Phone();
// 实例对象和函数对象的属性是不相通的，这里打印name属性会显示undefined

class phone {
  // 静态属性
  static name = "手机";
  static change = function () {
    console.log("我可以改变世界！");
  };
}
let nokia1 = new Phone();
// 这里打印name属性会输出 手机 ；这里的属性属于类，但是不属于实例化对象
```

#### 类继承

```js
// ES5写法
// 手机
function Phone(brand, price) {
  this.brand = brand;
  this.price = price;
}
// 父级的构造函数
Phone.prototype.call = function () {
  console.log("我可以打电话！");
};
// 子级构造函数
function SmartPhone(brand, price, color, size) {
  Phone.call(this, brand, price);
  this.color = color;
  this.size = size;
}
// 设置子级构造函数的原型
SmartPhone.prototype = new Phone();
// 校正，可以不加
SmartPhone.prototype.constructor = SmartPhone;
// 声明子类的方法
SmartPhone.prototype.photo = function () {
  console.log("我可以拍照！");
};
const chuizi = new SmartPhone("锤子", 2499, "黑色", "5.5inch");

// ES6写法
// 父类构造方法
class phone {
  constructor(brand, price) {
    this.brand = brand;
    this.price = price;
  }
  // 父类的成员属性
  call() {
    console.log("我可以打电话！");
  }
}
class SmartPhone extends phone {
  // 构造方法
  constructor(brand, price, color, size) {
    // 指向父类的constructor   和Phone.call(this, brand, price);是一样的
    super(brand, price);
    this.color = color;
    this.size = size;
  }
  photo() {
    console.log("我可以拍照！");
  }
}
const chuizi = new SmartPhone("锤子", 2499, "黑色", "5.5inch");
chuizi.call();
chuizi.photo();
```

#### 子类对父类的重写

```js
// 父类构造方法
class phone {
  constructor(brand, price) {
    this.brand = brand;
    this.price = price;
  }
  // 父类的成员属性
  call() {
    console.log("我可以打电话！");
  }
}
class SmartPhone extends phone {
  // 构造方法
  constructor(brand, price, color, size) {
    // 指向父类的constructor   和Phone.call(this, brand, price);是一样的
    super(brand, price);
    this.color = color;
    this.size = size;
  }
  photo() {
    console.log("我可以拍照！");
  }
  // 方法重写
  call() {
    console.log("我可以视频通话！");
  }
}
const chuizi = new SmartPhone("锤子", 2499, "黑色", "5.5inch");
chuizi.call();      // 这里输出不再是我可以打电话，而是我可以视频通话
chuizi.photo();
```

#### getter和setter设置

```js
class Phone {
  get price() {
    console.log("价格属性被读取了");
  }
  set price(newVal) {
    console.log("价格属性被修改了");
  }
}
// 实例化对象
let s = new Phone();
console.log(s.price); // 输出价格属性被读取了
s.price = "free"; // 输出价格属性被修改了
```

### ES6的数值扩展



### 对象方法的扩展

1. object.is 判断两个值是否完全相等
2. object.assign 对象的合并
3. object.setPrototypeOf  设置原型对象   object.getPrototypeOf   获取原型对象

```js
console.log(Object.is(120, 121)); // 和全等类似，不同点：NaN和NaN比较是相等的

const config1 = {
  host: "127.0.0.1",
  pore: 3306,
};
const config2 = {
  host: "10.0.0.1",
  pore: 3308,
};
Object.assign(config1, config2); // config2将config1覆盖（仅键值重复的情况下）

const school = {
  name: "幽离",
};
const city = {
  local: ["北京", "上海", "深圳"],
};
Object.setPrototypeOf(school, city);
Object.getPrototypeOf(school);
```

### 模块化



#### 语法

```1.js
// 分别暴露
export let school = '幽离';
export function teacher() {
    console.log("你好呀！");
}

// 统一暴露
let school = '幽离';
function teacher() {
    console.log("你好呀！");
}
export {school, teacher};

// 默认暴露
export default{
    school: '幽离',
    change: function(){
        console.log("你好呀！");
    }
}
```

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
    <script type="module">
      // 引入js模块内容 通用的
      import * as m1 from "./1.js";
      // 解构赋值形式  默认暴露必须起别名  如：defalut as m1
      import { school, teach } from "./1.js";
      import { school as youli, teach as you} from "./2.js";// 名字重复使用as来取别名避免冲突
      // 简便形式 只能针对默认暴露
      import m1 from "./1.js";
    </script>
  </body>
</html>
```

#### 其他引入方式

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
    <script src="./app.js" type="module"></script>
  </body>
</html>
```

```app.js
// 入口文件

// 模块导入
import * as m1 from "./1.js";
import * as m2 from "./2.js";
```

#### babel模块化代码转换

适用于部分浏览器不支持模块化的情况

>[Babel 中文网 · Babel - 下一代 JavaScript 语法的编译器 (babeljs.cn)](https://www.babeljs.cn/)



## ES7



```js
// indexof 返回的是数字
const mingzhu = ['西游记','水浒传','红楼梦','三国演义'];
console.log(mingzhu.includes('西游记'));    // true
console.log(mingzhu.includes('金瓶梅'));    // false

console.log(2 ** 10);   // 1024
```

## ES8

### async和await

这两种语法可以让异步代码像同步代码一样（简化异步函数写法）

#### async



```js
async function fn() {
  // 返回的结果的不是一个promise类型的对象，返回状态为成功
  return "幽离";
  // 抛出错误，返回状态为失败
  throw new Error("出错啦！");
  //返回的结果的不是一个promise类型的对象，根据里面调用的是resolve或者reject决定
  return new Promise((resolve, reject) => {
    resolve("成功数据");
  });
}
const result = fn();
console.log(result);
```

#### await



```js
// 创建一个promise对象
const p = new Promise((resolve, reject) => {
  resolve("成功的值");
  reject("失败啦！");
});
async function main() {
    // 成功的情况下：
  // let result = await p;
  // console.log(result);
  // 失败的情况下:
  try{
      let result = await p;
      console.log(result);
  }catch(e){
      console.log(e);
  }

  console.log(result);
}
main();
```

#### 组合实践





### 对象方法扩展



```js
// 声明对象
const school = {
  name: "幽离",
  city: ["广州", "韶关", "深圳"],
  Object: ["web", "微前端", "three.js"],
};
// 获取对象所有的键
console.log(Object.keys(school));
// 获取对象所有的值
console.log(Object.values(school));
// 获取所有的键和值
//   console.log(Object.entries(school));
// 创建map  获取所有的键和值
const m = new Map(Object.entries(school));
console.log(m); // 返回数组
console.log(m.get("city"));

// 获取对象属性的描述的对象
console.log(Object.getOwnPropertyDescriptors(school));
```

## ES9

### rest参数



```js
// 有更多的参数会存放到user中去
function connect({ host, port, ...user }) {
  console.log(host);
  console.log(port);
  console.log(user);
  // console.log(username);
  // console.log(password);
}
connect({
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "password",
});

const skillOne = {
  q: "天音波",
  w: "金钟罩",
}; // ...skillOne => q: "天音波",w: "金钟罩"
const skillTwo = {
  e: "天雷破",
  r: "猛龙摆尾",
}; // ...skillTwo => e: "天雷破",r: "猛龙摆尾"
// 组合
const liqing = [...skillOne, ...skillTwo];
console.log(liqing);
```

### 正则扩展

#### 命名捕获分组



```js
// 声明一个字符串
let str = '<a href="www.baidu.com">百度一下</a>';
// 提取url、标签文本
const reg = /<a href="(.*)">(.*)<\/a>/;
// 执行
const result = reg.exec(str);
console.log(result[1]); // 返回url
console.log(result[2]); // 返回标签文本
// 便捷方式
const reg1 = /<a href="(?<url>.*)">(?<text>.*)<\/a>/;
const result1 = reg1.exec(str); // 返回的属性中 group有属性名和属性值
console.log(result1.groups.url); // 返回url
console.log(result1.groups.text); // 返回标签文本
```

#### 反向断言



```js
// 声明一个字符串
let str = "JS5201314你知道吗555啦啦啦";
// 正向断言
const reg = /\d+(?=啦)/;
const result = reg.exec(str);
console.log(result); // 555
// 反向断言
const reg1 = /(?<=么)\d+/;
const result1 = reg1.exec(str);
console.log(result1);
```

#### dotAll模式




## ES10

### 对象扩展方法


```js
// Object.fromEntries 将二维数组或者map转换成对象
// 二维数组
const result = Object.fromEntries([
  ["name", "幽离"],
  ["targe", "前端,大前端，ai"],
]);
// Map 实际是一个对象
const m = new Map();
m.set("name", "hello world！");
const result1 = Object.fromEntries(m);
console.log(m);

//   Object.entries ES8用法  将对象转换为二维数组
const arr = Object.entries({
  name: "youli",
});
console.log(arr);
```

### 字符串方法扩展



```js
// trim
let str = "    iloveyou     ";
console.log(str); //     iloveyou          ;
console.log(str.trimStart()); //iloveyou   ；清除左边的空白字符
console.log(str.trimEnd()); //     iloveyou；清除右边的空白字符
```

### 数组方法扩展



```js
// 将多维数组转化为低位数组
const arr = [1, 2, 3, 4, [5, 6]];
console.log(arr.flat()); // 输出 [1,2,3,4,5,6]
const arr1 = [1, 2, 3, 4, [5, 6, [7, 8, 9]]];
console.log(arr1.flat(2)); // 参数2为深度，默认为1 输出 [1,2,3,4,5,6,7,8,9]

// flatMap
const arr2 = [1, 2, 3, 4];
const result = arr2.flatMap((item) => [item * 10]); // map将数组变为二维数组，使用flatMap不会变成二维数组
console.log(result)
```

### Symbol.prototype.description

​		获取Symbol的描述字符串；

```js
// 创建symbol
let s = Symbol('幽离');
console.log(s.description);    // 输出 幽离
```

## ES11

### 私有属性

​		私有属性外部不可直接访问；

```js
class Person {
  // 共有属性
  name;
  // 私有属性
  #age;
  #weight;
  // 构造方法
  constructor(name, age, weight) {
    this.name = name;
    this.#age = age;
    this.#weight = weight;
  }
  // 内部调用
  intro() {
    console.log(girl.name);
    console.log(girl.#age);
    console.log(girl.#weight);
  }
}
// 实例化
const girl = new Person("小红", 18, "45kg");
console.log(girl); // 能正常输出name, age, weight属性
//   console.log(girl.#age);    不能正常执行,只能在类中展示
girl.intro(); // 能正常输出name, age, weight属性
```

### Promise.allSettled

​		获取多个promise执行的结果集；

```js
// 声明两个promise
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("商品数据 - 1");
  }, 1000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("商品数据 - 2");
  }, 1000);
});
// 调用 allsettled 方法
const result = Promise.allSettled([p1, p2]); // 结果集输出到返回值里面，不一定要全部成功
const result1 = Promise.all([p1, p2]); // 全部成功才会返回成功状态和结果集
console.log(result);
console.log(result1);
```

### String.prototype.matchAll

​		用来得到正则批量匹配的结果；



### 可选链操作符

​		如果存在则往下走，省略对对象是否传入的层层判断；

```js
function main(config) {
  // const dbHost = config && config.db && config.db.host; // =右边：判断数据是否传入    若下面的main没定义则会报错
  const dbHost = config?.db?.host; // 判断数据是否传入  若下面的main没定义则会输出undefined
  console.log(dbHost);
}

main({
  db: {
    host: "127.0.0.1",
    user: "root",
  },
  cache: {
    host: "192.168.1.200",
    user: "admin",
  },
});
```

### 动态import

​		按需加载模块,类似于懒加载



### BigInt

​		更大的整数类型

```js
let n = 512n;
// 普通int转换为大整数
let n2 = 123;
console.log(BigInt(n2));
```

### 绝对全局对象

​		始终指向全局window；

```js
console.log(globalThis);
```
