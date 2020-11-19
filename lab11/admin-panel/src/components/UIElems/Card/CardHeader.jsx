import React from "react";
import classes from "./style.scss";

export const CardHeader = ({
  align,
  justify,
  children,
  topIndent,
  bottomIndent
}) => {
  const cls = [
    classes.cardHeader,
    align ? classes[`align-${align}`] : "",
    justify ? classes[`justify-${justify}`] : ""
  ].join(" ");

  return (
    <div
      style={{ marginTop: topIndent, marginBottom: bottomIndent }}
      className={cls}
    >
      {children}
    </div>
  );
};
