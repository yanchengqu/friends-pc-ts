import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Radio, Select, TreeSelect } from 'antd';
import styles from './index.less';
import { connect } from 'umi';
import { IDvaProps } from '@/constants';
import { MaterialState } from '../../../../models/Material';

interface IProps extends IDvaProps {
  Material: MaterialState;
}

const { Option } = Select;

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps extends IProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

export const AddMaterialPoup = ({
  Material,
  visible,
  onCreate,
  onCancel,
  dispatch,
}) => {
  console.log('弹窗', Material.attributesMaterialList);
  const [deviceType, setDeviceType] = useState(0);
  const [form] = Form.useForm();
  useEffect(() => {
    // 查询仓库
    dispatch({
      type: 'Material/queryWarehouseGet',
      payload: {},
    });
    // 查询设备类型
    dispatch({
      type: 'Material/queryStoreGetTypes',
      payload: {},
    });
  }, []);
  // 仓库
  const warehouseHandle = (value, options, arr) => {};
  // 设备类型onchange
  const typesHandle = (value, options, arr) => {
    console.log('typesHandle:', value, options, arr);
    setDeviceType(value);
    // 物质没有 查询厂商
  };

  // 设备厂商onchange
  const manufacturersHandle = (value, options, arr) => {
    dispatch({
      type: 'Material/queryStoreAttributes',
      payload: {
        // 设备类型
        type: deviceType,
        // 设备厂商
        manufacturer: value,
      },
    });
  };

  return (
    <Modal
      visible={visible}
      title="添加物资"
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="storeName"
          label="物资名称"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="warehouseCode"
          label="仓库"
          rules={[
            {
              required: true,
              message: '请选择仓库',
            },
          ]}
        >
          <TreeSelect
            treeData={Material?.warehouseTreeList}
            // placeholder="Please select"
            treeDefaultExpandAll
            onChange={warehouseHandle}
          />
        </Form.Item>
        <Form.Item
          name="type"
          label="物资类型"
          rules={[
            {
              required: true,
              message: '',
            },
          ]}
        >
          <Select onChange={typesHandle}>
            {Material?.materialTypes?.map((item) => (
              <Option value={item?.key}>{item?.value}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="sn"
          label="物资ID"
          rules={[
            {
              required: false,
              message: '',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="备注"
          rules={[
            {
              required: false,
              message: '',
            },
          ]}
        >
          <Input type="textarea" />
        </Form.Item>
        {Material?.attributesMaterialList?.map((item) => (
          <Form.Item
            name={item?.key}
            label={item?.value}
            rules={[
              {
                required: false,
                message: '',
              },
            ]}
          >
            <Input />
          </Form.Item>
        ))}
        {/* <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item
          name="modifier"
          className="collection-create-form_last-form-item"
        >
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

AddMaterialPoup.defaultProps = {
  visible: false,
};
