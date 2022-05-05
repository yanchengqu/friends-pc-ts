import { Effect, Reducer, history } from 'umi';
import { queryStoreCount, queryCountByType } from '@/services/Home';

interface StoreCount {
  /** 库存商品类型 */
  type: number;
  /** 库存商品类型 描述 */
  typeStr: string;
  /** 商品总数量 */
  num: number;
  /** 在库商品数量 */
  inNum: number;
  /** 出库商品数量 */
  outNum: number;
  /** 异常商品数量 */
  abnormalNum: number;
  /** 维修商品数量 */
  repairNum: number;
  /** 报废商品数量 */
  scrapNum: number;
  /** 需求商品数量 */
  demandNum: number;
  /** 需求商品数量差额 */
  demandDifNum: number;
}
interface objData {
  [key: string]: number | string;
}
export interface HomeState {
  storeCountList: objData;
  countByTypeList: StoreCount[];
}

export interface MaterialType {
  namespace: 'Home';
  state: HomeState;
  effects: {
    queryCountByType: Effect;
    queryStoreCount: Effect;
  };
  reducers: {
    save: Reducer<HomeState>;
    // 启用 immer 之后
    // save: ImmerReducer<QueryTableState>;
  };
}

const MaterialModel: MaterialType = {
  namespace: 'Home',
  state: {
    countByTypeList: [],
    storeCountList: {},
  },
  effects: {
    // 库存商品分类统计
    *queryCountByType({ payload }, { call, put, select }) {
      const response = yield call(queryCountByType, { ...payload });
      console.log('--库存商品分类统计', response);
      if (response?.success) {
        yield put({
          type: 'save',
          payload: {
            countByTypeList: response.data,
          },
        });
      }
    },
    // 库存商品统计
    *queryStoreCount({ payload }, { call, put, select }) {
      const response = yield call(queryStoreCount, { ...payload });
      console.log('--库存商品统计', response);
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
  },
};

export default MaterialModel;
