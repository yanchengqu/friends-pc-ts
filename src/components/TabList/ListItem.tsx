import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './index.less';
import { IList } from './types';

interface ListItemProps {
  /** 是否选中 */
  active: boolean;
  /** 标题 */
  item: IList;
  /** 自定义容器样式 */
  className?: array | string;
  /** 自定义容器样式 */
  wrapStyle?: string | CSSProperties;
  /** 点击回调 */
  onClick: (active: boolean, item: IList) => void;
}
export const ListItem = (props: ListItemProps) => {
  const { active, item, className, wrapStyle, onClick } = props;
  const rootClassName = active
    ? [styles.ListItemActive]
    : [styles.ListItemWrap];
  const handleClick = () => {
    onClick && onClick(active, item);
  };
  return (
    <div
      className={classNames(rootClassName, className)}
      style={wrapStyle}
      onClick={handleClick}
    >
      {item?.name}
    </div>
  );
};

ListItem.defaultProps = {
  active: false,
  item: {},
  className: '',
  wrapStyle: {},
};
