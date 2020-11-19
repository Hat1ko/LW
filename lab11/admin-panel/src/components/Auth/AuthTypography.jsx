import React from "react";
import classes from "./style.scss";

export const AuthTypographyHeader = ({
  children,
  className,
  bottomIndent,
  topIndent
}) => {
  const cls = [classes.header, className].join(" ");

  return (
    <h1
      style={{ marginTop: topIndent, marginBottom: bottomIndent }}
      className={cls}
    >
      {children}
    </h1>
  );
};

export const AuthTypographySub = ({
  children,
  className,
  bottomIndent,
  topIndent
}) => {
  const cls = [classes.sub, className].join(" ");

  return (
    <p
      style={{ marginTop: topIndent, marginBottom: bottomIndent }}
      className={cls}
    >
      {children}
    </p>
  );
};
