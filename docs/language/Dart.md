# Dart

谷歌开发的编程语言，和JavaScript类似。要学Flutter的话我们必须首先得会Dart。

## 入口方法

```dart
main() {
  ...
}
或
void main() {
  ...
}
```

## 注释方法

```dart
// 注释一
/// 注释二
/*  注释三 */
```

## 变量

dart是一个强大的脚本类语言，可以不预先定义变量类型 ，自动会类型推倒。dart中定义变量可以通过var关键字可以通过类型来申明变量

> 注意： var后就不要写类型 ，写了类型不要var

```dart
var a = 1;
```

> 注意事项：
>
> 1. 变量名称必须由数字、字母、下划线和美元符($)组成。
> 2. 注意：标识符开头不能是数字
> 3. 标识符不能是保留字和关键字。  
> 4. 变量的名字是区分大小写的如: age和Age是不同的变量。在实际的运用中,也建议,不要用一个单词大小写区分两个变量。
> 5. 标识符(变量名称)一定要见名思意 ：变量名称建议用名词，方法名称建议用动词

## 常量

- const值不变 一开始就得赋值

- final 可以开始不赋值只能赋一次 ; 而final不仅有const的编译时常量的特性，最重要的它是运行时常量，并且final是惰性初始化，即在运行时第一次使用前才初始化

> 永远不改量的量，请使用final或const修饰它，而不是使用var或其他变量类型。如果声明了常量，当修改它时就会报错

```dart
final name = 'Bob'; // Without a type annotation
final String nickname = 'Bobby';
const bar = 1000000; // Unit of pressure (dynes/cm2)
const double atm = 1.01325 * bar; // Standard atmosphere
```

## 数据类型

​		Dart支持以下数据类型：

- Numbers（数值）：int、double
- Strings（字符串）：String
- Booleans（布尔）：bool
- List（数组）：数组是列表对象，所以大多数人只是称它们为列表
- Maps（字典）：通常来说，Map是一个键值对相关的对象。键和值可以是任何类型的对象

### 字符串

```dart
// 字符串类型
void main() {
  // var str1 = '这是字符串1';
  // var str2 = '这是字符串2';
  String string1 = '这是单引号包裹的字符串';
  String string2 = "这是双引号包裹的字符串";
  print(string1);
  print(string2);
  // 三个单(双)引号可以看多行
  String string3 = '''第一行
  第二行
  第三行
  ''';
  print(string3);
  // 字符串拼接
  String str1 = 'Hello';
  String str2 = 'Dart';
  print('$str1 $str2');
  print(str1 + ' ' + str2);
}
```

### 数值类型

```dart
// 数值类型
void main() {
  int a = 123;
  double b = 520.1314;
  print(a);
  print(b);
  // + - * / %
  var c = a + b;
  print(c);
}
```

### 布尔类型

```dart
// 布尔类型
void main() {
  bool flag1 = true;
  print(flag1);
  // 条件判断
  if (flag1) {
    print('真');
  }
}
```

> dart里面不会对数据进行自动的类型转换，即123!='123'

### list集合类型

```dart
// 数组集合类型
void main() {
  // 不指定类型
  var l1 = ['云云', 20, true];
  print(l1);
  print(l1.length);
  print(l1[0]);
  // 指定类型
  var l2 = <String>['佰贵', '云云'];
  print(l2);
  // 增加数据  通过中括号创建的集合它的容量可以变化
  var l3 = [];
  l3.add('云云');
  print(l3);
  // 在新版本种无法使用下面这个个方法了   fluteer 2.x还可以使用
  // var l4 = new List();
  // 创建一个固定长度的集合
  var l5 = List.filled(2, ' ');
  print(l5);
  l5[0] = '张三';
  l5[1] = '李四';
  // l5.add('王五');   无法添加，已经固定长度
  // l5.length = 0;    无法修改长度，已经固定长度
  // 指定类型加固定长度  如果不加类型限制会默认进行推断
  var l6 = List<String>.filled(2, ' ');
}
```

> 当数组长度不固定时，我们修改长度为零会清空数组！

### Set类型

Set是没有顺序且不能重复的集合，所以不能通过索引去获取值

```dart
var s = new Set();
s.add('苹果');
s.add('苹果');
s.add('香蕉');
```

### Maps字典类型

```dart
// Maps字典
void main() {
  var person = {
    // key值必须加引号
    'name': '云云',
    'age': 18,
    'work': ['程序员', '小公主']
  };
  print(person);
  print(person['name']);
  print(person['work']);

  var p = new Map();
  p['name'] = '云云';
  p['age'] = 18;
  print(p);
  print(p['name']);
}
```

### 类型判断

```dart
// 类型判断
// is 关键词来判断类型
void main() {
  var str = '123';
  if (str is String) {
    print('str是String类型');
  } else {
    print('str不是String类型');
  }
}
```

### 不常用的数据类型

- Runes：rune是utf-32编码的字符串，它可以通过文字转换符号表情或者代表特定的文字
- Symbols：symbol对象表示在Dart程序中声明的运算符或标识符。您可能永远不需要使用符号。

## 运算符

### 算术运算符

```
+  -  *  /  ~/（取整）  %（取余）

// 算术运算符
void main() {
  int a = 13;
  int b = 5;

  print(a + b); // 加
  print(a - b); // 减
  print(a * b); // 乘
  print(a / b); // 除
  print(a % b); // 取余
  print(a ~/ b); // 取整
}
```

### 关系运算符

```
==  !=  >  <  >=  <=

// 关系运算符
void main() {
  int a = 6;
  int b = 5;

  print(a == b); // 判断是否相等
  print(a != b); // 判断是否不相等
  print(a > b); // 判断是否大于
  print(a < b); // 判断是否小于
  print(a >= b); // 判断是否大于等于
  print(a <= b); // 判断是否小于等于
}
```

### 逻辑运算符

```
!  &&  ||

// 逻辑运算符
void main() {
  // 取反
  bool flag = true;
  print(!flag);
  // &&：并且，全部为true的话为true，否则为false
  bool flag1 = true;
  bool flag2 = true;
  print(flag1 && flag2);
  // || 或者，全部为false则会false，否则值为true
  bool flag3 = true;
  bool flag4 = false;
  print(flag3 || flag4);
}

```

### 赋值运算符

#### 基础赋值运算符

```
=  ??=
// 赋值运算符
void main() {
  int a = 10;
  int b = 5;
  int c = a + b; // 从右向左
  // ??=：如果b为空，将右边的值赋值给左边
  var d = null;
  d ??= 23;
  print(d);
}

```

#### 复合赋值运算符

```
+=  -=  *=  /=  %=  ~/=  ++（自增）  --（自减）
// 赋值运算符
void main() {
  int a = 10;
  int b = 5;
  int c = a + b; // 从右向左
  // ??=：如果b为空，将右边的值赋值给左边
  var d = null;
  d ??= 23;
  print(d);

  int a2 = 10;
  a2 += 10;
  a2 -= 5;
  a2 *= 2;
  print(a2);
  
  print(a++);   // 自增
  print(a--);   // 自减
}
```

> 在赋值运算里面，如果++、--写在前面，这时先运算再赋值，如果++、--写在后面，这时先赋值再运算

### 条件表达式

```dart
// 条件表达式
void main() {
  bool flag = true;
  if (flag) {
    print(flag);
  }
  var sex = '男';
  switch (sex) {
    case '男':
      print(sex);
      break;
    case '女':
      print('aaa');
      break;
    default:
      print('error');
      break;
  }

  String c = flag ? '真的' : '假的';
  print(c);

  var a = null;
  var b = a ?? 10;
  print(b);
}
```

## 类型转换

### number与string类型

number --> string：使用toString()方法

string --> number：使用int.parse()、double.parse()方法

```dart
void main(List<String> args) {
  // 类型转换
  String str = '123';
  var numStr = int.parse(str);
  print('$str is $numStr');

  String str1 = '123.321';
  var numStr1 = double.parse(str1);
  print('$str1 is $numStr1');

  var nums = 12;
  var strs = nums.toString();
  print('$nums is $strs');
}
```

### 其他类型与Booleans类型

isEmpty：判断字符串是否为空

```dart
void main(List<String> args) {
  var strs1 = 'xxx';
  if (strs1.isEmpty) {
    print('空空如也');
  } else {
    print('有的有的');
  }
  var myNum = 0 / 0;
  if (myNum.isNaN) {
    print('NaN');
  }
}
```

## 循环语句

### for循环

```dart
void main(List<String> args) {
  for (int i = 0; i < 10; i++) {
    print(i);
  }
}
```

### while和do...while循环

```dart
void main(List<String> args) {
  int i = 0;
  while (i < 5) {
    print(i);
    i++;
  }
  do {
    i++;
    print(i);
  } while (i < 5);
}
```

> 注意：
>
> 1. 最后的分号不要忘记
> 2. 循环条件中使用的变量需要经过初始化
> 3. 循环体中，应有结束循环的条件，否则会造成死循环

### break和continue

#### break

1. 在switch语句中使流程跳出switch结构
2. 在循环语句中使流程跳出当前循环，遇到break循环终止，后面代码也不会执行

> 注意：
>
> - 如果在循环中已经执行了break语句，就不会执行循环体中位于break后的语句
> - 在多层循环中，一个break语句只能向外跳出一层
>
> braek可以用在switch case中，也可以用在for循环和while循环中

#### continue

只能在循环语句中使用，使本次循环结束，即跳过循环体重下面尚未执行的语句，接着进行下次循环

> 注意：continue可以用在for循环以及while循环中，但是不建议用在while循环中，不小心容易死循环

```dart
void main(List<String> args) {
  for (int i = 0; i <= 10; i++) {
    if (i == 5) continue;
    if (i == 8) break;
    print(i);
  }
}
```

## List（Set）

### 常用属性

|    属性    |    功能    |
| :--------: | :--------: |
|   length   |    长度    |
|  reversed  |    翻转    |
|  isEmpty   |  是否为空  |
| isNotEmpty | 是否不为空 |

### 常用方法

|        方法名         |              功能               |
| :-------------------: | :-----------------------------: |
|          add          |              增加               |
|        addAll         |            拼接数组             |
|        indexOf        | 查找 传入具体值，未查找到返回-1 |
|        remove         |         删除 传入具体值         |
|       removeAt        |         删除 传入索引值         |
|       fillRange       |              修改               |
|  insert(index,value)  |          指定位置插入           |
| insertAll(index,list) |        指定位置插入List         |
|       toList()        |       其他类型转换成List        |
|        join()         |        List转换为字符串         |
|        split()        |        字符串转换成List         |
|        forEach        |              遍历               |
|          any          |                                 |
|         every         |                                 |
|          map          |                                 |

## Maps

映射是无序的键值对

### 常用属性

|    属性    |       功能        |
| :--------: | :---------------: |
|    keys    |  获取所有的key值  |
|   values   | 获取所有的value值 |
|  isEmpty   |     是否为空      |
| isNotEmpty |    是否不为空     |

### 常见方法

|     方法      |             功能              |
| :-----------: | :---------------------------: |
|  remove(key)  |       删除指定key的数据       |
| addAll({...}) |   合并映射 给映射内增加属性   |
| containsValue | 查看映射内的值 返回true/false |
|    forEach    |                               |
|      map      |                               |
|     where     |                               |
|      any      |                               |
|     every     |                               |

## 方法

分为内置方法（例如print()）以及自定义方法，自定义方法的基本格式为：

```dart
返回类型 方法名称 (参数1,参数2...) {
  	方法体
    return 返回值
}
```

> 方法可以嵌套方法，注意方法的作用域，定义方法时，未知返回值类型，可以不用写返回类型；定义参数时可以在参数名前加类型限定参数的数据类型

### 传递可选参数

可选参数是指在传递参数时，该参数可以传递也可以不传递

```dart
// 这这里age和sex为可选参数
String printfInfo(String name,[int? age, String? sex]) {
  return '姓名$name---年龄$age';
}
```

### 传递默认参数

默认参数是指当我们传递的参数没有传递值的情况下，我们的方法会有一个参数的默认值传递进方法里面进行相关操作

```dart
// 定义一个带有默认参数以及可选参数的方法
String printfUserInfo(String name, [int? age, String? sex = '女']) {
  if (age != null)
    return '姓名$name---性别$sex---年龄$age';
  else
    return '姓名$name---性别$sex---年龄保密';
}
```

### 传递命名参数

命名参数是指在调用函数时，我们需要对参数进行命名才能将数据传递到参数上

```dart
String printfUserInfo(String name, {int? age, String? sex = '女'}) {
  if (age != null)
    return '姓名$name---性别$sex---年龄$age';
  else
    return '姓名$name---性别$sex---年龄保密';
}
print(printfUserInfo('幽离', age: 21, sex: '男'));
```

### 传递方法

有时候我们需要将一个方法当作函数传递进方法体里面进行相关操作

```dart
fn1() {
  print('fn1');
}

fn2(fn) {
  print('fn2');
  fn();
}

fn2(fn1);
```

### 箭头函数

箭头函数的方法体里面只能写一句语句

```dart
List list = ['苹果', '香蕉', '大菠萝'];
list.forEach((element) => print(element));
list.forEach((element) => {print(element)});
List list1 = [4, 2, 6, 8, 9];
// var newList = list1.map((e) {
//   if (e > 2)
//     return e * 2;
//   else
//     return e;
// });
var newList = list1.map((value) => value > 2 ? value * 2 : value);
print(newList.toList());
```

### 函数的相互调用

```dart
int getNum(int n) {
  return n;
}

void main(List<String> args) {
  print(getNum(12));
}
```

### 匿名方法

```dart
// 匿名方法
var printNum = () {
  print(1);
};
printNum();
```

### 自执行方法

一旦运行代码就会自己执行

```dart
// 自执行方法
((int n) {
  print(n);
})(12);
```

## 闭包

- 全局变量的特点：全局变量常驻内存、全局变量污染全局
- 局部变量的特点：不常驻内存会被垃圾机制回收、不会污染全局

**我们希望的：**

1. 常驻内存
2. 不污染全局

> 解决方案：闭包，函数嵌套函数，内部函数会调用外部函数的变量或参数，变量或参数不会被系统回收
>
> 写法：函数嵌套函数，并return里面的函数，这样就形成了闭包

```dart
fn() {
  var a = 123;
  return() {
    a++;
    print(a);
  }
}
var b = fn();
b();
```

## 类

### 面向对象

面向对象编程(OOP)的三个基本特征是：封装、继承、多态    

- 封装：封装是对象和类概念的主要特性。封装，把客观事物封装成抽象的类，并且把自己的部分属性和方法提供给其他对象调用, 而一部分属性和方法则隐藏。

- 继承：面向对象编程 (OOP) 语言的一个主要功能就是“继承”。继承是指这样一种能力：它可以使用现有类的功能，并在无需重新编写原来的类的情况下对这些功能进行扩展。  
-  多态：允许将子类类型的指针赋值给父类类型的指针, 同一个函数调用会有不同的执行效果 。

​		Dart所有的东西都是对象，所有的对象都继承自Object类。Dart是一门使用类和单继承的面向对象语言，所有的对象都是类的实例，并且所有的类都是Object的子类一个类通常由属性和方法组成。

### 基本使用

```dart
// 类的基本使用
class Person {
  String name = '云云';
  int age = 18;
  String getInfo() {
    // return '$name---$age';
    return '${this.name}---${this.age}';
  }

  void setInfo(int age) {
    this.age = age;
  }
}

void main(List<String> args) {
  // 实例化
  var p1 = new Person();
  // Person p1 = new Person();
  print(p1.name);
  print(p1.age);
  print(p1.getInfo());
  p1.setInfo(4);
  print(p1.getInfo());
}
```

### 构造函数

```dart
class Person {
  // 注意：新版本中加入了空安全，需要声明该变量可能为空
  String? name;
  int? age;
  // 默认构造函数  函数名和类名相同
  Person(String name, int age) {
    this.name = name;
    this.age = age;
  }
  void getInfo() {
    // return '$name---$age';
    print('${this.name}---${this.age}');
  }
}
```

### 命名构造函数

```dart
// 构造函数可以写多个
class Person {
  String? name;
  int? age;
  // 默认构造函数的简写
  Person(this.name, this.age);
  // 命名构造函数
  Person.now(String names, int ages) {
    print('我是命名构造函数');
    this.name = names;
    this.age = ages;
  }
}
```

### 私有方法以及属性

```dart
class Person {
  // 我们可以使用_把一个属性或者方法定义成私有
  String? _name;
  int? _age;
  void _run() {
    print('这是私有方法');
  };
  // 默认构造函数的简写
  Person(this._name, this._age);
}
```

### getter和setter修饰符

```dart
class Rect {
  num width;
  num height;
  Rect(this.width, this.height);
  get area {
    return this.width * this.height;
  }

  set areaHeight(value) {
    this.height = value;
  }
}

void main(List<String> args) {
  Rect r = new Rect(10, 4);
  // 调用getter方法
  r.areaHeight = 2;
  // 访问方法会直接通过访问属性的方法getter访问area
  print('面积为${r.area}');
}
```

### 初始化列表

```dart
class Rect {
  int? height;
  int? width;
  // 实例化之前给类里面的属性进行赋值
  Rect():height=2,width=10 {

  }
}
```

### 静态成员

1. 使用static 关键字来实现类级别的变量和函数

2. 静态方法不能访问非静态成员，非静态方法可以访问静态成员

```dart
class Person {
  static String name = '云云';
  static void show() {
    print(name);
  }

  void printInfo() {
    // 非静态方法可以访问静态成员以及非静态成员
    print(name); // 访问静态成员
    show();
  }
}

void main(List<String> args) {
  print(Person.name);
  Person.show();
  Person p1 = new Person();
  p1.printInfo();
}
```

### 对象操作符

- ?：条件运算符（了解）
- as：类型转换
- is：类型判断
- ..：级联操作（了解）

```dart
Person p;
p?.printInfo();
Person p1 = new Person('云云', 18);
if (p1 is Person) {
  p1.name = '幽离';
}
p1.printInfo();
print(p1 is Object);
```

### 类的继承

1. 子类使用extends关键词来继承父类

2. 子类会继承父类里面可见的属性和方法 但是不会继承构造函数

3. 子类能复写父类的方法 getter和setter

```dart
class Person {
  String name = 'youli';
  int age = 20;
  Person(this.name, this.age);
  printInfo() {
    print('666');
  }
}

class Web extends Person {
  String? sex;
  Web(String name, int age, String sex) : super(name, age) {
    this.sex = sex;
  }
  run() {
    super.printInfo();
    print('我是子类的方法');
  }
}

void main(List<String> args) {
  Web w = new Web('youli', 18, '女');
  print(w.name);
  w.printInfo();
  w.run();
}
```

### 子类覆写父类方法

```dart
import 'dart:ffi';

class Person {
  String? name;
  int? age;
  Person(this.name, this.age);
  void printInfo() {
    print('${this.name}---${this.age}');
  }
}

class Web extends Person {
  Web(String name, int age) : super(name, age);
  run() {
    print('我在奔跑！');
  }

  // 覆写父类方法
  @override // 可写可不写，但是建议写
  void printInfo() {
    print('我是子类的覆写方法');
  }
}

void main(List<String> args) {
  Web w = new Web('幽离', 25);
  w.printInfo();
}
```

### 抽象类

Dart抽象类主要用于定义标准，子类可以继承抽象类，也可以实现抽象类接口。

1. 抽象类通过abstract 关键字来定义

2. Dart中的抽象方法不能用abstract声明，Dart中没有方法体的方法我们称为抽象方法。

3. 如果子类继承抽象类必须得实现里面的抽象方法

4. 如果把抽象类当做接口实现的话必须得实现抽象类里面定义的所有属性和方法。

5. 抽象类不能被实例化，只有继承它的子类可以

> extends抽象类 和 implements的区别：
>
> 1. 如果要复用抽象类里面的方法，并且要用抽象方法约束自类的话我们就用extends继承抽象类
>
> 2. 如果只是把抽象类当做标准的话我们就用implements实现抽象类

```dart
// 抽象类没法被实例化
abstract class Animal {
  eat();
}

class Dog extends Animal {
  @override
  eat() {
    return null;
  }
}

void main(List<String> args) {
  Dog dogs = new Dog();
  dogs.eat();
}
```

### 多态

​		允许将子类类型的指针赋值给父类类型的指针, 同一个函数调用会有不同的执行效果 。子类的实例赋值给父类的引用。多态就是父类定义一个方法不去实现，让继承他的子类去实现，每个子类有不同的表现。

### 接口

​		和Java一样，dart也有接口，但是和Java还是有区别的。 首先，dart的接口没有interface关键字定义接口，而是普通类或抽象类都可以作为接口被实现。同样使用implements关键字进行实现。但是dart的接口有点奇怪，如果实现的类是普通类，会将普通类和抽象中的属性的方法全部需要覆写一遍。而因为抽象类可以定义抽象方法，普通类不可以，所以一般如果要实现像Java接口那样的方式，一般会使用抽象类。建议使用抽象类定义接口。

​		定义一个DB库 支持 mysql  mssql  mongodb mysql  mssql  mongodb三个类里面都有同样的方法

```dart
abstract class DB {
  String? url;
  // 当作接口  接口规范（规定）
  DB(this.url);
  add();
  save();
  delete();
}

class Mysql implements DB {
  String? url;
  Mysql(this.url);
  @override
  add() {}

  @override
  delete() {}

  @override
  save() {}
}
```

### 实现多个接口

```dart
// 一个类实现多个接口
abstract class A {
  String? name;
  printA();
}

abstract class B {
  printB();
}

class C implements A, B {
  @override
  printA() {
    print('A');
  }

  @override
  String? name;

  @override
  printB() {
    print('B');
  }
}

void main(List<String> args) {
  C c = new C();
  c.printA();
  c.printB();
}
```

### mixins

​		mixins的中文意思是混入，就是在类中混入其他功能。在Dart中可以使用mixins实现类似多继承的功能因为mixins使用的条件，随着Dart版本一直在变，这里讲的是Dart2.x中使用mixins的条件：

1. 作为mixins的类只能继承自Object，不能继承其他类

2. 作为mixins的类不能有构造函数

3. 一个类可以mixins多个mixins类

4. mixins绝不是继承，也不是接口，而是一种全新的特性

```dart
class A {
  void printA() {
    print('A');
  }
}

class B {
  void printB() {
    print('B');
  }
}

class C with A, B {

}
```

> mixin的实例类型是啥？mixin的类型就是其超类的子类型

### 泛型

泛型就是解决类、接口和方法的复用性，以及对不特定数据类型的支持（类型校验）

#### 方法

```dart
// 泛型方法
T getData<T>(T value) {
  return value;
}

void main(List<String> args) {
  print(getData(21));
  print(getData('xxx'));
  getData<String>('你好');
  getData<int>(12);
}
```

#### 类

```dart
// 泛型类
class MyList<T> {
  List list = <T>[];
  void add(T value) {
    this.list.add(value);
  }

  List getList() {
    return list;
  }
}

void main(List<String> args) {
  MyList l = new MyList();
  l.add('张三');
  l.add(12);
  print(l.getList());
  MyList l1 = new MyList<String>();
  l1.add('李四');
  print(l1.getList());
}
```

#### 接口

​		实现数据缓存的功能：有文件缓存、和内存缓存。内存缓存和文件缓存按照接口约束实现。

```dart
abstract class Cache<T> {
  String? key;
  Cache(String key);
  void setByKey(String key, T value);
}

class fileCache<T> implements Cache<T> {
  @override
  String? key;

  @override
  void setByKey(String key, T value) {
    print('6666');
    return null;
  }
}

void main(List<String> args) {
  fileCache cache1 = new fileCache();
  cache1.setByKey('666', 222);
}
```

## 库

​		前面介绍Dart基础知识的时候基本上都是在一个文件里面编写Dart代码的，但实际开发中不可能这么写，模块化很重要，所以这就需要使用到库的概念。在Dart中，库的使用时通过import关键字引入的。library指令可以创建一个库，每个Dart文件都是一个库，即使没有使用library指令来指定。

Dart中的库主要有三种：

1. 我们自定义的库   

​     		import 'lib/xxx.dart';

2. 系统内置库    

​     		import 'dart:math';   

​     		import 'dart:io'; 

​     		import 'dart:convert';

3. Pub包管理系统中的库  

   		 https://pub.dev/packages

  		  https://pub.flutter-io.cn/packages

   		 https://pub.dartlang.org/flutter/

1. 需要在自己想项目根目录新建一个pubspec.yaml

   ```yaml
   name: xxx
   description: xxx
   dependencies:
   	http: xxx
   	date_format: xxx
   ```

2. 在pubspec.yaml文件 然后配置名称 、描述、依赖等信息

3. 然后运行 pub get 获取包下载到本地  

4. 项目中引入库 import 'package:http/http.dart' as http; 看文档使用

> 注意：当引入两个库中有相同名称标识符的时候，如果是java通常我们通过写上完整的包名路径来指定使用的具体标识符，甚至不用import都可以，但是Dart里面是必须import的。当冲突的时候，可以使用as关键字来指定库的前缀。如下例子所示：
>
> ```dart
> import 'package:lib1/lib1.dart';
> import 'package:lib2/lib2.dart' as lib2;
> Element element1 = new Element();           // Uses Element from lib1.
> lib2.Element element2 = new lib2.Element(); // Uses Element from lib2.
> ```

### 部分导入

如果只需要导入库的一部分，有两种模式：

模式一：只导入需要的部分，使用show关键字，如下例子所示：

   ```dart
   import 'package:lib1/lib1.dart' show foo;
   ```

模式二：隐藏不需要的部分，使用hide关键字，如下例子所示：

 ```dart
 import 'package:lib2/lib2.dart' hide foo;  
 ```

### 延迟加载

也称为懒加载，可以在需要的时候再进行加载。懒加载的最大好处是可以减少APP的启动时间。懒加载使用deferred as关键字来指定，如下例子所示：

  ```dart
  import 'package:deferred/hello.dart' deferred as hello;
  ```

  当需要使用的时候，需要使用loadLibrary()方法来加载：

```dart
greet() async {
  await hello.loadLibrary();
  hello.printGreeting();
}
```

## async和await

这两个关键字的使用只需要记住两点：

- 只有async方法才能使用await关键字调用方法
-  如果调用别的async方法必须使用await关键字

async是让方法变成异步。await是等待异步方法执行完成。

## 空安全

​		Null safety翻译成中文的意思是空安全。null safety 可以帮助开发者避免一些日常开发中很难被发现的错误，并且额外的好处是可以改善性能。 Flutter2.2.0（2021年5月19日发布） 之后的版本都要求使用null safety。

### 解决方案

-  ? 可空类型

- ! 类型断言

- late 关键字主要用于延迟初始化。

  ```dart
  late int age;
  ```

### require关键词

​		equired翻译成中文的意思是需要、依赖required关键词:最开始 @required 是注解，现在它已经作为内置修饰符。

​		主要用于允许根据需要标记任何命名参数（函数或类），使得它们不为空。因为可选参数中必须有个 required 参数或者该参数有个默认值。

## 性能优化

### identical函数

dart:core 库中identical 函数的用法介绍如下。

用法:

```dart
bool identical(
  Object? a,   
  Object? b  
)
```

检查两个引用是否指向同一个对象。

```dart
var o = new Object();
var isIdentical = identical(o, new Object()); // false, different objects.
print(isIdentical);
isIdentical = identical(o, o); // true, same object
print(isIdentical);
isIdentical = identical(const Object(), const Object()); // true, const canonicalizes
print(isIdentical);
isIdentical = identical([1], [1]); // false
print(isIdentical);
isIdentical = identical(const [1], const [1]); // true
print(isIdentical);
isIdentical = identical(const [1], const [2]); // false
print(isIdentical);
isIdentical = identical(2, 1 + 1); // true, integers canonicalizes
print(isIdentical);
```

> const关键字在多个地方创建相同的对象的时候，内存只保留了一个对象

### 常量构造函数

1. 常量构造函数需以const关键字修饰
2. const构造函数必须用于成员变量都是final的类
3. 如果实例化时不加const修饰符，即使调用的是常量构造函数，实例化的对象也不是常量实例
4. 实例化常量构造函数的时候，多个地方创建这个对象，如果传入的值相同，只会保留一个对象。
5. Flutter中const 修饰不仅仅是节省组件构建时的内存开销，Flutter 在需要重新构建组件的时候，由于这个组件是不应该改变的，重新构建没有任何意义，因此 Flutter 不会重建构建 const 组件  

```dart
//常量构造函数
class Container{
  final int width;
  final int height;
  const Container({required this.width,required this.height});
}
```

> 实例化常量构造函数的时候，多个地方创建这个对象，如果传入的值相同，只会保留一个对象。
