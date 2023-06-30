# 本教程文档配置

版本：v1.x

包管理器：yarn

package.json:

```json
{
  "name": "my-knowledge-repository",
  "version": "1.0.0",
  "description": "沉淀自己，做一个属于自己的知识库",
  "scripts": {
    "docs:dev": "SET NODE_OPTIONS=--openssl-legacy-provider && vuepress dev docs",
    "docs:build": "SET NODE_OPTIONS=--openssl-legacy-provider && vuepress build docs"
  },
  "author": "枫叶",
  "license": "ISC",
  "devDependencies": {
    "@vuepress/plugin-back-to-top": "^1.9.9",
    "@vuepress/plugin-medium-zoom": "^1.9.9",
    "@vuepress/plugin-pwa": "^1.9.9",
    "vuepress": "^1.9.9"
  }
}
```

config.js：

```js
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
            apiKey: 'xxxxx',
            indexName: 'xxxxx',
            appId: 'xxxxx',
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
```

