# :kissing:HTML5

## 标题标签

1~6级标题

```html
<hx>内容</hx>    //x可用1~6替换
```

## 段落标签

```html
<p>内容</p>
<br/>   //这个仅作换行，实际还是一个段落
```

## 水平线标签

```html
<hr/>
```

##  字体样式标签

```html
		<strong>粗体</strong>
    <em>斜体</em>
    空&nbsp;&nbsp;&nbsp;格
    &gt;大于号 &lt;小于号
    &copy; 版权符号
```

## 图片

```html
<img src="地址（可用../表示上一级目录来获取相对目录）" alt="图片找不到显示的名称" title="鼠标悬停文字" width="宽度" height="高度">
```

## 超链接

```html
//targe可以嵌套iframe内联框架
<a herf="地址" targe="_blank/self" name='链接名字'></a>    //新窗口/本窗口/跳转
<a herf="#top">返回顶部</a>
<a href="mailto:1418591636@qq.com">邮件</a>
```

## 列表标签

```html
//有序列表
<ol>
  <li>1</li>
  <li>2</li>
</ol>
//无序列表
<ul>
  <li>1</li>
  <li>2</li>
</ul>
//自定义列表
<dl>
  <dt>列表名称</dt>
  <dd>1</dd>
  <dd>2</dd>
</dl>
```

## 表格标签

```html
<table border="1px">
  <tr>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td clospan="2">跨列</td>
  </tr>
  <tr>
    <td rowspan="2">跨行</td>
    <td></td>
  </tr>
</table>
```

## 视频和音频

```html
<video src="地址" controls autoplay></video>	//控制 自动播放
<audio src="地址" controls autoplay></audio>	//控制 自动播放
```

## 网页结构

```html
<header></header>	//头部
<section></section>	//独立区域
<footer></footer>	//脚部
<nav></nav>	//导航类辅助内容
```

## 内联框架

```ht
<iframe src="页面地址" name="框架标识名" frameborder="0" width="1000px" height="1000px"></iframe>
```

## 表单

```html
<from method="get/post" action="网站或请求处理的地址">
	<p>
    <input type="text/password" name="表单名字" value="初始值" size="宽度" maxlength="最大字符数">	//文本框
    <input type="text/password" name="表单名字" value="初始值" size="宽度" maxlength="最大字符数" readonly>	//文本框只读
    <input type="text/password" name="表单名字" value="初始值" size="宽度" maxlength="最大字符数" hidden>	//文本框隐藏
    <input type="text/password" name="表单名字" value="初始值" size="宽度" maxlength="最大字符数" placeholder="提示文字">	//文本框提示输入
    <input type="text/password" name="表单名字" value="初始值" size="宽度" maxlength="最大字符数" required>	//文本框非空判断
    <input type="text/password" name="表单名字" value="初始值" size="宽度" maxlength="最大字符数" patten="正则表达式">	//文本框正则表达判断
    <input type="radio" name="表单名字" value="值" size="宽度">	//单选框
    <input type="radio" name="表单名字" value="值" size="宽度" disabled>	//单选框禁用
    <input type="checkbox" name="表单名字" value="值" size="宽度">	//多选框
    <input type="radio" name="表单名字" value="值" size="宽度" checked>	//单选框默认选中
    <input type="checkbox" name="表单名字" value="值" size="宽度" checked>	//多选框默认选中
    <input type="button" name="表单名字" value="值" size="宽度">	//按钮
    <input type="image" src="图片地址"> //图片按钮
    <input type="sumbit" value="显示的名字">	//提交
    <input type="sumbit" value="显示的名字" disabled>	//提交禁止
    <input type="reset" value="显示的名字">	//重置
    <input type="file" name="文件名字">	//文件域
    <input type="email" name="名字"> //邮箱初级验证
    <input type="url" name="名字"> //url初级验证
    <input type="number" name="名字" min="最小值" max="最大值" step="步长"> //数字初级验证
    <input type="range" name="名字" min="最小值" max="最大值" step="步长"> //滑块
    <input type="search" name="名字">	//搜素框
    <select name="名称">	//下拉框，列表框
      <option value="选项的值">1</option>
      <option value="选项的值" selected>2</option>	//这里默认显示2，不是1
    </select>
    <textarea name="名字" cols="列数" rows="行数" >文本初始内容</textarea>	//文本域
  </p>
</from>
```

