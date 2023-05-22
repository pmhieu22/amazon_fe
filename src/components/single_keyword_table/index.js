import { Table } from "antd";

const SingleKeywordTable = ({ header, content }) => {
  const data = [
    {
      key: { header },
      list: { content },
    },
  ];

  const columns = [
    {
      title: <div style={{ backgroundColor: "" }}>{header}</div>,
      dataIndex: "list",
      key: "list",
      render: (record) => <div style={{ textAlign: "left" }}>{content}</div>,
      align: "center",
    },
  ];
  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={false}
      style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
    />
  );
};

export default SingleKeywordTable;
