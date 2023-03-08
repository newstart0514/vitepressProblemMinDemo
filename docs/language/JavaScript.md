# :laughing:JavaScript

## 引入JavaScript

1. 内部标签

```html
<script>
  js代码
</script>
或
<script type="text/javascript">    不定义type的话，默认为JavaScript
	js代码
</script>
```

2. 外部引入（推荐这个）

```html
<script src="相对路径"></script>
```

## 基本语法入门（快速）

### 数据类型

1. number

​	不区分小数和整数

```css
123		//整数
123.1		//浮点数
1.123e3		//科学计数法
-99		//负数
NaN		//不是一个数
Infinity		//无限大
```

2. 字符串、布尔值、浮点数......

​		与Java一致

3. null和undefind
   - null 空
   - undefined 未定义

4. 数组

```js
// 保证代码的可读性，尽量使用[],数组里面元素可以不同类型
var arr = [1,2,3,5,'ok',null,ture];

new Array(1,2,3,'ok');
```

5. 对象（与Java不同）

```js
var person = {
  name: "qinjiang",
  age: 3,
  tags: ['js','java','web','...']
}

// 取值
person.name
```

6.变量

```js
var a = 1;
```

- 变量名不能以数字开头

- 全局变量和局部变量

  - let 局部变量

  - var 在方法里面是全局变量，在方法外是局部变量

    ```js
    'use strict';   //严格检查模式，预防JavaScript的随意性导致产生的一些问题
    ```

# 数据类型

## 字符串(以字符串名str为例)

1. 正常字符串我们使用单引号或者双引号包裹
2. 注意使用转义字符

   - \n
   - \t
   - \ u4e2d    unicode字符
   - \x41      ascll字符
3. 多行字符串编写


   ```js
   var msg = `
   hello world
   你好呀
   ya
   `
   符号键在tab上面 esc键下面
   ```

4. 模板字符串     es6

```js
let name = 'lbg';
let msg = '你好呀，${name}';
```

5. 字符串长度

```js
str.length
```

6. 字符串的可变性和不可变性

- StringBuffer和StringBuilder都是可变字符串，Buffer是线程安全，String不可变

7. 字符串大小写转换

```js
str.toUpperCase()
str.toLowerCase()
```

8. 获取下标

```js
str.indexOf('字符串某个元素')
```

9. 截取下标1和下标2之间的字符串

```js
str.substring(下标1,下标2)
下标1或下标2没有填写则默认为0或长度
```

## 数组（以数组名arr为例）

数组（var）可以包含任意的数据类型；存储数据（如何存，如何取，方向都可以自己实现）

1. 长度

```js
arr.length
```

- 对arr.length赋值，数组长度就会发生变化~，如果赋值过小，元素会丢失!

2. 获取下标

```js
arr.indexOf('数组某个元素')
```

- "1"和1是不同的

3. 截取下标1和下标2之间的数组

```js
arr.slice(下标1,下标2)
下标1或下标2没有填写则默认为0或长度，该方法会截取数组的一部分，返回一个新数组
```

4. 操作元素

- 添加新的元素到尾部   arr.push('a','b')
- 添加新的元素到头部   arr.unshift('a','b')
- 删除最后一个元素   arr.pop()
- 删除最前面的一个元素   arr.shift()

5. 数组元素升序排序

```js
arr.sort()
```

6. 数组元素反转

```js
arr.reverse()
```

7. 数组拼接

```js
arr.concat([数组])
```

- 注意：这里拼接并不会修改原数组，只是会返回一个新的数组

8. 连接符

```js
arr join('连接符')
```

- 数组将会按照“元素连接符元素”的方式输出

9. 多维数组

​	与Java类似

## 对象

js中的对象，{......}表示一个对象，键值对描述属性xxxx:xxxx，多个属性使用逗号隔开，最后一个属性不加逗号！

```js
var 对象名 = {
	属性名 = 属性值,
  属性名 = 属性值,
  属性名 = 属性值
}
```

1. 赋值

```
对象名.属性名 = 属性值
```

2. 使用不存在的对象属性时，会返回undefined（未定义）
3. 动态的删减属性

```js
delete 对象名.属性名
```

4. 动态添加，直接赋值就行
5. 判断属性值或属性名是否在这个对象中   xxx in xxx，并返回一个布尔值
   - 继承的属性也会返回true

6. 判断一个属性是否是这个对象自身拥有的  hasOwnProperty()，并返回一个布尔值
   - 继承的属性不会返回true

## 流程控制

与Java类似

1. if判断
2. while循环
3. for循环
4. forEach循环     es5.1引入

```js
var age = [12,23,45,69,789];
// 函数
age.forEach(funtion (value){
	console.log(value)
})
```

5. for...in循环,遍历时只能打印下标，新增的元素会返回key，而不会返回一个正确的下标(bug)！

```js
//for(var index in object)
for(var num in age){
	执行语句......
}
```

## map和set

es6新语法

map：

```js
var map = new Map(['Tom',100],['Jerry',90],['Haha',80]);
var name = map.get('Tom');	//通过get获取value
console.log(name);	//打印出100
map.set('admin',123456);	//在后面添加数组
```

set：无序不重复的集合，可以去重，用has方法判断它是否包含某个元素

```js
var set = new set([3,1,1,1]); //只会记录3，1
```

- 都有delete和add方法

## iterator

作业：使用iterator来遍历迭代map和set！

- 遍历可以用for of来进行遍历(以数组arr为例)

```js
for (let x of arr){
	console.log(x)
}
```

- 遍历map

```js
for(let x of map){
	console.log(x)
}
```

- 遍历set

```js
for(let x of set){
	console.log(x)
}
```

## 函数

### 定义函数

```js
function abs(x){
	执行语句
}
```

- 一旦执行到return语句，返回结果；没有执行return，函数执行完也会返回结果，结果是undefined

```js
var abs = function(x){
	执行语句
}
```

- function(x){}是一个匿名函数，但是可以把结果赋给abs，通过abs就可以调用函数！这里函数调用方式和上面的定义方式一样！

## 调用函数

```js
abs(10)
```

- 参数问题：JavaScript可以传任意个参数，也可以不传任何参数！
- 手动抛出异常来解决参数传入问题

```js
执行语句：
if(typeof x !== 'number'){
	throw 'Not a Number';
}
```

- argument

  - 传递进来的所有参数是一个数组

  ```js
  var abs = function(x){
  	for(let i = 0;i<arguments.length;i++){
  		console.log(arguments[i]);    //打印传入的参数
    }
  }
  ```

  - 问题：argument包含所有的参数，我们有时候想使用多余的参数来进行附加的操作，需要排除已有的参数

- rest

  - es6新特性

    ```js
    if(argument.length>2){
    	for(var i = 2;i<argument.length;i++){
    		执行语句
      }
    }
    可以转换为
    function aaa(a,b,...rest){
    	执行语句
    }
    //除了前两个参数，其余参数会记录到rest（只是一个参数名，可替换）里
    ```

## 变量作用域

- 在JavaScript中，var定义变量是有作用域的。假设在函数体内声明，则在函数体外不可以使用（闭包除外）
  - 如果两个函数使用了相同的变量名，只要在各自的函数内部就不冲突
- 内部函数可以访问外部函数的成员，反之则不行
  - 内部函数和外部函数变量名相同，使用该变量时则会从自身开始由‘内’到‘外’查找（就近原则）

示例：js执行引擎，自动提升了y的声明，但是不会提升变量y的赋值

```js
function bg() {
	var x = "x" + y;
  console.log(x);
  y = 'y';
}	//这里的x应输出为xundefined
```

## 全局变量

```js
var x = 1;
function f(){
	console.log(x);
}
f();
console.log(x);
```

## 全局对象

```js
var x = 'xxx';
alert(x);
alert(window.x);
//默认所有的全局变量，都会自动绑定在window对象下
```

- alert () 这个函数本身也是window的一个变量
- JavaScript实际上只有一个全局作用域，，任何变量（包括函数）使用时，若没有在函数作用范围内找到，就会向外查找，如果在全局作用域都没有找到，那就会报错**RefrenceError**

> 规范

​	由于我们所有的全局变量都会绑定在window上。如果不同的js文件，使用了相同的全局变量，冲突=>怎么减少冲突？

弄一个命名空间（c#说法）

```js
//唯一的全局变量
var bg = {};
//定义全局变量
bg.name = 'lbg';
bg.add = function (a,b) {
	执行语句......
}
```

- 把自己的代码全部放入自己定义的唯一空间名字中，降低全局命名冲突的问题     jquery

> 局部作用域

​	es6 let关键字，解决局部作用域冲突的问题！建议大家用let去定义局部作用域的变量，避免变量在局部使用后还能在全局使用，（不建议用var！）

> 常量

​	es6 const关键字：在es6之前，全部用大写字母命名的变量就是常量（还是用var），在代码中建议不要修改这样的值。es6引入了const来定义常量（官方名为只读变量，定义后不可改变其值）

## 方法

> 定义方法

```js
vae bg = {
	age: function() {
		执行代码...
  }
}
```

- 调用方法时一定要带()

this.（被动调用）指向问题：

```js
function getAge() {
	var now = new Date().getFullYear();
  return now-this.birth;
}

var baigui = {
  birth: 2002;
	age = getAge()
}

//this调用默认指向调用它的那个对象，它是无法指向的
//baigui.age()  打印正确
//getAge() NaN window中没有birth这个变量
```

> apply

​	解决this指向问题，主动调用

```js
getAge.apply(baigui,[])
目前的对象      指向的对象 传入的参数
```

## 内部对象

> 标准对象

```js
typeof 123
"number"
typeof '123'
"string"
typeof NaN
"number"
typeof []
"object"
typeof {}
"object"
typeof Math.abs
"function"
typeof undefined
"undefined"
```

### Date

```js
var now = new Date();
now.getFullYear(); //年
now.getMonth(); //月  0~11 代表月
now.getDate(); //日
now.getDay(); //星期
now.getHours(); //时
now.getMinutes(); //分
now.getSeconds(); //秒

now.getTime(); //时间戳:全世界统一 1970.1.1 00:00:00开始计算，毫秒数
//   console.log(new Date(时间戳)); 打印时间戳对应的时间
now.toLocaleDateString();
// 获取当前时间 格式为：年/月/日 上午（或下午）时：分：秒
```

### Json

json和xml 	轻量级的数据交换格式

在JavaScript中，一切皆为对象，任何js支持的类型都可以用json来表示；number，string...

格式：

- 对象都用{}
- 数组都用[]
- 所有的键值对 都是用key:value

js对象和json字符串的转化：

```js
var user = {
	name: "lbg";
  age: 3;
  sex: "男"
}

//js对象转换为json字符串 {"name":"lbg","age":3,"sex":"男"}
var jsonUser = JSON.stringify(user);

//json字符串转化为js对象 参数为json字符串
var obj = JSON.parse('{"name":"lbg","age":3,"sex":"男"}');
```

json和js的区别：

```js
var obj = {a: 'hello',b: 'hellob'};
var json = '{"a":"hello","b":"hellob"}'
```

### Ajax

- 原生的js写法     xhr异步请求
- jQuey封装好的方法   $("#name").ajax("")
- axios 请求

## 面向对象编程

JavaScript、java、c#...面向对象；和JavaScript有些区别！

- 类：模板
- 对象：具体的实例

在JavaScript需要转换一下思维方式：

> 原型（类似于父类）

```js
var person = {
	name: 'dog';
  consloe.log(this.name + "run......");
}

var xiaoming = {
	name: 'xiaoming';
}

//xiaoming的原型是person，输出为xiaomingrun......
xiaoming.__proto__ = person;
========================================================================================
function student(name) {
	this.name = name;
}
//给student新增一个方法
student.prototype.hello = function () {
	alert('hello');
}
```

> class继承（模板）

`class`关键字，实在es6引入的

1. 定义一个类，属性，方法

```js
// 定义一个学生的类
class student {
	constructor(name){
		this.name = name;
  }
  hello(){
		alert('hello')
  }
}
var xiaoming = new student("xiaoming");
xiaoming.hello()
```

2. 继承

```js
class student {
	constructor(name){
		this.name = name;
  }
  hello(){
		alert('hello')
  }
}

class xiaostudent extends student{
	constructor(name.grade){
		super(name);
    this.grade = grade;
  }
  myGrade(){
		alert('我是一名小学生')
  }
}
var xiaogong = new xiaostudent("xiaohong",1);
```

- 本质：查看对象原型
- `语法糖？`

3. 原型链

[javascript——原型与原型链 - 雅昕 - 博客园 (cnblogs.com)](https://www.cnblogs.com/loveyaxin/p/11151586.html)

## Bom

Bom:浏览器对象模型

### 操作Bom对象

> window对象

​		window代表浏览器窗口

- Navigator

  封装了浏览器的信息,大多数时候，不建议使用这个对象，能被人为修改！

  ```js
  navigator.appVersion
  '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36'
  navigator.userAgent
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36'
  navigator.platform
  'Win32
  ```

- screen

​				屏幕信息,可以查看尺寸

- location

​				location代表当前页面的url信息

```js
location	//可以查看host等数据
location.reload()   //刷新网页
localtion.assign('地址')	//设置新的地址
```

> 问题：挂钩子？

- document

​				document代表当前页面，HTML  DOM文档树

```js
document.title   //获取当前的页面名
document.title='lbg'	//更改页面名为lbg
// 获取具体的文档树节点
document.getElementById('id名')
document.cookie	//获取cookie，劫持cookie核心代码，设置cookie:httponly可以解决
```

- history

​				不建议使用，代表浏览器的历史记录

```js
history.back()
history.forward()
```

## Dom

Dom：文档对象模型，整个浏览器网页就是一个Dom树形结构！

### 操作Dom对象

- 更新：更新Dom节点
- 遍历Dom节点：得到Dom节点
- 删除：删除一个Dom节点
- 添加：添加一个Dom节点

要操作整个Dom节点，就必须要获取整个Dom节点

> 获得Dom节点

```js
//对应css选择器
document.getElementById('id名')
document.getElementByClassName('class名')
document.getElementByTagName('tag名')	//返回的值为一个数组

father.children;	//获取父节点下的所有子节点
father.firstchild;	//获取第一个子节点
father.lastchild;	//获取最后一个子节点
```

> 更新Dom节点(事先定义了一个div标签，id为id1)

- id1.innerText='文本内容'	修改文本的值
- id1.innerHTML='html代码'    可以解析html文本标签
- 改变样式

​				id1.style.color = '颜色' 	更改文字颜色

​				id1.style.fontSize = 'xxxpx'	更改文字大小

> 删除Dom节点

- 步骤：先获取到父节点，再通过父节点删除自己

```js
var self = document.getElementById('h1')
var father = h1.parentElement;
father.removeChild(self)
或
father.removeChild(father.children[子类下标])
```

> 添加Dom节点

- 通过id1.innerText更新节点会覆盖原有的Dom子节点

```js
//已经事先定义了父类id为list和与父类同级的类id为js
var js = document.getElementById('js');
var list = document.getElementById('list');
list.appendchild(js);		//js追加到list子类的后面

//添加一个新的节点
var newP = document.createElement('p');	//创建一个p标签
newP.id = 'newP';
newP.innerText = 'hello!';

//创建一个标签节点（通过整个属性，可以设置任意的值）
var myScript = document.createElement('script');
myScript.setAttribute('type','text/javascript');

//创建一个style标签
var myStyle = document.createElement('style');
myStyle.setAttribute('type','text/css');
myStyle.innerHTML='body{background-color:green}';
document.getElementByTagName('head')[0].appendChild(myStyle);
```

- insert

```js
父节点.insertBefore(操作节点,目标节点)	//操作节点插入到目标节点前面去
```

## 操作表单

```js
//示例
var input_text = document.getElementById('username');
//得到输入框的值
input_text.value
//修改输入框的值
input_text.value = '123'

//对于单选框，.value只能获取到框的值，所以：
检查单选框的id.checked   //会返回布尔值
检查单选框的id.checked = ture   //可以让单选框处于选择状态
```

> 提交表单

​			通过onsubmit绑定一个js函数 	函数返回一个布尔值，利用onsubmit属性接收这个值，来最表单提交进行操作（true可以提交，flase不可以提交）

## jquery

jquery库，包含大量封装的JavaScript函数

调用方式：$(css选择器).action()

```html
<a href="" id="test">点我</a>
<script>
	$('#test').click(function () {
		alert('hello!');
  })
</script>
```

> 资料推荐：[jQuery API 中文文档 | jQuery API 中文在线手册 | jquery api 下载 | jquery api chm (cuishifeng.cn)](https://jquery.cuishifeng.cn/)
>
> cdnjQuery推荐：[BootCDN - Bootstrap 中文网开源项目免费 CDN 加速服务](https://www.bootcdn.cn/)

示例：

```javascript
<!-- 获取鼠标当前的一个坐标 -->
mouse: <span id="mousemove"></span>
<div id="divmove">在这里点击移动鼠标试试!</div>

<script>
  // 当网页元素加载完毕之后，响应事件
  $(document).ready(function () {
    $("#divmove").mousemove(function (e) {
      $("#mousemove").text("x:" + e.pageX + "y:" + e.pageY);
    });
  });
</script>
```

操作Dom

```js
//示例 test-ul 后添加的属性为绑定指定的id
$('#test-ul li[name=python]').text();	//获得值
$('#test-ul li[name=python]').text('设置值');	//设置值
$('#test-ul li[name=python]').html();	//获得html格式的值
$('#test-ul li[name=python]').html('html代码');	//设置html格式的值
......
```

> 实例推荐:[www.mycodes.net](http://www.mycodes.net/)
>
> 练习前端：扒站
>
> 前端小技巧：
>
> 1.巩固js 看jQuery框架源码，看游戏源码
>
> 2.巩固html和css 扒站或者全部down下来，然后对应修改看效果

layui  element-ui docsify

> 问题：脚手架    面包屑
