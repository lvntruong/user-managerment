import React, { useEffect, useState } from "react";
import { Layout, Button, PageHeader, Form, Input, Modal, Table } from "antd";
import DataTable from "../../components/DataTable";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { crud } from "../../redux/crud/actions";
import {
  selectCreatedItem,
  selectDeletedItem,
  selectUpdatedItem,
} from "../../redux/crud/selectors";
import { request } from "../../request";
const { Content } = Layout;

const Company = () => {
  const entry = "company";
  const [modelShow, setModelShow] = useState(false);
  const [modelAdd, setModelAdd] = useState(false);
  const [modelEdit, setModelEdit] = useState(false);
  const [modelDelete, setModelDelete] = useState(false);

  const [currentRow, setCurrentRow] = useState();
  const [currentCompany, setCurrentCompany] = useState();

  const [formAdd] = Form.useForm();

  const addStatus = useSelector(selectCreatedItem);
  const deleteStatus = useSelector(selectDeletedItem);
  const updateStatus = useSelector(selectUpdatedItem);
  useEffect(() => {
    if (addStatus.isSuccess) {
      setModelAdd(false);
      dispatch(crud.list(entry));
      formAdd.resetFields();
    }
  }, [addStatus]);

  useEffect(() => {
    const getData = async () => {
      const res = await request.read("company", currentRow._id);
      setCurrentCompany(res);
    };

    if (currentRow) {
      getData();
    }
  }, [currentRow]);

  useEffect(() => {
    if (deleteStatus.isSuccess) {
      setModelDelete(false);
      dispatch(crud.resetState());
      dispatch(crud.list(entry));
    }
  }, [deleteStatus]);

  useEffect(() => {
    if (updateStatus.isSuccess) {
      setModelEdit(false);
      dispatch(crud.resetState());
      dispatch(crud.list(entry));
    }
  }, [updateStatus]);

  const dispatch = useDispatch();

  function Delete() {
    dispatch(crud.delete(entry, currentRow._id));
  }

  const handelAddCompany = () => {
    setModelAdd(true);
  };

  const handleAdd = (data) => {
    dispatch(crud.create(entry, data));
  };

  const handleEdit = (data) => {
    dispatch(crud.update(entry, currentRow._id, data));
  };

  const dataTableColumns = [
    {
      title: "Company Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "",
      width: "150px",
      render: (row) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <EyeOutlined
            onClick={() => {
              setCurrentRow(row);
              setModelShow(true);
            }}
          />
          <EditOutlined
            onClick={() => {
              setCurrentRow(row);
              setModelEdit(true);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              setCurrentRow(row);
              setModelDelete(true);
            }}
          />
        </div>
      ),
    },
  ];

  const dataPerson = [
    {
      title: "Person Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            padding: "50px 40px",
            margin: "50px auto",
            width: "100%",
            maxWidth: "1000px",
          }}
        >
          <PageHeader
            title={"Company"}
            ghost={false}
            extra={[
              <Button onClick={handelAddCompany} type="primary">
                Add new Company
              </Button>,
            ]}
            style={{
              padding: "20px 0px",
            }}
          ></PageHeader>
          <DataTable
            entry={entry}
            dataTableColumns={dataTableColumns}
          ></DataTable>
        </Content>
      </Layout>

      <Modal
        title={"Add Company"}
        visible={modelAdd}
        onCancel={() => setModelAdd(false)}
        footer={[
          <Button onClick={() => setModelAdd(false)}>Cancel</Button>,
          <Button form="add-form" key="submit" htmlType="submit" type="primary">
            OK
          </Button>,
        ]}
      >
        <Form onFinish={handleAdd} id={"add-form"} form={formAdd}>
          <Form.Item
            label="Company Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your company name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your manager name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={"Delete Company"}
        visible={modelDelete}
        onCancel={() => setModelDelete(false)}
        onOk={Delete}
      >
        <p>Are you sure?</p>
      </Modal>

      <Modal
        title={"Company Detail"}
        visible={modelShow}
        onCancel={() => setModelShow(false)}
        footer={[
          <Button onClick={() => setModelShow(false)} type="primary">
            OK
          </Button>,
        ]}
      >
        {currentCompany && (
          <>
            <p>Company Name: {currentCompany.result[0].name}</p>
            <p>Address: {currentCompany.result[0].address}</p>
            <p>Email: {currentCompany.result[0].email}</p>
            <Table
              columns={dataPerson}
              rowKey={(item) => item._id}
              dataSource={currentCompany.result[0].person}
            />
          </>
        )}
      </Modal>

      <Modal
        title={"Edit Company"}
        visible={modelEdit}
        onCancel={() => setModelEdit(false)}
        footer={[
          <Button onClick={() => setModelEdit(false)}>Cancel</Button>,
          <Button
            form="edit-form"
            key="submit"
            htmlType="submit"
            type="primary"
          >
            OK
          </Button>,
        ]}
      >
        {currentRow && (
          <Form onFinish={handleEdit} id={"edit-form"}>
            <Form.Item
              label="Company Name"
              name="name"
              initialValue={currentRow.name}
              rules={[
                {
                  required: true,
                  message: "Please input your company name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              initialValue={currentRow.address}
              rules={[
                {
                  required: true,
                  message: "Please input your manager name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              initialValue={currentRow.email}
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </Layout>
  );
};

export default Company;
