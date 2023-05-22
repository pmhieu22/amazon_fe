import { Button, Space, Table } from "antd";

import styles from "./style.module.css";
import SingleKeywordTable from "../../../../components/single_keyword_table";
import { useState } from "react";
import ListTitle from "../../../../components/ListTitle";

const SubAsin = () => {
  const [isShowSingleKeyword, setIsShowSingleKeyword] = useState(false);
  const [isShowSingleKeyBtn, setIsShowSingleKeyBtn] = useState(true);

  const [isShowList, setIsShowList] = useState(false);
  const [isShowListBtn, setIsShowListBtn] = useState(true);

  const data = [
    {
      key: "1",
      asinFbm: "7BLXFEXMJ4",
      asin2: "7BLXFEXMJ5",
      asin3: "7BLXFEXMJ6",
      asin4: "7BLXFEXMJ7",
    },
  ];

  const columns = [
    {
      title: "Asin 1 FBM",
      dataIndex: "asinFbm",
      key: "asinFbm",
    },
    {
      title: "Asin 2",
      dataIndex: "asin2",
      key: "asin2",
    },
    {
      title: "Asin 3",
      dataIndex: "asin3",
      key: "asin3",
    },
    {
      title: "Asin 4",
      dataIndex: "asin4",
      key: "asin4",
    },
  ];

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        className={styles["sub-asin-table"]}
        bordered={false}
      />
      {isShowSingleKeyword && (
        <>
          <ListTitle title="Singer keyword list" />
          <div className={styles["single-keyword-list-table"]}>
            <Space direction="vertical" size={10} style={{ width: "100%" }}>
              <SingleKeywordTable
                header="List singer keyword for title"
                content="abcd"
              />
              <SingleKeywordTable
                header="List singer keyword for bullet point"
                content="abcd"
              />
              <SingleKeywordTable
                header="List singer keyword for description "
                content="abcd"
              />
              <SingleKeywordTable
                header="List singer keyword for trademark"
                content="abcd"
              />
            </Space>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                style={{ marginTop: 10 }}
                onClick={() => {
                  setIsShowSingleKeyword(false);
                  setIsShowSingleKeyBtn(true);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </>
      )}

      {isShowList && (
        <>
          <ListTitle title="Singer keyword details" />
          <div className={styles["single-keyword-list-table"]}>
            <Space direction="vertical" size={10} style={{ width: "100%" }}>
              <SingleKeywordTable header="Title" content="abcd" />
              <SingleKeywordTable header="4 Bullet Points" content="abcd" />
              <SingleKeywordTable header="Description" content="abcd" />
            </Space>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              style={{ marginTop: 10 }}
              onClick={() => {
                setIsShowList(false);
                setIsShowListBtn(true);
              }}
            >
              Cancel
            </Button>
          </div>
        </>
      )}

      <div className={styles["sub-asin-actions"]}>
        <Space size={10}>
          {isShowSingleKeyBtn && (
            <Button
              onClick={() => {
                setIsShowSingleKeyword(true);
                setIsShowSingleKeyBtn(false);
              }}
            >
              Create Singer Keywords
            </Button>
          )}
          {isShowListBtn && (
            <Button
              onClick={() => {
                setIsShowList(true);
                setIsShowListBtn(false);
              }}
            >
              Create Listing From Single Words
            </Button>
          )}
        </Space>
      </div>
    </>
  );
};

export default SubAsin;
