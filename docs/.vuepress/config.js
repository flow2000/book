module.exports = {
    dest: 'docs/.vuepress/dist',
    title: '知识库',
    description: '沉淀自己，做一个属于自己的知识库',
    base: '/',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    themeConfig: {
        logo: '/img/logo.jpg',
        editLinks: true,
        nextLinks: true,
        prevLinks: true,
        docsDir: 'docs',
        sidebar: {
            '/introduction/': [
                '',
            ],
            '/specialities/': [
                '',
            ],
            '/bugs/': [
                '',
                {
                    title: 'nodejs新版本导致的：error:0308010C:digital envelope routines::unsupported',
                    path: '/bugs/Error-error0308010Cdigital-envelope-routinesunsupported',
                },
            ],
            '/tutorials/': [
                '',
                {
                    title: '申请泛域名证书',
                    path: '/tutorials/Apply-for-a-wildcard-domain-name-certificate',
                },
                {
                    title: '本教程文档配置',
                    path: '/tutorials/Tutorials-configuration',
                },
            ],
            '/repositories/': [
                '',
                {
                    title: '图标',
                    path: '/repositories/ICONS',
                },
            ],
            '/': [
                ''
            ]
        },
        nav: [
            {
                text: '首页', link: '/'
            },
            {
                text: '类别',
                items: [
                    { text: '简介', link: '/introduction/' },
                    { text: '专业知识', link: '/specialities/' },
                    { text: 'bug', link: '/bugs/' },
                    { text: '教程', link: '/tutorials/' },
                    { text: '优秀仓库', link: '/repositories/' },
                ]
            },
            {
                text: 'Github', link: 'https://github.com/flow2000/book'
            }
        ],
        algolia: {
            apiKey: '01c5ae976f2b3e3c3f8f51ce11459a83',
            indexName: 'book',
            appId: 'OUUVZO6TJL',
        },
        displayAllHeaders: false, //显示所有页面的标题链接
        lastUpdated: '最近更新时间',
        smoothScroll: true,
        sidebarDepth: 2,
    },
    plugins: [
        ['@vuepress/last-updated'],
        ['@vuepress/back-to-top', true],
        [
            '@vuepress/pwa',
            {
                serviceWorker: true,
                updatePopup: true
            }
        ],
        ['@vuepress/medium-zoom', true],
    ]
}