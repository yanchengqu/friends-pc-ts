import styles from './index.less';
import { Card, Col, Row, Alert, Button, Statistic } from 'antd';
import { MoreArrow } from '@/components';

export default function IndexPage() {
  const gridStyle = {
    width: '50%',
    textAlign: 'center',
  };
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
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="库存信息" bordered={false}></Card>
        </Col>
        <Col span={8}>
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
        </Col>
      </Row>
    </div>
  );
}
