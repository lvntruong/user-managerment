import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Layout,
  Row,
  Col,
  Divider,
  message,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../../redux/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/selectors";
const { Content } = Layout;

const LoginPage = () => {
  const [error, setError] = useState();

  const { loading: isLoading } = useSelector(selectAuth);

  useEffect(() => {
    error && message.error(error, () => setError());
  }, [error]);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(login(values));
  };
  return (
    <>
      <Layout className="layout">
        <Row>
          <Col span={12} offset={6}>
            <Content
              style={{
                padding: "150px 0 180px",
                maxWidth: "360px",
                margin: "0 auto",
              }}
            >
              <h1>Login</h1>
              <Divider />
              <div className="site-layout-content">
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="admin@demo.com"
                      autoComplete="off"
                      type="email"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="123456"
                      autoComplete="off"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      loading={isLoading}
                    >
                      Log in
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Content>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default LoginPage;
