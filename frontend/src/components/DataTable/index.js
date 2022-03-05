import React, { useCallback, useEffect, useState } from "react";
import { Table } from "antd";
import { request } from "../../request";

export default function DataTable({ entity, dataTableColumns, refresh }) {
  // const { pagination, items } = listResult;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [pagination, setPagination] = useState();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const data = await request.list(entity);

      setData(data.result);
      setPagination(data.pagination);
      setLoading(false);
    };
    getData();
  }, [refresh]);

  return (
    <>
      <Table
        columns={dataTableColumns}
        rowKey={(item) => item._id}
        dataSource={data}
        pagination={pagination}
        loading={loading}
      />
    </>
  );
}
