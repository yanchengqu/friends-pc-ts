import React, { useState, useEffect } from 'react';
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
import { connect } from 'umi';
import { PlusCircleOutlined } from '@ant-design/icons';
import { ILoading } from '@/services/common';
import { deviceByPageParams } from '../../services/Material';
import { IDvaProps } from '@/constants';
import { MaterialState } from '../../models/Material';
import { CustomButton } from '../../components';
import { AddDevicePoup } from './components';
interface IProps {
  loading: ILoading;
  Material: MaterialState;
}

const { TabPane } = Tabs;

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

const EditableTable = ({ isload, tableData, dispatch }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(tableData?.records);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;
  // 删除一行
  const handleDelete = (record) => {
    console.log('--key:', record);
    dispatch({
      type: 'Material/queryDeviceDelete',
      payload: {
        deviceCode: record?.deviceCode,
      },
      callBack: (data) => {
        console.log('删除成功回调', data);
        // 删除成功
        return dispatch({
          type: 'Material/deviceByPage',
          payload: {
            pageSize: 10,
            pageNum: 1,
          },
        });
      },
    });
    // const dataSource = [...data];
    // setData(dataSource.filter((item) => item.key !== record.key));
  };
  // 编辑 暂时不上
  // const edit = (record) => {
  //   form.setFieldsValue({
  //     name: '',
  //     age: '',
  //     address: '',
  //     ...record,
  //   });
  //   setEditingKey(record.key);
  // };
  // 分页
  const cancel = (page, pageSize) => {
    // 重置编辑key
    // setEditingKey('');
    console.log('当前点击分页', page, pageSize);
    dispatch({
      type: 'Material/deviceByPage',
      payload: {
        pageSize: 10,
        pageNum: page,
      },
    });
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
      dataIndex: 'deviceCode',
      width: '12%',
      editable: true,
      align: 'center',
    },
    {
      title: '硬件名称',
      dataIndex: 'deviceName',
      width: '10%',
      editable: true,
      align: 'center',
    },
    {
      title: '种类',
      dataIndex: 'typeStr',
      width: '10%',
      editable: true,
      align: 'center',
    },
    {
      title: '仓库名称',
      dataIndex: 'warehouseName',
      width: '8%',
      editable: true,
      align: 'center',
    },
    {
      title: '电量',
      dataIndex: 'electricity',
      width: '8%',
      editable: true,
      align: 'center',
    },
    {
      title: '状况',
      dataIndex: 'statusStr',
      width: '8%',
      editable: true,
      align: 'center',
    },
    {
      title: '备注',
      dataIndex: 'description',
      width: '28%',
      editable: true,
      align: 'center',
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
            {/* 编辑功能先不上 */}
            {/* <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              编辑
            </Typography.Link> */}
            <Popconfirm
              title="确定删除?"
              onConfirm={() => handleDelete(record)}
            >
              <a style={{ color: '#26A872' }}>删除</a>
            </Popconfirm>
          </Space>
        );
      },
      align: 'center',
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
        // inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        loading={isload}
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
          current: tableData?.current || 1,
          total: tableData?.total,
        }}
      />
    </Form>
  );
};

const mapStateToProps = ({ Material, loading }: IDvaProps & IProps) => {
  return { Material, loading };
};
const MaterialPage = ({ dispatch, Material, loading }) => {
  console.log('--Material:', Material, loading);
  useEffect(() => {
    dispatch({
      type: 'Material/deviceByPage',
      payload: {
        pageSize: 10,
        pageNum: 1,
      },
    });
  }, []);
  // 控制弹窗
  const [visible, setVisible] = useState(false);
  const addDevice = () => {
    console.log('添加设备');
    setVisible(true);
  };

  // 新增设备提交
  const onCreate = (values) => {
    const tempVal = Object.assign({}, values);
    const filterAttr = [
      'warehouseCode',
      'deviceName',
      'type',
      'manufacturer',
      'sn',
      'description',
    ];

    filterAttr.forEach((key) => {
      if (values[key]) delete values[key];
    });
    const attributes = Object.keys(values).map((key) => ({
      key,
      value: values[key],
    }));
    console.log('新增设备提交数据', values, tempVal, attributes);
    setVisible(false);
    // 新增设备提交接口
    dispatch({
      type: 'Material/queryDeviceAdd',
      payload: {
        ...tempVal,
        attributes: attributes,
      },
      callBack: (data) => {
        console.log('新增加设备成功回调', data);
        // 重新请求table数据
        return dispatch({
          type: 'Material/deviceByPage',
          payload: {
            pageSize: 10,
            pageNum: 1,
          },
        });
      },
    });
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
              <EditableTable
                dispatch={dispatch}
                isload={loading?.global}
                tableData={Material?.deviceByPageList}
              />
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
      {visible && (
        <AddDevicePoup
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
          Material={Material}
          dispatch={dispatch}
        />
      )}
    </>
  );
};

export default connect(mapStateToProps)(MaterialPage);
