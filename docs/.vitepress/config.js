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
                    {text: 'TypeScript',link: 'language/TypeScript'},
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