# MySQL

## 认识MySQL

javaee：企业级Java开发	 web

前端（页面：展示，数据！）

后台（连接点：连接数据库jdbc，链接前端（控制，控制视图跳转，和给前端传递数据））

数据库（存数据）

> 操作系统	数据结构和算法	离散数学	数字电路	体系结构	编译原理	+     实战经验

## 概念

DB，datebase

数据仓库，软件，安装在操作系统（Windows，Linux，macos...）之上！

作用：存储数据，管理数据

## 分类

### 关系型数据库（SQL）

- MySQL,Oracle，sql server，db2，SQLlite

- 通过表和表之间，行和列之间的关系进行数据的存储

### 非关系型数据库（NoSQL：no only sql）

- redis，mongdb

- 非关系型数据库，对象存储，通过对象的自身的属性来决定

## DBMS(联想：cms，内容管理系统)

数据库的管理系统，科学有效的管理我们的数据，维护和获取数据

## 版本

5.7 最稳定    8.0较为稳定

> 安装建议：

- 尽量不要使用exe，会注册表，比较麻烦

## 连接数据库

> 命令行连接数据库

```sql
mysql -u用户名 -p密码   --这里不输入密码也行，下一步会让你输入密码
```

- 所有执行语句都以;结尾

> 一些常见命令

```sql
show datebases;		-- 查看所有的数据库
use 数据库名;			-- 切换到数据库
show tables; 		-- 查看当前数据库中表的信息
describe(desc) 表名     -- 查看表中的所有信息
exit;   	-- 退出

-- SQL注释
注意：#也是一中注释，但是不建议使用
-- 注释内容		 单行注释
/* 
	注释内容
*/			多行注释
```

> 数据库语言	crud 增删改查  
>
> DDL	定义		DML	操作		DQL	查询		DCL	控制

## 操作数据库（了解看懂就好）

操作数据库>操作数据库的表>操作数据库中表的数据，mysql关键字不区别大小写

- 创建数据库

```sql
CREATE DATABASE [IF NOT EXISTS] 数据库名;		//如果数据库名重名，可用[]内的内容，表示如果不存在
```

- 删除数据库

```sql
DROP DATABASE [IF EXISTS] 数据库名;				//如果数据库名重名，可用[]内的内容，表示如果存在
```

- 使用数据库

```sql
USE 数据库名/表名;			//如果表名或者数据库名字段是特殊字符段，就需要用``包裹数据库名/表名
```

- 查看数据库

```sql
SHOW DATABASE;			//查看所有的数据库
```

## 数据库的列类型

> 数值

- tinyint   十分小的数据   1个字节
- smallint   较小的数据   2个字节
- mediumint   中等大小的数据   3个字节
- **int   标准的整数     4个字节**   常用
- bigint     较大的数据   8个字节
- float   浮点数    4个字节
- double    浮点数   8个字节    （精度问题！）
- decimal   字符串形式的浮点数   金融计算的时候，一般是使用decimal

> 字符串       字符长度为n：无论是数字、字母还是utf-8汉字（每个汉字占3个字节），都可以存放n个

- char   固定长度的字符串   字符长度：0~255
- **varchar  可变字符串  字符长度：0~65535**   对应Java的string类型  常用
- tinytext   微型文本    字符长度：2^8-1   博客
- text   文本串   字符长度：2^16-1      书籍

> 时间日期			java.util.Date

- date   YYYY-MM-DD,日期格式
- time   HH:MM:SS,时间格式
- **datetime    YYYY-MM-DD HH:MM:SS**    常用的时间格式
- **timestamp**   时间戳，1970.1.1到现在的毫秒数！也较为常用
- year   年份表示

> null    没有值，未知    不要使用null进行运算，运算结果都为null，无意义

## 数据库的字段属性（重点！）

- 表的名称和字段尽量用``括起来，字符串使用''括起来
- 所有语句后面加,      最后一行不用加

> unsigned

- 无符号整数，声明该列不能声明为负数

> zerofill

- 0填充，不足的位数用零填充    如：5（事先定义为3个字符长度）对应005
- navicat 可能会不显示，但是可以查询是有0填充的

> 自增	AUTO_INCREMENT

- 自动在上一条记录的基础上+1（默认），通常用来设计唯一的主键~  index，并且必须是整数类型，可以自定义起始值和步长

> 非空    null   not null

- 假设设置为not null，如果不给它赋值，就会报错；如果为null，不填写值，默认就是null

> 默认

- 设置默认值，设置值会覆盖该值
- navicat设置值记得加' '

> 注释

```sql
COMMENT '注释内容'
```

> 主键

```sql
PRIMARY KEY (`表名`)
```

> 课外扩展
>
> 乐观锁：通过不加锁的方式处理资源，就是CAS，比较并替换
>
> 悲观锁？

---

> (阿里巴巴)项目规范：
>
> 每一个表，都必须存在以下5个字段,表示一个记录存在的意义
>
> id 	主键
>
> \`version\`	乐观锁
>
> is_delete	伪删除
>
> gmt_create	创建时间
>
> gmt_update	修改时间

## 创建表名

```sql
CREATE TABLE [if NOT EXISTS] `表名`(
	`字段名` 列类型 [属性] [索引] [注释],
  `字段名` 列类型 [属性] [索引] [注释],
  ......
  `字段名` 列类型 [属性] [索引] [注释]
)[表类型][字符集设置][注释]
```

> 常用命令

```sql
SHOW CREATE DATABASE 数据库名   -- 查看创建数据库的语句
SHOW CREATE TABLE 表名   -- 查看数据表定义的语句
DESC 表名    -- 显示表的结构
```

## 数据表的类型

```sql
-- 数据库引擎
/* 
	INNODB  默认使用
	MYISAM	早些年使用的
*/
```

|   对比项目   | MYISAM |    INNODB     |
| :----------: | :----: | :-----------: |
|   事务支持   | 不支持 |     支持      |
|  数据行锁定  | 不支持 |     支持      |
|   外键约束   | 不支持 |     支持      |
|   全文索引   |  支持  |    不支持     |
| 表空间的大小 |  较小  | 较大，约为2倍 |

常规使用操作：

- MYISAM   节约空间，速度较快
- INNODB   安全性高，事务的处理，多表多用户操作

> 扩展：
>
> 在物理空间存在的位置：
>
> 所有的数据库文件都存在data目录下，本质还是文件的存储，一个文件夹对应一个数据库
>
> MySQL引擎在物理文件上的区别：
>
> - INNODB在数据库表中只有一个.frm（表结构的定义文件）和.ibd（数据加索引）文件，以及上级目录下的ibdata1文件
> - MYISAM在数据库表中有多个文件
>   - *.frm:表结构的定义文件
>   - *.MYD:数据文件   （data）
>   - *.MYI:索引文件

> 设置数据库表的字符集编码

```sql
CHARSET=utf8
```

不设置的话，会是MySQL默认的字符集编码~（不支持中文）

当然，也可以在my.ini文件中配置默认的编码

```ini
character-set-server=utf8
```

## 修改和删除表

### 修改

```sql
ALTER TABLE 原表名 RENAME AS 新表名		-- 修改表名
ALTER TABLE 操作的表名 ADD 字段名 列属性    -- 添加字段
-- 修改表的字段 MODIFY 修改字段类型的约束 CHANGE  能字段重命名，重命名的同时可以修改约束
ALTER TABLE 表名 MODIFY 字段名 列属性   -- 修改约束
ALTER TABLE 表名 CHANGE 原字段名 新字段名 列属性  -- 重命名
```

### 删除

```sql
ALTER TABLE 表名 DROP 字段名			-- 删除表的字段
DROP TABLE [IF EXISTS] 表名     -- 删除表   []内表示如果存在再删除
```

- 所有的删除增加尽量加上判断是否存在，以免报错

注意点：

- ``   字段名使用这个包裹
- 注释使用 --或/* */包裹
- 符号使用英文

## 数据管理

### 外键（了解即可）

- 物理外键
- 逻辑外键
- 删除有外键关系的表的时候，要先删除引用别人的表（从表），再删除被引用的表

> 添加方式一    	在创建表的时候，增加约束（麻烦，比较复杂） 

```sql
KEY `约束名` (`作为外键的列的字段名`),
CONSTRAINT `约束名` FOREIGN KEY (`作为外键的列的字段名`) REFERENCES `引用表的主键`(`引用表的对应字段名`)    -- 这两句在主键声明后面添加
```

> 添加方式二  		创建表成功后，添加外键约束

```sql
ALTER TABLE 操作的表名 ADD CONSTRAINT `约束名` FOREIGN KEY (`作为外键的列的字段名`) REFERENCES `引用表的主键`(`引用表的对应字段名`)
```

- 方式一和方式二都是物理外键，数据库级别的键，我们不建议使用（避免数据库过多造成困扰）
- 最佳实践：
  - 数据库就是单纯的表，只用来存数据，只有行（数据）和列（字段）

### DML语言（重点）

数据操作语言

#### 添加    INSERT

```sql
INSERT INTO 表名(`字段名1`,`字段名2`,...) VALUES ('值1'),('值2'),...
-- 由于主键自增我们可以省略表名和字段名，此时它会一一匹配对应；可以多个值和一个字段（插入多条数据）
```

- 注意事项：

1. 字段和字段之间使用英文逗号隔开

2. 字段是可以省略的，我们在写语句时，值里面的内容要和字段一一对应，例如：

   ```sql
   INSERT INTO `student`(`name`,`pwd`,`sex`) VALUES ('李四','456','男'),('张三','123','男')
   ```

#### 修改    UPDATE

```SQL
UPDATE 表名 SET 需要修改的列名=修改值,需要修改的列名=修改值...... (WHERE id = n);  -- ()里面为条件，不指定条件则会修改所在列的所有值！
```

- 条件（WHERE子句）：可以等于，大于，小于，也可以使用其他运算符构建操作符，操作符运算后会返回`布尔值`！

|       操作符        |             含义             |
| :-----------------: | :--------------------------: |
|          =          |             等于             |
|       <>或!=        |            不等于            |
|          >          |             大于             |
|          <          |             小于             |
|         >=          |          大于或等于          |
|         <=          |          小于或等于          |
| BETWEEN 值1 AND 值2 | 值1到值2区间（包含值1和值2） |
|         AND         |   和，同时成立才能返回true   |
|         OR          |  或，至少一个成立则返回true  |

- 注意事项：

1. 条件可以看成是筛选行的条件，不指定条件则会修改所在列的所有值！
2. 修改值可以是一个变量或者函数

#### 删除	

1. DELETE命令

```SQL
DELETE FROM 表名(WHERE 条件语句)    -- 尽量避免不使用条件的情况（即删除全部数据）；删除指定数据
```

2. TRUNCATE命令

```sql
-- 完全清空数据库表，表的索引和结构不会发生改变
TRUNCATE 表名
```

区别：

- 相同点：都能删除数据，但不会删除表的结构
- 不同点：
  - TRUNCATE   重新设置自增列（回到数值1），计数器会归零；不会影响事务
  - DELETE   不会影响自增

> 扩展：
>
> DELETE 删除的问题，重启数据库，现象：
>
> - InnoDB    自增量会从1重新开始（存在于内存当中，断电即失）
> - MyISAM   继续从上一个自增量开始（存在文件中，不会丢失）

### DQL查询数据（重点）

DQL：数据查询语言

- 所有的查询操作都用它   Select
- 简单的查询，复杂的查询它都能做
- 数据库中最核心的语言，最重要的语句
- 使用频率最高

#### 查询字段

```sql
-- 查询表中所有数据
SELECT 字段1,... FROM 表名;
-- 以下为示例
SELECT `studentno`,`studentname` FROM student;    --查询指定字段
SELECT `studentno` AS 学号,`studentname` AS 学生姓名 FROM student AS 学生表;        
--给查询结果进行别名,使用AS进行别名，可以字段名 AS 别名，也可以表名 AS 别名
SELECT CONCAT('姓名：',studentname) AS 新名字 FROM student;    -- 使用concat函数进行字符串拼接
```

#### 去重  DISTINCT

去除查询语句结果中重复的数据，重复的数据中只显示一条

```sql
SELECT DISTINCT `studentno` FROM result     -- 查询结果有重复多余的数据，使用DISTINCT去重
```

> 扩展：
>
> ```sql
> SELECT VERSION();    -- 查看SQL版本号（函数）
> SELECT 100*3-1 AS 计算结果;     -- 进行计算（计算表达式）
> SELECT @@auto_increment_increment；   -- 查询自增的步长（变量）
> SELECT `studentno`,`studentresult`+1 AS 加1分后的分数 FROM result   -- 所有成绩加1分
> ```
>
> 数据库中的表达式：
> SELECT 表达式  FROM 表名;（这里的表达式有文本值、列、null、函数、计算表达式、系统变量...）

### WHERE条件子句

作用：检索数据中`符合条件`的值

搜索的条件一般为1个或多个表达式组成，返回结果为布尔值！

逻辑运算符

| 运算符 | 语法 |
| :----: | :--: |
|   与   |  &&  |
|   或   | \|\| |
|   非   |  !   |

比较运算符：模糊查询

|   运算符    |        语法        |                      描述                      |
| :---------: | :----------------: | :--------------------------------------------: |
|   IS NULL   |     a is null      |           如果操作符为null，结果为真           |
| IS NOT NULL |   a is not null    |          如果操作符不为null，结果为真          |
|   BETWEEN   | a between b and c  |           若a在b和c之间，则结果为真            |
|  **LIKE**   |      a like b      |        SQL匹配，如果a匹配b，则结果为真         |
|   **IN**    | a in (a1,a2,a3...) | 假设a在a1或者a2...其中的某一个值中，则结果为真 |

- LIKE语句中的字符匹配，%表示任意个字符，_表示一个任意字符

### 联表查询

JOIN语句：

- INNER JOIN 交集   如果表中至少有一个匹配，则返回行
- LEFT JOIN  左表    从左表返回所有的值，即使右表中没有匹配,对于右表没有值的部分，返回值中会用null来显示
- RIGHT JOIN  右表   从右表返回所有的值，即使左表中没有匹配,对于左表没有值的部分，返回值中会用null来显示

```sql
SELECT s.studentno,studentname,subjectno,studentresult
FROM student AS s
INNER JOIN result AS r ON s.studentno = r.studentno

SELECT s.studentno,studentname,subjectno,studentresult
FROM student AS s
LEFT JOIN result AS r ON s.studentno = r.studentno

SELECT s.studentno,studentname,subjectno,studentresult
FROM student AS s
RIGHT JOIN result AS r ON s.studentno = r.studentno

-- 查询缺考的同学 --
SELECT s.studentno,studentname,subjectno,studentresult
FROM student AS s
RIGHT JOIN result AS r ON s.studentno = r.studentno
WHERE studentresult IS NULL
```

- 七种表联查join连接：[SQL中的表联查 7种JOIN连接_KevinChen2019的博客-CSDN博客](https://blog.csdn.net/KevinChen2019/article/details/105823950)

> JION (连接的表) ON (判断的条件)	连接查询
>
> WHERE	等值查询

- 多表查询可以理解为嵌套的双表查询

#### 自连接

自己的表和自己的表连接，核心：**一张表拆为两张一样的表看待**

类似于Java子父类

### 分页和排序

排序：升序 ASC，降序 DESC

```sql
ORDER BY 排序的列的字段名 ASC/DESC
```

分类：缓解数据库的压力，提升用户的体验    瀑布流、懒加载（前端设计）

```sql
LIMIT 查询的起始下标,页面大小
-- 数据总数/页面大小=总页数
```

练习：

```sql
-- 查询Java第一学年，班级成绩前十且成绩大于80分的同学的姓名、学号、科目名称、成绩
SELECT `studentno`,`studentname`,`subjectname`,`studentresult`
FROM `student` AS a
INNER JOIN `subject` AS b
ON a.`gradeid` = b.`gradeid`
INNER JOIN `result` AS c
ON b.`subjectno` = c.`subjectno`
WHERE `studentresult` > 80 AND `subjectname` = 'java第一学年'
ORDER BY `studentresult` DESC
LIMIT 0,10
```

### 子查询

where (这个值是计算出来的)

本质：`在where语句中嵌套一个子查询语句`,当然，子查询有时候会出现where语句外部，类似于Java的方法

```sql
-- 示例，这里只有一层子查询，可以多层子查询
WHERE `studentresult`>=80 AND `subjectno` = (
	SELECT subjectno FROM `subject`;
  WHERE `subjectname` = `高等数学-2`;
)
```

### 分组以及过滤

```sql
GROUP BY r.studentname;    -- 通过r.studentname分组
HAVING 条件;  -- 分组数据过滤
```

## MySQL函数

> 官方对应文档：[MySQL ：： MySQL 5.7 参考手册 ：： 12.1 内置函数和运算符参考](https://dev.mysql.com/doc/refman/5.7/en/built-in-function-reference.html)

### 常用函数

```sql
SELECT ABS(-6);   -- 绝对值
SELECT CEILING(9.4);	   -- 向上取整
SELECT FLOOR(9.4);    -- 向下取整
SELECT RAND();   -- 返回一个0到1的随机数
SELECT SIGN(-10);  -- 判断一个数的符号 若是0则返回0 若是负数则返回-1 若是正数则返回1
SELECT CHAR_LENGTH('加油幽离');   -- 返回字符串的长度
SELECT CONCAT('我','爱','你');   -- 拼接字符串
SELECT INSERT('外国人',1,1,'中');    -- 字符串内容替换
SELECT REPLACE('幽离继续加油','加油','努力');    -- 替换出现的指定字符串
SELECT SUBSTR('幽离要继续加油',3,6);    -- 返回指定的字符串（源字符串，截取位置，截取长度）
SELECT CURRENT_DATE();   -- 获取当前的日期1
SELECT CURDATE();    -- 获取当前的日期2
SELECT NOW();   -- 获取当前的时间 包含日期和时分秒
SELECT LOCALTIME();    -- 获取本地的时间
SELECT SYSDATE();   -- 获取系统的时间
SELECT YEAR(NOW());    -- 获取时间中的年份
......
```

### 聚合函数（常用）

| 函数名称 |  描述  |
| :------: | :----: |
| COUNT()  |  计数  |
|  SUM()   |  求和  |
|  AVG()   | 平均值 |
|  MAX()   | 最大值 |
|  MIN()   | 最小值 |
|   ...    |  ...   |

```sql
-- 示例
-- 查表个数
SELECT COUNT(studentname) FROM student   -- 指定字段，会忽略该字段所有的null值，有主键执行效率最快
SELECT COUNT(*) FROM student  -- 不会忽略null值，本质为计算行数，会查看所有的列
SELECT COUNT(1) FROM student  -- 不会忽略null值，本质为计算行数，只会查看指定的列，没有主键执行效率最快
```

- 聚合函数不能用where+条件，要用having+条件！

### 数据库级别的MD5加密（扩展）

MD5不可逆，具体值的MD5是一样的；破解单纯就是一些常见数据的MD5比对

```sql
-- 示例
-- ...创建完了表
INSERT INTO testmd5 VALUES(1,'zhangsan','123456789')   -- 明文密码
UPDATE testmd5 SET pwd=MD5(pwd) (WHERE id = 1)    -- 加密,括号内的为条件
INSERT INTO testmd5 VALUES(2,'zhangsan002',MD5('123456789'))     -- 插入的时候加密
```

如何校验MD5的值：将用户传递进来的密码，进行MD5加密，然后比对加密后的值

## SELECT语法小结

相册有！

## 事务

### 原则

ACID原则(原子性、一致性、隔离性（事务隔离导致的一些问题）、持久性)

> 资料：[事务ACID理解_dengjili的专栏-CSDN博客_acid](https://blog.csdn.net/dengjili/article/details/82468576)

### 事务执行

- MySQL是默认开启事务自动提交的

```sql
SET autocommit = 0  -- 关闭
SET autocommit = 1  -- 开启（默认）
```

- 手动处理事务

```sql
SET autocommit = 0  -- 先关闭自动提交
START TRANSACTION  -- 事务开启：标记一个事务的开始，从这个之后的sql都在同一个事务内
INSERT XXX
......

SAVEPOINT   -- 设置一个事务的保存点，但不会提交
-- 一旦提交回滚无效，一旦回滚则提交无效
COMMIT    -- 提交：持久化（成功！）
ROLLBACK  -- 回滚：回到的原来的样子（失败！）

-- 事务结束
SET autocommit = 1  -- 开启自动提交
```

## 索引

> mysql官方对索引的定义为：索引（INDEX）是帮助mysql高效获取数据的数据结构。可以得到索引的本质：索引是数据结构。拥有排序和查找两大功能，用于解决where和order by后面字段是否执行快。

### 分类

- 主键索引(PRIMARY KEY)
  - 唯一的标识，主键不可重复，只能有一个列作为主键
- 唯一索引(UNIQUE KEY)
  - 避免重复的列出现，唯一索引可以重复，多个列可以标识为唯一索引

> 在一个表中，主键索引只能有一个，唯一索引可以有多个

- 常规索引(KEY/INDEX)
  - 默认的，index   KEY关键字来设置
- 全文索引(FullText)
  - 在特定的数据库引擎下才有，MyISAM
  - **快速**定位数据

```sql
SHOW INDEX FROM 表名;    -- 显示所有的索引信息
EXPLAIN SELECT * FROM 表名;     -- EXPLAIN 分析sql执行的情况,非全文索引
```

> 　参考资料：[【MySQL优化】——看懂explain_漫漫长途，终有回转；余味苦涩，终有回甘-CSDN博客_explain](https://blog.csdn.net/jiadajing267/article/details/81269067)

**索引在数据量小的情况用处不大！**

### 索引原则

- 索引不是越多越好
- 不要对进程变动
- 小数据量的表不需要加索引
- 索引一般加在常用来查询的字段上

> 索引的数据结构 

- Hash类型的索引
- Btree：innoDB的默认数据结构

> 阅读资料：[CodingLabs - MySQL索引背后的数据结构及算法原理](http://blog.codinglabs.org/articles/theory-of-mysql-index.html)

## 权限管理和备份

### 用户管理

- 可以在数据库管理工具可视化操作
- SQL语句操作：用户的表在user表下

```sql
-- 创建用户 CREATE USER 用户名 IDENTIFIED BY '密码'
CREATE USER baigui IDENTIFIED BY '123456';
-- 修改密码
SET PASSWORD = PASSWORD('111111');   -- 修改当前用户的密码 SET PASSWORD = PASSWORD('密码')
SET PASSWORD FOR baigui = PASSWORD('111111');    -- 修改指定用户的密码 SET PASSWORD FOR 用户 = PASSWORD('密码')
-- 重命名  RENAME USER 旧用户名 TO 新用户名
RENAME USER baigui TO youli;
-- 用户授权  ALL PRIVILEGES 全部权限，但不会高于root账户的权限（没有GRANT权限）；*.*:库、表
GRANT ALL PRIVILEGES ON *.* TO youli;
-- 查询用户的权限
SHOW GRANTS FOR youli；    -- 查询指定用户的权限
SHOW GRANTS FOR root@localhost;      -- 查询root用户的权限
-- 撤销权限 REVOKE 权限 数据库.表 TO/FROM 用户名
REVOKE ALL PRIVILEGES *.* TO youli；
-- 删除用户 DROP USER 用户名
DROP USER youli;
```

### 数据库备份

- 直接拷贝物理文件
- 数据库可视化管理工具导出备份
- 命令行（cmd）导出备份

```sql
mysqldump -hlocalhost（主机） -u用户名 -p密码 数据库名 表名 >绝对路径;   -- 导出一张表
mysqldump -hlocalhost（主机） -u用户名 -p密码 数据库名 表名1 表名2 ... >绝对路径;   -- 导出多张表
mysqldump -hlocalhost（主机） -u用户名 -p密码 数据库名 >绝对路径;   -- 导出数据库
```

> 命令行（cmd）导入数据库
>
> ```sql
> -- 登录数据库后在对应位置执行以下命令
> source 绝对路径;
> ```

## 规范数据库设计

数据库比较复杂，需要设计规范的数据库！

- **软件开发时的数据库设计**

1. 分析需求
2. 概要设计  ER图

### 三大范式

- 为什么需要数据规范化？

1. 信息重复
2. 更新异常
3. 插入异常     无法正常显示信息
4. 删除异常      丢失有效的信息

> 参考文档：[SQL三大范式 - 阿亮的笔记 - 博客园 (cnblogs.com)](https://www.cnblogs.com/aiqingqing/p/4398954.html)

- 第一范式：保证每一列不可再分（原子性）
- 第二范式：在第一范式的基础上更进一层,目标是确保表中的每列都和主键相关. 如果一个关系满足第一范式,并且**除了主键以外的其它列,都依赖于该主键**,则满足第二范式.
- 第三范式：在第二范式的基础上更进一层,目标是确保每列都和主键列直接相关,而不是间接相关. 如果一个关系满足第二范式,并且**除了主键以外的其它列都不依赖于主键列**,则满足第三范式. 

规范和性能的问题（鱼和熊掌不可兼得）

【阿里数据库管理规定：关联查询不得超过三张表！】

- 考虑商业化的需求和目标，（成本、用户体验！）数据库的性能更为重要
- 在规范性能的问题的时候，需要适当的考虑一下规范性！
- 有时候需要给某些表增加冗余的字段，这样可以让数据查询从多表查询变为单表查询
- 有时候会故意增加计算列，从大数据量降为小数据量的查询

## JDBC（Java后端重点）

Java操作数据库的规范，俗称JDBC

默认包：java.sql javax.sql 导入数据库的驱动包

### 我的第一个JDBC程序



