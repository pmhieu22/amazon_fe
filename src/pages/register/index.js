import { Button, Card, Checkbox, Form, Input } from "antd";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useActions } from "../../redux/useActions";
import { Navigate, useNavigate } from "react-router-dom";
import { adminRoute, clientRoute } from "../../constants/routes.constant";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authActions } = useActions();

  const { isLoggedIn } = useSelector((state) => state.authReducer);

  const validator = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    }

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
      email: "",
      username: "",
      password: "",
    },
    validate: validator,
    onSubmit: async (values) => {
      // try {
      //   dispatch(authActions.actions.login(values.username, values.password));
      // } catch (err) {
      //   console.log(err);
      // }
      console.log("values regis: ", values);
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
      <div className={styles["register-container"]}>
        <div className={styles["register-form"]}>
          <Card>
            <div className={styles["register-header"]}>Get Started</div>
            <Form
              autoComplete="off"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "5px 20px",
              }}
            >
              <Form.Item
                validateStatus={formik.errors.email && "error"}
                help={formik.errors.email}
              >
                <Input
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onKeyDown={handleEnterKey}
                />
              </Form.Item>
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
              <Button
                block
                type="primary"
                onClick={formik.handleSubmit}
                className={styles["register-btn-1"]}
              >
                Sign up
              </Button>
              <div className={styles["login-action"]}>
                <span>Already have an account ? </span>
                <Button
                  type="link"
                  block
                  className={styles["login-btn-1"]}
                  onClick={() => {
                    navigate(clientRoute.LOGIN);
                  }}
                >
                  Sign in
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Register;
