import { Action } from 'redux';
import { EffectsCommandMap } from 'dva';
import request from '@/utils/request';

export interface ResDataList<T> {
  /** 状态码 0-成功 1-失败 */
  code: number;
  /** 错误码0-成功，其他值均为失败，详见3.2节错误码说明 */
  subCode: number;
  message: string;
  data: T[];
}

export interface ReducerAction<Type = any> extends Action<Type> {
  optType?: string;
  payload: any;
}
export class BaseModel<State extends { [key: string]: any }> {
  namespace = '';
  // 非空断言, x! 将从 x 值域中排除 null 和 undefined
  state!: State;

  effects = {};

  // reducers = getCommonReducer()
  reducers = {
    ...this.getDefaultReducers(),
  };

  defaultState!: State;

  getDefaultReducers() {
    return {
      ...getCommonReducer<State>(),
      reset: (state: State, action: ReducerAction) => {
        return {
          ...this.defaultState,
        };
      },
    };
  }
}

export interface ReducerListDataAction extends ReducerAction<'listData'> {}
export interface ReducerPostDataAction extends ReducerAction<'infoData'> {}

export interface CommonAction<Type, Payload, ResData> extends Action<Type> {
  payload?: Payload;
  /** 处理接口响应数据，在放到model之前 */
  handleResData?: (res: ResData) => ResData;
  /** 200000处理正确逻辑 */
  callback?: (res: ResData) => void;
  modelName?: string;
}

/**
 *
 * @param url 接口地址
 * @param optType state字段，如果需要
 * @param host 对应的host，默认为usercenter
 */
export function getListEffect<Info, Payload = any>(
  url: string,
  optType?: string,
  host?: string,
) {
  return function* (
    {
      callback,
      payload,
      handleResData,
    }: CommonAction<any, Payload, ResDataList<Info>>,
    { call, put }: EffectsCommandMap,
  ) {
    const requestHandle = (params: any) => {
      return request(url, {
        method: 'GET',
        data: params,
      });
    };

    let res: ResDataList<Info> = yield call(requestHandle, payload);

    if (handleResData) {
      res = handleResData(res);
    }

    if (optType) {
      const listDataAction: ReducerListDataAction = {
        type: 'listData',
        optType,
        payload: res.data,
      };
      yield put(listDataAction);
    }

    if (callback) {
      callback(res);
    }
  };
}

export function postListEffect<Info, Payload = any>(
  url: string,
  optType?: string,
  host?: string,
) {
  return function* info(
    {
      callback,
      payload,
      handleResData,
    }: CommonAction<any, Payload, ResDataList<Info>>,
    { call, put }: EffectsCommandMap,
  ) {
    const requestHandle = (params: any) => {
      return request(url, {
        method: 'POST',
        data: params,
      });
    };

    let res: ResDataList<Info> = yield call(requestHandle, payload);

    if (handleResData) {
      res = handleResData(res);
    }

    if (optType) {
      const infoDataAction: ReducerPostDataAction = {
        type: 'infoData',
        optType,
        payload: res.data,
      };
      yield put(infoDataAction);
    }

    if (callback) {
      callback(res);
    }
  };
}

export function getCommonReducer<State>() {
  return {
    infoData(
      state: State,
      { payload, optType = 'info' }: ReducerPostDataAction,
    ) {
      return {
        ...state,
        [optType]: {
          ...state[optType],
          ...payload,
        },
      };
    },
    listData(
      state: State,
      { payload, optType = 'list' }: ReducerListDataAction,
    ) {
      return {
        ...state,
        [optType]: payload,
      };
    },
  };
}

export interface ILoading {
  effects: {
    [key: string]: boolean;
  };
}
