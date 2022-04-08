/**
 * 基础接口
 * */
import { getData } from './request';

// 登陆接口 - 新接口
const API_LOGIN = {
  url: 'login',
  config: {
    method: 'post',
    host: 'usercenter',
    noWarn: true,
  },
};
export const login = ({ username, password }) =>
  getData({
    api: API_LOGIN,
    data: { username, telephone: username, password },
  });
