import React, { Suspense } from "react";
import ErrorBoundary from "./components/error_boundary";
import { Route, Routes } from "react-router-dom";
import { publicRoute } from "./constants/public_route.constant";
import AdminLayout from "./main/admin";
import { authRoute } from "./constants/auth_route.constant";

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
      </Routes>
    // </ErrorBoundary>
  );
}

export default App;
