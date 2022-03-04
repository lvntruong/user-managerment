import React, { useEffect, useState } from "react";
import { Layout, Button, PageHeader, Form, Input, Modal, Cascader } from "antd";
import DataTable from "../../components/DataTable";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { crud } from "../../redux/crud/actions";
import { request } from "../../request";
import {
  selectCreatedItem,
  selectDeletedItem,
  selectUpdatedItem,
} from "../../redux/crud/selectors";
const { Content } = Layout;

const Person = () => {
  const entry = "person";
  const [modelShow, setModelShow] = useState(false);
  const [modelAdd, setModelAdd] = useState(false);
  const [modelEdit, setModelEdit] = useState(false);
  const [modelDelete, setModelDelete] = useState(false);

  const [currentRow, setCurrentRow] = useState();
  const [currentPerson, setCurrentPerson] = useState();

  const [formAdd] = Form.useForm();

  const addStatus = useSelector(selectCreatedItem);
  const deleteStatus = useSelector(selectDeletedItem);
  const updateStatus = useSelector(selectUpdatedItem);

  const [listCompany, setListCompany] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await request.list("company");
      const data = res.result?.map((item) => {
        return {
          label: item.name,
          value: item._id,
        };
      });
      setListCompany(data);
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await request.read("person", currentRow._id);
      setCurrentPerson(res);
    };

    if (currentRow) {
      getData();
    }
  }, [currentRow]);

  useEffect(() => {
    if (addStatus.isSuccess) {
      setModelAdd(false);
      dispatch(crud.list(entry));
      formAdd.resetFields();
    }
  }, [addStatus]);

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

  const handelAddPerson = () => {
    setModelAdd(true);
  };

  const handleAdd = (data) => {
    const { companyId, ...splitData } = data;
    dispatch(
      crud.create(entry, {
        ...splitData,
        companyId: companyId[0] && companyId[0],
      })
    );
  };

  const handleEdit = (data) => {
    const { companyId, ...splitData } = data;
    dispatch(
      crud.update(entry, currentRow._id, {
        ...splitData,
        companyId: companyId[0] && companyId[0],
      })
    );
  };

  const dataTableColumns = [
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
            title={"Person"}
            ghost={false}
            extra={[
              <Button onClick={handelAddPerson} type="primary">
                Add new Person
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
        title={"Add person"}
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
            label="Person Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
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
                message: "Please input your address!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mobile"
            label="Mobile"
            rules={[
              {
                required: true,
                message: "Please input your mobile!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="companyId" label="Company">
            <Cascader options={listCompany} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={"Delete Person"}
        visible={modelDelete}
        onCancel={() => setModelDelete(false)}
        onOk={Delete}
      >
        <p>Are you sure?</p>
      </Modal>

      <Modal
        title={"Person Detail"}
        visible={modelShow}
        onCancel={() => setModelShow(false)}
        footer={[
          <Button onClick={() => setModelShow(false)} type="primary">
            OK
          </Button>,
        ]}
      >
        {currentPerson && (
          <>
            <p>Person Name: {currentPerson.result[0].name}</p>
            <p>Address: {currentPerson.result[0].address}</p>
            <p>Mobile: {currentPerson.result[0].mobile}</p>
            {currentPerson.result[0].company[0] && (
              <p>
                Work in Company Name: {currentPerson.result[0].company[0].name}{" "}
                - {currentPerson.result[0].company[0].address}
              </p>
            )}
          </>
        )}
      </Modal>

      <Modal
        title={"Edit Person"}
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
        {currentRow && listCompany && (
          <Form onFinish={handleEdit} id={"edit-form"}>
            <Form.Item
              label="Person Name"
              name="name"
              initialValue={currentRow.name}
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
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
                  message: "Please input your address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="mobile"
              label="Mobile"
              initialValue={currentRow.mobile}
              rules={[
                {
                  required: true,
                  message: "Please input your mobile!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="companyId" label="Company">
              <Cascader
                options={listCompany}
                defaultValue={currentRow.companyId && [currentRow.companyId]}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </Layout>
  );
};

export default Person;
