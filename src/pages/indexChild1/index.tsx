import { Form, Input, Button } from 'antd';
import styles from './index.less';
import { WrapComponent, TitleStyle, CustomButton } from '../../components';
const layout = {
  labelCol: { span: 8 }, // label 标签布局
  wrapperCol: { span: 16 }, // 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol
};

export default function IndexPage() {
  const onFinish = (values: any) => {
    // 提交表单且数据验证成功后回调事件
    console.log('onFinish:', values);
  };

  const onFinishFailed = (values, errorFields, outOfDate) => {
    // 提交表单且数据验证失败后回调事件
    console.log('onFinishFailed:', values, errorFields);
  };

  const onValuesChange = (changedValues, allValue) => {
    // 字段值更新时触发回调事件
    console.log('onValuesChange:', changedValues, allValue);
  };

  const onFieldsChange = (changedFields, allFields) => {
    // 字段更新时触发回调事件
    console.log('onFieldsChange:', changedFields, allFields);
  };
  const [form] = Form.useForm();

  return (
    <div>
      <WrapComponent>
        <TitleStyle title="新增无人机" />
        <Form
          {...layout}
          form={form}
          name="wrap"
          labelCol={{ flex: '140px' }}
          labelAlign="right" // label 标签的文本对齐方式
          labelWrap={false} // label 标签的文本换行方式
          // wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ marginTop: 40 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
          onFieldsChange={onFieldsChange}
        >
          <Form.Item label="设备ID：" name="id" rules={[{ required: true }]}>
            <Input placeholder="这是提示性文字" />
          </Form.Item>

          <Form.Item
            label="其他参数(Major)："
            name="param"
            rules={[{ required: true }]}
          >
            <Input placeholder="这是提示性文字" />
          </Form.Item>

          <Form.Item
            label="部署位置描述："
            name="desc"
            rules={[{ required: true }]}
          >
            <Input placeholder="请输入描述文字" />
          </Form.Item>

          <Form.Item label=" " style={{ textAlign: 'right' }}>
            {/* htmlType 设置 button 原生的 type 值 */}
            <Button type="primary" htmlType="submit" size="large">
              提交
            </Button>
            <Button
              size="large"
              style={{ margin: '0 8px' }}
              // onClick={() => {
              //   form.resetFields();
              // }}
            >
              上一步
            </Button>
          </Form.Item>
        </Form>

        {/* 按钮 */}
        <div className={styles.btnWrap}>
          <CustomButton btnName="下一步" />
        </div>
      </WrapComponent>
    </div>
  );
}
