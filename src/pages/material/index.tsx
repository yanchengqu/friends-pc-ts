import React, { useState } from 'react';
import styles from './index.less';
import {
  Card,
  Col,
  Row,
  Alert,
  Button,
  Statistic,
  Progress,
  Tabs,
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Space,
  Modal,
  Typography,
} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { CustomButton } from '../../components';
import { AddDevicePoup } from './components';
const { TabPane } = Tabs;
const originData = [];

for (let i = 0; i < 20; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const handleDelete = (key) => {
    const dataSource = [...data];
    setData(dataSource.filter((item) => item.key !== key));
  };

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: '硬件编号',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: '状态',
      dataIndex: 'age',
      width: '15%',
      editable: true,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: '备注',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </Typography.Link>
            <Popconfirm title="确定取消?" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <Space size="middle">
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              编辑
            </Typography.Link>
            <Popconfirm
              title="确定删除?"
              onConfirm={() => handleDelete(record.key)}
            >
              <a style={{ color: '#666' }}>删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        size="middle"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default function IndexPage() {
  // 控制弹窗
  const [visible, setVisible] = useState(false);
  const addDevice = () => {
    console.log('添加设备');
    setVisible(true);
  };

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  return (
    <>
      <div className={styles.materialWrap}>
        {/* 公告 */}
        <div className={styles.headerDes}>
          <Alert
            message="您可以对账号的设备（以下简称“设备”）进行新增、删除等操作。同时，可以查看所有已部署设备的具体情况，设备是指支持“iBeacon协议”的低功耗蓝牙硬件，在“新增设备”功能中，您可以根据实际情况，查看“如何购买设备”和“如何新增设备"
            // type="success"
            showIcon={false}
            // icon={}
            style={{
              background: '#F4F5F9',
              border: '0 none',
              borderRadius: '4px',
              padding: '14px 20px',
            }}
          />
        </div>

        <div className={styles.tabsWrap}>
          <Tabs type="card">
            <TabPane tab="设备管理" key="1">
              <Row justify="space-between">
                <Col span={4} className={styles.rightCard}>
                  <Card
                    bordered={false}
                    bodyStyle={{
                      flex: 1,
                      background: '#D4EEE3',
                      borderRadius: '4px 0px 0px 4px',
                    }}
                  >
                    <Statistic title="4" value="库房" />
                  </Card>
                  <Card
                    bordered={false}
                    bodyStyle={{
                      flex: 1,
                      background: '#F1F1F1',
                      borderRadius: '0px 4px 4px 0px',
                    }}
                  >
                    <Statistic title="0" value="异常" />
                  </Card>
                </Col>
                <Col span={4} className={styles.rightCard}>
                  <Card
                    bordered={false}
                    bodyStyle={{
                      flex: 1,
                      background: '#D4EEE3',
                      borderRadius: '4px 0px 0px 4px',
                    }}
                  >
                    <Statistic title="4" value="库房" />
                  </Card>
                  <Card
                    bordered={false}
                    bodyStyle={{
                      flex: 1,
                      background: '#F1F1F1',
                      borderRadius: '0px 4px 4px 0px',
                    }}
                  >
                    <Statistic title="0" value="异常" />
                  </Card>
                </Col>
                <Col span={4} className={styles.rightCard}>
                  <Card
                    bordered={false}
                    bodyStyle={{
                      flex: 1,
                      background: '#D4EEE3',
                      borderRadius: '4px 0px 0px 4px',
                    }}
                  >
                    <Statistic title="4" value="库房" />
                  </Card>
                  <Card
                    bordered={false}
                    bodyStyle={{
                      flex: 1,
                      background: '#F1F1F1',
                      borderRadius: '0px 4px 4px 0px',
                    }}
                  >
                    <Statistic title="0" value="异常" />
                  </Card>
                </Col>
                <Col
                  span={4}
                  style={{ flexDirection: 'row', display: 'flex' }}
                ></Col>
              </Row>
              {/* 按钮 */}
              <div className={styles.btnWrap}>
                <CustomButton
                  onClick={() => addDevice()}
                  btnName="添加设备"
                  customIcon={
                    <PlusCircleOutlined
                      style={{ fontSize: 14, color: '#4F996F', marginRight: 4 }}
                    />
                  }
                  wrapStyle={{
                    width: 100,
                    height: 32,
                    background: '#FFFFFF',
                    border: '1px solid rgba(217, 217, 217, 1)',
                    borderRadius: 4,
                    fontSize: 14,
                    color: '#595959',
                    fontWeight: 400,
                  }}
                />
              </div>
              {/* table */}
              <EditableTable />
            </TabPane>
            <TabPane tab="物资管理" key="2">
              <p>Content of Tab Pane 2</p>
              <p>Content of Tab Pane 2</p>
              <p>Content of Tab Pane 2</p>
            </TabPane>
          </Tabs>
        </div>
      </div>
      {/* 添加设备弹窗 */}
      <AddDevicePoup
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </>
  );
}
