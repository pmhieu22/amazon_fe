import { lazy } from "react";
import { adminRoute } from "../../constants/routes.constant";

const AsinsManagement = lazy(() => import("./index"));

const route = {
    path: adminRoute.ASINS_MANAGEMENT,
    element: AsinsManagement,
}

export default route;