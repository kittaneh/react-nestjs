import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { DashboardPage } from "./pages/DashboardPage";

import 'react-toastify/dist/ReactToastify.css';

export default function BasePage() {
  return (
    <>
      <Suspense fallback={<LayoutSplashScreen />}>
        <Switch>
          {
            /* Redirect from root URL to /dashboard. */
            <Redirect exact from="/" to="/dashboard" />
          }
          <ContentRoute path="/dashboard" component={DashboardPage} />
          <Redirect to="error/error-v1" />
        </Switch>
      </Suspense>
      <ToastContainer />
    </>
  );
}
