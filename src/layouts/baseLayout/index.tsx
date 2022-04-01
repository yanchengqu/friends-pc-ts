import React from 'react';
import classNames from 'classnames';
import { Layout } from 'antd';
import HeaderContent from './header';
import MenuContent from './menu';
import styles from './index.less';
const logoImg = require('@/assets/menu/logo.png');
const { Header, Content, Sider } = Layout;

export default (props: any) => {
  const pathname = props.children?.props?.location?.pathname;
  const showTabs = pathname.indexOf('device') > -1;
  const contentStyle = showTabs
    ? [styles.content, styles.deviceContent]
    : [styles.content];
  return (
    <Layout className={styles.container}>
      {/* 左边菜单 */}
      <Layout style={{ padding: 0 }}>
        <Sider width={50} style={{ background: '#060606' }}>
          {/* logo */}
          <div className={styles.logoImg}>
            <img src={logoImg} height="40" />
          </div>
          {/* 菜单导航 */}
          <MenuContent />
          {/* 头像 */}
        </Sider>
        {/* 右边内容 */}
        <Layout>
          <Header className={styles.contentHeader}>
            <HeaderContent showTabs={showTabs} />
          </Header>
          <Content className={classNames(contentStyle)}>
            {props.children}
          </Content>
        </Layout>
      </Layout>
      {/* <Footer className={styles.footerContent}>管理平台通用业务模版</Footer> */}
    </Layout>
  );
};
