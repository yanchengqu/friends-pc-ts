import { Effect, Reducer, history } from 'umi';
import { message } from 'antd';
import urlMaps from '../config/urlMaps';
import { queryDeviceAdd } from '@/services/Home';

export interface HomeState {
  deviceList: any[];
}

export interface HomeType {
  namespace: 'Home';
  state: HomeState;
  effects: {
    deviceList: Effect;
  };
  reducers: {
    save: Reducer<HomeState>;
    // 启用 immer 之后
    // save: ImmerReducer<QueryTableState>;
  };
}

const HomeModel: HomeType = {
  namespace: 'Home',
  state: {
    deviceList: [],
  },
  effects: {
    *deviceList({ payload }, { call, put, select }) {
      const response = yield call(queryDeviceAdd, { ...payload });
      if (response.status === 'ok') {
        yield put({
          type: 'save',
          payload: {
            deviceList: response.data,
          },
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

export default HomeModel;
