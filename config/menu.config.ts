const normalImg = require('@/assets/menu/normal.png');
const activeImg = require('@/assets/menu/hover.png');

export default [
  {
    title: '工作台',
    link: '/',
    key: 'index',
    icon: normalImg,
    activeIcon: activeImg,
    children: [],
  },
  {
    title: '设备管理',
    link: '/device',
    key: 'device',
    icon: normalImg,
    activeIcon: activeImg,
  },
  {
    title: '物资管理',
    link: '/material',
    key: 'material',
    icon: normalImg,
    activeIcon: activeImg,
  },
  {
    title: '配置',
    link: '/configure',
    key: 'configure',
    icon: normalImg,
    activeIcon: activeImg,
  },
  {
    title: '意见反馈',
    link: '/Feedback',
    key: 'Feedback',
    icon: normalImg,
    activeIcon: activeImg,
  },
];
