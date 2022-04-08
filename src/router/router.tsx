/**
 * 内层路由
 * */
import React, { Suspense } from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
// import { Router, Route, Switch, Redirect } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import history from '@history';
import { title } from './title';
import { GlobalLoading } from '@components';
import { routes } from './routesConfig';
/**
 * Suspense 只支持组件的加载
 * 对于网络数据的请求 需要dva-loading
 */

// 提供给其他地方进行页面跳转
// export const history = createBrowserHistory();
// 提供给组件库进行页面跳转
window.router = history;

const Routers = () => {
  return (
    <Router history={history}>
      <Suspense fallback={<GlobalLoading loading={true} />}>
        <Switch>
          {routes.map(({ path, title, Component }) => (
            <Route
              key={path}
              path={path}
              exact
              render={() => {
                document.title = title;
                return <Component />;
              }}
            />
          ))}
          <Redirect from="*" to="/bbc/404" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routers;
