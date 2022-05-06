import request from '@/utils/request';

// 库存状态
export async function queryDeviceCount(params: any) {
  return request('store/countByType', {
    method: 'GET',
    data: params,
  });
}

// 库存信息
export async function queryDeviceCount(params: any) {
  return request('store/count', {
    method: 'GET',
    data: params,
  });
}
