# CSS

## CSS四种导入方式

- 优先级：行内样式>内部样式>外部样式（就近原则）

```html
<head>
  <style>
    选择器{
      声明1;
      声明2;
    }
  </style>	//内部样式
</head>
或
<link rel="stylesheet" herf="css地址">	//外部样式1(链接式),html
或
<style>
	@import url("css/style.css")
</style>	//外部样式2(导入式),css2.1
或
<h1 style="声明"></h1>	//行内样式
```

## CSS选择器

选择某个或者某一类元素

###  基本选择器

1. 标签选择器	如：h1、h2、p
2. 类选择器 class  如：标签定义class（命名不要数字开头），然后.class选择，可以使用同一class复用
3. id选择器    如：标签定义id属性（命名用英文字母），然后#id名称选择，注意id全局唯一！

### 层次选择器

1. 后代选择器：在某个选择器后所有层次

```html
body p{
	background: red;
}
```

2. 子选择器:在某个选择器后一个层次

```html
body>p{
	background: red;
}
```

3. 兄弟相邻选择器：相邻的相同标签，向下寻找，只有一个

```html
body+p{
	background: red;
}
```

4. 通用兄弟选择器：相同标签，向下寻找

```html
body~p{
	background: red;
}
```

### 伪类选择器

```html
		<style>
        /* ul的第一个子元素 */
        ul li:first-child{
            background-color: violet;
        }
        /* ul的最后一个子元素 */
        ul li:last-child{
            background-color: white;
        }
      	/* 选中父元素的第一个元素p */
        p:nth-child(1){
            background-color: whitesmoke;
        }
      	/* 选中父元素中的p元素中的第一个 */
        p:nth-of-type(1){
            background: yellow;
        }
    </style>
```

### 属性选择器

- =   绝对等于
- *=   部分等于即可
- ^=   开头部分元素等于即可
- $=   结尾部分元素等于即可

## 美化网页

- 重点突出的文字，可以使用span标签包起来

### 字体样式

```html
		body{
            font-family: 'Courier New', Courier, monospace; /* 字体 */
            font-size: 50px;   /* 字体大小 */
            font-weight: bold;   /* 字体粗细 */
            color: yellow;    /* 字体颜色 */
        }
```

### 文本样式

- rgba(0,颜色1,颜色2,透明度)
- rgb(0,颜色1,颜色2)

```html
		<style>
      body {
        font-family: "Courier New", Courier, monospace; /* 字体 */
        font-size: 50px; /* 字体大小 */
        font-weight: bold; /* 字体粗细 */
        color: yellow; /* 字体颜色 */
        text-align: center;  /* 排版 */
        text-indent: 2em; /* 首行缩进两个字符 */ 
        line-height: 300px;  /* 行高，可以和块高度一致，就可以上下居中 */
        text-decoration: line-through; /* 删除线 */
        text-decoration: underline; /* 下划线 */
        text-decoration: none; /* 可以用来去除下划线 */
        vertical-align: middle; /* 文本图片水平对齐 */
      }
    </style>
```

### 文本阴影和超链接伪类

```css
/* 伪类 */
/* 未访问的链接 */
a:link {
  color: #FF0000;
}

/* 已访问的链接 */
a:visited {
  color: #00FF00;
}

/* 鼠标悬停链接 */
a:hover {
  color: #FF00FF;
}

/* 已选择的链接 */
a:active {
  color: #0000FF;
}

/* 阴影 */
body {
         text-shadow: #000 50px 50px 50px;
                    /* 颜色 水平偏移 垂直偏移 阴影半径 */
}
```

## 列表

```css
body{
	list-style:none/circle/square/decimal;  /* 去掉原点/空心圆/小正方形/数字 */
}
```

## 背景图像应用以及渐变

```css
		<style>
        body {
            width: 1000px;
            height: 500px;
            border: 1px solid red; /* 边框 粗细 样式(solid/dashed 实线/虚线) 颜色 */
            background-repeat: no-repeat/repeat/repeat-x/repeat-y; /* 默认为repeat */
          	background: red url("图片地址") 水平偏移 垂直偏移 no-repeat;
        }
    </style>
```

## 盒子模型

- 外边距	margin
- 内边距    padding
- 边框        border

```css
border-radius: 20px 20px 20px 20px; /* 圆角设置 左上 右上 右下 左下 顺时针 */
```

## display和浮动

```css
/* display */
display:block/inline/inline-block/none; /* 块元素/行内元素/是块元素，但是可以内联，在一行！ */
/* float */
float:left/right /* 左浮动/右浮动 */
```

## 父级边框塌陷问题（子级浮动，父级边框很窄）

```css
clear:left/right/both /* 不允许左侧有浮动元素/不允许右侧有浮动元素/不允许两侧有浮动元素 */
overflow:hidden/auto
```

解决办法：

1. 增加父级元素的高度
2. 在下方增加空的div标签，用clear清除浮动
3. 用overflow
4. 给父类添加一个伪类(如：#father:after)，然后设置成块元素，然后用clear清除浮动，与2类似

## 定位

### 相对定位 relative

相对于原有位置移动

### 绝对定位 absolute

- 没有父级元素定位的前提下，相对于浏览器定位
- 假设父级元素存在定位，通常相对于父元素进行偏移

### 固定定位 fixed

- 固定在某一个位置，不会因为滚动条的移动而移动

## 层级

- z-index:层级数 （最小为0）

## 透明度

- opacity:0.5 
