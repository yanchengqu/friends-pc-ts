import React, { FC } from 'react';
import { Link, connect, useLocation, Loading } from 'umi';
import classNames from 'classnames';
import { Menu } from 'antd';
import { GlobalModelState } from '@/models/connect';
import { queryKeysByPath } from '@/utils/utils';
import styles from './index.less';

const { SubMenu, Item } = Menu;

export interface BasicLayoutProps {
  global: GlobalModelState;
  loading: boolean;
}

const MenuContent: FC<BasicLayoutProps> = ({ global }) => {
  const { menusData } = global;
  const location = useLocation();

  function renderMenu(data: any = []) {
    const rows = Array.isArray(data) ? data : [];
    return rows.map((row) => {
      if (row === undefined) return false;
      const { title, link = '', key, children, ...restState } = row;

      return (
        <Item key={key} title={title}>
          <Link to={{ pathname: link, state: { ...restState, key } }}>
            {/* <Icon type={icon} /> */}
            <span>{title}</span>
          </Link>
        </Item>
      );
    });
  }

  const { openKey, selectKey } = queryKeysByPath(location.pathname);
  console.log('---location', menusData);
  console.log('---key', openKey, selectKey);
  const rootClassName = [styles.menuList];

  return (
    // <Menu
    //   selectedKeys={[selectKey || '']}
    //   defaultOpenKeys={[openKey]}
    //   mode="inline"
    //   theme="light"
    //   className="progressbar"
    // >
    //   {renderMenu(menusData)}
    // </Menu>
    <>
      {menusData.map((item, i) => {
        if (item === undefined) return false;
        const { title, link = '', key, children, ...restState } = item;
        // 判断是否当前选中
        let isActive = false;
        if (!openKey && link == '/') {
          // 说明是第一个
          isActive = true;
        }

        if (link != '/' && link.indexOf(openKey) > 0) {
          isActive = true;
        }
        return (
          <Link to={{ pathname: link, state: { ...restState, key } }}>
            <div
              key={item.key + '-' + i}
              className={classNames(
                rootClassName,
                isActive ? styles.active : '',
              )}
            >
              <img src={isActive ? item.activeIcon : item.icon} />
              <div className={styles.title}>{item.title}</div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default connect(
  ({ global, loading }: { global: GlobalModelState; loading: Loading }) => ({
    global,
    loading: loading.models.index,
  }),
)(MenuContent);
