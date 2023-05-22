import React, { useEffect, useState } from "react";
import { Layout } from "antd";

import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
// import authActions from "../../redux/auth/action";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { writeLocalStorage } from "../../helpers/localStorage";
import Sidebar from "../../components/sidebar";
import AdminHeader from "../../components/header";

const { Content } = Layout;

export const AdminLayout = () => {
  const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(authActions.actions.checkSession());
  //   }, [dispatch]);

  //   const { isLoggedIn } = useSelector((state) => state.authReducer);

  //   if (!isLoggedIn) {
  //     return <Navigate to={clientRoute.LOGIN} replace={true} />;
  //   }
  return (
    <Layout className={styles["admin-layout"]}>
      <AdminHeader />
      <Layout className={styles["site-layout"]}>
        <Sidebar />
        <Content style={{margin: "10px 10px 10px 0px", padding: "12px", backgroundColor: "white"}}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
