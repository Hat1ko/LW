import React from "react";
import { SignIn } from "./signIn";
import { ForgotPassword } from "./forgotPassword";
import { SIGN_IN, FORGOT_PASSWORD } from "@/config/routes";
import { Route, Redirect, Switch } from "react-router-dom";

export const Public = () => {
  return (
    <Switch>
      <Route path={SIGN_IN} component={SignIn} />
      <Route path={FORGOT_PASSWORD} component={ForgotPassword} />
      <Route path={"/"} render={() => <Redirect to={SIGN_IN} />} />
    </Switch>
  );
};
