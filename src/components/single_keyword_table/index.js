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
      title: `${ header }`,
      dataIndex: "list",
      key: "list",
      render: (record) => <>{content}</>,
    },
  ];
  return <Table dataSource={data} columns={columns} pagination={false} style={{width: "100%"}}/>;
};

export default SingleKeywordTable;
