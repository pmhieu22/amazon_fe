import { Input, Table } from "antd";
import { useState } from "react";

import styles from "./style.module.css";

const MainAsin = ({ setIsShowSubAsin }) => {
  const [data, setData] = useState([{ key: "1", asinName: "" }]);

  const handleInputChange = (value, index) => {
    const newData = [...data];
    newData[index].asinName = value;
    if (newData[index].asinName.length === 10) {
      setIsShowSubAsin(true);
    } else {
      setIsShowSubAsin(false);
    }

    setData(newData);
  };

  const columns = [
    {
      title: "Main ASIN",
      dataIndex: "asinName",
      key: "asinName",
      render: (text, record, index) => (
        <Input
          value={text}
          onChange={(e) => handleInputChange(e.target.value, index)}
          placeholder="Enter your main Asin name..."
        />
      ),
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={false}
      className={styles["main-asin-table"]}
      bordered={false}
    />
  );
};

export default MainAsin;
