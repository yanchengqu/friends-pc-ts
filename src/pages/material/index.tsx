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
import {
  AddDevicePoup,
  EditableTable,
  AddMaterialPoup,
  MaterialTable,
} from './components';
interface IProps {
  loading: ILoading;
  Material: MaterialState;
}

const { TabPane } = Tabs;

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
  // 控制设备弹窗
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

  // 控制物资弹窗
  const [visibleMaterial, setMaterialVisible] = useState(false);
  const addMeterial = () => {
    console.log('添加设备');
    setMaterialVisible(true);
  };

  // 新增物资提交
  const onMaterialCreate = (values) => {
    const tempVal = Object.assign({}, values);
    const filterAttr = [
      'warehouseCode',
      'storeCode',
      'storeName',
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
    console.log('新增物资提交数据', values, tempVal, attributes);
    setVisible(false);
    // 新增设备提交接口
    dispatch({
      type: 'Material/queryStoreAdd',
      payload: {
        ...tempVal,
        attributes: attributes,
      },
      callBack: (data) => {
        console.log('新增加物资成功回调', data);
        // 重新请求table数据
        return dispatch({
          type: 'Material/queryStoreByPage',
          payload: {
            pageSize: 10,
            pageNum: 1,
          },
        });
      },
    });
  };

  // 面板点击
  const tabClick = (activeKey) => {
    activeKey == 1
      ? dispatch({
          type: 'Material/deviceByPage',
          payload: {
            pageSize: 10,
            pageNum: 1,
          },
        })
      : dispatch({
          type: 'Material/queryStoreByPage',
          payload: {
            pageSize: 10,
            pageNum: 1,
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
          <Tabs type="card" onChange={tabClick}>
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
                records={Material?.deviceByPageList?.records}
              />
            </TabPane>
            <TabPane tab="物资管理" key="2">
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
                  onClick={() => addMeterial()}
                  btnName="添加物资"
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
              <MaterialTable
                dispatch={dispatch}
                isload={loading?.global}
                tableData={Material?.materialByPageList}
                records={Material?.materialByPageList?.records}
              />
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

      {/* 添加物质弹窗 */}
      {visibleMaterial && (
        <AddMaterialPoup
          visible={visibleMaterial}
          onCreate={onMaterialCreate}
          onCancel={() => {
            setMaterialVisible(false);
          }}
          Material={Material}
          dispatch={dispatch}
        />
      )}
    </>
  );
};

export default connect(mapStateToProps)(MaterialPage);
