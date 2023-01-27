# jQuery
## 入口函数

```js
$('div').hide();
//   1.等着页面DOM加载完毕再去执行js代码
//   $(document).ready(function () {
//     $('div').hide();
//   });
// 2.等着页面dom加载完毕再去执行js代码
// $(function() {
//     $('div').hide();
// })
```

- 相当于原生js中的DOMContentLoaded
- 这里的load事件不同于原生js中的load事件是等页面文档、外部的js文件、css文件、图片加载完毕才执行内部代码
- 等着DOM结构渲染完毕即可执行内部代码，不必等到所有的外部资源加载完成，jQuery帮我们完成了封装

## 顶级对象 $

- $是jQuery的别称，用来代替jQuery

- 相当于原生js中的window

> 不同点：
>
> ```js
> //   1.DOM对象：用原生js获取过来的对象就是DOM对象
>   var mydiv = document.querySelector('div');
> //   2.jquery对象：用jQuery方式获取过来的对象是jQuery对象，本质上是通过$把DOM元素进行了包装
>   $('div');
> //   3.jQuery对象只能使用jQuery方法，DOM对象则使用原生的JavaScript属性和方法
>   mydiv.style.display = 'none';
>   // $('div').style.display = 'none';    这种写法是不对的
>   $('div').hide();
>   // mydiv.hide();     这种写法是不对的
> ```

## jquery对象和DOM对象的相互转换

原生js比jQuery更大，原生的部分属性和方法jQuery没有进行封装

- DOM对象转换为jQuery对象    $('DOM结构');
- jQuery对象转换为DOM对象    $('DOM结构')[索引].原生js函数()  或   $('DOM结构').get[索引].原生js函数()

```js
// DOM对象转换为jQuery对象
    $('div');
    // 或
    // var mydiv = document.querySelector('div');
    // $(mydiv);
// jQuery对象转换为DOM对象
    $('div')[0].play();
    // $('div').get[0].play();
```

## 选择器

- **类似于css选择器**

### 基础选择器

标准：

```js
$("选择器")     // 里面选择器直接写css选择器即可，但是要加引号
```

> css选择器

|    名称    |          用法           |
| :--------: | :---------------------: |
|  ID选择器  |       $("#id名")        |
| 全选选择器 |         $("*")          |
|  类选择器  |      $(".class名")      |
| 标签选择器 |      $("标签名"")       |
| 并集选择器 |  $("div,p,li")【实例】  |
| 交集选择器 | $("li.current")【实例】 |

### 层级选择器

|    名称    |        用法        |
| :--------: | :----------------: |
| 子代选择器 | $("ul>li")【实例】 |
| 后代选择器 | $("ul li")【实例】 |

- 子代选择器只会获取子代一个层级的元素
- 后代选择器会获取到子代、子代的子代...层级的元素

> 扩展
>
> ```js
> $("选择器").css（"属性","属性值"）    // 设置样式
> ```

### 隐式迭代（重要）

遍历内部DOM元素（伪数组形式存储）的过程就叫做隐式迭代。

```js
//例子
//隐式迭代：把匹配的所有的所有元素内部进行遍历循环，给每一个元素添加css这个方法
$("div").css("background", "pink");
```

### 筛选选择器

|    语法    |   用法示例    |                       示例描述                       |
| :--------: | :-----------: | :--------------------------------------------------: |
|   :first   | $('li:first') |                   获取第一个li元素                   |
|   :last    | $('li:last')  |                  获取最后一个li元素                  |
| :eq(index) | $("li:eq(2)") | 获取到的li元素中，选择索引号为2的元素，索引号从0开始 |
|    :odd    |  $("li:odd")  |       获取到的li元素中，选择索引号为奇数的元素       |
|   :even    | $("li:even")  |       获取到的li元素中，选择索引号为偶数的元素       |

### 筛选方法

> 扩展
>
> ```js
> //示例 下拉菜单核心jQuery代码
> $(function() {
>   // 鼠标经过
>   $(".nav>li").mouseover(function() {
>     // $(this) jQuery 当前元素 this不要加引号
>     // show（）显示元素
>     $(this).children("ul").show();
>   })
>   // 鼠标离开
>   $(".nav>li").mouseout(function() {
>     $(this).children("ul").hide();
>    })
> })
> ```

### 排他思想

当前元素设置样式，其余的兄弟元素清除样式。

```html
<body>
  <button>快速</button>
  <button>快速</button>
  <button>快速</button>
  <button>快速</button>
  <button>快速</button>
  <button>快速</button>
  <button>快速</button>
  <script>
    $(function () {
      // 隐式迭代，为所有的按钮添加绑定事件
      $("button").click(function () {
        $(this).css("background", "yellow");
        $(this).siblings("button").css("backgroud", "");
      });
    });
  </script>
</body>
```

### 图片选项卡案例思路

通过mouseover事件获取到对应选项的索引号，然后将该图片对应的索引显示，其他隐藏（排他思想）

### 链式编程

让代码变得更加简短优雅，节省代码量；使用时注意是哪个对象执行样式

```js
//   原写法：
//   $(this).css("background", "yellow");
//   $(this).siblings("button").css("backgroud", "");
//   链式写法：
$(this).css("background", "yellow").siblings().css("background", "");
```

## 样式操作

### 操作css方法

jQuery可以使用css方法来修改简单元素样式；可以操作类，修改多个样式

1. 参数只写属性名（如上面的background），没有属性值时，这时会返回属性值
2. 参数有属性名和属性值时，属性值和属性名用英文逗号分隔，属性名需要添加引号，属性值如果是数字可以不用添加引号和单位
3. 参数可以是对象形式，方便设置多个样式;如果是复合属性则必须采用驼峰命名法；如果值不是数字则需要加引号

```js
$(this).css({
    color: "pink",
    width: 500px,
  	backgroundColor: "red",
  	......
})
```

### 设置类样式方法

作用等同于classList，可以操作类样式

1. 添加类

```js
// 示例
$("div").addClass("current");
```

2. 移除类

```js
// 示例
$("div").removeClass("current");
```

3. 切换类

```js
// 示例
$("div").toggleClass("current");
```

- 可以设置一些动画

### tab栏切换案例

```html
<body>
  <div class="tab_list">
    <ul>
      <li class="current">商品介绍</li>
      <li>规格包装</li>
      <li>售后保障</li>
      <li>商品评价</li>
      <li>手机社区</li>
    </ul>
  </div>
  <div class="tab_con">
    <div class="item" style="display: block">商品介绍模块内容</div>
    <div class="item">规格包装模块内容</div>
    <div class="item">售后保障模块内容</div>
    <div class="item">商品评价模块内容</div>
    <div class="item">手机社区模块内容</div>
  </div>
  <script>
    $(function () {
      $(".tab_list li").click(function () {
        $(this).addClass("current").siblings().removeClass("current");
        // 获取当前索引号
        var index = $(this).index();
        $(".item").eq(index).show().siblings().hide();
      });
    });
  </script>
</body>
```

### 类操作和classname的区别

| 原生js的classname |               会覆盖原来的类名               |
| :---------------: | :------------------------------------------: |
|      jQuery       | 类操作只是对指定类进行操作，不影响原来的类名 |

- 例如addclass函数是在已有的类名后追加类名

## 效果

### 显示隐藏

```js
hide/show/toggle(速度,切换效果,回调函数)
```

- 速度：slow/normal/fast或数字（单位为毫秒）
- 切换效果：swing（默认）/linear
- 回调函数：在动画完成时执行的函数，每个元素执行一次
- 参数都可以省略，无动画直接显示
- toggle为切换（显示/隐藏）效果

### 滑动效果

```js
slideUp/slideDown/slideToggle(速度,切换效果,回调函数)
```

- 速度：slow/normal/fast或数字（单位为毫秒）
- 切换效果：swing（默认）/linear
- 回调函数：在动画完成时执行的函数，每个元素执行一次
- 参数都可以省略

> 示例

```html
<head>
  ......
  <style>
    div {
      width: 150px;
      height: 300px;
      background-color: pink;
      display: none;
    }
  </style>
</head>
<body>
  <button>下拉滑动</button>
  <button>上拉滑动</button>
  <button>切换滑动</button>
  <div></div>
  <script>
    $(function () {
      $("button")
        .eq(0)
        .click(function () {
          // 下拉滑动
          $("div").slideDown();
        });
      $("button")
        .eq(1)
        .click(function () {
          // 上拉滑动
          $("div").slideUp();
        });
      $("button")
        .eq(2)
        .click(function () {
          // 滑动切换
          $("div").slideToggle();
        });
    });
  </script>
</body>
```

### 事件切换

- hover：$("css选择器").hover(鼠标经过执行的函数,鼠标离开执行的函数)
- 当只写了一个函数时，那么鼠标离开或者鼠标经过都会触发这个函数

```js
// $(".nav>li").mouseover(function () {
//   $(this).children("ul").show();
// });
// $(".nav>li").mouseout(function () {
//   $(this).children("ul").hide();
// });
// hover写法一
$(".nav>li").hover(function() {
  $(this).children("ul").show();
},function() {
  $(this).children("ul").hide();
})
// hover写法二
$(".nav>li").hover(function() {
  $(this).children("ul").toggle();
})
```

### 动画效果队列以及停止排队的方法

动画效果多次触发，造成多个动画效果排队执行

#### 停止排队

```js
stop()
```

- stop方法会结束上一次的动画，要写在动画方法前面

```js
$(".nav>li").hover(function() {
  $(this).children("ul").stop().toggle();
})
```

### 淡入淡出效果

```js
fadeIn/fadeOut/fadeToggle(速度,切换效果,回调函数)
```

- 速度：slow/normal/fast或数字（单位为毫秒）
- 切换效果：swing（默认）/linear
- 回调函数：在动画完成时执行的函数，每个元素执行一次
- 参数都可以省略

> 渐进方式调整到指定的不透明度

```js
fadeTo(速度,透明度,切换效果,回调函数)
```

- 透明度必须写，取值为0~1之间
- 速度：slow/normal/fast或数字（单位为毫秒），**必须写**
- 切换效果：swing（默认）/linear
- 回调函数：在动画完成时执行的函数，每个元素执行一次

```html
<head>
  ...
  <style>
    div {
      width: 150px;
      height: 300px;
      background-color: pink;
      display: none;
    }
  </style>
</head>
<body>
  <button>淡入效果</button>
  <button>淡出效果</button>
  <button>淡入淡出切换</button>
  <button>修改透明度</button>
  <div></div>
  <script>
    $(function () {
      $("button")
        .eq(0)
        .click(function () {
          $("div").fadeIn(1000);
        });
      $("button")
        .eq(1)
        .click(function () {
          $("div").fadeOut(1000);
        });
      $("button")
        .eq(2)
        .click(function () {
          $("div").fadeToggle(1000);
        });
      $("button")
        .eq(3)
        .click(function () {
          $("div").fadeTo(1000, 0.5);
        });
    });
  </script>
</body>
```

**突出显示案例思路：**

利用hover函数，让当前元素li的其他元素li透明度改为半透明（0.5，利用fadeTo方法），鼠标离开还原为透明度1，记住要使用stop方法来停止动画效果排队

### 自定义动画

```js
animate(样式属性,速度,切换效果,回调函数)
```

- 样式属性：想要修改的样式属性，这个必须写，其余参数可不写；以对象形式传递。属性名可以不用带引号，如果是复合属性则需要采用驼峰命名法
- 速度：slow/normal/fast或数字（单位为毫秒）
- 切换效果：swing（默认）/linear
- 回调函数：在动画完成时执行的函数，每个元素执行一次

```html
<head>
  .
  <style>
    div {
      position: absolute;
      width: 200px;
      height: 200px;
      background-color: pink;
    }
  </style>
</head>
<body>
  <button>动起来</button>
  <div></div>
  <script>
    $(function () {
      $("button").click(function () {
        $("div").animate(
          {
            left: 200,
            top: 200,
            opacity: 0.5,
            width: 500,
          },
          500
        );
      });
    });
  </script>
</body>
```

## jQuery属性操作

### 设置或获取元素固有的属性值 prop()

```js
prop("属性名");     // 获取属性值
prop("属性名","属性值");        // 修改属性值  
// 判断复选框是否被选中
$("input").change(function() {
	console.log($(this).prop("checked"));
})
```

###  设置或获取元素自定义的属性值 attr()

```js
attr("属性名");     // 类似于原生的getAttribute(),获取自定义属性
attr("属性名","属性值");     // 类似于原生的setAttribute()，修改自定义属性
```

### 数据缓存 data()

data方法可以在指定的元素上存储数据，并不会修改DOM元素结构。一旦页面刷新，之前存放的数据都将被移除

```js
$("span").data("name","john");
console.log($("span").data("name"));     // 相当于存储了一个变量和变量值

console.log($("div").attr("data-index"));
console.log($("div").data("index"));
// data方法获取data-index h5自定义属性 第一个不用写data- 而且返回的是数字型
```

## jquery内容文本值

主要针对元素的内容还有表单的操作

1. 普通元素内容html()  (相当于原生inner HTML)

```js
html()    // 获取元素内容
html("元素内容")    // 设置元素内容
```

2. 元素文本内容text()  (相当于原生inner text)

```js
text()     // 获取文本内容
text("文本内容")     // 设置文本内容
```

3. 获取设置表单值val()   (相当于原生value)

```js
val()    // 获取表单的值
val("表单值")     // 设置表单的值
```

## jQuery元素操作

主要是遍历、创建、添加、删除元素操作

### 遍历元素

给同一类元素做不同的操作，需要用到遍历

语法1：

```js
$("css选择器").each(function (索引号名称,DOM元素对象名称){...;...})
```

- 注意DOM元素对象不是jQuery对象

- 索引号名称和DOM元素对象名称可以自己命名

```js
// 示例
var arr = ["red","yellow","green"];
  $("div").each(function(i,domEle) {
      $(domEle).css("color",arr[i]);
  })
```

> 扩展
>
> parseInt(数值/结果)      // 将数值/结果转换为整数

语法2：

```js
$.each(对象,function (索引号名称,DOM元素对象名称){...;...})
```

- 对象：$("css选择器")、数组名、{属性名：属性值;......}等都可以

### 创建元素

```js
$("<li></li>");    // 动态创建一个li标签
```

### 添加元素

1. 内部添加

```js
元素.append("内容")     // 将内容放入匹配元素内部最后面，类似于原生appendChild
元素.prepend("内容")     // 将内容放入匹配元素内部最前面
```

2. 外部添加

```js
元素.after("内容")      // 将内容放入目标元素后面
元素.before("内容")       // 将内容放入目标元素前面
```

- 内部添加生成之后，它们是父子关系
- 内部添加生成之后，它们是兄弟关系

### 删除元素

```js
元素.remove()     // 删除匹配的元素（本身）   自杀
元素.empty()     // 删除匹配的元素集合中所有的子节点  清空子元素
元素.html("")     // 清空匹配的元素内容  和empty类似
```

> 实例

```html
<body>
  <ul>
    <li>我是原有的li</li>
  </ul>

  <div class="test">我是最开始的div</div>

  <script>
      var li = $("<li>我是新建的li</li>");
      // $("ul").append(li);
      // $("ul").prepend(li);
      var div = $("<div>我是后来的div</div>");
      // $(".test").after(div);
      // $(".test").before(div);
      });
      $("ul").remove();
      $("ul").empty();
      $("ul").html("");
  </script>
</body>
```

## 尺寸、位置操作

### 尺寸

- 以上参数为空，则是获取相应值，返回的是数字型
- 如果参数为数字，则是修改相应值
- 参数可以不写单位

### 位置

- offset方法设置或返回相对于文档的偏移坐标，与父级没有关系
- position方法返回相对于父级的偏移坐标，不能设置偏移坐标！
- scrollTop()/scrollLeft()方法设置或元素被卷去的头部和左侧

```js
console.log($(".son").offset()); // 获取对象距离文档的位置（偏移）
console.log($(".son").offset().top); // 获取top属性值
// 设置距离文档的位置（偏移）
$(".son").offset({
  top: 200,
  left: 200,
});
console.log($(".son").position());  // 获取对象距离父元素的位置（偏移）；不能设置，只能获取
//   页面滚动事件
$(window).scroll(function() {
  console.log($(document).scrollTop());     // 获取到卷去的头部的高度
  console.log($(document).scrollLeft());     // 获取到卷去的左部的高度
})

scrollTop/scrollLeft(值)     // 页面滚动至卷去头部/左部的位置
```

> 返回顶部核心代码

```js
$(".back").click(function() {
  $("body,html").stop().animate({
		scrollTop: 0
  })
})
// 注意body,html这里不能用document（整个文档）做动画
```

## 事件

### 事件处理

#### on绑定

```js
元素.on(事件,选择器,回调函数)
```

- 事件：一个或多个用空格分隔的事件类型，如click
- 选择器：元素（对象）的子元素选择器
- 回调函数：绑定在元素身上的侦听函数

```js
// 实例
$("div").on({
  mouseenter: function() {
		$(this).css("background","blue");
  },
  click{
		$(this).css("background","yellow");
	},
});
$("div").on("mouseenter mouseleave",function() {
	$(this).toggleClass("current");
})
// on实现事件委托实例  事件绑定在ul上，但是事件触发在子元素li上
$("ul").on("click","li",function() {
	alert(11);
})    // on可以给后续添加的li元素也能触发事件
```

#### off解绑

```js
元素.off(事件,选择器)
```

- 若没有填写事件，则会解绑所有的事件
- 选择器：元素（对象）的子元素选择器

#### one一次绑定

```js
元素.one(事件,选择器,回调函数)
```

- 事件：一个或多个用空格分隔的事件类型，如click
- 选择器：元素（对象）的子元素选择器
- 回调函数：绑定在元素身上的侦听函数

### 自动触发

现实应用：轮播图等

1. 元素.事件名()

```js
// 实例
$("div").click();
```

2. 元素.trigger("事件名")

```js
// 实例
$("div").trigger("click");
```

3. 元素.triggerHandler("事件名"),不会触发元素的默认行为（如输入框的输入行为）

```js
// 实例
$("div").triggerHandler("click");
```

> 实例

```html
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <script src="jquery.min.js"></script>
  <style>
    body {
      margin: 0;
      padding: 0;
    }
    .box {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 1px solid black;
    }
  </style>
</head>
<body>
  <div class="box">
    <input type="text" />
  </div>
  <script>
    $("input").on("focus", function () {
      $(this).val("你好吗");
    });
    //   $("input").triggerHandler("focus");
    $("input").trigger("focus");
  </script>
</body>
```

### 事件对象

事件被触发，就会有事件对象的产生

1. 阻止默认行为：event.preventDefault() 或者 return false
2. 阻止冒泡：event.stopPropagation()

## jQuery其他方法

### 拷贝对象

**用途：**把某个对象拷贝（合并）给另一个对象使用

**语法：**

```js
$.extend([deep],target,object1,[objectN])
```

- deep: ture深拷贝   false浅拷贝, 默认为浅拷贝；若属性冲突，则会覆盖原有的属性！
- target：要拷贝的目标对象
- object1：待拷贝到第一个对象的对象
- 浅拷贝是把被拷贝的对象**复杂数据类型中的地址**拷贝给目标对象，修改目标对象会**影响**被拷贝对象
- 深拷贝是完全克隆（拷贝的是对象，而不是地址），修改目标对象**不会影响**被拷贝的对象

```js
// 示例
targetObj{
	id: 1,
}
obj{
	id: 2,
  name: bg,
}
$.extend(targetObj, obj);
```

### 多库共存

第三方库或自建库的标识符和jQuery库冲突

解决方法：

1. 把jQuery的标识符$统一改为jQuery
2. 自定义新的标识符，使用$.noConflict()方法

```js
var handsome = $.noConflict();
handsome("span");    // 等同于$("span")
```
