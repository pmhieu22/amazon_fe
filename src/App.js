import React, { Suspense } from "react";
import ErrorBoundary from "./components/error_boundary";
import { Navigate, Route, Routes } from "react-router-dom";
import { publicRoute } from "./constants/public_route.constant";
import { authRoute } from "./constants/auth_route.constant";
import { AdminLayout } from "./main/admin";

function App() {
  return (
    // <ErrorBoundary>
    <Routes>
      {publicRoute.map(({ path, element }) => {
        const Element = element;
        return (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={null}>
                <Element />
              </Suspense>
            }
          />
        );
      })}
      <Route element={<AdminLayout />}>
        {authRoute.map(({ path, element }) => {
          const Element = element;
          return (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={null}>
                  <Element />
                </Suspense>
              }
            />
          );
        })}
      </Route>
      <Route path="*" element={<Navigate to="/login" replace={true} />} />
    </Routes>
    // </ErrorBoundary>
  );
}

export default App;
