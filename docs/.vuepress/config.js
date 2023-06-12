module.exports = {
    dest: 'public',
    title: '知识库',
    description: '沉淀自己',
    base: '/',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    themeConfig: {
        logo: '/img/logo.jpg',
        nav:[
            {
                text:'首页',link:'/'
            },
            {
                text:'Github',link:'https://github.com/flow2000/book'
            }
        ],
        sidebar: [
            ['/docs/','简介'],
        ]
    },
    plugins: [
        [
            '@vuepress/last-updated',
            {
                trasformer: (timestamp, lang) => {
                    return new Date(timestamp).toLocaleDateString();
                }
            }
        ]
    ]
}