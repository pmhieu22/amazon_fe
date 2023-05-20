import { lazy } from "react";
import { adminRoute } from "../../constants/routes.constant";

const ProductsManagement = lazy(() => import("./index"));

const route = {
    path: adminRoute.PRODUCT_MANAGEMENT,
    element: ProductsManagement,
}

export default route;