import { Effect, Reducer, history } from 'umi';
import { message } from 'antd';
import urlMaps from '../config/urlMaps';
import {
  queryDeviceByPage,
  queryStoreByPage,
  queryDeviceAdd,
  queryStoreAdd,
  queryDeviceDelete,
  queryStoreDelete,
  queryWarehouseGet,
  queryDeviceGetTypes,
  queryStoreGetTypes,
  queryDeviceGetManufacturers,
  queryGetAttributes,
  queryStoreAttributes,
  queryDeviceCount,
  queryStoreCount,
} from '@/services/Material';

interface Ilist {
  key: string;
  value: string;
}

interface objData {
  [key: string]: number | string;
}
export interface MaterialState {
  deviceByPageList: any[];
  materialByPageList: any[];
  warehouseTreeList: any[];
  deviceTypes: Ilist[];
  materialTypes: Ilist[];
  manufacturersList: Ilist[];
  attributesList: Ilist[];
  attributesMaterialList: Ilist[];
  deviceCountList: objData;
  storeCountList: objData;
}

export interface MaterialType {
  namespace: 'Material';
  state: MaterialState;
  effects: {
    deviceByPage: Effect;
    queryDeviceAdd: Effect;
    queryStoreAdd: Effect;
    queryDeviceDelete: Effect;
    queryStoreDelete: Effect;
    queryWarehouseGet: Effect;
    queryDeviceGetTypes: Effect;
    queryStoreGetTypes: Effect;
    queryDeviceGetManufacturers: Effect;
    queryGetAttributes: Effect;
    queryStoreAttributes: Effect;
    queryDeviceCount: Effect;
    queryStoreCount: Effect;
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
    materialByPageList: {},
    warehouseTreeList: [],
    deviceTypes: [],
    materialTypes: [],
    manufacturersList: [],
    attributesList: [],
    attributesMaterialList: [],
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
    // 物资查询table
    *queryStoreByPage({ payload }, { call, put, select }) {
      const response = yield call(queryStoreByPage, { ...payload });
      console.log('---queryStoreByPage', response);
      if (response?.success) {
        yield put({
          type: 'save',
          payload: {
            materialByPageList: response?.data,
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
    // 新增物资
    *queryStoreAdd({ payload, callBack }, { call, put, select }) {
      const response = yield call(queryStoreAdd, { ...payload });
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
    // 删除物资
    *queryStoreDelete({ payload, callBack }, { call, put, select }) {
      const response = yield call(queryStoreDelete, { ...payload });
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
    // 查询物资类型
    *queryStoreGetTypes({ payload }, { call, put, select }) {
      const response = yield call(queryStoreGetTypes, { ...payload });
      console.log('--查询物资类型', response);
      if (response?.success) {
        yield put({
          type: 'save',
          payload: {
            materialTypes: response?.data,
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
    // 物资厂商onchange
    *queryStoreAttributes({ payload }, { call, put, select }) {
      const response = yield call(queryStoreAttributes, { ...payload });
      console.log('--物资厂商onchange', response);
      if (response?.success) {
        yield put({
          type: 'save',
          payload: {
            attributesMaterialList: response.data,
          },
        });
      }
    },
    // 设备统计异常
    *queryDeviceCount({ payload }, { call, put, select }) {
      const response = yield call(queryDeviceCount, { ...payload });
      console.log('--设备统计异常', response);
      if (response?.success) {
        yield put({
          type: 'save',
          payload: {
            deviceCountList: response.data,
          },
        });
      }
    },
    // 物资统计异常
    *queryStoreCount({ payload }, { call, put, select }) {
      const response = yield call(queryStoreCount, { ...payload });
      console.log('--物资统计异常', response);
      if (response?.success) {
        yield put({
          type: 'save',
          payload: {
            storeCountList: response.data,
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
