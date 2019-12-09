# 启动项目

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli)

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8081
npm run dev

# build for production with minification
npm run build

```
#### 这个项目用到的
####  技术栈：
##### vue + webpack + vuex + axios

#### 结构：
- build: webpack配置
- config: 项目配置参数
- common 共用的
- components:组件
- api :增删改查的接口
- mock：模拟数据
- src assets: 静态资源文件，存放图片啥的 
- router.js: 路由表 
- store: 状态管理 
- utils: 常用工具类封装
- views: 视图页面
-  static: 静态文件 存放 favicon.ico 等等

#### 效果图：
![edit](https://img-blog.csdnimg.cn/20191209170351772.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zNzU2ODUwMQ==,size_16,color_FFFFFF,t_70)
![add](https://img-blog.csdnimg.cn/2019120917054587.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zNzU2ODUwMQ==,size_16,color_FFFFFF,t_70)
![demo](https://img-blog.csdnimg.cn/2019120917452130.gif)
# Theme
You can change theme by 
1. Generate theme packages by [https://elementui.github.io/theme-preview/#/](https://elementui.github.io/theme-preview/#/)
2. Put theme packages in src/assets/theme/
3. Edit src/main.js 
``` bash
   import 'element-ui/lib/theme-default/index.css'
   to
   import './assets/theme/your-theme/index.css'
```
4. Edit src/styles/vars.scss

![theme-blue](https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/rec-demo.gif)
![theme-green](https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/theme-green.png)

# Browser support

Modern browsers and IE 10+.

# License
[MIT](http://opensource.org/licenses/MIT)

这是一个vue的框架element-ui做的一个有简单的用户登录以及书籍信息展示，使用常用的table、list、form,基本的增删改查功能，以及弹出窗

