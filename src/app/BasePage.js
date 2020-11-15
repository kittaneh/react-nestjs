import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { DashboardPage } from "./pages/DashboardPage";
import { UserPage } from './modules/User/pages/UserPage'

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
          <ContentRoute path="/user" component={UserPage} />
          <Redirect to="error/error-v1" />
        </Switch>
      </Suspense>
      <ToastContainer />
    </>
  );
}
