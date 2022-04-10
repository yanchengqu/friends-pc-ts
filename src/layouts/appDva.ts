// import { create } from 'dva-core';
// import createLoading from 'dva-loading';
// // import { createBrowserHistory } from 'history';
// import { getDvaApp } from 'umi'
// import history from '@history';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// // import { StorageUtils } from '@util';
// import models from '../models';

// // import { EResponseCode } from '@constants';

// // import { Toast } from '@ant-design/react-native';

// // 这里使用了redux-persist去做数据的持久化存储，blacklist数组下写上models下的文件名，即可对当前的数据进行持久化存储也就是保存到localstrong中一份，
// // 因为dva的models是根据路由注入的所以这里我们需要去创建路由，把数据和页面结合起来

// const persistConfig = {
//   // redux持久化配置
//   key: 'root',
//   storage: storage,
//   blacklist: [],
// };

// // 生成dva应用，配置一些hooks
// const dvaApp = create({
//   history: history,
//   // 可监听state状态的变化
//   onStateChange() {},
//   onReducer(reducer) {
//     return persistReducer(persistConfig, reducer);
//   },
//   //   onReducer: reducer => (state: any, action: { type: string }) => {
//   //     if (action.type === 'login/requestLogout') {
//   //       // console.log('重置所有保存的状态');
//   //       return reducer({}, { type: '@@INIT' });
//   //     }
//   //     return reducer(state, action);
//   //   },

//   //   onError(error: any, dispatch: any) {
//   //     // 登录失效
//   //     if (error.code === EResponseCode.TOKEN_INVALID || error.code === EResponseCode.LOGIN_FAILURE) {
//   //       StorageUtils.clear()
//   //         .then(() => {
//   //           dispatch({
//   //             type: 'route/logout',
//   //           });
//   //         })
//   //         .catch();
//   //       return;
//   //     }
//   //     //数据中心已处理，不需要提示了
//   //     if (error.dirty) {
//   //       console.log('已处理，不需要提示了');
//   //     } else if (error.code === 'ECONNABORTED') {
//   //       // 请求超时
//   //       //   Toast.show('请 求 超 时 请 重 试');
//   //     } else if (error.message && error.code !== EResponseCode.SUCCESS) {
//   //       //   Toast.show(error.message);
//   //     } else if (error.message && !error.message.includes('Network Error')) {
//   //       // 根据状态码弹出提示
//   //       /* general __DEV__ */
//   //       // DeviceEventEmitter.emit("NETWORK_ERROR");

//   //       if (error.response && error.response.status >= 500) {
//   //         // Toast.show('服务器异常请联系开发者');
//   //       } else {
//   //         // Toast.show('网络好像有点问题，请检查后重试!');
//   //       }
//   //     }
//   //     console.log(error, '捕获全局错误');
//   //   },
// });

// [...models].forEach((model) => {
//   // 装载models对象
//   dvaApp.model(model);
// });

// dvaApp.use(
//   createLoading({
//     except: [
//       //   'appupdate/checkUpdate',
//     ],
//   }),
// ); // 装在dva-loading

// dvaApp.start(); // 实例初始化

// window.onload = () => persistStore(dvaApp._store);

// export default dvaApp;
