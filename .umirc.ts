import { defineConfig } from 'umi';
import { resolve } from 'path';

export default defineConfig({
  // 设置 node_modules 目录下依赖文件的编译方式
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  theme: {
    'primary-color': '#26A872', // 全局主色
    'heading-color': '#666666', // 标题色
    // 'text-color': '', // 主文本色
    // 'text-color-secondary': '', // 次文本色
  },
  // layout: {
  // },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  // proxy: {
  //   '/': {
  //     target: 'http://172.20.10.4:1601',
  //     changeOrigin: true,
  //     pathRewrite: { '^/': '/' },
  //     // 添加请求头（access-source只有访问后台本地需要添加，过网关的时候会由网关自动添加）
  //     // headers: { 'access-source': 'ApiGateway' },
  //     // onProxyReq(proxyReq, req, res) {
  //     //   // 添加请求头
  //     //   proxyReq.setHeader('access-source', 'ApiGateway');
  //     // }
  //   },
  // },
  alias: {
    '@/*': resolve(__dirname, './src/*'),
    '@services': resolve(__dirname, './src/services'),
    '@components': resolve(__dirname, './src/components'),
    '@config': resolve(__dirname, './src/utils/config'),
    '@models': resolve(__dirname, './src/models'),
    '@routes': resolve(__dirname, './src/routes'),
    '@themes': resolve(__dirname, './src/themes'),
    '@utils': resolve(__dirname, './src/utils'),
    '@history': resolve(__dirname, './src/router/history.ts'),
  },
});
