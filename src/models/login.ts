import { Effect, Reducer, history } from 'umi';
import { message } from 'antd';
import { queryLogin, logout } from '@/services/login';

import { ConnectState, LoginUserInfoState } from './connect.d';

export interface LoginModelState {
  userInfo: LoginUserInfoState;
  isError: boolean;
}

export interface LoginModelType {
  namespace: 'login';
  state: LoginModelState;
  effects: {
    getUserInfo: Effect;
    queryLogin: Effect;
    logout: Effect;
  };
  reducers: {
    save: Reducer<LoginModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<LoginModelState>;
  };
}

const LoginModel: LoginModelType = {
  namespace: 'login',
  state: {
    userInfo: {
      id: '',
      name: '',
    },
    isError: false,
  },
  effects: {
    *queryLogin({ payload }, { call, put }) {
      // const { name } = yield select((state: ConnectState) => state.global);
      const response = yield call(queryLogin, { ...payload });
      if (response?.success) {
        // data下返回false代表不需要跳转添加设备界面，返回true代表需要跳转添加设备界面
        // yield put({
        //   type: 'save',
        //   payload: {
        //     userInfo: response.data,
        //   },
        // });
        // localStorage.setItem(
        //   'userid',
        //   JSON.stringify(response.currentAuthority.userid),
        // );
        if (response?.data) {
          // true代表需要跳转添加设备界面
          history.replace('/Material');
        } else {
          // false代表不需要跳转添加设备界面
          history.replace('/');
        }
        message.success('登录成功！');
      } else {
        yield put({
          type: 'save',
          payload: {
            isError: true,
          },
        });
      }
    },
    *getUserInfo({ payload }, { call, put, select }) {
      const { name } = yield select((state: ConnectState) => state.global);
      const data = yield call(queryLogin, { ...payload, name });
      yield put({
        type: 'save',
        payload: {
          userInfo: data,
        },
      });
    },
    *logout(_, { call }) {
      const response = yield call(logout);
      if (response.status === 'ok') {
        localStorage.removeItem('userid');
        history.replace({
          pathname: '/login',
          search: `timestamp=${new Date().getTime()}`,
        });
      }
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
};

export default LoginModel;
