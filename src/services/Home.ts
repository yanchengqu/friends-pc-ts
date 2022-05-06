import request from '@/utils/request';

// 库存商品统计
export async function queryStoreCount(params: any) {
  return request('store/count', {
    method: 'GET',
    data: params,
  });
}

// 库存商品分类统计
export async function queryCountByType(params: any) {
  return request('store/countByType', {
    method: 'GET',
    data: params,
  });
}
