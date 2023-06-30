# node版本升级导致的：Error: error:0308010C:digital envelope routines::unsupported

## 起因

在做vuepress1.x时，我一般喜欢部署到[netlify](https://app.netlify.com/)或者[vercel](https://vercel.com/dashboard)，但是当我部署到这两个平台时，都无一例外地部署失败了。查看报错原因，都是报了这句话：

```markdown
Error: error:0308010C:digital envelope routines::unsupported
```

## 解决

不懂什么原因，我本地又能跑起来，也能构建成功。

复制这句报错在网上搜一下：

[nodejs新版本引起的：digital envelope routines::unsupported](https://blog.csdn.net/fengyuyeguirenenen/article/details/128319228)

原来是版本问题！我nodejs原来的版本是16.x，部署平台使用的版本是18.x，怪不得本地可以跑起来。看了一下它的解决方案：

1、修改脚本运行命令，在yarn docs:dev 之前先运行SET NODE_OPTIONS=--openssl-legacy-provider 

2、回退版本到16.x

我还是选择了第一种方案，比较快捷地解决问题

## 参考文章