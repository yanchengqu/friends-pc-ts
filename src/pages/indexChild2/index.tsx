import { Form, Input, Button, Upload } from 'antd';
import styles from './index.less';
import { WrapComponent, TitleStyle, CustomButton } from '@/components';
import { UploadOutlined } from '@ant-design/icons';
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const layout = {
  labelCol: { span: 8 }, // label 标签布局
  wrapperCol: { span: 16 }, // 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol
};

export default function IndexPage() {
  // 扫描点击
  const scanHandle = () => {};
  return (
    <div className={styles.indexChild2}>
      <WrapComponent>
        <TitleStyle title="批量新增设备" />
        <Form
          {...layout}
          name="wrap"
          labelCol={{ flex: '120px' }}
          labelAlign="right" // label 标签的文本对齐方式
          labelWrap={false} // label 标签的文本换行方式
          // wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ marginTop: 54 }}
        >
          <Form.Item label="上传文件：" name="id">
            <Upload {...props}>
              {/* <CustomButton btnName="上传Excel模板" bgColor='grey' customIcon={<UploadOutlined />} /> */}
              <Button icon={<UploadOutlined />} className={styles.uploadBtn}>
                上传Excel模板
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item label=" " className={styles.descWrap}>
            <div className={styles.name}>模板说明：</div>
            <div className={styles.name}>1. 不知道格式？先 </div>
          </Form.Item>
        </Form>

        {/* 按钮 */}
        <div className={styles.btnWrap}>
          <CustomButton
            btnName="提交"
            bgColor="grey"
            wrapStyle={{
              marginRight: 20,
              border: '1px solid rgba(38,168,114,1)',
              color: '#26A872',
            }}
          />
          <CustomButton btnName="上一步" bgColor="grey" />
        </div>
      </WrapComponent>
    </div>
  );
}
