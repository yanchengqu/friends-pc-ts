import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './index.less';
import { IList } from './types';
import { ListItem } from './ListItem';

interface TabListProps {
  /** 当前选中item */
  activeItem: IList;
  /** 标题 */
  list: IList[];
  /** 自定义容器样式 */
  className?: array | string;
  /** 自定义容器样式 */
  wrapStyle?: string | CSSProperties;
  /** 点击回调 */
  onClick: (active: boolean, item: IList) => void;
}
export const TabList = (props: TabListProps) => {
  const { list, className, wrapStyle, onClick, activeItem } = props;
  const rootClassName = [styles.tablistWrap];
  if (!list.length) return null;
  return (
    <div className={classNames(rootClassName, className)} style={wrapStyle}>
      {list.map((item) => (
        <ListItem
          key={item?.id}
          active={item?.id == activeItem?.id}
          item={item}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

TabList.defaultProps = {
  activeItem: {},
  list: [],
  className: '',
  wrapStyle: {},
};
