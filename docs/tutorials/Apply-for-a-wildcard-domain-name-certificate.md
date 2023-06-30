## 简介

你还在为个人域名的证书而烦恼嘛？试试Let's Encrypt吧，它能提供免费的泛域名证书，让你的子域名都能有一个安全的小锁头，非常适合因国内云计算厂商ssl证书数量限制而困扰的小伙伴，快来试试吧。

先介绍一下这次主角：[letsencrypt.org](https://letsencrypt.org/) , 是一个免费的、自动化的、开放的证书颁发机构。截至2018年9月，它的全球SSL证书市场份额已超过50%，得到主流浏览器和厂商的认可与支持。Let's Encrypt证书提供免费的申请，但每次申请到的SSL证书有效期只有90天，可以通过脚本实现提前自动续约达到自动化永久免费使用的目的。

利用Let's Encrypt免费提供泛域名证书的申请，我们可以借助服务器脚本实现到期续签，自动刷新过期时间。

## 准备

一个域名

一台服务器（用于申请证书以及运行续签脚本）

本教程以申请aqcoder.cn（腾讯云）以及notifyou.top（阿里云）的泛域名证书为例

## 下载仓库

下载仓库：

```shell
git clone https://github.com/acmesh-official/acme.sh.git 
```

下载仓库(加速)：

```shell
git clone https://gitclone.com/github.com/acmesh-official/acme.sh.git 
```

## 上传acme.sh

上传acme.sh到服务器`/root`目录，使用`root`用户执行后面的命令（acme.sh也有说明可以使用其他用户运行，但为确保一些权限问题，先使用root用户运行成功，再尝试使用其他用户）。

## 执行安装命令

```shell
sh acme.sh --install
```

## 配置SecretKey和SecretId

域名服务商申请SecretId和SecretKey，阿里云的查看[这里](/posts/eeb9c508/)，腾讯云的查看[这里](/posts/338bc34e/)

将上述的`SecretKey`和`SecretId`写到`~/..bash_profile`，保存方法：https://github.com/acmesh-official/acme.sh/wiki/dnsapi

```properties
# .bash_profile

# Get the aliases and functions
if [ -f ~/.bashrc ]; then
	. ~/.bashrc
fi

# User specific environment and startup programs

PATH=$PATH:$HOME/bin

#腾讯云
export DP_Id="A1111111111111111s"
export DP_Key="F11111111111111111b"

#阿里云
export Ali_Key="L1111111111111111111t"
export Ali_Secret="p1111111111111111C"

export PATH
```

## 申请证书

```shell
#腾讯云
sh acme.sh --issue --dns dns_dp -d aqcoder.cn  -d *.aqcoder.cn

#阿里云
sh acme.sh --issue --dns dns_ali -d aqcoder.cn  -d *.aqcoder.cn
```

出现错误是因为还没有通过[Let's Encrypt](https://letsencrypt.org/)验证，而[Let's Encrypt](https://letsencrypt.org/)提供两种方式验证，一个是HTTP文件验证，一个是DNS-API验证，这里推荐使用DNS-API验证

![出现错误](https://cdn.aqcoder.cn/b/84609bb0/6400c7e95e4e1.png)

## 添加解析

阿里云添加TXT解析，[位置](https://dns.console.aliyun.com/)：

![阿里云添加TXT解析](https://cdn.aqcoder.cn/b/84609bb0/6400c90951415.png)

腾讯云添加TXT解析，[位置](https://console.cloud.tencent.com/cns)：

![腾讯云添加TXT解析](https://cdn.aqcoder.cn/b/84609bb0/6400c95f6242c.png)

## 重新运行

稍等片刻重新运行，记得添加`--renew`参数

```shell
#腾讯云
sh acme.sh --issue --dns dns_dp -d aqcoder.cn  -d *.aqcoder.cn --renew

#阿里云
sh acme.sh --issue --dns dns_ali -d aqcoder.cn  -d *.aqcoder.cn --renew
```

![成功申请泛域名证书](https://cdn.aqcoder.cn/b/84609bb0/6400ca9e3f138.png)

## 查看定时任务

```shell
crontab -e
```

可以看到，acme.sh已经生成一个定时任务了

![查看定时任务](https://cdn.aqcoder.cn/b/84609bb0/6400cb4ab9473.png)

## 拷贝证书

```shell
sh acme.sh --install-cert -d aqcoder.cn \ 
--key-file /etc/ssl/aqcoder.cn/aqcoder.cn.key  \
--fullchain-file /etc/ssl/aqcoder.cn/aqcoder.cn.cer  \
--reloadcmd 'service nginx force-reload'
```

拷贝证书可以让acme.sh申请到的证书复制到指定目录，执行后拷贝证书的操作也会在定时任务中。

## 测试

### 添加解析

![腾讯云添加解析](https://cdn.aqcoder.cn/b/84609bb0/6400cc6f00cf4.png)

![阿里云添加解析](https://cdn.aqcoder.cn/b/84609bb0/6400cc6ca7cbc.png)

### nginx配置

aqcoder.cn

```conf
#test.aqcoder.cn
server {
    listen 80;
    server_name test.aqcoder.cn;

    rewrite ^(.*)$ https://$host$request_uri;
}


server {
    listen 443 ssl;
    server_name test.aqcoder.cn;

    ssl_certificate /etc/ssl/aqcoder.cn/aqcoder.cn.cer;
    ssl_certificate_key /etc/ssl/aqcoder.cn/aqcoder.cn.key;
    ssl_session_cache    shared:SSL:4m;
    ssl_session_timeout  10m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;
    charset utf-8;

    location / {
        proxy_pass http://127.0.0.1:5704;
    }
}

```

notifyou.top

```shell
#test.notifyou.top
server {
    listen 80;
    server_name test.notifyou.top;

    rewrite ^(.*)$ https://$host$request_uri;
}


server {
    listen 443 ssl;
    server_name test.notifyou.top;

    ssl_certificate /etc/ssl/notifyou.top/notifyou.top.cer;
    ssl_certificate_key /etc/ssl/notifyou.top/notifyou.top.key;
    ssl_session_cache    shared:SSL:4m;
    ssl_session_timeout  10m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;
    charset utf-8;

    location / {
        proxy_pass http://127.0.0.1:9121;
    }
}

```

### 访问成功，出现https安全小锁头

![test.aqcoder.cn](https://cdn.aqcoder.cn/b/84609bb0/6400cd0164883.png)

![test.notifyou.top](https://cdn.aqcoder.cn/b/84609bb0/6400cd9e62ad8.png)

## 结语

现如今计算云厂商对单域名证书的数量有着严格限制，这对于我的多子域名的需求极其不友好，一个免费泛域名证书可以完美解决，既省去了泛域名证书高昂的费用，也实现了自动化续期，达到无限期使用泛域名证书的目的，当然了，如果要使用在一些商用业务，建议还是购买云计算厂商的证书或者自建CA，确保业务安全。

## 参考文章

[Let's Encrypt免费泛域名SSL证书申请及自动续签](https://juejin.cn/post/7136001093720342542)

[第一次使用acme.sh 手动生成证书](https://blog.csdn.net/qq_33317586/article/details/84842398)

[acme从letsencrypt 生成免费通配符/泛域名SSL证书并自动续期](https://cloud.tencent.com/developer/article/1736866)

[dnsapi · acmesh-official/acme.sh Wiki](https://github.com/acmesh-official/acme.sh/wiki/dnsapi)

