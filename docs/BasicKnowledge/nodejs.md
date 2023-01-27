# node js

## DOS命令

dir       列出当前目录下的所有文件

cd 目录名    进入到指定目录，不可跨盘符

.      表示当前目录，例如./1.txt表示当前目录下的1.txt文件

..      表示上一级目录，例如../1.txt表示上一级目录下的1.txt文件

## 进程和线程

- 进程：负责为程序运行提供必备的环境，相当于工厂里面的车间
- 线程：计算机的最小计算单位，负责执行进程中的程序，相当于工厂的车间工人

node处理请求时是单线程的，但是在后台拥有一个I/O线程池

## js运行环境

内置api是由运行环境提供的特殊接口，只能在所属的运行环境中被调用；

node：使用v8引擎；使用事件驱动、非阻塞和异步I/O模型等技术提升性能

> 版本号：奇数为开发版，偶数为稳定版

## fs文件系统模块

操作分为同步（阻塞程序运行，操作完毕后才可以向下执行其他代码）和异步形式（不会阻塞程序执行，通过回调函数将结果返回）

用来操作文件，如：

- fs.readfile(),读取指定文件内容
- fs.writefile(),向指定的文件中写入内容

### 导入

```js
const fs = require('fs');
```

### 打开文件和关闭文件

> [fs.openSync(path[, flags[, mode\]]) | Node.js API 文档 (nodejs.cn)](http://nodejs.cn/api/fs/fs_opensync_path_flags_mode.html)
>
> [fs 文件系统 | Node.js API 文档 (nodejs.cn)](http://nodejs.cn/api/fs.html#filehandleclose)

### 读取指定文件内容

```js
fa.readFile(path[,options],callback)
```

- path:必填参数，文件路径
- options:选填参数，以什么编码格式读取文件
- callback:必填参数，回调函数

- 如果读取成功将，则err的值为null；如果读取失败，则result的值为undefined

```js
// 导入fs模块
const fs = require('fs');
// 调用readfile方法
fs.readFile('./file/1.txt','utf-8',function(err,result){
    // 打印失败的结果
    console.log(err);
    console.log('-----------');
    // 打印成功的结果
    console.log(result);
})

// 判断是否读取成功
// 导入fs模块
const fs = require('fs');
// 调用readfile方法
fs.readFile('./file/1.txt','utf-8',function(err,result){
    if(err) {
        return console.log('文件读取失败！'+err.message);
    }
    return console.log('文件读取成功！'+result);
})
```

### 向指定文件写入内容

```js
fs.writeFile('文件路径','写入的内容','写入格式',回调函数)
```

- 必填参数：文件路径、写入的内容(可以为变量)、回调函数
- 选填参数：写入格式（不填默认为utf-8）

```js
const fs = require('fs');
fs.writeFile('./file/2.txt','hello world!','utf-8',function(err){
    console.log(err);
})
// 判断是否写入成功
const fs = require('fs');
fs.writeFile('./file/2.txt','hello world!','utf-8',function(err){
    if(err){
        return console.log('文件写入失败！'+err.message);
    }
    return console.log('文件写入成功！');
})
```

> 扩展：
>
> 1.使用split方法进行分割操作
>
> ```js
> const arrold = result.split(' ');    // 以空格分割标识，输出的是一个数组
> ```
>
> 2.使用replace方法进行替换操作
>
> ```js
> const arrnew = []
> arrold.forEach(item => {
> 	arrnew.push(item.replace('=','：'))
> })
> ```
>
> 3.使用join方法进行字符串的拼接
>
> ```js
> arrnew.join('\r\n')
> ```

### fs路径动态拼接问题

​	操作路径为./或../开头的相对路径情况任意出现拼接错误问题（代码运行会执行node命令时所处的目录，动态拼接出被操作文件的完整目录），问题为执行的js文件不在当前目录下

解决方案：路径改为绝对路径（完整路径）或者使用__dirname表示当前文件所在的目录进行动态的拼接

绝对路径缺点：移植性非常差，不利于维护

### 验证文件是否存在

> [fs.existsSync(path) | Node.js API 文档 (nodejs.cn)](http://nodejs.cn/api/fs/fs_existssync_path.html)

### 获取文件的信息

> [fs.statSync(path[, options\]) | Node.js API 文档 (nodejs.cn)](http://nodejs.cn/api/fs/fs_statsync_path_options.html)

### 删除文件

> [fs.unlinkSync(path) | Node.js API 文档 (nodejs.cn)](http://nodejs.cn/api/fs/fs_unlinksync_path.html)

### 读取一个目录的目录结构

> [fs.readdirSync(path[, options\]) | Node.js API 文档 (nodejs.cn)](http://nodejs.cn/api/fs/fs_readdirsync_path_options.html)

### 截断文件(将文件设置为指定大小)

>[fs.truncateSync(path[, len\]) | Node.js API 文档 (nodejs.cn)](http://nodejs.cn/api/fs/fs_truncatesync_path_len.html)

### 建立目录

> [fs.mkdirSync(path[, options\]) | Node.js API 文档 (nodejs.cn)](http://nodejs.cn/api/fs/fs_mkdirsync_path_options.html)

### 监视文件的改动

> [fs.watchFile(filename[, options\], listener) | Node.js API 文档 (nodejs.cn)](http://nodejs.cn/api/fs/fs_watchfile_filename_options_listener.html)

## path路径模块

处理路径的模块，模块导入和fs文件系统一致

### 路径拼接

- path.join()语法

```js
path.join(路径片段)     // 返回值为拼接后的字符串
```

- ../    会抵消前面的路径
- 后续不建议使用+进行拼接

### 获取文件名

- path.basename()语法

```js
path.basename(路径,扩展名)
```

- 扩展名可选填，填了后只会显示文件名，而不会显示  文件名.扩展名

### 获取文件扩展名

- path.extname()语法

```js
path.extname(l)
```

## COMMONJS规范

### 模块化

require("路径")可以传递一个文件路径作为参数，node将会自动根据该路径来引入外部模块；如果使用相对路径，必须以.或..开头

- 一个js文件就是一个模块
- 每一个js文件中的js代码都是独立运行在一个函数中，而不是全局作用域，所以一个模块中的变量和函数在其他模块中无法访问
  - 解决方法：使用exports来向外部暴露变量和方法  exports.变量名=变量值  或者  exports.FN=函数

前面我们使用的路径就是模块的标识，模块分为两大类：

- 核心模块：由node引擎提供的模块，核心模块的标识就是模块的名字，如fs
- 文件模块：由用户创建的模块

在node中有一个全局对象 global，它的作用和js中的window类似

- 在全局中创建的变量都会作为global的属性保存
- 在全局中创建的变量都会作为global的方法保存

- 变量名 = 值  定义的变量为全局变量

当node在执行模块中的代码时，它会首先在代码的外部包裹了如下代码：

```js
function (exports, require, module, __filename, __dirname) {
	函数对象内容
}
```

实际上模块中的代码都是包装在一个函数中执行的，并且在函数执行时，同时传递进了5个实参：

exports, require, module（代表当前模块本身，实际上exports就是module的一个属性）, `__filename`(当前模块的完整路径), `__dirname`（当前模块的文件夹完整路径）

- modle.exports和exports

  - exports只能使用.的方式来向外暴露内部变量     exports.xxx = xxx
  - modle.exports既可以通过.的形式，也可以直接赋值     modle.exports.xxx = xxx 或  modle.exports = { }

  > 扩展：原型链（变量地址指向问题），当链“后头”的值设置为null时，“前面”的值不会变为null（当前的值与前面的切断了联系）

> 扩展：
>
> arguments:封装函数实参
>
> arguments.callee：保存当前执行的函数对象 

## 包

标准包含文件：**package.json(描述文件，不能写注释)**、bin（可执行的二进制文件）、lib（js代码）、doc（文档）、test（单元测试）

写的模块变成包给别人使用

### npm

包管理器，类似于应用商城

> [【原】npm 常用命令详解 - 白树 - 博客园 (cnblogs.com)](https://www.cnblogs.com/PeunZhang/p/5553574.html)

- 全局安装一般是一些工具

- npm下载满，用cnpm

> [Package - cnpm (npmmirror.com)](https://npmmirror.com/package/cnpm)

​		node在使用模块名导入模块时，它会首先在当前目录的node_modules中寻找该模块；如果当前目录没有则会到上一级进行查找，一直到找到为止或者找到根目录下依旧没有，则会报错！

## buffer缓冲区

​	结构和数组很像，操作方法也和数组类似；数组不能存储二进制文件，buffer可以！存储的都是二进制数据，显示是十六进制！每一个元素的范围都是00~ff（1byte=8bite，进制）；buffer的length方法查看的是占用内存的大小，而不是长度！

字符串转换为buffer：

```js
Buffer.from("str");
```

​	buffer构造函数不推荐使用！使用类构造：

> [buffer 缓冲区 | Node.js API 文档 (nodejs.cn)](http://nodejs.cn/api/buffer.html#static-method-bufferallocsize-fill-encoding)

当创建的buffer中含有敏感数据，我们可以使用这个类构造（不会清空原有内存的数据）

> [buffer 缓冲区 | Node.js API 文档 (nodejs.cn)](http://nodejs.cn/api/buffer.html#static-method-bufferallocunsafesize)

