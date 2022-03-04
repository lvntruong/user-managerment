import React, { useCallback, useEffect } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { crud } from "../../redux/crud/actions";
import { selectListItems } from "../../redux/crud/selectors";

export default function DataTable({ entry, dataTableColumns }) {
  const { result: listResult, isLoading: listIsLoading } =
    useSelector(selectListItems);

  const { pagination, items } = listResult;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(crud.resetState());
    dispatch(crud.list(entry));
  }, [entry]);

  return (
    <>
      <Table
        columns={dataTableColumns}
        rowKey={(item) => item._id}
        dataSource={items}
        pagination={pagination}
        loading={listIsLoading}
      />
    </>
  );
}
