import React from 'react';
import { connect } from 'umi';
import styles from './index.less';
import { WrapComponent, TitleStyle, CustomButton } from '../../components';
import { DeviceWrap } from './components/index';
import { HomeState } from '../../models/Home';
import { ILoading } from '@/services/common';
import { IDvaProps } from '@/constants';

interface IProps {
  loading: ILoading;
  Home: HomeState;
}

const mapStateToProps = ({ Home, loading }: IDvaProps & IProps) => {
  return { Home, loading };
};
const IndexPage = ({ dispatch, Home, loading }) => {
  console.log('--Home', Home);
  return (
    <div>
      <WrapComponent>
        {/* 当前没设备提示 */}
        <div className={styles.indexDes}>
          <img className={styles.leftWrap} />
          <div className={styles.rightWrap}>
            <div className={styles.title}>您当前还没有设备，无法启动系统.</div>
            <div className={styles.des}>
              请先添加设备，或联系管理员xxxxxx@mail.com或电话
            </div>
          </div>
        </div>
        <TitleStyle title="新增单个设备" />
        <DeviceWrap
          list={[
            {
              disabled: false,
              name: '智能柜',
              checked: true,
            },
            {
              disabled: false,
              name: '智能柜',
              checked: false,
            },
            {
              disabled: false,
              name: '智能柜',
              checked: false,
            },
            {
              disabled: false,
              name: '智能柜',
              checked: false,
            },
          ]}
        />
        <TitleStyle title="批量新增设备" />
        <DeviceWrap
          list={[
            {
              disabled: false,
              name: '批量上传',
              checked: false,
            },
          ]}
        />
        {/* 按钮 */}
        <div className={styles.btnWrap}>
          <CustomButton btnName="下一步" />
        </div>
      </WrapComponent>
    </div>
  );
};

export default React.memo(connect(mapStateToProps)(IndexPage));
