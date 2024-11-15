import { lazy } from "react";

export const SecretLevel = lazy(() =>
  import("../../../../pages/secret-level/secretLevel").then((module) => ({
    default: module.SecretLevel,
  }))
);
