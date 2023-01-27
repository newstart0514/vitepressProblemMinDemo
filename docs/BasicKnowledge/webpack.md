# webpack

## 简介

​		webpack 是一种前端资源构建工具，一个静态模块打包器(module bundler)。 在 webpack 看来, 前端的所有资源文件(js/json/css/img/less/...)都会作为模块处理。 它将根据模块的依赖关系进行静态分析，打包生成对应的静态资源(bundle)。

## 五大核心概念

### Entry

入口(Entry)指示 webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图。

### Output

输出(Output)指示 webpack 打包后的资源 bundles 输出到哪里去，以及如何命名。

### Loader

Loader 让 webpack 能 够 去 处 理 那 些 非 JavaScript 文 件 (webpack 自 身 只 理 解 JavaScript)。

### Plugins

插件(Plugins)可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩， 一直到重新定义环境中的变量等。

### Mode

模式(Mode)指示 webpack 使用相应模式的配置。 

|    选项     |                             描述                             |            特点             |
| :---------: | :----------------------------------------------------------: | :-------------------------: |
| development | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置 为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。 | 能让代码本地调试 运行的环境 |
| production  | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置 为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 Ter | 能让代码优化上线 运行的环境 |

## webpack初体验

- 入口文件：
  - 开发环境：webpack  ./src/index.js  -o  ./bulid/bulit.js  --mode=development
  - webpack会以./src/index.js为入口文件开始打包，打包输出到./bulid/bulit.js，整体打包环境，是开发环境
  - 生产环境： webpack  ./src/index.js  -o  ./bulid/bulit.js  --mode=production
  - webpack会以./src/index.js为入口文件开始打包，打包输出到./bulid/bulit.js，整体打包环境，是生产环境
  - webpack能处理js/json，不能处理css/img等其他资源；生产环境比开发环境多一个压缩js代码；生产环境和开发环境将ES6模块化编译成浏览器能识别的模块化

> 扩展：当项目到达一定规模，就会需要考虑优化，比如文件划分、压缩混淆、tree shaking（[Tree Shaking概念详解_我不是费圆的博客-CSDN博客_tree-shake](https://blog.csdn.net/weixin_45820444/article/details/108845845)）、使用一些语法糖之类的。

## 打包样式资源

- webpack.config.js	webpack的配置文件，用以指示webpack干哪些活(当你运行webpack指令时，会加载里面的配置)
- 所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs

webpack.config.js文件

```js
// webpack的配置文件

// resolve用来拼接绝对路径的方法
const { resolve } = require('path');

module.exports = {
    // 入口起点
    entry: './src/index.js',
    // 输出
    output: {
        // 输出文件名
        filename: "bulit.js",
        // 输出路径  __dirname表示当前目录绝对路径
        path: resolve(__dirname,'bulid'),
    },
    // loader的配置
    module: {
        rules: [
            // 详细loader配置
            // 不同文件必须配置不同的loader处理
            {
                // 匹配哪些文件
                test: /\.css$/,
                // 使用哪些loader处理
                use: [
                    // use数组中loader执行顺序：从右到左或从下到上依次执行
                    // 创建style标签，将js中的样式资源插入进行，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs模块加载到js中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 将less文件编译成css文件
                    'less-loader'
                ]
            }
        ]
    },
    // plugins的配置  不使用plugins把下面这段注掉
    // plugins: [
    //     // 详细的plugins配置      
    // ],
    mode: 'development',
    // mode: 'production'
}
```

index.css文件

```css
html,body{
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: pink;
}
```

index.js文件

```js
// 引入样式资源
import './index.css';
import './index.less';
```

index.less文件

```less
#title {
    color: #fff;
}
```

index.html文件

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
    <h1 id="title">hello less</h1>
    <script src="./bulid/bulit.js"></script>
  </body>
</html>

```

## 打包html资源

index.html文件

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
    <h1 id="title">hello html</h1>
  </body>
</html>
```

index.js文件

```js
function add(x, y){
    return x + y;
}
console.log(add(2, 3));
```

webpack.config.js文件

```js
/*
    loader:  1.下载    2.使用（配置loader）
    plugins:  1.下载   2.引入  3.使用
*/
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bulit.js',
        path: resolve(__dirname,'bulid')
    },
    // module: {
    //     rules: [

    //     ]
    // },
    plugins: [
        // html-webpack-plugin
        // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/css）
        // 需求：需要有结构的HTML文件
        new HtmlWebpackPlugin({
            // 复制一个.src/index.html文件，并自动引入打包输出的所有资源（JS/CSS）
            template: './src/index.html'
        })
    ],
    mode: 'development'
}
```

## 打包图片资源

webpack.config.js文件：

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bulit.js',
        path: resolve(__dirname,'bulid')
    },
    module: {
        rules: [
            {
                test: /\.less$/i,
                // 多个loader处理使用use
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                // 问题：默认处理不了html中img图片
                // 处理图片资源
                test: /\.(jpg|png|gif)/,
                // 使用一个loader
                // url-loader 依赖于 file-loader
                loader: 'url-loader',
                options: {
                    // 图片大小小于8kb，就会被base64处理
                    // 优点：减少请求数量（减轻服务器压力）
                    // 缺点：图片体积会更大(文件请求速度更慢)
                    limit: 8 * 1024,
                    // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs，解析时会出现问题：<img src="[object Moudle]" alt="angular">（src路径错误的问题）
                    // 解决办法：关闭url-loader的es6模块化，使用commonjs解析
                    esModule: false,
                    // 给图片进行重命名
                    // [hash:10]取图片的hash前10位
                    // [ext]取文件原来的扩展名
                    name: '[hash:10].[ext]'
                }
            },
            {
                test: /\.html$/,
                // 处理html文件的img图片(负责引入img，从而能被url-loader进行处理)
                loader: 'html-loader'
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}
```

index.html文件：

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
    <div id="box1"></div>
    <div id="box2"></div>
    <div id="box3"></div>
  </body>
</html>
```

index.js文件：

```js
import './index.less';
```

index.less文件：

```less
#box1{
    width: 100px;
    height: 100px;
    background-image: url(./vue.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

#box2{
    width: 200px;
    height: 200px;
    background-image: url(./react.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

#box3{
    width: 300px;
    height: 300px;
    background-image: url(./angular.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
```

## 打包其他资源

index.html文件：

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
    <span class="iconfont icon-test1"></span>
    <span class="iconfont icon-test2"></span>
    <span class="iconfont icon-test3"></span>
    <span class="iconfont icon-test4"></span>
  </body>
</html>
```

index.js文件：

```js
// 引入 iconfont 样式文件
import './iconfont.css'
```

webpack.config.js文件：

```js
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bulit.js',
        path: resolve(__dirname,'bulid')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                type: 'javascript/auto'
            },
            // 打包其他资源(除了html/css/js资源以外的资源)
            {
                // 排除css/js/html资源以外的资源
                exclude: /\.(css|js|html)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}
```

## 问题小结

在前面打包图片和打包字体图标资源的时候，图片和图标并没有按预期结果显示！

解决方法：

> 资料：[webpack 中文文档 (docschina.org)](https://webpack.docschina.org/guides/asset-modules#root)

(1).经过查询文档，webpack5.0版本对内联资源的语法有了很大的改动，将webpack.config.js文件改为：

```js
// const { resolve } = require('path');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bulit.js',
        path: path.resolve(__dirname,'bulid'),
        // assetModuleFilename: 'images/[hash][ext][query]'
    },
    module: {
        rules: [
            {
                test: /\.less$/i,
                // 多个loader处理使用use
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                // 问题：默认处理不了html中img图片
                // 处理图片资源
                test: /\.(jpg|png|gif)/,
                type: 'asset/inline'
                // type: 'asset/resource'
                // 使用一个loader
                // url-loader 依赖于 file-loader
                // loader: 'url-loader',
                // options: {
                //     // 图片大小小于8kb，就会被base64处理
                //     // 优点：减少请求数量（减轻服务器压力）
                //     // 缺点：图片体积会更大(文件请求速度更慢)
                //     limit: 8 * 1024,
                //     // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs，解析时会出现问题：<img src="[object Moudle]" alt="angular">（src路径错误的问题）
                //     // 解决办法：关闭url-loader的es6模块化，使用commonjs解析
                //     esModule: false,
                //     // 给图片进行重命名
                //     // [hash:10]取图片的hash前10位
                //     // [ext]取文件原来的扩展名
                //     name: '[hash:10].[ext]'
                // }
            }
            // {
            //     test: /\.html$/,
            //     // 处理html文件的img图片(负责引入img，从而能被url-loader进行处理)
            //     // loader: 'html-loader'
            //     type: 'asset/resource',
            //     generator: {
            //         filename: 'static/[hash][ext][query]'
            //     }
            // }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}
```

另外index.js改为：

```js
import './index.less';
import vuemap from './vue.jpg';
import reactmap from './react.png';
import angularmap from './angular.jpg';

block.style.background = `url(${vuemap})`;
block.style.background = `url(${reactmap})`;
block.style.background = `url(${angularmap})`;
```

(2).`asset/resource` 发送一个单独的文件并导出 URL。之前通过使用 `file-loader` 实现；这个无法解决这个问题的！

## devServer（热部署）

webpack.config.js文件（其他文件自定义）

```js
const {resolve} = require('path');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bulit.js',
        path: resolve(__dirname,'bulid')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                type: 'javascript/auto'
            },
            // 打包其他资源(除了html/css/js资源以外的资源)
            {
                // 排除css/js/html资源以外的资源
                exclude: /\.(css|js|html)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',

    // 开发服务器devServer：用来自动化（自动编译、自动打开浏览器，自动刷新浏览器~~）
    // 特点：只会在内存中编译打包，不会有人任何输出到本地代码
    // 启动devServe指令为：webpack-dev-serve   npx webpack serve
    devServer: {
        static: {
            directory: path.join(__dirname, 'bulid'),
        },
        // 开启gzip压缩
        compress: true,
        // 启动端口号
        port: 3000,
        // 自动打开浏览器
        open: true
    },
}
```

## 开发环境配置

能让项目代码运行，运行项目指令：

- webpack 会将结果打包出去
- npx webpack-dev-server 只会在内存中打包，没有输出 

## 提取css为单个文件

index.html文件：

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
    <div id="box1"></div>
    <div id="box2"></div>
  </body>
</html>
```

index.js文件：

```js
import '../css/a.css';
import '../css/b.css';
```

a.css文件：

```css
#box1 {
    width: 100px;
    height: 100px;
    background-color: pink;
}
```

b.css文件：

```css
#box2 {
    width: 100px;
    height: 100px;
    background-color: deeppink;
}
```

webpack.config.js文件：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/bulit.js',
        path: resolve(__dirname,'bulid')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 创建style标签，将样式放入
                    // 'style-loader',
                    // 这个loader取代style-loader。作用：提取js中的css成单独文件
                    MiniCssExtractPlugin.loader,
                    // 将css文件整合到js文件中
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            // 对输出的文件进行重命名
            filename: 'css/bulit.css'
        })
    ],
    mode: 'development'
};
```

## css文件兼容性处理

index.html、index.js、a.css、b.css文件一致

package.config.js文件：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 设置nodejs环境变量
process.env.NODE_ENV = 'development';

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/bulit.js',
        path: resolve(__dirname,'bulid')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    /*
                        css兼容性处理：postcss --> postcss-loader  使用postcss-loader模块需要插件postcss-preset-env
                        postcss-preset-env:帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
                        "browserslist": {
                            // 开发环境 --> 需要设置node环境变量：process.env.NODE_ENV = development
                            "development":[
                            // 最近的版本浏览器
                            "last 1 chrome version",
                            "last 1 firefox version",
                            "last 1 safari version"
                            ],
                            // 生产环境：默认是生产环境
                            "production":[
                            // 浏览器兼容性处理
                            ">0.2%",
                            "not dead",
                            "not op_mini all"
                            ]
                        }
                    */
                   // 写法1：使用loader的默认配置
                    //    'postcss-loader',
                   // 写法2：修改loader的配置
                   {
                       loader: 'postcss-loader',
                       options: {
                        postcssOptions: {
                          ident: 'postcss',
                          plugins: [
                            [
                              require('postcss-preset-env')()
                            //   {
                            //     // 其他选项
                            //   },
                            ],
                          ],
                        },
                      },
                    //    options: {
                    //        ident: 'postcss',
                    //        plugins: () => [
                    //            // postcss插件
                    //            require('postcss-preset-env')()
                    //        ]
                    //    }
                   }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/bulit.css'
        })
    ],
    mode: 'development'
};
```

## css压缩

> [CssMinimizerWebpackPlugin | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/#root)

index.html、index.js、a.css、b.css文件一致

package.config.js文件：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// css-minimizer-webpack-plugin  插件：用来压缩css代码

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/bulit.js',
        path: resolve(__dirname,'bulid')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                   {
                       loader: 'postcss-loader',
                       options: {
                        postcssOptions: {
                          ident: 'postcss',
                          plugins: [
                            [
                              require('postcss-preset-env')()
                            ],
                          ],
                        },
                      },
                   }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/bulit.css'
        }),
        new CssMinimizerPlugin()
    ],
    mode: 'development'
};
```

## JS语法检查

> 资料研究：
>
> [airbnb/javascript: JavaScript Style Guide (github.com)](https://github.com/airbnb/javascript)
>
> [eslint-config-airbnb-base - npm (npmjs.com)](https://www.npmjs.com/package/eslint-config-airbnb-base)

index.js文件：

```js
function add(x, y) {
  return x + y;
}
// 下一行eslint所有规则都失效（下一行不进行eslint检查）
// eslint-disable-next-line
console.log(add(2, 5));
```

webpack.config.js文件：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/bulit.js',
        path: resolve(__dirname,'bulid')
    },
    module: {
        rules: [
            /* 
                语法检查，用来确保语法一致,使用eslint-loader,需要依赖：eslint
                注意：只检查自己写的源代码，第三方的库是不用检查的
                设置检查规则：
                package.json中eslintConfig中设置~
                推荐使用airbnb，需要安装eslint-config-airbnb-base eslint eslint-plugin-import
                在package.json中添加以下内容：
                "eslintConfig": {
                    "extends": "airbnb-base"
                }
            */
           {
               test: /\.js$/,
               // 排除第三方库
               exclude: /node_module/,
               loader: 'eslint-loader',
               options: {
                   // 自动修复eslint错误
                   fix: true
               }
           }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}
```

## js的兼容性处理问题

webpack.config.js文件：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/bulit.js',
        path: resolve(__dirname,'bulid')
    },
    module: {
        rules: [
            /*
                js兼容性检查：需要下载babel-loader @babel/preset-env @babel/core
                1.基本js兼容性处理 --> @babel/preset-env
                    Q:只能转换基本语法，高级语法不能转换，如promise不能转换
                2.全部js兼容性处理 --> @babel/polyfill
                    import '@babel/polyfill';引入即可
                    Q:我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~
                3.需要做兼容性处理的就做：按需加载 --> corejs
            */
           {
               test: /\.js$/,
               exclude: /node_modules/,
               loader: 'babel-loader',
               options: {
                   // 预示：指示babel做怎么样的兼容性处理
                //    presets: ['@babel/preset-env']
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            // 按需加载
                            useBuiltIns: 'usage',
                            // 指定corejs版本
                            corejs: {
                                version: 3
                            },
                            // 指定兼容性做到哪个版本的浏览器
                            targets: {
                                chrome: '60',
                                firefox: '60',
                                ie: '9',
                                safari: '10',
                                edge: '17'
                            }
                        }
                    ]
                ]
               }
           }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}
```

index.js文件：

```js
import '@babel/polyfill';
const add = (x, y) => x + y;
console.log(add(2, 5));
new Promise((resolve) => {
    setTimeout(() => {
        console.log('定时器执行完了~');
        resolve();
    },1000);
});
console.log(promise);
```

## JS和HTML的压缩

webpack.cofig.js文件：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/bulit.js',
        path: resolve(__dirname,'bulid')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // html压缩
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        })
    ],
    // 生产环境下自动压缩js代码
    mode: 'production'
}
```

## 生产环境的配置

和前面的development模式类似，不同点在誉mode发生了变化，部分webpack.config.js文件:

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {resolve} = require('path');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 定义nodejs的环境变量,决定使用browserlist的哪个环境
process.env.NODE_ENV = 'production';

// 复用loader
const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        // 还需要再package.json中定义browserslist
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                require('postcss-preset-env')()
            ]
        }
    },
]

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/bulit.js',
        path: resolve(__dirname,'bulid')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [...commonCssLoader]
            },
            {
                test: /\.less$/,
                use: [...commonCssLoader, 'less-loader']
            },
            // 通常来讲，一个文件只能被一个loader处理;当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序:
            // 先执行eslint，再执行babel
            {
                // 需要在package.json中eslintconfig --> airbnb
                test: /\.js$/,
                exclude: /node_modules/,
                // 优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                optinos: {
                    fix: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage',
                                corejs: {
                                    version: 3
                                },
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/bulit.css'
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: 'production'
}
```

## ----------性能优化-----------

* 开发环境性能优化
  * 优化打包构建速度    HMR
  * 优化代码调试    source-map
* 生产环境性能优化
  * 优化打包构建速度    oneOf、babel缓存、多进程打包、externals、dll                                                                               
  * 优化代码运行的性能    缓存（持久化）【hash-chunkhash-contenthash】、tree shaking（树摇）、code split(代码分割)、lazy loading(懒加载)和预加载、PWA

## HMR

当我们更新某一模块时，不需要重新加载所有模块时使用

webpack.config.js文件：

```js
/*
    HMR：热模块替换/模块热替换
    作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
    极大提升构建速度

    样式文件：可以使用HMR功能，因为style-loader内部实现了~
    js文件：默认不可以使用HMR功能  --> 需要修改js代码，添加支持HMR功能的代码
        注意：HMR功能对js的处理，只能处理非入口js文件的其他文件
    html文件：默认不可以使用HMR功能，同时会导致问题：html文件不能热更新了~    (不需要做HMR功能)
        解决：修改entry入口，将html文件引入
*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bulit.js',
        path: resolve(__dirname,'bulid')
    },
    module: {
        rules: [
            // loader的配置
            {
                // 处理less资源
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                // 处理css资源
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                type: 'asset/inline'
            },
            {
                exclude: /\.(html|js|css|less|jpg|png|gif)/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        // plugins配置
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'bulid'),
        },
        // 开启gzip压缩
        compress: true,
        // 启动端口号
        port: 3000,
        // 自动打开浏览器
        open: true,
        // 开启HMR功能
        // 当修改了webpack配置，新的配置生效需要重新使用webpack
        hot: true
    },
}
```

index.js文件：

```js
// ......

// 热模块
if (module.hot) {
    // 一旦 module.hot 为true，说明开启了HMR功能  -->  让HMR功能代码生效
    module.hot.accept('./print.js', function () {
        // 方法会监听 print.js 文件的变化，一旦发生变化，其他默认不会重新打包构建
        // 会执行后面的回调函数
        print();
    })
}
```

## source-map

webpack.config.js文件：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bulit.js',
        path: resolve(__dirname,'bulid')
    },
    module: {
        rules: [
            // loader的配置
            {
                // 处理less资源
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                // 处理css资源
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                type: 'asset/inline'
            },
            {
                exclude: /\.(html|js|css|less|jpg|png|gif)/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        // plugins配置
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'bulid'),
        },
        // 开启gzip压缩
        compress: true,
        // 启动端口号
        port: 3000,
        // 自动打开浏览器
        open: true,
        // 开启HMR功能
        // 当修改了webpack配置，新的配置生效需要重新使用webpack
        hot: true
    },
    // source-map
    devtool: 'source-map'
};

/* 
    source-map：一种提供源代码到构建后代码映射技术
    如果构建后代码出错了，通过映射可以追踪源代码错误
    用法：devtool: '这里填下面组合的语法'
    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
    如：
    source-map：外部 错误代码准确信息和源代码的错误位置
    inline-source-map：内联，只生成一个内联的source-map 错误代码准确信息和源代码的错误位置
    hidden-source-map：外部  错误代码的错误原因，但是没有错误的位置（不能追踪到源代码错误，只能提示到构建后代码的错误位置）  只隐藏源代码，会提示构建后代码错误信息
    eval-source-map：内联，每一个文件都会生成对应的source-map，都在eval  错误代码准确信息和源代码的错误位置
    nosources-source-map：外部  错误代码准确信息但是没有任何源代码信息  全部隐藏
    cheap-module-source-map：外部 错误代码准确信息和源代码的错误位置，但是只能精确到行
    cheap-source-map：外部  错误代码准确信息和源代码的错误位置

    内联和外部的区别：1.外部生成了文件，内联没有 2.内联构建速度更快

    开发环境：速度快，测试更友好  --> 综合选择：eval-source-map/eval-cheap-module-source-map
        速度：eval>inline>cheap>...
        叠加速度会更快
    生产环境：源代码要不要隐藏？调试要不要更友好?    注意：内联会让代码体积变大，所以在生产环境不用内联
*/
```

## oneOf

webpack.config.js文件：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bulit.js',
        path: resolve(__dirname,'bulid')
    },
    module: {
        rules: [
            {
                // 以下loader只会匹配一个
                // 注意：不能有两项配置处理同一种类型文件,否则只会生效一个，可以将必要而且重复的提取出来放在oneOf外面
                oneOf: [
                    // loader的配置
                    {
                        // 处理less资源
                        test: /\.less$/,
                        use: [
                            'style-loader',
                            'css-loader',
                            'less-loader'
                        ]
                    },
                    {
                        // 处理css资源
                        test: /\.css$/,
                        use: [
                            'style-loader',
                            'css-loader'
                        ]
                    },
                    {
                        test: /\.(jpg|png|gif)$/,
                        type: 'asset/inline'
                    },
                    {
                        exclude: /\.(html|js|css|less|jpg|png|gif)/,
                        type: 'asset/resource'
                    }
                ]
            }
           
        ]
    },
    plugins: [
        // plugins配置
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'bulid'),
        },
        // 开启gzip压缩
        compress: true,
        // 启动端口号
        port: 3000,
        // 自动打开浏览器
        open: true
    },
}
```

## 缓存

> 资料：[JavaScript reduce() 方法 | 菜鸟教程 (runoob.com)](https://www.runoob.com/jsref/jsref-reduce.html)

webpack.config.js文件：

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {resolve} = require('path');
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 定义nodejs的环境变量,决定使用browserlist的哪个环境
process.env.NODE_ENV = 'production';

/* 
    server.js配置文件资源缓存
    后续修改仍会有缓存，导致修改效果无法立即生效，怎么办呢？
    我们可以利用[hash:n]生成的哈希值来实现文件名的更改，从而实现修改的效果显示立即生效(问题：更改一个文件，其他文件下一次打包时缓存也会失效 --> 引入chunkhash)
    chunkhash：根据chunk生成的hash值，如果打包来源于同一个chunk，hash值就一样，但是因为css是在js中被引入的，所以同属一个chunk --> 引入contenthash
    contenthash：根据文件的内容生成hash值
*/

// 复用loader
const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        // 还需要再package.json中定义browserslist
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                require('postcss-preset-env')()
            ]
        }
    },
]

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/bulit.[contenthash:10].js',
        path: resolve(__dirname,'bulid')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [...commonCssLoader]
            },
            {
                test: /\.less$/,
                use: [...commonCssLoader, 'less-loader']
            },
            // 通常来讲，一个文件只能被一个loader处理;当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序:
            // 先执行eslint，再执行babel
            {
                // 需要在package.json中eslintconfig --> airbnb
                test: /\.js$/,
                exclude: /node_modules/,
                // 优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                optinos: {
                    fix: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage',
                                corejs: {
                                    version: 3
                                },
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ],
                    // 开启babel缓存
                    // 第二次构建时，若该js文件没发生改变，则会读取之前的该js文件构建缓存,从而让第二次打包构建速度更快
                    cacheDirectory: true
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/bulit.css'
        }),
        // new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: 'production'
}
```

server.js文件：

```js
/*
    服务器代码，需要node.js知识，这里使用了express
    启动服务器命令：
    nodemon server.js    前提是先下载完nodemon包:npm i nodemon -g
    或者
    node server.js
*/
const express = require('express');

const app = express();

// 设置缓存(3600秒)和运行目录
app.use(express.static('bulid',{maxAge: 1000 * 3600}))

app.listen(3000);
```

## tree shaking

webpack.config.js文件：

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {resolve} = require('path');
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 定义nodejs的环境变量,决定使用browserlist的哪个环境
process.env.NODE_ENV = 'production';

/*
    tree shaking: 去除无用代码
    前提： 1.必须使用ES6模块化 2.开启production环境
    减少打包体积

    在package.json中配置
    "sideEffects": false 所有代码都没有副作用（都可以进行tree shaking）
    问题：打包后，可能会把css @babel/polyfill 之类的文件清除掉,
    解决办法："sideEffects": ["*.css"]   标记不处理的文件
*/

// 复用loader
const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        // 还需要再package.json中定义browserslist
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                require('postcss-preset-env')()
            ]
        }
    },
]

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/bulit.[contenthash:10].js',
        path: resolve(__dirname,'bulid')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [...commonCssLoader]
            },
            {
                test: /\.less$/,
                use: [...commonCssLoader, 'less-loader']
            },
            // 通常来讲，一个文件只能被一个loader处理;当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序:
            // 先执行eslint，再执行babel
            {
                // 需要在package.json中eslintconfig --> airbnb
                test: /\.js$/,
                exclude: /node_modules/,
                // 优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                optinos: {
                    fix: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage',
                                corejs: {
                                    version: 3
                                },
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ],
                    // 开启babel缓存
                    // 第二次构建时，若该js文件没发生改变，则会读取之前的该js文件构建缓存
                    cacheDirectory: true
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/bulit.css'
        }),
        // new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: 'production'
}
```

## code split(代码分隔)

将体积庞大的js文件划分为许多个小的js文件，要事先考虑是多入口或者是单入口

webpack.config.js文件：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');

module.exports = {
    entry: {
        // 多入口,有一个入口，最终输出就有一个bundle
        index: './src/js/index.js',
        test: './src/js/test.js'
    },
    // 单入口
    // entry: './src/js/index.js',
    output: {
        // 取文件名 [name]
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname,'bulid')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    /* 
        1.可以将node_modules中代码单独打包一个chunk最终输出
        2.自动分析多入口chunk中，有没有公共的文件（不能太小），如果有会打包成单独一个chunk
    */
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    mode: 'production'
}
```

index.js文件：

```js
// import {mul} from './test'

function sum(...args) {
    return args.reduce((p, c) => p + c, 0);
}

/* 
    通过js代码，让某个文件被单独打包成一个chunk,使用该段代码不需要再引入了
    import动态导入语法：能将某个文件单独打包
    /* webpackChunkName: 'test'*/  给打包的名字固定
*/*/*/
import (/* webpackChunkName: 'test'*/'./test')
 .then((result) => {
     // 文件加载成功~
     console.log(result)
 })
 .catch(() => {
     console.log('文件加载失败~')
 })

// console.log(mul);
console.log(sum(1, 2, 3, 4));
console.log($);
```

## 懒加载(lazy loading)

触发了某个事件才会加载

webpack.config.js文件：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        // 取文件名 [name]
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname,'bulid')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    /* 
        1.可以将node_modules中代码单独打包一个chunk最终输出
        2.自动分析多入口chunk中，有没有公共的文件（不能太小），如果有会打包成单独一个chunk
    */
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    mode: 'production'
}
```

index.js文件：

```js
console.log('index.js文件被加载了');
// import { mul } from './test';
// console.log(mul);

document.getElementById('btn').onclick = function () {
    // 懒加载: 当文件需要使用时才加载~    webpackPrefetch: true 预加载 会在使用之前，提前加载js文件,等其他资源加载完毕，浏览器空闲了，再偷偷加载
    // 正常加载可以认为是并行加载（同一时间加载多个文件）
    import(/* webpackChunkName: 'test',webpackPrefetch: true */'./test')
     .then(({ mul }) => {
         console.log(mul(4, 5));
     });
};
```

test.js文件：

```js
console.log('test.js文件被加载了');

function mul(x, y) {
    return x * y;
}

function count(x, y) {
    return x - y;
}
```

## PWA

能让网站离线访问

webpack.config.js文件：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

/* 
    PWA：渐进式网络开发应用程序（离线可访问）
        workbox --> workbox-webpack-plugin
 */

module.exports = {
    entry: './src/js/index.js',
    output: {
        // 取文件名 [name]
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname,'bulid')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            /* 
                1. 帮助serviceworker快速启动
                2. 删除旧的 serviceworker

                生成一个 serviceworker 配置文件(在index.js文件中)~
            */
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    /* 
        1.可以将node_modules中代码单独打包一个chunk最终输出
        2.自动分析多入口chunk中，有没有公共的文件（不能太小），如果有会打包成单独一个chunk
    */
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    mode: 'production'
}
```

index.js文件：

```js
console.log('index.js文件被加载了');
// import { mul } from './test';
// console.log(mul);

document.getElementById('btn').onclick = function () {
    // 懒加载: 当文件需要使用时才加载~    webpackPrefetch: true 预加载 会在使用之前，提前加载js文件,等其他资源加载完毕，浏览器空闲了，再偷偷加载
    // 正常加载可以认为是并行加载（同一时间加载多个文件）
    import(/* webpackChunkName: 'test',webpackPrefetch: true */'./test')
     .then(({ mul }) => {
         console.log(mul(4, 5));
     });
};

/*
    1.eslint不认识window、navigator全局变量
        解决：需要修改package.json中eslintConfig配置
        "env":  {
            "browser": true       // 支持浏览器端全局变量
        }
    2. sw代码必须运行在服务器上
        --> nodejs
        --> npm i serve -g    serve -s bulid    启动服务器，将bulid目录下所有的资源作为静态资源暴露出去
*/
// 注册serviceWorker
// 处理兼容性问题
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(() => {
                console.log('注册成功！')
            })
            .catch(() => {
                console.log('注册失败！')
            })
    })
}
```

## 多进程打包

不要滥用！

webpack.config.js文件：

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {resolve} = require('path');

// 定义nodejs的环境变量,决定使用browserlist的哪个环境
process.env.NODE_ENV = 'production';

// 复用loader
const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        // 还需要再package.json中定义browserslist
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                require('postcss-preset-env')()
            ]
        }
    },
]

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/bulit.[contenthash:10].js',
        path: resolve(__dirname,'bulid')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [...commonCssLoader]
            },
            {
                test: /\.less$/,
                use: [...commonCssLoader, 'less-loader']
            },
            // 通常来讲，一个文件只能被一个loader处理;当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序:
            // 先执行eslint，再执行babel
            {
                // 需要在package.json中eslintconfig --> airbnb
                test: /\.js$/,
                exclude: /node_modules/,
                // 优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                optinos: {
                    fix: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    /* 
                        开启多进程打包 
                        进程启动大概为600ms。进程通信也有开销
                        只有工作消耗事件比较长，才需要多进程打包
                    */
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: 2    // 进程 2个
                        },
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage',
                                        corejs: {
                                            version: 3
                                        },
                                        targets: {
                                            chrome: '60',
                                            firefox: '60',
                                            ie: '9',
                                            safari: '10',
                                            edge: '17'
                                        }
                                    }
                                ]
                            ],
                            // 开启babel缓存
                            // 第二次构建时，若该js文件没发生改变，则会读取之前的该js文件构建缓存
                            cacheDirectory: true
                        }
                    }
                ]  
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/bulit.css'
        }),
        // new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: 'production'
}
```

## externals

彻底不打包，需要通过CDN连接起来

webpack.config.js文件：

```js
 const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'bulit.js',
        path: resolve(__dirname,'bulid')
    },
    plugins: [

        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'production',
    // 拒绝jquery被导报进来，需要手动引入（可以使用cdn引入）
    externals:{
        // 忽略库名 -- npm包名
        jquery: 'jQuery'
    }
}
```

index.js文件：

```js
import $ from 'jquery';
console.log($);
```

## dll

第三方的库，不整合在一起，不使用CDN连接

webpack.config.js文件：

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bulit.js',
        path: resolve(__dirname,'bulid')
    },
    // module: {
    //     rules: [

    //     ]
    // },
    plugins: [
        // html-webpack-plugin
        // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/css）
        // 需求：需要有结构的HTML文件
        new HtmlWebpackPlugin({
            // 复制一个.src/index.html文件，并自动引入打包输出的所有资源（JS/CSS）
            template: './src/index.html'
        }),
        // 告诉webpack哪些库不参与打包，同时使用时的名称也得改变~
        new webpack.DllReferencePlugin({
            manifest: resolve(__dirname, 'dll/manifest.json')
        }),
        // 会将某个文件打包输出去，并在html中自动引入该资源
        new AddAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname, 'dll/jquery.js')
        })
    ],
    mode: 'development'
}
```

webpack.dll.js文件：

```js
/*
    使用dll技术，对某些库(第三方技术：jquery、react、vue......)进行单独打包
        当你运行 webpack 时，默认查找 webpack.config.js 配置文件
        需求：运行webpack.dll.js文件
            --> webpack --config webpack.dll.js
*/
const { resolve } = require('path');
const Webpack = require('webpack');

module.exports = {
    entry: {
        // 最终打包生成的[name] --> jquery
        // ['jquery'] --> 要打包的库是jquery
        jquery: ['jquery']
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname,'dll'),
        library: '[name]_[hash]',   // 打包的库里面向外暴露出去的内容叫什么名字
    },
    plugins: [
        // 打包生成一个manifest.json  -->  提供和jQuery映射
        new Webpack.DllPlugin({
            name: '[name]_[hash]',     // 映射库的暴露的内容名称
            path: resolve(__dirname,'dll/manifest.json')    // 输出的名称
        })
    ],
    mode: 'production'
}
```

index.js文件：

```js
import $ from 'jQuery';
console.log($);
```

## ----------配置详解----------

## entry

webpack.config.js文件：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');

/*
    entry: 入口起点
    1.string  -->  './src/index.js'   打包输出一个chunk，输出一个bundle文件,此时chunk的名称默认为 main
    2.array  -->  ['./src/index.js','./src/add.js']  多入口，所有入口文件最终只会形成一个chunk，输出出去只有一个bundle文件;
                                                    一般来讲，只有在HMR功能中让html热更新生效
    3.object  -->  {index: './src/index.js',add: './src/add.js'}  多入口，有几个入口文件就形成几个chunk，输出几个bundle文件，此时chunk的名称是key

    ！特殊用法 ！
    2、3叠加，dll遇见过
    {index: ['./src/index.js','./src/count.js'],add: './src/add.js'}
*/

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bulit.js',
        path: resolve(__dirname,'bulid')
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}
```

## output

webpack.config.js文件：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        // 文件名称（指定名称+目录）
        filename: 'bulit.js',
        // 输出的文件目录（将来所有资源输出的公共目录）
        path: resolve(__dirname,'bulid'),
        // 所有资源引入公共路径的前缀~: 'img/a.jpg' --> '/img/a.jpg'  一般用于生产环境
        pulicPath: '/',
        chunkFilename: '[name]_chunk.js',     // 定义非入口的chunk文件的名称
        library: '[name]',  // 会将暴露的代码赋值给[name]（即定义整个库对外暴露的变量名）
        libraryTarget: 'window'   // 变量名添加到哪个上 browser
        // libraryTarget: 'global'   // 变量名添加到哪个上 node
        // libraryTarget: 'commonjs'   // 变量名添加到哪个上 commonjs
        // ......
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}
```

## module

webpack.config.js文件：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bulit.js',
        path: resolve(__dirname,'bulid')
    },
    module: {
        rules: [
            // loader的配置
            {
                test: /\.css$/,
                // 多个loader使用use
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                // 排除node_module下的js文件
                exclude: /node_modules/,
                // 只检查src下的js文件
                include: resolve(__dirname, 'src'),
                // 优先执行
                enforce: 'pre',
                // 延后执行
                // enforce: 'post',
                // 单个loader使用use
                use: 'eslint-loader',
                // 配置内容
                options: {}
            },
            {
                // 以下配置只会执行一个
                oneOf: []
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}
```

## resolve

webpack.config.js文件：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bulit.js',
        path: resolve(__dirname,'bulid')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development',
    // 解析模块的规则
    resolve: {
        // 配置解析模块路径的别名：可以简写路径,没有路径提示！
        alias: {
            $css: resolve(__dirname, 'src')   // 注意这里的路径为绝对路径
        },
        // 配置省略文件路径的后缀名 不建议使用，文件名会重复
        extensions: ['.js','.json','.css'],
        // 告诉webpack解析模块去找哪个目录找
        moudules: [resolve(__dirname,'../../node_modules'),'node_modules']
    }
}
```

## devServer

webpack.config.js文件：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bulit.js',
        path: resolve(__dirname,'bulid')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development',
    resolve: {
        alias: {
            $css: resolve(__dirname, 'src')
        },
        extensions: ['.js','.json','.css'],
        moudules: [resolve(__dirname,'../../node_modules'),'node_modules']
    },
    devServer: {
        // 运行的代码目录
        contentBase: resolve(__dirname, 'bulid'),
        // 监视的文件目录，会监视该目录下的所有文件，一旦文件变化就会reload
        watchContentBase: ture,
        // 监视文件设置
        watchOptions: {
            // 忽略监视文件
            ignored: /node_modules/
        },
        // 启动gzip压缩
        compress: ture,
        // 端口号
        port: 5000,
        // 域名
        host: 'localhost',
        // 自动打开浏览器
        open: ture,
        // 开启HMR功能
        hot: ture,
        // 不要显示启动服务器日志信息
        clientLogLevel: 'none',
        // 除了基本的启动信息以外，其他内容不会打印
        quiet: ture,
        // 如果出错了，不要全屏显示
        overlay: false,
        // 服务器代理 --> 解决开发环境跨域问题，必须在生产环境下使用
        // 浏览器和服务器之间有跨域，服务器之间吗有跨域，浏览器和代理之间没有跨域问题，代理之间没有跨域
        proxy: {
            // 一旦devServer服务器(5000)接受到 /api/xxx 请求，就会把请求转发到另外一个服务器上(3000)
            '/api': {
                target: 'http://localhost:3000',
                // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
```

## optimization

webpack.config.js文件：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bulit.js',
        path: resolve(__dirname,'bulid')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'production',
    resolve: {
        alias: {
            $css: resolve(__dirname, 'src')
        },
        extensions: ['.js','.json','.css'],
        moudules: [resolve(__dirname,'../../node_modules'),'node_modules']
    },
    optimization: {
        splitChunk: {
            chunks: 'all',
            // 默认值，可以不写~
            // miniSize: 30 * 1024,    // 分割的chunk最小为30kb
            // maxiSize: 0,     // 分割的chunk最大没有限制
            // minChunks: 1,    // 要提取的chunk最少被引用1次
            // maxAsynRequests: 5,   // 按需加载时，并行加载的文件的最大数量
            // maxInitialRequests: 3,   // 入口js文件最大并行请求数量
            // automaticNameDelimiter: '~',   // 命名连接符为~
            // name: true,   // 可以使用命名规则
            // cacheGroup: {     // 分割chunk的组
            //     // node_modules文件会被打包到 vendors 组的chunk中  --> vendors~xxx.js
            //     // 满足上面的公共规则，如：分割的chunk最小为30kb等
            //     vendors: {
            //         test: /[\\/]node_modules[\\/]/,
            //         // 打包的优先级
            //         priority: -10
            //     },
            //     default: {
            //         // 这里的定义会覆盖掉上面的值
            //         minChunks: 2,
            //         // 打包的优先级
            //         priority: -20,
            //         // 如果当前要打包的模块，和之前已经被提取的模块是同一个就会复用，而不是重写打包模块
            //         reuseExistingChunk: true,

            //     }
            // }
        },
        minimizer: [
            // 配置生产环境的压缩方案：js和css
            new TerserWebpackPlugin({
                // 开启缓存
                cache: ture,
                // 开启多进程打包
                parallel: true,
                // 启动sourceMap
                sourceMap: ture,
            })
        ]
    }
}
```

> 问题：index.js文件记录了a.js文件的哈希值，所以a.js打包后index.js文件也会发生变化
>
> 思路：将变化转移到另一个js文件上
>
> 实现：
>
> ```js
> optimization: {
>         // 将当前模块记录其他模块的hash单独打包为一个文件 runtime
>         runtimeChunk: {
>             name: entrypoint => `runtime-${entrypoint.name}`
>         }
>     }

## ----------webpack5----------

> webpack5:[webpack (docschina.org)](https://webpack.docschina.org/)

此版本重点关注以下内容:

- 通过持久缓存提高构建性能.
- 使用更好的算法和默认值来改善长期缓存.
- 通过更好的树摇和代码生成来改善捆绑包大小.
- 清除处于怪异状态的内部结构，同时在 v4 中实现功能而不引入任何重大更改.
- 通过引入重大更改来为将来的功能做准备，以使我们能够尽可能长时间地使用 v5.

### 下载

- npm i webpack@next webpack-cli -D

### 自动删除 Node.js Polyfills

早期，webpack 的目标是允许在浏览器中运行大多数 node.js 模块，但是模块格局发生了变化，许多模块用途现在主要是为前端目的而编写的。webpack <= 4 附带了许多 node.js 核心模块的 polyfill，一旦模块使用任何核心模块（即 crypto 模块），这些模块就会自动应用。

尽管这使使用为 node.js 编写的模块变得容易，但它会将这些巨大的 polyfill 添加到包中。在许多情况下，这些 polyfill 是不必要的。

webpack 5 会自动停止填充这些核心模块，并专注于与前端兼容的模块。

迁移：

- 尽可能尝试使用与前端兼容的模块。
- 可以为 node.js 核心模块手动添加一个 polyfill。错误消息将提示如何实现该目标。

### Chunk 和模块 ID

添加了用于长期缓存的新算法。在生产模式下默认情况下启用这些功能。

`chunkIds: "deterministic", moduleIds: "deterministic"`

### Chunk ID

你可以不用使用 `import(/* webpackChunkName: "name" */ "module")` 在开发环境来为 chunk 命名，生产环境还是有必要的

webpack 内部有 chunk 命名规则，不再是以 id(0, 1, 2)命名了

### Tree Shaking

1. webpack 现在能够处理对嵌套模块的 tree shaking

```js
// inner.js
export const a = 1;
export const b = 2;

// module.js
import * as inner from './inner';
export { inner };

// user.js
import * as module from './module';
console.log(module.inner.a);
```

在生产环境中, inner 模块暴露的 `b` 会被删除

2. webpack 现在能够多个模块之前的关系

```js
import { something } from './something';

function usingSomething() {
  return something;
}

export function test() {
  return usingSomething();
}
```

当设置了`"sideEffects": false`时，一旦发现`test`方法没有使用，不但删除`test`，还会删除`"./something"`

3. webpack 现在能处理对 Commonjs 的 tree shaking

### Output

webpack 4 默认只能输出 ES5 代码

webpack 5 开始新增一个属性 output.ecmaVersion, 可以生成 ES5 和 ES6 / ES2015 代码.

如：`output.ecmaVersion: 2015`

### SplitChunk

```js
// webpack4
minSize: 30000;
```

```js
// webpack5
minSize: {
  javascript: 30000,
  style: 50000,
}
```

### Caching

```js
// 配置缓存
cache: {
  // 磁盘存储
  type: "filesystem",
  buildDependencies: {
    // 当配置修改时，缓存失效
    config: [__filename]
  }
}
```

缓存将存储到 `node_modules/.cache/webpack`

### 监视输出文件

之前 webpack 总是在第一次构建时输出全部文件，但是监视重新构建时会只更新修改的文件。

此次更新在第一次构建时会找到输出文件看是否有变化，从而决定要不要输出全部文件。

### 默认值

- `entry: "./src/index.js`
- `output.path: path.resolve(__dirname, "dist")`
- `output.filename: "[name].js"`

### 更多内容

https://github.com/webpack/changelog-v5

## ----------进阶----------

