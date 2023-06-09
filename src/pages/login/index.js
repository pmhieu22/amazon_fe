import { Button, Card, Checkbox, Form, Input } from "antd";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useActions } from "../../redux/useActions";
import { Navigate, useNavigate } from "react-router-dom";
import { adminRoute, clientRoute } from "../../constants/routes.constant";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authActions } = useActions();

  const { isLoggedIn } = useSelector((state) => state.authReducer);

  const validator = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Required";
    }

    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: validator,
    onSubmit: async (values) => {
      try {
        dispatch(authActions.actions.login(values.username, values.password));
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      formik.handleSubmit();
    }
  };

  //check isLoggedIn
  if (isLoggedIn) {
    return <Navigate to={adminRoute.ASINS_MANAGEMENT} replace={true} />;
  }
  return (
    <>
      <div className={styles["login-container"]}>
        <div className={styles["login-form"]}>
          <Card>
            <div className={styles["login-header"]}>AMZ Listing</div>
            <Form
              autoComplete="off"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "5px 20px",
              }}
            >
              <Form.Item
                validateStatus={formik.errors.username && "error"}
                help={formik.errors.username}
              >
                <Input
                  name="username"
                  placeholder="Username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onKeyDown={handleEnterKey}
                />
              </Form.Item>
              <Form.Item
                validateStatus={formik.errors.password && "error"}
                help={formik.errors.password}
              >
                <Input.Password
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onKeyDown={handleEnterKey}
                />
              </Form.Item>
              <Form.Item className={styles["login-remember-checkbox"]}>
                <Checkbox>Remember me?</Checkbox>
              </Form.Item>
              <Button
                block
                type="primary"
                onClick={formik.handleSubmit}
                className={styles["login-btn"]}
              >
                Sign in
              </Button>
              <div className={styles["register-action"]}>
                <span>Don't have an account ? </span>
                <Button
                  type="link"
                  block
                  className={styles["register-btn"]}
                  onClick={() => {
                    navigate(clientRoute.REGISTER);
                  }}
                >
                  Sign up
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
