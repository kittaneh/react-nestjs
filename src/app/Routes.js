import React from "react";
import { Switch, Route } from "react-router-dom";
import { Layout } from "../_metronic/layout";
import BasePage from "./BasePage";


export function Routes() {
    return (
        <Layout>
            <Switch>
                <Route>
                    <BasePage />
                </Route>
            </Switch>
        </Layout>
    );
}
