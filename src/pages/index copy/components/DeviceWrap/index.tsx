import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './index.less';
import { DeviceItem } from '../DeviceItem';
import { IDeviceItem } from '../types';

interface IDeviceWrap {
  /** 设备list数据 */
  list: IDeviceItem[];
  /** 自定义容器样式 */
  className?: array | string;
  /** 自定义容器样式 */
  wrapStyle?: string | CSSProperties;
}
export const DeviceWrap = (props: IDeviceWrap) => {
  const { list, className, wrapStyle } = props;
  const rootClassName = [styles.DeviceWrapWrap];

  if (!(list && list.length)) return null;

  return (
    <div className={classNames(rootClassName, className)} style={wrapStyle}>
      {list.map((item, i) => (
        <DeviceItem {...item} key={`${item?.name}-${i}`} />
      ))}
    </div>
  );
};

DeviceWrap.defaultProps = {
  list: [],
  className: '',
  wrapStyle: {},
};
