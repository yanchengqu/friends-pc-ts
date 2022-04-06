module.exports = {
  development: {
    // USERCENTER: 'http://10.252.192.15:8080/api/', // 老的用户中心测试域名
    TASKCENTER: 'http://10.252.192.35:8000/', //任务中心
    USERCENTER: 'http://10.252.192.35:8000/ucenter/',
    STORAGECENTER: 'http://10.252.192.35:8000/',
    PRODUCTCENTER: 'http://10.252.192.35:8000/',
    DMCENTER: 'http://10.252.192.35:8000/',
    PRICES: 'http://10.252.192.35:8000/', // 独立价格中心
    B2B_MALL: 'http://10.252.192.35:8000/',
    B2BMALL: 'http://10.252.192.35:8000/', // 过度版：B2B_MALL 与 B2BMALL 合并，保留B2BMALL
    INVENTORYCENTER: 'http://10.252.192.35:8000/',
    CMSCENTER: 'http://10.252.192.35:8000/',
    NORMAL: 'http://10.0.91.144/b2bmall/',
    USERID: 'http://10.252.192.35:8000/shop/gateway/', // 小店链接使用
    OMS: 'http://10.252.192.35:8000/',
    YAPI: 'http://mock.b2bcsx.com/mock/30/',
  },
  test: {
    TASKCENTER: 'http://10.252.192.35:8000/', //任务中心
    USERCENTER: 'http://10.252.192.35:8000/ucenter/',
    STORAGECENTER: 'http://10.252.192.35:8000/',
    PRODUCTCENTER: 'http://10.252.192.35:8000/',
    DMCENTER: 'http://10.252.192.35:8000/',
    PRICES: 'http://10.252.192.35:8000/', // 独立价格中心
    B2B_MALL: 'http://10.252.192.35:8000/',
    B2BMALL: 'http://10.252.192.35:8000/', // 过度版：B2B_MALL 与 B2BMALL 合并，保留B2BMALL
    INVENTORYCENTER: 'http://10.252.192.35:8000/',
    CMSCENTER: 'http://10.252.192.35:8000/',
    USERID: 'http://10.252.192.35:8000/shop/gateway/', // 小店链接使用
    OMS: 'http://10.252.192.35:8000/',
    YAPI: 'http://mock.b2bcsx.com/mock/30/',
  },
  pre: {
    TASKCENTER: 'http://pre.kong.b2bcsx.cn:8000/', //任务中心
    USERCENTER: 'http://pre.kong.b2bcsx.cn:8000/ucenter/',
    STORAGECENTER: 'http://pre.kong.b2bcsx.cn:8000/',
    PRODUCTCENTER: 'http://pre.kong.b2bcsx.cn:8000/',
    DMCENTER: 'http://pre.kong.b2bcsx.cn:8000/',
    PRICES: 'http://pre.kong.b2bcsx.cn:8000/', // 独立价格中心
    B2B_MALL: 'http://pre.kong.b2bcsx.cn:8000/',
    B2BMALL: 'http://pre.kong.b2bcsx.cn:8000/', // 过度版：B2B_MALL 与 B2BMALL 合并，保留B2BMALL
    INVENTORYCENTER: 'http://pre.kong.b2bcsx.cn:8000/',
    CMSCENTER: 'http://pre.kong.b2bcsx.cn:8000/',
    USERID: 'http://pre.kong.b2bcsx.cn:8000/shop/gateway/', // 小店链接使用
    OMS: 'http://pre.kong.b2bcsx.cn:8000/',
    YAPI: 'http://mock.b2bcsx.com/mock/30/',
  },
  production: {
    TASKCENTER: 'http://api.freshfood.cn/', //任务中心
    USERCENTER: 'http://api.freshfood.cn/ucenter/',
    STORAGECENTER: 'http://api.freshfood.cn/',
    PRODUCTCENTER: 'http://api.freshfood.cn/',
    DMCENTER: 'http://api.freshfood.cn/',
    PRICES: 'http://api.freshfood.cn/', // 独立价格中心
    B2B_MALL: 'http://api.freshfood.cn/',
    B2BMALL: 'http://api.freshfood.cn/', // 过度版：B2B_MALL 与 B2BMALL 合并，保留B2BMALL
    INVENTORYCENTER: 'http://api.freshfood.cn/',
    CMSCENTER: 'http://api.freshfood.cn/',
    USERID: 'http://api.freshfood.cn/shop/gateway/', // 小店链接使用
    OMS: 'http://api.freshfood.cn/',
    YAPI: 'http://mock.b2bcsx.com/mock/30/',
  },
}[process.env.NODE_ENV];
