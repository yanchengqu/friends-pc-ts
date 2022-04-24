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

export const EditableTable = ({ isload, tableData, records, dispatch }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  useEffect(() => {
    setData(records);
  }, [records]);
  console.log('table渲染22', tableData, records);
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
