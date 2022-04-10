// import { Effect, Reducer, history } from 'umi';
// import { message } from 'antd';
// import urlMaps from '../config/urlMaps';
// import {
//   postListEffect,
//   getListEffect,
//   BaseModel,
//   getCommonReducer,
// } from '@/services/common';

// interface IAttributes {
//   key: string;
//   value: string;
// }
// export interface deviceAddParams {
//   /** 设备名称 */
//   deviceName?: string;
//   /** 仓储编码 */
//   warehouseCode: string;
//   /** 设备类型 0-摄像头，1-读卡器 */
//   type: 0 | 1;
//   /** 设备状态 1-启用，2-停用 */
//   status?: 1 | 2;
//   /** 设备号 */
//   sn?: string;
//   /** 设备描述 */
//   description?: string;
//   /** 设备属性列表 */
//   attributes?: IAttributes[];
// }

// export interface IDeviceData {

// }

// export class HomeState {
//   deviceList: IDeviceData[] = [];
// }

// type HomeNameSpace = 'Home';
// export class HomeModel extends BaseModel<HomeState> {
//   namespace: HomeNameSpace = 'Home';
//   state: HomeState = new HomeState();
//   effects = {
//     deviceList: postListEffect<IDeviceData, any>(
//       urlMaps.deviceAddApi,
//       'deviceList',
//     ),
//   };
//   reducers = getCommonReducer<HomeState>();
// }

// export default new HomeModel();
