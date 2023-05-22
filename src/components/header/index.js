import React from "react";

import { LogoutOutlined } from "@ant-design/icons";
import { Layout } from "antd";

import styles from "./style.module.css";

const { Header } = Layout;

const AdminHeader = () => {
  return (
    <Header className={styles["header"]} style={{boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px !important"}}>
      <div className={styles["left-header"]}>
        AMZ LISTINGS
        {/* <MenuOutlined className={styles["collapsed-btn"]} /> */}
      </div>
      <div className={styles["right-header"]}>
        <LogoutOutlined />
      </div>
    </Header>
  );
};

export default AdminHeader;
