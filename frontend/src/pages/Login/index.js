import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Layout, Row, Col, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { request } from "../../request";
import storeLocal from "../../utils/storeLocal";
import history from "../../utils/history";
const { Content } = Layout;

const LoginPage = () => {
  const [loading, setLoading] = useState();

  const onFinish = async (values) => {
    setLoading(true);
    const data = await request.post("/login", values);
    if (data.success) {
      storeLocal.set("token", data.result.token);
      storeLocal.set("user", data.result.user);
      history.push("/");
    }
    setLoading(false);
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
                      loading={loading}
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
