# 前言

先占地挖坑


xiugai

## 技术栈
vue2 + vuex + vue-router + webpack + ES6/7

# 目标功能
- [x] 主页 -- 开发中
- [x] 登录、注册 -- 开发中
- [x] 搜索商品 -- 选做
- [x] 商品搜索页 -- 选做
- [x] 修改密码 -- 选做
- [x] 搜索显示页 -- 选做
- [x] 商品详情页 -- 开发中
- [x] 商品评价 -- 开发中
- [x] 购物车功能 -- 开发中
- [x] 添加、删除、修改收货地址 -- 开发中
- [x] 个人中心 -- 开发中
- [x] 发送短信、语音验证 -- 选做
- [x] 订单列表 -- 选做
- [x] 订单详情 -- 选做
- [x] 下载App -- 选做

# 项目布局
```
├── build                                      // webpack配置文件
├── config                                     // 环境配置文件
├── index.html                                 // 入口html文件
├── node_module                                // 模块依赖
├── package-lock.json                          // package文件
├── package.json                               // package文件
├── README.md                                  // 项目文档说明               
├── src                                        // 源码目录
│   ├── common                                 // 公共资源
│   │   ├── css                                // 通用css样式
│   │   ├── js                                 // 通用js
│   │   ├── fonts                              // 通用字体
│   ├── components                             // 组件
│   │   ├── LastNews.vue                       // 最新消息组件
│   │   ├── LogForm.vue                        // 登录组件
│   │   ├── ModalBox.vue                       // 模态框组件
│   │   ├── MyCarousel.vue                     // 轮播图组件
│   │   ├── MyFooter.vue                       // 尾部组件
│   │   └── MyHeader.vue                       // 头部组件
│   │   └── NavBread.vue                       // 面包屑组件
│   │   └── StarProduct.vue                    // 明星产品组件
│   │   └── Tab.vue                            // 选项卡组件
│   ├── Views                                  // 页面
│   │   ├── index.vue                          // 主页
│   │   ├── itemlist.vue                       // 商品列表页
│   │   ├── itemdetail.vue                     // 商品详情页
│   │   ├── shoppingCart.vue                   // 购物车列表页     
│   │   ├── confirmOrder.vue                   // 订单确认页
│   │   ├── address.vue                        // 地址页
│   ├── App.vue                                // 页面入口文件
│   ├── main.js                                // 程序入口文件，加载各种公共
├── static                                     // 项目静态资源库
│   │   ├── img                                // 图片目录
│   │   │   ├── base                           // 通用图片
│   │   │   ├── goods                          // 商品图片
│   │   │   ├── index                          // 主页页面图片

```



