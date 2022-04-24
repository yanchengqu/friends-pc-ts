import { Effect, Reducer, history } from 'umi';
import { message } from 'antd';
import urlMaps from '../config/urlMaps';
import {
  queryDeviceByPage,
  queryDeviceAdd,
  queryDeviceDelete,
  queryWarehouseGet,
  queryDeviceGetTypes,
  queryDeviceGetManufacturers,
  queryGetAttributes,
} from '@/services/Material';

interface Ilist {
  key: string;
  value: string;
}
export interface MaterialState {
  deviceByPageList: any[];
  warehouseTreeList: any[];
  deviceTypes: Ilist[];
  manufacturersList: Ilist[];
  attributesList: Ilist[];
}

export interface MaterialType {
  namespace: 'Material';
  state: MaterialState;
  effects: {
    deviceByPage: Effect;
    queryDeviceAdd: Effect;
    queryDeviceDelete: Effect;
    queryWarehouseGet: Effect;
    queryDeviceGetTypes: Effect;
    queryDeviceGetManufacturers: Effect;
    queryGetAttributes: Effect;
  };
  reducers: {
    save: Reducer<MaterialState>;
    // 启用 immer 之后
    // save: ImmerReducer<QueryTableState>;
  };
}

const MaterialModel: MaterialType = {
  namespace: 'Material',
  state: {
    deviceByPageList: {},
    warehouseTreeList: [],
    deviceTypes: [],
    manufacturersList: [],
    attributesList: [],
  },
  effects: {
    // 设备查询table
    *deviceByPage({ payload }, { call, put, select }) {
      const response = yield call(queryDeviceByPage, { ...payload });
      console.log('---zhixing', response);
      if (response?.success) {
        yield put({
          type: 'save',
          payload: {
            deviceByPageList: response?.data,
          },
        });
      }
    },
    // 新增设备
    *queryDeviceAdd({ payload, callBack }, { call, put, select }) {
      const response = yield call(queryDeviceAdd, { ...payload });
      console.log('---新增成功', response);
      if (response?.success) {
        callBack && callBack(response?.data);
      }
    },
    // 删除设备
    *queryDeviceDelete({ payload, callBack }, { call, put, select }) {
      const response = yield call(queryDeviceDelete, { ...payload });
      console.log('--删除成功', response);
      if (response?.success) {
        callBack && callBack(response?.data);
      }
    },
    // 查询仓库
    *queryWarehouseGet({ payload }, { call, put, select }) {
      const response = yield call(queryWarehouseGet, { ...payload });
      console.log('--查询仓储树成功', response);
      if (response?.success) {
        yield put({
          type: 'save',
          payload: {
            warehouseTreeList: response?.data,
          },
        });
      }
    },
    // 查询设备类型
    *queryDeviceGetTypes({ payload }, { call, put, select }) {
      const response = yield call(queryDeviceGetTypes, { ...payload });
      console.log('--查询设备类型', response);
      if (response?.success) {
        yield put({
          type: 'save',
          payload: {
            deviceTypes: response?.data,
          },
        });
      }
    },
    // 设备厂商
    *queryDeviceGetManufacturers({ payload }, { call, put, select }) {
      console.log('--设备厂商payload', payload);
      const response = yield call(queryDeviceGetManufacturers, { ...payload });
      console.log('--设备厂商', response);
      if (response?.success) {
        yield put({
          type: 'save',
          payload: {
            manufacturersList: response?.data,
          },
        });
      }
    },
    // 设备厂商onchange
    *queryGetAttributes({ payload }, { call, put, select }) {
      const response = yield call(queryGetAttributes, { ...payload });
      console.log('--设备厂商onchange', response);
      if (response?.success) {
        yield put({
          type: 'save',
          payload: {
            attributesList: response.data,
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

export default MaterialModel;
