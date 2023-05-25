import { Button, Card, Checkbox, Form, Input } from "antd";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

const LoginPage = () => {
  const dispatch = useDispatch();

  // const { isLoggedIn } = useSelector((state) => state.authReducer);

  const validator = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Trường này không được để trống";
    }

    if (!values.password) {
      errors.password = "Trường này không được để trống";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: validator,
    onSubmit: (values) => {
      //   try {
      //     dispatch(authActions.actions.login(values.username, values.password));
      //   } catch (err) {
      //     console.log(err);
      //   }
    },
  });

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      formik.handleSubmit();
    }
  };
  //check isLoggedIn
  return (
    <>
      <div className={styles["login-container"]}>
        <div className={styles["login-form"]}>
          <Card
            style={{
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;",
            }}
          >
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
                style={
                  {
                    // width: "80%",
                  }
                }
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
                style={
                  {
                    // width: "80%",
                  }
                }
              >
                <Input.Password
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onKeyDown={handleEnterKey}
                />
              </Form.Item>
              <Form.Item style={{ alignItems: "flex-start" }}>
                <Checkbox>Remember me?</Checkbox>
              </Form.Item>
              <Button
                block
                type="primary"
                onClick={formik.handleSubmit}
                style={{ minHeight: 40, backgroundColor: "#7655cd" }}
              >
                Đăng nhập
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
