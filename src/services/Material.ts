import request from '@/utils/request';
export interface IDeviceBase {
  /** 设备编码 */
  deviceCode?: string;
  /** 设备名称 长度不能超过50 */
  deviceName?: string;
  /** 仓储编码	长度不能超过50 */
  warehouseCode?: string;
  /** 设备类型	0 - 摄像头，1 - 读卡器 */
  type?: number;
  /** 设备厂商 */
  manufacturer?: number;
  /** 设备状态	1-启用，2-停用，3-异常 */
  status?: 1 | 2 | 3;
  /** 设备序列号	长度不能超过50 */
  sn?: string;
}
interface getAttributesParams {
  /** 设备类型 */
  type: number;
  /** 设备厂商 */
  manufacturer?: number;
}
interface warehouseGetParams {
  warehouseCode?: string;
}
interface IAttributes {
  key: string;
  value: string;
}

interface getManufacturersParams {
  /** 设备类型 */
  type: number;
}
export interface deviceAddParams extends IDeviceBase {
  /** 设备描述 */
  description?: string;
  /** 设备属性列表 */
  attributes?: IAttributes[];
}

export interface storeAddParams
  extends Omit<IDeviceBase, 'deviceCode', 'deviceName'> {
  /** 库存商品名称 */
  storeName: string;
  /** 库存商品rfid */
  rfid: string;
  /** 设备描述 */
  description?: string;
  /** 设备属性列表 */
  attributes?: IAttributes[];
}
export interface deviceDeleteParams {
  deviceCode: string;
}

export interface storeDeleteParams {
  storeCode: string;
}

export interface deviceEditParams {
  /** 设备编码 */
  deviceCode: string;
  /** 设备名称 长度不能超过50 */
  deviceName?: string;
  /** 仓储编码	长度不能超过50 */
  warehouseCode?: string;
  /** 设备类型	0 - 摄像头，1 - 读卡器 */
  type?: number;
  /** 设备状态	1 - 启用，2 - 停用 */
  status?: number;
  /** 设备序列号	长度不能超过50 */
  sn?: string;
  /** 设备描述	长度不能超过500 */
  description?: string;
  /** 设备属性列表 */
  attributes?: any[];
}

export interface storeParams {
  /** 库存商品编码 */
  storeCode: string;
  /** 库存商品名称 长度不能超过50 */
  storeName?: string;
  /** 仓储编码	长度不能超过50 */
  warehouseCode?: string;
  /** 设备类型	0 - 摄像头，1 - 读卡器 */
  type?: number;
  /** 设备序列号	长度不能超过50 */
  sn?: string;
  /** 库存商品rfid */
  rfid?: string;
  /** 设备状态	1 - 启用，2 - 停用 */
  status?: number;
}
export interface storeEditParams extends storeParams {
  /** 库存数量 */
  num: number;
  /** 设备描述	长度不能超过500 */
  description?: string;
  /** 设备属性列表 */
  attributes?: any[];
}

export interface recordsList extends IDeviceBase {
  /** 设备类型 描述 */
  typeStr: string;
  /** 设备厂商 描述 */
  manufacturer: string;
  /** 设备状态 描述 */
  statusStr: string;
  /** 设备描述 */
  description: string;
}

export interface deviceByPageData {
  /** 总条数 */
  total: number;
  /** 分页大小 */
  size: number;
  /** 当前页码 */
  current: number;
  records: recordsList[];
}

export interface deviceByPageParams extends IDeviceBase {
  /** 分页大小 */
  pageSize: number;
  /** 页码 */
  pageNum: number;
}

// 查询设备管理
export async function queryDeviceByPage(params: deviceByPageParams) {
  return request('device/getByPage', {
    method: 'GET',
    data: params,
  });
}

// 查询物质管理
export async function queryStoreByPage(params: storeParams) {
  return request('store/getByPage', {
    method: 'GET',
    data: params,
  });
}

// 新增设备确认提交
export async function queryDeviceAdd(params: deviceAddParams) {
  return request('device/add', {
    method: 'POST',
    data: params,
  });
}

// 新增物资确认提交
export async function queryStoreAdd(params: storeAddParams) {
  return request('store/add', {
    method: 'POST',
    data: params,
  });
}

// 删除设备
export async function queryDeviceDelete(params: deviceDeleteParams) {
  return request('device/del', {
    method: 'DELETE',
    data: params,
  });
}

// 删除物质
export async function queryStoreDelete(params: storeDeleteParams) {
  return request('store/del', {
    method: 'DELETE',
    data: params,
  });
}

// 修改设备
export async function queryDeviceEdit(params: deviceEditParams) {
  return request('device/edit', {
    method: 'PUT',
    data: params,
  });
}

// 修改物质
export async function queryStoreEdit(params: storeEditParams) {
  return request('store/edit', {
    method: 'PUT',
    data: params,
  });
}

// 查询仓库树
export async function queryWarehouseGet(params: warehouseGetParams) {
  return request('warehouse/get', {
    method: 'GET',
    data: params,
  });
}

//查询设备类型
export async function queryDeviceGetTypes(params: any) {
  return request('device/getTypes', {
    method: 'GET',
    data: params,
  });
}

//查询物质类型
export async function queryStoreGetTypes(params: any) {
  return request('store/getTypes', {
    method: 'GET',
    data: params,
  });
}

// 物质类型onchange
export async function queryStoreAttributes(params: getAttributesParams) {
  return request('store/getAttributes', {
    method: 'GET',
    data: params,
  });
}

// 设备厂商 物质没有
export async function queryDeviceGetManufacturers(
  params: getManufacturersParams,
) {
  return request('device/getManufacturers', {
    method: 'GET',
    data: params,
  });
}

// 设备厂商onchange
export async function queryGetAttributes(params: getAttributesParams) {
  return request('device/getAttributes', {
    method: 'GET',
    data: params,
  });
}

// 设备统计
export async function queryDeviceCount(params: any) {
  return request('device/count ', {
    method: 'GET',
    data: params,
  });
}

// 物资管理统计
export async function queryStoreCount(params: any) {
  return request('store/count', {
    method: 'GET',
    data: params,
  });
}
