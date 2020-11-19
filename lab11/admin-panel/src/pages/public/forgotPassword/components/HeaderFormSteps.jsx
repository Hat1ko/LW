import React from "react";
import { AuthTypographyHeader } from "@/components";

export const HeadFormSteps = ({ step }) => (
  <AuthTypographyHeader bottomIndent={30}>
    Восстановление Пароля. Шаг {step}
  </AuthTypographyHeader>
);
