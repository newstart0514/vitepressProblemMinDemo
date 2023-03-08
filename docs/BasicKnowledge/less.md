# :sleepy:less

css的预处理器之一，其他还有类似的sass和stylus

## 注释

```less
// 该注释不会编译为css后不会显示
/* 该注释编译为css后仍会显示该注释 */
```

## 变量

```less
@color:red;
@ma:margin;
@se:.class;
*{
    @{ma}: 0;
    padding: 0;
    @{se}{
        color: @color;
    }
}
// 当然，url也可以
@{url}
```

- 变量是块级作用域
- 变量都会 **延迟加载** :相同变量名情况下，优先级为：该作用域下的该语句的下面的变量声明>该作用域下的该语句的上面的变量声明>该作用域外的变量声明

```less
// demo
@var:0;
.class{
    @var:1;
    .pass{
        @var:2;
        three: @var;
        @var:3;
    }
    one: @var;
}
/* 编译后 */
.class {
  one: 1;
}
.class .pass {
  three: 3;
}
```

## 嵌套规则

```less
@color:red;
@ma:margin;
@se:.class;
*{
    @{ma}: 0;
    padding: 0;
    @{se}{    // 父级关系
        color: @color;
        &:hover{        // 同级关系
            color: black;
        }
    }
}
```

## less中的混合

混合的定义在less规范里面有明确的指定，使用.形式来定义

普通混合，提取相同的代码写成一个“方法”

```less
.juzhong(){      // 使用（）来让css文件中不会显示该作用域，即为不带输出的混合
    display: flex;
    align-items: center;
    justify-content: center;   
}
* {
    .body{
        .juzhong();
    }
    .body2{
        .juzhong();
    }
}
-- 输出
* .body {
  display: flex;
  align-items: center;
  justify-content: center;
}
* .body2 {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

带参混合，相对于普通混合，在调用时增加了传入参数的功能,在不传参时，将会传入默认值（没有默认值会报错！）

```less
.juzhong(@d:flex){
    display: @d;
    align-items: center;
    justify-content: center;   
}
* {
    .body{
        .juzhong();
    }
    .body2{
        .juzhong(block);     // 当参数有多个时，如果传入的参数只有一个，那么可以将block改为@d:block来指定传入的参数输入哪个变量
    }
}
-- 输出
* .body {
  display: flex;
  align-items: center;
  justify-content: center;
}
* .body2 {
  display: block;
  align-items: center;
  justify-content: center;
}
```

> 扩展
>
> 三角形
>
> ```css
> .sjx {
>       width: 0;
>       height: 0;
>       border-width: 40px;
>       border-style: solid;
>       border-color: transparent transparent transparent red;}
>     }
> ```
>
> IE6可能会在三角形外面显示黑色（黑色部分和红色的正方形合成一个正方形），将border-style的对应的transparent的方向使用dashed（虚线）即可

当有多个同类型css代码作用域时，可以使用一个标识符，然后使用@_来匹配该标识符（匹配模式）

argument变量用来将多个参数记录在对应位置

## 运算

+-*/，和普通的编程语言一样

## 继承

相对于混合，不能引入参数,甚至是加括号；性能比混合高，灵活度比混合低；注意父类不能定义成混合

```less
#test{
	&:extend(.father)
}
#test:extend(.father){
}
// 继承实质上是将.father选择器和#test组合成一个选择器，声明块使用.father
// 关键字all：继承所有的和.father相关的声明块

// 实例
.juzhong{
    display: flex;
    align-items: center;
    justify-content: center;   
}
*:extend(.juzhong) {
    .body{
       color: aliceblue;
    }
    .body2{
        color: aqua;
    }
}
```

## less的避免编译

```less
~"避免编译的内容"
```

## 循环

在less中，若要实现循环的效果，使用递归的方式
