import { lazy } from "react";
import { clientRoute } from "../../constants/routes.constant";

const LoginPage = lazy(() => import("./index"));

const route = {
    path: clientRoute.LOGIN,
    element: LoginPage,
}

export default route;