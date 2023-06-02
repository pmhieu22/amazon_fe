import React, { useEffect } from "react";
import { Layout } from "antd";

import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
// import authActions from "../../redux/auth/action";
import { Navigate, Outlet } from "react-router-dom";

import Sidebar from "../../components/sidebar";
import AdminHeader from "../../components/header";
import { clientRoute } from "../../constants/routes.constant";
import { useActions } from "../../redux/useActions";

const { Content } = Layout;

export const AdminLayout = () => {
  const dispatch = useDispatch();
  const { authActions } = useActions();
  const { isLoggedIn } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(authActions.actions.testToken());
    }
  }, [dispatch, isLoggedIn, authActions]);

  if (!isLoggedIn) {
    return <Navigate to={clientRoute.LOGIN} replace={true} />;
  }
  return (
    <Layout className={styles["admin-layout"]}>
      <AdminHeader />
      <Layout className={styles["site-layout"]}>
        <Sidebar />
        <Content
          style={{
            margin: "10px 10px 10px 0px",
            padding: "12px",
            backgroundColor: "white",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
