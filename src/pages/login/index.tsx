import React from 'react';
import { connect } from 'umi';
import classnames from 'classnames';
import { encrypt } from '@/utils/utils';
import { Button, Row, Form, Icon, Input } from 'antd';
import styles from './index.less';
import { ILoading } from '@/services/common';
import { IDvaProps } from '@/constants';
const FormItem = Form.Item;

// 加密

interface IProps {
  loading: ILoading;
}

const mapStateToProps = ({ login, loading }: IDvaProps & IProps) => {
  return { login, loading };
};
const Login = ({ dispatch, login, loading }) => {
  console.log('--Login', login);
  const onFinish = (values: any) => {
    console.log('Success:', values);
    dispatch({
      type: 'login/queryLogin',
      payload: {
        username: values?.username,
        password: encrypt(values?.password),
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <main>
          <img src={require('./images/background.png')} alt="图片不见了" />
          <Form
            name="basic"
            // initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <h2>密码登录</h2>
            <FormItem
              className={styles.item}
              name="username"
              rules={[{ required: true, message: '账号有误，请重新输入' }]}
            >
              <Input placeholder="请输入账号" />
            </FormItem>

            <FormItem
              name="password"
              rules={[{ required: true, message: '密码有误，请重新输入' }]}
              className={styles.item}
            >
              <Input.Password placeholder="请输入密码" />
            </FormItem>
            <div className={styles.concatManager}>
              如忘记密码，请联系管理员136 xxxx xxxx
            </div>
            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                // loading={loading.effects.login}
                className={styles.submit}
              >
                {/* <Trans>Sign in</Trans> */}
                登录
              </Button>
            </Form.Item>
          </Form>
          <Row>
            {/* <p>
                <span>
                  <Trans>Username</Trans>
                  ：guest
                </span>
                <span>
                  <Trans>Password</Trans>
                  ：guest
                </span>
              </p> */}
          </Row>
        </main>
      </div>
    </div>
  );
};

export default React.memo(connect(mapStateToProps)(Login));
