import {
  DashboardOutlined,
  UserOutlined,
  ControlOutlined,
  HistoryOutlined,
  DeploymentUnitOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

import styles from "./style.module.css";
import { adminRoute } from "../../constants/routes.constant";
import { useDispatch } from "react-redux";
import authActions from "../../redux/auth/action";
import { useState } from "react";
import { readLocalStorage } from "../../helpers/localStorage";
// import { INFO } from "../../constants/auth.constant";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <Sider
        className={styles["sider-wrapper"]}
        collapsible
        collapsed={false}
        trigger={null}
        width={250}
        theme="light"
      >
        <Menu
          className={styles["items"]}
          theme="light"
          mode="inline"
          onSelect={() => {
            // dispatch(authActions.actions.checkSession());
          }}
          items={[
            {
              key: "asinManagement",
              // icon: <UserOutlined />,
              label: "ASIN Management",
              onClick: () => {
                navigate(adminRoute.PRODUCT_MANAGEMENT);
              },
            },
          ]}
        />
      </Sider>
    </>
  );
};

export default Sidebar;
