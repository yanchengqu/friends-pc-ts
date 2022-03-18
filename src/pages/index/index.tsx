import styles from './index.less';
import { WrapComponent, TitleStyle } from '../../components';
export default function IndexPage() {
  return (
    <div>
      <WrapComponent>
        <TitleStyle title="新增单个设备" />

        {/* <TitleStyle title='批量新增设备' /> */}
      </WrapComponent>
    </div>
  );
}
