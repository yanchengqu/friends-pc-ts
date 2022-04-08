// import { Action } from 'redux';
// // import { Model } from 'dva';
// import { EffectsCommandMap, SubscriptionAPI } from 'dva-core';
// import { getData } from './request';
// import { RaTableColumnProps } from './Table';

// export interface ReqPageData {
//   pageIndex: number | string;
//   pageSize: number | string;
// }

// export class PageData<T> {
//   columns: RaTableColumnProps<T>[] = [];

//   dataSource: T[] = [];

//   total: number = 0;
//   pageNum: number = 1;
//   pageSize: number = 10;

//   pagination: false = false;
// }

// export interface ResDataList<T> {
//   code: number;
//   message: string;
//   data: T[];
// }

// export interface ResDataPage<T> {
//   code: number;
//   message: string;
//   data: PageData<T>;
// }

// export interface ReducerAction<Type = any> extends Action<Type> {
//   optType?: string;
//   payload: any;
// }
// export class BaseModel<State extends { [key: string]: any }> {
//   namespace = '';
//   // 非空断言, x! 将从 x 值域中排除 null 和 undefined
//   state!: State;

//   effects = {};

//   // reducers = getCommonReducer()
//   reducers = {
//     ...this.getDefaultReducers(),
//   };

//   defaultState!: State;

//   getDefaultReducers() {
//     return {
//       ...getCommonReducer<State>(),
//       reset: (state: State, action: ReducerAction) => {
//         return {
//           ...this.defaultState,
//         };
//       },
//     };
//   }
// }

// export interface ReducerPageDataAction extends ReducerAction<'pageData'> {}
// export interface ReducerListDataAction extends ReducerAction<'listData'> {}
// export interface ReducerPostDataAction extends ReducerAction<'infoData'> {}

// export interface CommonAction<Type, Payload, ResData> extends Action<Type> {
//   payload?: Payload;
//   /** @deprecated 不建议使用， 请使用handleResData */
//   handleTitle?: (
//     res: ResDataPage<any>['dataSource']['columns'],
//   ) => ResDataPage<any>['dataSource']['columns'];
//   /** 处理接口响应数据，在放到model之前 */
//   handleResData?: (res: ResData) => ResData;
//   /** 200000处理正确逻辑 */
//   callback?: (res: ResData) => void;
//   modelName?: string;
// }

// interface CommonEffect<type, Payload, ResData> {
//   (
//     { callback, payload, handleResData }: CommonAction<type, Payload, ResData>,
//     { call, put }: EffectsCommandMap,
//   ): Generator<any, void, ResData>;
// }

// /**
//  * @todo 分页公共接口,get请求
//  * @param url 接口地址
//  * @param optType state字段，如果需要
//  * @desc 添加handleResData，处理后端不符合要求的数据，同时避免在react组件中处理影响性能
//  */
// export function getPageEffect<Info, Payload extends ReqPageData = any>(
//   url: string,
//   optType?: string,
//   host?: string,
// ) {
//   const page: CommonEffect<any, Payload, ResDataPage<Info>> = function* page(
//     { callback, payload, handleTitle, handleResData },
//     { call, put },
//   ) {
//     const { pageSize, pageIndex: current } = payload as Payload;

//     let res: ResDataList<Info> = yield call(getData, {
//       isYapi: true, // 测试打开
//       api: {
//         url,
//         config: {
//           method: 'get',
//           // host: host || 'usercenter',
//           host: 'YAPI',
//         },
//       },
//       // data: payload,
//     });

//     if (handleResData) {
//       res = handleResData(res);
//     }

//     let { data: { dataSource } = {} } = res;

//     if (handleTitle) {
//       dataSource = handleTitle(dataSource);
//     }

//     const columns = res.data.columns || [];

//     const pageDataAction: ReducerPageDataAction = {
//       type: 'pageData',
//       optType: optType,
//       payload: {
//         ...res.data,
//         columns,
//         dataSource: dataSource || [],
//         pagination: {
//           current,
//           pageSize,
//           total: res.data.total,
//         },
//       },
//     };

//     if (optType) {
//       yield put(pageDataAction);
//     }

//     if (callback) {
//       callback(res);
//     }
//   };

//   return page;
// }

// /**
//  *
//  * @param url 接口地址
//  * @param optType state字段，如果需要
//  * @param host 对应的host，默认为usercenter
//  */
// export function getListEffect<Info, Payload = any>(url: string, optType?: string, host?: string) {
//   return function* (
//     { callback, payload, handleResData }: CommonAction<any, Payload, ResDataList<Info>>,
//     { call, put }: EffectsCommandMap,
//   ) {
//     // let res: ResDataList<Info> = yield call(getData, {
//     //   url,
//     //   query: payload,
//     //   sort,
//     // });
//     let res: ResDataList<Info> = yield call(getData, {
//       api: {
//         url,
//         config: {
//           method: 'get',
//           host: host || 'usercenter',
//         },
//       },
//       data: payload,
//     });

//     if (handleResData) {
//       res = handleResData(res);
//     }

//     if (optType) {
//       const listDataAction: ReducerListDataAction = {
//         type: 'listData',
//         optType,
//         payload: res.data,
//       };
//       yield put(listDataAction);
//     }

//     if (callback) {
//       callback(res);
//     }
//   };
// }

// export function postListEffect<Info, Payload = any>(url: string, optType?: string, host?: string) {
//   return function* info(
//     { callback, payload, handleResData }: CommonAction<any, Payload, ResData<Info>>,
//     { call, put }: EffectsCommandMap,
//   ) {
//     let res: ResDataList<Info> = yield call(getData, {
//       api: {
//         url,
//         config: {
//           method: 'post',
//           host: host || 'usercenter',
//         },
//       },
//       data: payload,
//     });

//     if (handleResData) {
//       res = handleResData(res);
//     }

//     if (optType) {
//       const infoDataAction: ReducerPostDataAction = {
//         type: 'infoData',
//         optType,
//         payload: res.data,
//       };
//       yield put(infoDataAction);
//     }

//     if (callback) {
//       callback(res);
//     }
//   };
// }

// export function getCommonReducer<State>() {
//   return {
//     pageData(state: State, { payload, optType = 'page' }: ReducerPageDataAction) {
//       return {
//         ...state,
//         [optType]: {
//           ...state[optType],
//           ...payload,
//         },
//       };
//     },
//     infoData(state: State, { payload, optType = 'info' }: ReducerPostDataAction) {
//       return {
//         ...state,
//         [optType]: {
//           ...state[optType],
//           ...payload,
//         },
//       };
//     },
//     listData(state: State, { payload, optType = 'list' }: ReducerListDataAction) {
//       return {
//         ...state,
//         [optType]: payload,
//       };
//     },
//   };
// }

// /** table 条件选择字符串函数转为function函数 */
// export function parseJs(str: string | Function): Function | null {
//   if (str) {
//     if (typeof str === 'function') {
//       return str;
//     } else if (typeof str === 'string') {
//       try {
//         return eval(str);
//       } catch (error) {
//         return null;
//       }
//     } else {
//       return null;
//     }
//   } else {
//     return null;
//   }
// }

// /**
//  *
//  * @todo 表头添加一个条件方法
//  * @export
//  * @param {RaTableColumnProps<T>[]} [columns=[]] table表头
//  * @param {number} editIndex 要修改的下标位置
//  * @param {string} conditionName 要添加的条件属性名称
//  * @param {Function} conditionalExpression 要添加的条件属性对应的函数表达式
//  * @return {*}
//  */
// export function addConditionTocolumns(
//   columns: RaTableColumnProps<T>[] = [],
//   editIndex: number,
//   conditionName: string,
//   conditionalExpression: Function,
// ) {
//   if (Array.isArray(columns)) {
//     return columns.map((column, index) => {
//       if (index === parseInt(editIndex)) {
//         column[conditionName] = conditionalExpression;

//         return column;
//       } else {
//         return column;
//       }
//     });
//   }
// }

// export interface ILoading {
//   effects: {
//     [key: string]: boolean;
//   };
// }

// export interface IListItem {
//   /** 显示内容 */
//   label: string;
//   /** 值 */
//   value: number | string;
// }

// /**
//  *
//  * @todo 表单Form中 Field 的select组件赋值
//  * @param {*} actions 对用actions Form表单操作状态方法
//  * @param {string} name select下拉框组件的name
//  * @param {(string | any[])} defaultValue select下拉框默认值
//  * @param {ListType[]} list select下拉框全部list值
//  */
// export function setFieldState(
//   actions,
//   name: string,
//   defaultValue: string | any[],
//   list: IListItem[],
// ) {
//   actions.setFieldState(name, state => {
//     state.value = defaultValue;
//     if (list) {
//       state.props.enum = list;
//     }
//   });
// }
