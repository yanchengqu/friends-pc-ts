// /**
//  * 最外层路由
//  * */
// import React, { Suspense, lazy } from 'react';
// import { Router, Route, Switch, Redirect } from 'dva/router';
// import history from '@history';
// import { GlobalLoading } from '@components';

// const Login = lazy(() => import('../pages/login'));
// const Global = lazy(() => import('../pages/global'));

// const BlankPage = () => (
//   <Router history={history}>
//     <Suspense fallback={<GlobalLoading loading={true} />}>
//       <Switch>
//         <Route exact path="/" component={Login} />
//         <Route component={Global} />
//       </Switch>
//     </Suspense>
//   </Router>
// );

// export default BlankPage;
