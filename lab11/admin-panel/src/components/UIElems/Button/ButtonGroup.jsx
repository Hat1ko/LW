import React from "react";
import classes from "./style.scss";

export const ButtonGroup = ({
  align,
  justify,
  children,
  className,
  bottomIndent,
  topIndent
}) => {
  const cls = [
    classes.container,
    align ? classes[`align-${align}`] : "",
    justify ? classes[`justify-${justify}`] : "",
    className
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
