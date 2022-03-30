import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './index.less';
import { RightOutlined } from '@ant-design/icons';

export interface MoreArrowProps {
  /**
   * @description 跳转文案
   */
  arrowTitle: string;
  /**
   * @description 自定义容器样式
   */
  className?: array | string;
  /**
   * @description 自定义容器样式
   */
  wrapStyle?: string | CSSProperties;
  /**
   * @description 自定义字体样式
   */
  fontClassName?: array | string;
  /**
   * @description 自定义字体样式
   */
  fontStyle?: string | CSSProperties;
  /**
   * @description 点击触发事件
   */
  onClick?: () => void;
  /** 自定义箭头color */
  arrowColor?: string;
}

export const MoreArrow = (props: MoreArrowProps) => {
  const {
    arrowTitle,
    wrapStyle,
    className,
    onClick,
    fontClassName,
    fontStyle,
    arrowColor,
  } = props;
  const rootClassName = [styles.MoreArrowWrap];
  if (!arrowTitle) return null;
  return (
    <div
      className={classNames(rootClassName, className)}
      style={wrapStyle}
      onClick={(e) => onClick && onClick(e)}
    >
      <span
        key={`${arrowTitle}-arrow`}
        className={classNames([styles.arrowFont], fontClassName)}
        style={fontStyle}
      >
        {arrowTitle}
      </span>
      {/* 图标箭头 */}
      <RightOutlined style={{ color: arrowColor, fontSize: 17 }} />
    </div>
  );
};

MoreArrow.defaultProps = {
  className: '',
  wrapStyle: {},
  fontClassName: '',
  fontStyle: {},
  arrowTitle: '',
  arrowColor: '#999999',
};

React.memo(MoreArrow);
