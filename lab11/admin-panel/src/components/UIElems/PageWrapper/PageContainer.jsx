import React from "react";
import classes from "./style.scss";

export const PageContainer = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};
