import React, { CSSProperties, ReactElement } from 'react';
import classNames from 'classnames';
import styles from './index.less';

export interface WrapComponentProps {
  /**
   * @description 自定义容器样式
   */
  className?: array | string;
  /**
   * @description 自定义容器样式
   */
  wrapStyle?: string | CSSProperties;
  /**
   * @description 自定义内容
   */
  children?: ReactElement;
}

export const WrapComponent = (props: WrapComponentProps) => {
  const { wrapStyle, className, children } = props;
  const rootClassName = [styles.WrapComponentWrap];
  return (
    <div className={classNames(rootClassName, className)} style={wrapStyle}>
      {children}
    </div>
  );
};

WrapComponent.defaultProps = {
  className: '',
  wrapStyle: {},
  children: '',
};

React.memo(WrapComponent);
