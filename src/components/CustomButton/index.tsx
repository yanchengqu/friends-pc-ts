import React, { CSSProperties, MouseEventHandler, ReactDOM } from 'react';
import classNames from 'classnames';
import styles from './index.less';
export interface ICustomButton {
  /** 是否禁用状态 默认 false */
  disabled: boolean;
  /** 是否通栏样式，即按钮宽度为屏幕宽度 默认 false */
  full: boolean;
  /** 设置圆角 默认设置 4*/
  circle: boolean;
  /** 按钮名称 */
  btnName: string;
  /** 自定义容器样式 */
  className?: array | string;
  /** 自定义容器样式 */
  wrapStyle?: string | CSSProperties;
  /** 点击触发事件 */
  onClick?: MouseEventHandler<HTMLElement>;
  /**
   * @description 控制大小, 默认 middle
   * small-高度32px 重新上传模板，上传excel模板，关闭按钮
   * middle-40px 提交, 紧急制动,充电模式, 登陆查询按钮
   * large-60px
   * */
  size?: 'small' | 'middle' | 'large';
  /** 背景颜色 green-绿色 | gray-灰色  默认绿色 */
  bgColor?: 'green' | 'grey';
  /** 字体大小 默认16*/
  fontSize?: 'small' | 'middle' | 'large';
  /** 自定义图标内容 */
  customIcon?: ReactNode;
}

// 公共按钮组建
export const CustomButton = (props: ICustomButton) => {
  const {
    wrapStyle,
    className,
    onClick,
    btnName,
    circle,
    full,
    size,
    disabled,
    bgColor,
    fontSize,
    customIcon,
  } = props;
  const rootClassName = disabled
    ? [styles.customBtn, styles.disabledBtn]
    : [styles.customBtn];

  // 按钮高度
  const heightObj = {
    small: '32px',
    middle: '40px',
    large: '60px',
  };

  // 按钮背景
  const bgColorObj = {
    green: '#26A872',
    grey: '#F9F9F9',
  };
  // 按钮字体颜色
  const fontColorObj = {
    green: '#FFFFFF',
    grey: '#666666',
  };

  // 按钮字体
  const fontSizeObj = {
    small: '14px',
    middle: '16px',
    large: '18px',
  };
  return (
    <div
      key={`${btnName}-button`}
      className={classNames(rootClassName, className)}
      style={{
        borderRadius: circle ? 4 : null,
        width: full ? '100%' : 100,
        height: heightObj[size],
        background: bgColorObj[bgColor],
        color: fontColorObj[bgColor],
        fontSize: fontSizeObj[fontSize],
        border: bgColor == 'grey' ? '1px solid rgba(224,224,224,1)' : 'none',
        ...wrapStyle,
      }}
      onClick={(e) => !disabled && onClick && onClick(e)}
    >
      {btnName}
    </div>
  );
};

CustomButton.defaultProps = {
  btnName: '',
  className: '',
  wrapStyle: {},
  circle: true,
  full: false,
  disabled: false,
  size: 'middle',
  bgColor: 'green',
  fontSize: 'middle',
  customIcon: '',
};

React.memo(CustomButton);
