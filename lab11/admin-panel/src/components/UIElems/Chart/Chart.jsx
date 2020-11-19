import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { options, dataset } from "@/config/chartConfig";
import { months, days } from "@/config/dateTranslateConfig";

const getDays = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  return new Date(year, month, 0).getDate();
};

const getLabels = type => {
  switch (type) {
    case "year":
      return months;
    case "month":
      let month = new Array(getDays());
      for (let i = 0; i < month.length; i++) {
        month[i] = i + 1;
      }
      return month;
    default:
      return days;
  }
};

export const Chart = ({ type, data }) => {
  const canvasContainer = React.createRef();
  const [gradientWidth, setGradientWidth] = useState(500);

  useEffect(() => {
    setGradientWidth(canvasContainer.current.offsetWidth);
  }, [canvasContainer]);

  const labels = getLabels(type);

  return (
    <div ref={canvasContainer}>
      <Line data={dataset(labels, data, gradientWidth)} options={options} />
    </div>
  );
};
