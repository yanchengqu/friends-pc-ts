import React, { useEffect } from 'react';
import { connect } from 'umi';
import styles from './index.less';
import {
  Card,
  Col,
  Row,
  Alert,
  Button,
  Statistic,
  Progress,
  Table,
} from 'antd';
import { MoreArrow } from '@/components';
import { ILoading } from '@/services/common';
import { IDvaProps } from '@/constants';
import { HomeState } from '../../models/Home';
import device_icon1 from '../../assets/device/device_icon1.png';

interface IProps {
  loading: ILoading;
  Home: HomeState;
}

const mapStateToProps = ({ Home, loading }: IDvaProps & IProps) => {
  return { Home, loading };
};
const Indexage = ({ dispatch, Home, loading }) => {
  console.log('--Home:', Home, loading);
  useEffect(() => {
    // 库存商品统计
    dispatch({
      type: 'Home/queryStoreCount',
      payload: {},
    });

    // 库存商品分类统计
    dispatch({
      type: 'Home/queryCountByType',
      payload: {},
    });
  }, []);
  const gridStyle = {
    width: '50%',
    textAlign: 'center',
  };
  const dataSource = [
    {
      key: '1',
      name: '无人机',
      need: 20,
      age: 6,
      address: 15,
      baofei: 14,
    },
    {
      key: '2',
      name: '电池',
      need: 20,
      age: 6,
      address: 15,
      baofei: 14,
    },
    {
      key: '3',
      name: '部件',
      need: 20,
      age: 6,
      address: 15,
      baofei: 14,
    },
  ];

  const columns = [
    {
      title: ' ',
      dataIndex: 'name',
      key: 'name',
      render: (text, row, index) => (
        <span style={{ color: '#3DB291', fontWeight: 500 }}>{text}</span>
      ),
    },
    {
      title: '需求',
      dataIndex: 'need',
      key: 'need',
    },
    {
      title: '在库',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '差额',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '差额',
      dataIndex: 'baofei',
      key: 'baofei',
    },
  ];
  return (
    <div className={styles.deviceWrap}>
      {/* 公告 */}
      <Alert
        message="显示格式是“标题+部分内容”显示宽度只有一行最右边有“查看”点击整个条目时都可以跳转到信息中查看详细的公告内容"
        // type="success"
        showIcon
        // icon={}
        style={{ background: '#FFDDCB', border: '0 none', marginBottom: 12 }}
        action={<MoreArrow arrowTitle="查看" onClick={() => {}} />}
      />

      {/* 内容 */}
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <Card title="库存状态" bordered={false}>
            {/* 图标 */}
            <img src={device_icon1} className={styles.imgIcon} />
            <Row>
              <Col span={16} align="center">
                <Progress
                  strokeLinecap="square"
                  type="circle"
                  strokeWidth="12"
                  percent={48}
                  strokeColor="#3DB291"
                  trailColor="#DBDBDB"
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="设备存放量"
                  // prefix={<LikeOutlined />}
                  value={42}
                  valueStyle={{
                    fontSize: 18,
                    color: '#333333',
                    fontWeight: 400,
                  }}
                  precision={1}
                />
                <Statistic
                  title="累计使用"
                  value={42}
                  valueStyle={{
                    fontSize: 18,
                    color: '#333333',
                    fontWeight: 400,
                  }}
                  precision={1}
                />
                <Statistic
                  title="维修中"
                  value={42}
                  valueStyle={{
                    fontSize: 18,
                    color: '#333333',
                    fontWeight: 400,
                  }}
                  precision={1}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="库存信息" bordered={false}>
            {/* 图标 */}
            <img src={device_icon1} className={styles.imgIcon} />
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
            />
          </Card>
        </Col>
        {/* <Col span={8}>
          <Card title="预警状态" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="库内环境" bordered={false}>
            <Card.Grid style={gridStyle}>
              <Statistic
                title="温度(℃)"
                value={25.4}
                valueStyle={{ fontSize: 24, color: '#333333', fontWeight: 600 }}
                precision={1}
              />
            </Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="视频监控" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="工单办理情况" bordered={false}>
            Card content
          </Card>
        </Col> */}
      </Row>
    </div>
  );
};

export default connect(mapStateToProps)(Indexage);
