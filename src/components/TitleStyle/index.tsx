import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './index.less';

interface ITitleStyle {
  /** 标题 */
  title: string;
  /** 自定义容器样式 */
  className?: array | string;
  /** 自定义容器样式 */
  wrapStyle?: string | CSSProperties;
}
export const TitleStyle = (props: ITitleStyle) => {
  const { title, className, wrapStyle } = props;
  const rootClassName = [styles.TitleStyleWrap];

  return (
    <div className={classNames(rootClassName, className)} style={wrapStyle}>
      <span className={styles.titleName}>{title}</span>
    </div>
  );
};

TitleStyle.defaultProps = {
  title: '',
  className: '',
  wrapStyle: {},
};
