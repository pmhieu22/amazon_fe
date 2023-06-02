import { lazy } from "react";
import { clientRoute } from "../../constants/routes.constant";

const Register = lazy(() => import("./index"));

const route = {
  path: clientRoute.REGISTER,
  element: Register,
};

export default route;
