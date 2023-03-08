export default {
    title: '幽离知识库',
    description: '喜欢前端，喜欢安全',
    themeConfig: {
        logo: '/image/logo.svg',
        nav: [
            {
                text: '编程语言',
                items: [
                    {text: 'HTML5',link: 'language/HTML5'},
                    {text: 'CSS',link: 'language/CSS'},
                    {text: 'Javascript',link: 'language/JavaScript'},
                    {text: 'MySQL',link: 'language/MySQL'},
                    {text: 'ES新特性',link: 'language/NewES'}
                ]
            },
            {
                text: '基础知识',
                items: [
                    {text: 'Axios',link: 'BasicKnowledge/axios'},
                    {text: 'Grunt',link: 'BasicKnowledge/grunt'},
                    {text: 'Gulp',link: 'BasicKnowledge/gulp'},
                    {text: 'jQuery',link: 'BasicKnowledge/jQuery'},
                    {text: 'MongoDB',link: 'BasicKnowledge/MongoDB'},
                    {text: 'NodeJS',link: 'BasicKnowledge/nodejs'},
                    {text: 'Webpack',link: 'BasicKnowledge/webpack'},
                    {text: 'less',link: 'BasicKnowledge/less'},
                    {text: 'Promise',link: 'BasicKnowledge/Promise'},
                    {text: 'Git',link: 'BasicKnowledge/Git'},
                ]
            },
            {
                text: '解决方案',
                items: [
                    {text: 'react脚手架配置代理',link: 'functions/react脚手架配置代理'},
                    {text: '玻璃拟态',link: 'functions/玻璃拟态'}
                ]
            },
            {
                text: '前端模块化',
                items: [
                    {text: '模块化进化史',link: 'modules/模块化进化史教程'},
                    {text: 'CommonJS_Node模块化',link: 'modules/CommonJS_Node模块化教程'},
                    {text: 'CommonJS-Browserify模块化',link: 'modules/CommonJS-Browserify模块化教程'},
                    {text: 'AMD-RequireJS模块化',link: 'modules/AMD-RequireJS模块化教程'},
                    {text: 'CMD-SeaJS模块化',link: 'modules/CMD-SeaJS模块化教程'},
                    {text: 'ES6模块化',link: 'modules/ES6模块化教程'},
                    {text: 'Js模块化',link: 'modules/模块化'}
                ]
            },
            {
                text: '网络安全',
                items: [
                    {text: '一些基础知识',link: 'anquan/basic'},
                    {text: '详解http',link: 'anquan/http'},
                    {text: '端口协议',link: 'anquan/port'},
                    {text: '常见编码',link: 'anquan/bianma'},
                    {text: 'XSS攻击',link: 'anquan/xss'},
                    {text: 'CSRF攻击',link: 'anquan/csrf'},
                    {text: '伪随机码攻击',link: 'anquan/phonenum'},
                    {text: 'json劫持攻击',link: 'anquan/jsonfight'},
                ]
            },
            {
                text: '扩展知识',
                items: [
                    {text: '2022前端趋势',link: 'extend/2022前端趋势'}
                ]
            },
            {
                text: '关于',
                link: 'about'
            }
        ],
        lastUpdated: true,
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2023-present youLi & huaChen'
        }
    }
}