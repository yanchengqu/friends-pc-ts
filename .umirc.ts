import { defineConfig } from 'umi';
import { resolve } from 'path';

export default defineConfig({
  // 设置 node_modules 目录下依赖文件的编译方式
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  theme: {
    'primary-color': '#26A872',
  },
  // layout: {
  // },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  alias: {
    '@/*': resolve(__dirname, './src/*'),
    '@api': resolve(__dirname, './src/services/'),
    '@components': resolve(__dirname, './src/components'),
    '@config': resolve(__dirname, './src/utils/config'),
    '@models': resolve(__dirname, './src/models'),
    '@routes': resolve(__dirname, './src/routes'),
    '@services': resolve(__dirname, './src/services'),
    '@themes': resolve(__dirname, './src/themes'),
    '@utils': resolve(__dirname, './src/utils'),
  },
});
