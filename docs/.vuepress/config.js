module.exports = {
    dest: 'docs/dist',
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
        sidebar: [
            ['introduction','简介'],
            ['/Apply-for-a-wildcard-domain-name-certificate','申请泛域名证书']
        ],
        nav: [
            {
                text: '首页', link: '/'
            },
            // {
            //     text: '类别',
            //     items: [
            //         { text: '简介', link: '/introduction/' },
            //         { text: '专业知识', link: '/speciality/' },
            //         { text: 'bug', link: '/bug/' },
            //         { text: '教程', link: '/tutorial/' },
            //     ]
            // },
            {
                text: 'Github', link: 'https://github.com/flow2000/book'
            }
        ],
        // displayAllHeaders: true,
        lastUpdated: '最近更新时间',
        smoothScroll: true,
        // sidebarDepth: 2,
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