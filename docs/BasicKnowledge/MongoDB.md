# MongoDB

存储各种各样的json（bson），文档非关系型数据库

## 数据库文件放在其他地方并启动

```cmd
mongod --dbpath 绝对路径 --port 端口号;
```

## 基本概念

数据库、集合、文档

### 基本操作

大多数命令和MySQL类似；mongodb使用时，可以在没有预先声明创建的情况下进行

特殊的：

```db
db       // 查看当前所处的数据库
show collections      // 显示数据库的所有集合
```

## crud

### 插入

> [插入文档 - MongoDB-CN-Manual (mongoing.com)](https://docs.mongoing.com/mongodb-crud-operations/insert-documents)

```db
db.inventory.insertOne(  
   { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
)

db.inventory.insertMany([
 { item: "journal", qty: 25, tags: ["blank", "red"], size: { h: 14, w: 21, uom: "cm" } }, 
 { item: "mat", qty: 85, tags: ["gray"], size: { h: 27.9, w: 35.5, uom: "cm" } },
 { item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }])
```

- 如果插入文档时没有给文档指定_id属性，则数据库会自动为其添加（根据时间戳生成），作为文档的唯一标识

### 查询

> [查询文档 - MongoDB-CN-Manual (mongoing.com)](https://docs.mongoing.com/mongodb-crud-operations/query-documents)

```db
db.inventory.find( {} )     // 等同于MySQL的  SELECT * FROM inventory
db.inventory.find( { status: "D" } )     // 等同于MySQL的 SELECT * FROM inventory WHERE status = "D"
```

- 返回的是数组，可以在语句后加  [索引号]  来查询对应数据
- 可以使用.count()来获得数据数量

### 修改

> [更新文档 - MongoDB-CN-Manual (mongoing.com)](https://docs.mongoing.com/mongodb-crud-operations/update-documents)

```db
db.inventory.updateOne(
    { item: "paper" },     //条件
    {
        $set: { "size.uom": "cm", status: "P" }, 
        $currentDate: { lastModified: true }
    },
    {
        multi:ture     // 会将第二个匹配值也会进行修改
    }
)

db.inventory.replaceOne(
   { item: "paper" },
   { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 40 } ] }
)
```

- 使用[`$set`](https://docs.mongodb.com/master/reference/operator/update/set/#up._S_set) 运算符将**size.uom**字段的值更新为“ **cm**”，将状态字段的值更新为“ **P**”，
- 使用[`$currentDate`](https://docs.mongodb.com/master/reference/operator/update/currentDate/#up._S_currentDate)运算符将**lastModified**字段的值更新为当前日期。 如果**lastModified**字段不存在，则[`$currentDate`](https://docs.mongodb.com/master/reference/operator/update/currentDate/#up._S_currentDate)将创建该字段。 有关详细信息，请参见[`$currentDate`](https://docs.mongodb.com/master/reference/operator/update/currentDate/#up._S_currentDate)。
- update()默认会替换旧的对象，使用$set（修改指定的字段属性）可以解决这一问题，相反$unset会删除指定的属性
- updateone()默认只会修改一个值，而且是第一个匹配值，使用updatemany()即可

### 删除

> [删除文档 - MongoDB-CN-Manual (mongoing.com)](https://docs.mongoing.com/mongodb-crud-operations/delete-documents)

```db
db.inventory.deleteOne( { status: "D" } )
db.inventory.deleteMany({ status : "A" })     // {}里的内容为空会删除所有数据！
```

- remove()方法已弃用！
- drop()方法可以删除集合
- dropDatabase()方法可以删除数据库
- 一般数据库不会删除数据，现实开发删除只是加入字段来表示数据“删除”

## 文档之间的关系

### 一对一

使用内嵌文档来体现出一对一的关系

```db
db.wife.insert([{
 name : "武大郎"
 wife :{
	name : "潘金莲"
}
}])
```

### 一对多

父母和孩子、用户和订单、文章和评论

```db
// 在order表中创建一个userid和users表中的userid一样，然后根据下面两行代码来获取用户买了什么东西
var user_id = db.users.findOne({username:"zbj"})._id;
db.order.find({user_id:user_id});
```

### 多对多

商品和分类、老师和学生;在一对多的情况下，将id改为数组形式就行

## sort和投影

### sort（排列）

> [使用索引对查询结果进行排序 - MongoDB-CN-Manual (mongoing.com)](https://docs.mongoing.com/indexes/indexing-strategies/use-indexes-to-sort-query-results#pai-xu-he-suo-yin-qian-zhui)

- 1表示升序，-1表示降序

```db
db.data.find( {} ).sort( { a: 1 } )
```

### 投影

只显示想显示的列

```db
db.emp.find({},{name:1,_id:0,sal:1})
```

- _id会默认显示，当只填了该列为1时，其他列（除了__id列）都会隐藏起来
- 1为显示，0为隐藏

## Mongoose

MongoDB的一个模块；用node来操作MongoDB

> [Mongoose.js中文网 (mongoosejs.net)](http://www.mongoosejs.net/)
>
> [猫鼬 ODM v6.2.4 (mongoosejs.com)](https://mongoosejs.com/)
>
> [Mongoose v6.2.4: Schemas (mongoosejs.com)](https://mongoosejs.com/docs/guide.html)

### 连接数据库

```db
mongoose.connect('mongodb://数据库ip:端口号/数据库名');
```

- 端口号为27017（默认）则端口号可以省略不写

### 监听连接状态

```db
mongoose.connection.once("open",function() {});      // 监听数据库连接成功事件
mongoose.connection.once("close",function() {});     // 监听数据库连接断开事件
```

### 断开数据库

```db
mongoose.disconnect();
```

- MongoDB数据库一般情况下连接一次后除非项目停止服务器关闭，否则连接一般不会断开

### 创建约束和模型

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test',{useMongoClient:true});
mongoose.connection.once("open",function() {
    console.log("数据库连接成功")
});
var Schema = mongoose.Schema;     // 非必须的，将mongoose.Schema赋值给一个对象
var stuSchema = new Schema({
    name:String,
    age:Number,
    address:String,
    gender:{
        type:String,
        default:"female"
    }
});
// 通过schema来创建model
// model代表的是数据库中的集合，通过model才能对数据库进行操作
// student是要映射的集合名 mongoose会自动的将我们的单数集合名变为复数
var stuModel = mongoose.model("student",stuSchema);
// 向数据库中插入一个文档
stuModel.create({
    name:"swk",
    age:18,
    address:"花果山",
    gender:"man"
},function (err){
    if(!err){
        console.log("插入成功");
    }
});
```

### 模型的方法

```js
// 添加一个或多个文档到模型中  Model.creat(一个或多个文档对象,回调函数)
stuModel.create([
    {
        name:"hkj",
        age:18,
        address:"花果山",
        gender:"woman" 
    },{
        name:"shs",
        age:18,
        address:"花果山",
        gender:"mans"
    }
],function(err) {
    if(!err){
        console.log("插入成功");
    }
})
// 查询  Model.find(查询的条件,投影，查询选项（skip,limit）,回调函数),findOne、没有投影和查询选项
stuModel.find({name:"hkj"},'name age -_id',{skip:3 , limit:1},function (err , docs){
    if(!err){
        console.log(docs);    // 总会返回数组
    }
})
stuModel.findOne({name:"hkj"},function (err , doc){
    if(!err){
        console.log(docs);    // 总会返回数组
    }
})
stuModel.findById("id名",function (err , doc){
    if(!err){
        console.log(docs);    // 总会返回数组
    }
})
// 修改  Model.updateOne(查询条件,修改后的对象,配置参数,回调函数)
stuModel.updateOne({name:"hkj"},{$set:{age:20}},function(err){
    if(!err){
        console.log("修改成功！")；
    }
})
// 删除 Model.deleteOne(查询条件,回调函数)
stuModel.deleteOne({name:"shs"},function (err){
    if(!err){
        console.log("删除成功！")；
    }
})
// 统计文档数量  Model.count(查询条件,回调函数)
stuModel.count({},function (err , count){
    if(!err){
        console.log(count);
    }
})
```

> 其他详见：[Mongoose v6.2.4: (mongoosejs.com)](https://mongoosejs.com/docs/api/model.html)

### 文档的方法

Document是Model的唯一实例

```js
// 创建一个document
var stu = new stuModel001({
    name:"hhhh",
    age:18,
    address:"花果山",
    gender:"mans"
})
// 保存  具体方法见api文档
stu.save(function (err) {
    if(!err){
        console.log("保存成功！");
    }
})
// 查询
stu.findOne({},function (err , doc){
    if(!err){
        console.log(doc);
        // 修改 注意无条件参数
        doc.update({$set:{age:28}},function(err){
            if(!err){
                console.log("修改成功！");
            }
        })
        // 删除
        doc.remove(function (err){
            if(!err){
                console.log("删除成功！");
            }
        })
        // get方法
        console.log(doc.get("age"));
        // set方法 不会修改到数据库的值
        doc.set("name","猪小小");
        // id 获取id值
        doc.set(doc.id);
        // 将doc转换为object，转换后不能使用document方法和属性
        var o = doc.toObject();
    }
})
```

### 模块化

```js
// index.js
require("./tool");
var student = require("./tool2");
student.find({},function(err , docs){
    if(!err){
        console.log("succed!");
    }
})

// tool.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test',{useMongoClient:true});
mongoose.connection.once("open",function() {
    console.log("数据库连接成功")
});

// tool2.js
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var stuSchema = new Schema({
    name:String,
    age:Number,
    address:String,
    gender:{
        type:String,
        default:"female"
    }
});
var stuModel = mongoose.model("student",stuSchema);
model.exports = stuModel;
```

