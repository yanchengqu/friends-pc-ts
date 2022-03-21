import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './index.less';
import { Radio } from 'antd';
import { IDeviceItem } from '../types';

interface IDeviceItemProps extends IDeviceItem {
  /** 自定义容器样式 */
  className?: array | string;
  /** 自定义容器样式 */
  wrapStyle?: string | CSSProperties;
}
export const DeviceItem = (props: IDeviceItemProps) => {
  const { checked, name, disabled, className, wrapStyle } = props || {};
  const rootClassName = checked
    ? [styles.DeviceItemWrap, styles.checkedStyle]
    : [styles.DeviceItemWrap];

  return (
    <div className={classNames(rootClassName, className)} style={wrapStyle}>
      <Radio defaultChecked={checked} disabled={disabled}>
        {name}
      </Radio>
    </div>
  );
};

DeviceItem.defaultProps = {
  disabled: false,
  name: '',
  checked: false,
  className: '',
  wrapStyle: {},
};
