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
                    {text: 'MySQL',link: 'language/MySQL'}
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
                    {text: 'Webpack',link: 'BasicKnowledge/webpack'}
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