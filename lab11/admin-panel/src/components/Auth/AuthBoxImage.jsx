import React from "react";
import classes from "./style.scss";

export const AuthBoxImage = ({ image }) => {
  const style = { backgroundImage: `url(${image})` };
  return <div style={style} className={classes.boxImage}></div>;
};
