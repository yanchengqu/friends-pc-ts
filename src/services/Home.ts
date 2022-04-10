import request from '@/utils/request';

interface IAttributes {
  key: string;
  value: string;
}

export interface deviceAddParams {
  /** 设备名称 */
  deviceName?: string;
  /** 仓储编码 */
  warehouseCode: string;
  /** 设备类型 0-摄像头，1-读卡器 */
  type: 0 | 1;
  /** 设备状态 1-启用，2-停用 */
  status?: 1 | 2;
  /** 设备号 */
  sn?: string;
  /** 设备描述 */
  description?: string;
  /** 设备属性列表 */
  attributes?: IAttributes[];
}
// 新增设备
export async function queryDeviceAdd(params: deviceAddParams) {
  return request('device/add', {
    method: 'POST',
    data: params,
  });
}
