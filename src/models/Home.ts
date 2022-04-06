import urlMaps from '../config/urlMaps';
import {
  PageData,
  postListEffect,
  getListEffect,
  getPageEffect,
  BaseModel,
  getCommonReducer,
} from '@services';

export interface IOrderData {
  list: any[];
  title: any[];
  total: number;
}

export class OrderState {
  orderList: IOrderData[] = [];
}

type HomeNameSpace = 'BbcOrder';
export class HomeModel extends BaseModel<OrderState> {
  namespace: HomeNameSpace = 'BbcOrder';
  state: OrderState = new OrderState();
  effects = {
    orderList: getPageEffect<IOrderData, any>(
      urlMaps.orderListApi,
      'orderList',
    ),
  };
  reducers = getCommonReducer<OrderState>();
}

export default new HomeModel();
