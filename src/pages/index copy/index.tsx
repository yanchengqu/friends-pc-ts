import styles from './index.less';
import { WrapComponent, TitleStyle, CustomButton } from '../../components';
import { DeviceWrap } from './components/index';
export default function IndexPage() {
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
}
