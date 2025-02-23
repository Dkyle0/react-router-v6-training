import { lazy } from "react";

export const Login = lazy(() =>
  import("../../../../pages/login/login").then((module) => ({
    default: module.Login,
  }))
);
