# perfect-resume-fe

## 搭建开发环境

- 下载 [Node.js](https://nodejs.org) 并安装，确保 `npm` 能用
- 安装依赖 `npm i`
- 启动开发服务器 `npm run serve`

## 目录

- `views`: 路由中用到的路径。一个页面比较复杂的话，可以考虑建一个文件夹，里面也是 `views`、`components`、`index.vue` 的结构
- `components`: `view` 用到的组件
- `services`: 后端 API 接口
- `store`: 存储组件公共数据和后端请求数据，连接到组件，并提供修改的接口

## API 文档

[https://perfectresume1.docs.apiary.io](https://perfectresume1.docs.apiary.io/#)

## 参考

- [vue-class-component](https://github.com/vuejs/vue-class-component)
- [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
- [vuex-class](https://github.com/ktsn/vuex-class)
- 组件库 [muse-ui](http://www.muse-ui.org)
- icon 名 [material icons](https://material.io/tools/icons)
